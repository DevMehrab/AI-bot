var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';


let speak = document.querySelector(".speak")
let myVoice = document.querySelector(".reply")
let result = document.querySelector(".text")
let say = document.querySelector(".say")
let startAgain = document.querySelector("p")
let dot = document.querySelector(".dot")

say.addEventListener("click", () => {
    recognition.start()
    dot.style.display = "block";
    recognition.onresult = function (event) {
        var mySpeech = event.results[event.resultIndex][0].transcript

        let bot = new XMLHttpRequest()
        bot.open("GET", `https://api.monkedev.com/fun/chat?msg=${mySpeech}`)
        bot.onload = () => {
            let reply = JSON.parse(bot.responseText).response
            speaking(reply)
            dot.style.display = "none";
            startAgain.innerHTML = "Start Again"
            myVoice.innerHTML = reply
        }
        bot.send()

    }


    function speaking(messege) {
        let synth = new SpeechSynthesisUtterance()
        synth.text = messege
        synth.volume = 1;
        synth.pitch = 1;
        synth.rate = 1;
        window.speechSynthesis.speak(synth)
    }
    
})
