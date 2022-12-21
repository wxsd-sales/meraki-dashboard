# Meraki-Dashboard 
<a href="https://github.com/WXSD-Sales/meraki-dashboard/issues"><strong>Report Bug</strong></a>
·
<a href="https://github.com/WXSD-Sales/meraki-dashboard/issues"><strong>Request Feature</strong></a>

This is a Web App which compiles Meraki network cameras via RTSP onto a dashboard/webpage.  Camera names are associated to Rooms Devices on a CH tenant via a "tag" on the room device in CH.

## Overview
[![Meraki_Dashboard Video](https://user-images.githubusercontent.com/19175490/208965357-bb3757b5-9ce3-490d-a9be-9905e3bed6fe.png)](https://app.vidcast.io/share/a9d8ca25-a430-4cbe-a494-52a3d95b5623)

* This application uses the Meraki API to retrieve a list of Network cameras (this is why you need a Meraki API Key below).
* This application retrieves a list of API accessible Room Devices (this is why you need a Webex Bot token below).
* This application matches the cameras to the room devices based on the tags for the retrieved room devices.
* This application displays the RTSP streams of the meraki cameras on a webpage, and for each camera, provides a button to dial the associated room device.

Server Requirements:
1. node version >= 14.5.0


## Setup

1. You will need at least one local meraki camera.  The meraki cameras will need to have RTSP enabled, which can be done in the Meraki Dashboard.
2. You will need access to a Device in shared/room mode, like a Deskpro, Roomkit, DX80, etc.
  a. You will need to create a bot, and get the bot's token (developer.webex.com).
  b. The bot will need to be given API access to each room device you want to use for this demo.
  c. Each room device will need to have the name of the associated Meraki camera(s) added as a tag in CH.

### Server Side Setup
1. Clone this repository
2. Rename ```sample.env``` to ```.env```, and edit the values in .env
* You will need a Bot token (developer.webex.com) and a Meraki API key (dashboard.meraki.com)
3. Navigate to the cloned directory in your terminal, then run:
```
npm init
```
```
npm install
```
```
npm start
```
4. Navigate to http://localhost:PORT in a **Cisco device browser**, where PORT is set in the file .env
* If you only have 1 camera and 1 device and want to view this dashboard as though it had more devices, you can navigate to: http://localhost:PORT?debug=true
* You can set the kiosk URL of a Device, or create a web app on the Cisco device with this url.
* This is intended to run on a Cisco Device with web engine capabilities.
* Opening this url in a browser of a laptop or personal machine will attempt to open a SIP application installed on the device, and so it will not work if there is no SIP soft client installed.


## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?cc=<your_cec>@cisco.com&subject=RepoName).
