# Chat Server API:

## Rooms:

The chat server supports multiple "rooms". To create a room, send a PUT request to
```
/api/rooms/{roomname}
```

To get the state of a current room, make a GET request to the same URL. It will respond with:
```json
{
  "room": "sample",
  "users": {
    "adb38788-cdff-42ec-a7db-873d031cd728": {
      "connected": true
    },
    "84e8d8fd-1758-4706-8aff-678cfcd50faa": {
      "connected": false
    }
  },
  "createdAt": 1485373073484,
  "messages": [
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373085848,
      "message": "fdg"
    },
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373086007,
      "message": "j"
    },
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373086196,
      "message": "dfgj"
    },
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373086375,
      "message": "d"
    },
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373086635,
      "message": "gfhjdfgh"
    },
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373086826,
      "message": "jd"
    },
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373087094,
      "message": "ghfj"
    },
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373087318,
      "message": "dfg"
    },
    {
      "from": "adb38788-cdff-42ec-a7db-873d031cd728",
      "when": 1485373087938,
      "message": "jd"
    },
    {
      "from": "84e8d8fd-1758-4706-8aff-678cfcd50faa",
      "when": 1485373091731,
      "message": "dfgsdfgdsf"
    }
  ]
}
```

createdAt and when are both UNIX epoch based dates (result of Date.now()), and users are identified by a GUID

### Socket Connection
Messages are pushed via socket.io. Use the [npm package](https://www.npmjs.com/package/socket.io-client), or include [the script](https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.min.js) to connect.

To establish a connection to a room:

```javascript
const socket = io.connect("http://localhost:3000").io.socket("/rooms/sample");
```

to subscribe to an event:

```javascript
socket.on("eventname", data => console.log(data));
```

to send an event:

```javascript
socket.emit("eventname", { someData });
```

## Users and Sessions
Each time a browser connects to the API, a new session is created, which is identified by a GUID. 
If you open and close the browser, a new session will be created. There is no in-built way to identify two sessions as
being the same "user".

## Persistence
Nothing is persisted. After restarting the server, all history and rooms will be lost.

## Socket Events
The server uses the following events:

* "new": sent by the sever when a new message has been sent. Data is formatted the same as the messages in the API.
* "send": sent by the browser to send a new message. Data is just the string to be sent.
* "user_joined": sent by the server when a user joins. Data is { userId: string }.
* "user_disconnected": same format as "user_joined"

## Running the server
The server can be run locally by downloading this folder and running the following commands:
```
npm install
npm start app.js
``` 

It is also configured to be run by hitting f5 after running npm install