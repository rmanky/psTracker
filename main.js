// Create the websocket


// IDK WHY ITS REPEATING TWICE ONLY FOR SUBSCRIPTIONS THINGS

const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/*

const webSocketUrl = 'wss://push.planetside2.com/streaming?environment=ps2&service-id=s:rmankaryousID';
const socket = new WebSocket(webSocketUrl);

const killSound = new Audio("http://cdn.frustra.org/sounds/sound/vo/glados/epiloguekillyou02.mp3");

const characterName = 'rmanky12';
const nameLookupURL = 'https://census.daybreakgames.com/s:rmankaryousID/get/ps2/character?name.first_lower=' + characterName;

const experienceLookupURL = 'https://census.daybreakgames.com/s:rmankaryousID/get/ps2/experience?c:limit=1430';

fetch(nameLookupURL)
    .then(data => { return data.json() })
    .then(res => { openWebSocket(res.character_list[0]) })

function openWebSocket(character) {
    const characterID = character.character_id;

    const command = {
        "service": "event",
        "action": "subscribe",
        "characters": [characterID],
        "eventNames": ["Death"]
    };

    console.log(characterID)

    const stringCommand = JSON.stringify(command);

    socket.addEventListener('open', function(event) {
        socket.send(stringCommand);
    });

    socket.addEventListener('message', function(event) {
        eventHandler(event);
    });
}

function eventHandler(event) {
    const parsedData = JSON.parse(event.data);
    console.log(parsedData);
    try {
        const experienceID = parsedData.payload.experience_id;

        fetch(experienceLookupURL)
            .then(data => { return data.json() })
            .then(res => { voiceLine(res, experienceID)})

    } catch (error) {
        // Error handling lol
    }
}

function voiceLine(list, experienceID) {
    console.log(list.experience_list[experienceID - 1]);
}
*/
