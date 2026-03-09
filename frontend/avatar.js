const avatar = document.getElementById("avatar")

// floating idle animation
function startIdle(){

avatar.style.animation = "float 3s ease-in-out infinite"

}

startIdle()


// thinking animation
function thinking(){

avatar.style.animation = "pulse 1s infinite"

}


// speaking animation
function speaking(){

avatar.style.animation = "talk 0.4s infinite"

}


// return to idle
function idle(){

avatar.style.animation = "float 3s ease-in-out infinite"

}


// microphone listening animation
function listening(){

avatar.style.animation = "glow 1s infinite"

}


// expose functions globally so script.js can call them
window.avatarState = {
thinking,
speaking,
idle,
listening
}