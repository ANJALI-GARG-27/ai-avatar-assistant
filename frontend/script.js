console.log("Assistant script loaded")
const askBtn = document.getElementById("ask-btn")
const micBtn = document.getElementById("mic-btn")
const input = document.getElementById("question")
const responseDiv = document.getElementById("response")

// ASK BUTTON
askBtn.onclick = async () => {

const question = input.value

avatarState.thinking()

try{

const res = await fetch("http://127.0.0.1:8000/ask",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
query: question
})
})

const data = await res.json()

responseDiv.innerText = data.answer

avatarState.speaking()

speak(data.answer)

}catch(err){

console.log(err)
responseDiv.innerText = "Server error"

}

}


// TEXT TO SPEECH
function speak(text){

const speech = new SpeechSynthesisUtterance(text)

speech.rate = 1
speech.pitch = 1
speech.lang = "en-US"

speech.onend = () => {

avatarState.idle()

}

speechSynthesis.speak(speech)

}


// VOICE INPUT
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()

recognition.lang = "en-US"

micBtn.onclick = () => {

avatarState.listening()
recognition.start()

}

recognition.onresult = function(event){

const transcript = event.results[0][0].transcript

input.value = transcript

askBtn.click()

}