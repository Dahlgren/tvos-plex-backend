# tvOS Plex Backend
Node.js backend for tvOS Plex App

## Requirements

* Node.js for this application
* Plex Server
* myPlex Account, does not need to be a paid subscription

## How to use it

1. Download source from Github via git or download button on the right,
https://github.com/Dahlgren/tvos-plex-app/archive/master.zip

2. Install dependencies with `npm install`

3. Create `.env` file with required information

````
HOSTNAME=ip or dns to your Plex Server
PORT=port that your Plex Server uses
USERNAME=your myPlex username
PASSWORD=your myPlex password
````

4. Start the application with `npm start`, application uses port 3000

5. Connect with the tvOS client from https://github.com/Dahlgren/tvos-plex-app
