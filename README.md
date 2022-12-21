# Meraki-Dashboard 
<a href="https://github.com/WXSD-Sales/meraki-dashboard/issues"><strong>Report Bug</strong></a>
·
<a href="https://github.com/WXSD-Sales/meraki-dashboard/issues"><strong>Request Feature</strong></a>

This is a Web App which compiles Meraki network cameras via RTSP onto a dashboard/webpage.  Camera names are associated to Rooms Devices on a CH tenant via a "tag" on the room device in CH.

## Overview

Server Requirements:
1. node version >= 14.5.0


## Setup

### Server Side Setup
1. Clone this repository
2. Rename ```sample.env``` to ```.env```, and edit the values in .env
* You will need a Bot token (developer.webex.com) and a Meraki API key (dashboard.meraki.com)
3. Navigate to the cloned directory in your terminal, then run:
```
```
4. Run the following in the terminal:
```
python server.py --debug
```
4. Navigate to http://localhost:PORT in your browser, where PORT is set in the file .env


## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?cc=<your_cec>@cisco.com&subject=RepoName).
