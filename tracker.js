// Create the websocket


// IDK WHY ITS REPEATING TWICE ONLY FOR SUBSCRIPTIONS THINGS


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
        "eventNames": ["GainExperience"]
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
    try {
        const experienceID = parsedData.payload.experience_id;

        fetch(experienceLookupURL)
            .then(data => { return data.json() })
            .then(res => { textToSpeach(res, experienceID)})

    } catch (error) {
        // Error handling lol
        console.log(parsedData);
    }
}

function textToSpeach(list, experienceID) {
    console.log(list.experience_list[experienceID - 1]);
}
