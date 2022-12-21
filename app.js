require('dotenv').config();
const fetch = require("node-fetch"); 
const express = require('express');
const app = express();
const NodeMediaServer = require('node-media-server');

async function getMerakiAPI(url){
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Cisco-Meraki-API-Key": process.env.MERAKI_API_KEY
  }
  let resp = await fetch(url, {headers});
  return resp.json();
}

async function getWebexAPI(url){
  let headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.BOT_TOKEN}`
  }
  let resp = await fetch(url, {headers});
  return resp.json();
}


let rooms = [];
let tasks = [];
(async () => {
  try {
    //Determine ORG ID
    let orgs = await getMerakiAPI('https://api.meraki.com/api/v1/organizations');
    console.log(orgs);
    //Get Org Devices
    let cameras = await getMerakiAPI(`https://api.meraki.com/api/v1/organizations/${orgs[0]["id"]}/devices`);
    console.log(cameras);
    //Get Bot/Control Hub Room Devices
    let devices = await getWebexAPI(`https://webexapis.com/v1/devices`);
    console.log(devices);
    //Merge Meraki and Room Devices
    for(let d of devices["items"]){
      for(let c of cameras){
        if(d["tags"].indexOf(c["name"]) >= 0){
          let cleanName = c["name"].toLowerCase().split(' ').join('_');
          rooms.push({
            camera : {
              cleanName : cleanName,
              name : c["name"],
              ip : c["lanIp"],
              mac : c["mac"],
              serial : c["serial"],
              http: `http://192.168.0.7:8000/cctv/${cleanName}.flv`
            },
            device : {
              id : d["id"],
              name : d["displayName"],
              ip : d["ip"],
              mac : d["mac"],
              serial : d["serial"],
              product : d["product"],
              sip : d["primarySipUrl"],
              tags : d["tags"]
            }
          });
          tasks.push({
              app: 'cctv',
              mode: 'static',
              edge: `rtsp://${c["lanIp"]}:9000/live`,
              name: cleanName,
              rtsp_transport : 'tcp' //['udp', 'tcp', 'udp_multicast', 'http']
            })
        }
      }
    }
    console.log(rooms);
    console.log(tasks);

    const config = {
      relay: {
        ffmpeg: '/usr/local/bin/ffmpeg',
        tasks: tasks
      },
      rtmp: {
        port: 1935,
        chunk_size: 30000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
      },
      http: {
        port: 8000,
        allow_origin: '*'
      }
    };

    console.log('Starting NMS');
    var nms = new NodeMediaServer(config)
    nms.run();
    console.log('Started NMS');
  } catch (e) {
    console.log(e);
  }
})();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/rooms', async (req, res) => {
  console.log(`GET / request:${req.url}`);
  console.log(`GET / body:`);
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(rooms));
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Dashboard Server is listening on port " + listener.address().port);
});