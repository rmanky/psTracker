// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var lastTimeStamp = 0;

var characterID = 0;

var soundsLoaded = false;

var volumeRange = document.getElementById("volumeRange");

const nameLookupURL = 'https://census.daybreakgames.com/s:rmankaryousID/get/ps2/character?name.first_lower=';

const webSocketUrl = 'wss://push.planetside2.com/streaming?environment=ps2&service-id=s:rmankaryousID';

const experienceLookupURL = 'https://census.daybreakgames.com/s:rmankaryousID/get/ps2/experience?c:limit=1430';

function submitName(characterName) {
  fetch(nameLookupURL + characterName)
    .then(data => {
      return data.json()
    })
    .then(res => {
      openWebSocket(res.character_list[0])
    });
}

function openWebSocket(character) {
  characterID = character.character_id;

  console.log("Found character ID #", characterID);

  const command = {
    "service": "event",
    "action": "subscribe",
    "characters": [characterID],
    "eventNames": ["Death"]
  };

  const stringCommand = JSON.stringify(command);

  const socket = new WebSocket(webSocketUrl);

  socket.addEventListener('open', function(event) {
    socket.send(stringCommand);
  });

  socket.addEventListener('message', function(event) {
    eventHandler(event);
  });
}

function eventHandler(event) {
  const parsedData = JSON.parse(event.data);
  try {
    const timestamp = parsedData.payload.timestamp;
    if (timestamp != lastTimeStamp) {
      lastTimeStamp = timestamp;
      const attacker = parsedData.payload.attacker_character_id;
      const killed = parsedData.payload.character_id;

      voiceLine(attacker, killed)
    }
  } catch (error) {
    if (parsedData.connected) {
      console.log("Connection successful");
      playSound("welcome");
    }
    if (parsedData.type && parsedData.type == "heartbeat") {
      console.log("Heartbeat!");
    }
  }
}

function voiceLine(attackerID, killedID) {
  if (killedID == characterID) {
    playSound("death");
  } else if (attackerID == characterID) {
    playSound("singlekill");
  }
}

function playSound(type) {
  const random = Math.floor(Math.random() * soundJson[type].length);
  console.log(type + " sound playing #" + random);
  const randomSound = soundJson[type][random].path;
  var sound = new Audio(randomSound);
  const play = sound.play();
  sound.volume = volumeRange.value / 100.0;
}
