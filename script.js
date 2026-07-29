const welcome = document.getElementById("welcome");
const letterPage = document.getElementById("letterPage");
const datePage = document.getElementById("datePage");
const finalPage = document.getElementById("finalPage");

const envelope = document.getElementById("envelope");
const openLetter = document.getElementById("openLetter");

const typing = document.getElementById("typing");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const send = document.getElementById("send");

const dateSelect = document.getElementById("date");
const timeSelect = document.getElementById("time");
const messageInput = document.getElementById("message");

const finalTitle = document.querySelector("#finalPage h1");
const finalText = document.querySelector("#finalPage p");
const countdownEl = document.getElementById("countdown");

// =============================
// TEXTE DE LA LETTRE
// =============================

const letterText = `Pour Baby ❤️

Depuis quelque temps...

Je me suis rendu compte que les meilleurs moments sont ceux passés avec toi.

Tu me fais sourire sans t'en rendre compte.

Alors j'aimerais te poser une petite question...

Accepterais-tu un petit date avec moi ? 🥹❤️`;

let charIndex = 0;

// =============================
// MACHINE À ÉCRIRE
// =============================

function typeWriter(){

    if(charIndex < letterText.length){

        if(letterText.charAt(charIndex) === "\n"){
            typing.innerHTML += "<br>";
        }else{
            typing.innerHTML += letterText.charAt(charIndex);
        }

        charIndex++;

        setTimeout(typeWriter,35);

    }

}

// =============================
// OUVERTURE DE L'ENVELOPPE PUIS DE LA LETTRE
// =============================

function openLetterSequence(){

    if (envelope.classList.contains("open")) return;

    // 1. l'enveloppe s'ouvre, le cachet se casse
    envelope.classList.add("open");

    // 2. une fois l'animation terminée, on bascule vers la lettre
    setTimeout(() => {

        welcome.style.opacity = "0";

        setTimeout(() => {

            welcome.style.display = "none";

            letterPage.style.display = "flex";

            typing.innerHTML = "";

            charIndex = 0;

            typeWriter();

        }, 500);

    }, 700);

}

openLetter.addEventListener("click", openLetterSequence);
envelope.addEventListener("click", openLetterSequence);

// =============================
// BOUTON NON 😂
// =============================

const noMessages = [
    "Non 😔",
    "Vraiment ? 🥺",
    "Tu es sûre ? 😢",
    "Réfléchis encore...",
    "S'il te plaît 🥹",
    "Ça me rend triste 💔",
    "Ça ne sert à rien de dire non 😏",
    "Je sais que tu vas dire oui ❤️",
    "Allez Baby 🥹",
    "Bon... j'abandonne 😂"
];

let noClick = 0;
let yesScale = 1;
let noScale = 1;

noBtn.addEventListener("click", () => {

    if(noClick < noMessages.length){
        noBtn.innerHTML = noMessages[noClick];
    }

    noClick++;

    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;

    noScale -= 0.08;
    noBtn.style.transform = `scale(${Math.max(noScale,0.25)})`;

    if(noClick >= 5){
        moveNoButton();
    }

});

// Le bouton fuit la souris une fois qu'on a assez insisté
function moveNoButton(){

    const x = Math.random() * (window.innerWidth - 180);
    const y = Math.random() * (window.innerHeight - 80);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.zIndex = "9999";

}

noBtn.addEventListener("mouseenter", () => {

    if(noClick >= 5){
        moveNoButton();
    }

});

// =============================
// BOUTON OUI ❤️ (+ animation spéciale)
// =============================

yesBtn.addEventListener("click", (e) => {

    // explosion de cœurs qui part du bouton cliqué
    burstFromPoint(e.clientX, e.clientY);

    // flash rose doux à l'écran
    flashScreen();

    // pluie de pétales en fond
    createHearts();

    setTimeout(() => {

        letterPage.style.display = "none";

        datePage.style.display = "flex";
        datePage.style.opacity = "0";

        setTimeout(() => {
            datePage.style.opacity = "1";
        }, 50);

    }, 800);

});

function burstFromPoint(x, y){

    const container = document.getElementById("hearts");

    for(let i = 0; i < 18; i++){

        const heart = document.createElement("div");
        heart.className = "burst-heart";
        heart.innerHTML = "❤️";

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 120;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        heart.style.left = x + "px";
        heart.style.top = y + "px";
        heart.style.setProperty("--dx", dx + "px");
        heart.style.setProperty("--dy", dy + "px");
        heart.style.fontSize = (16 + Math.random() * 14) + "px";

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 900);

    }

}

function flashScreen(){

    const flash = document.createElement("div");
    flash.className = "flash-overlay";
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 700);

}

// =============================
// VALIDATION DU RENDEZ-VOUS
// =============================

send.addEventListener("click", () => {

    if (dateSelect.value === "") {
        alert("🥹 Choisis une date ❤️");
        return;
    }

    if (timeSelect.value === "") {
        alert("🥹 Choisis une heure ❤️");
        return;
    }

    const date = dateSelect.value;
    const heure = timeSelect.value;
    const message = messageInput.value.trim();

    finalTitle.innerHTML = "🎉 C'EST UN OUIIIII ❤️";

    if(message !== ""){

        finalText.innerHTML = `
        ❤️ Notre petit date est prévu le <b>${date}</b> à <b>${heure}</b>.<br><br>

        💌 Ton petit message :<br>
        <i>"${message}"</i><br><br>

        J'ai tellement hâte de te voir Baby 🥹❤️
        `;

    }else{

        finalText.innerHTML = `
        ❤️ Notre petit date est prévu le <b>${date}</b> à <b>${heure}</b>.<br><br>

        J'ai tellement hâte de te voir Baby 🥹❤️
        `;

    }

    // Envoi de l'email (nécessite que le SDK EmailJS soit chargé dans le HTML)
    if (typeof emailjs !== "undefined") {

        emailjs.send("service_aaleks7", "template_7pqx80i", {
            date: date,
            time: heure,
            message: message === "" ? "Aucun message ❤️" : message,
            to_name: "Leandra"
        })
        .then(function () {
            console.log("Email envoyé ❤️");
        })
        .catch(function (error) {
            console.error("Erreur :", error);
        });

    } else {
        console.warn("EmailJS n'est pas chargé : l'email n'a pas été envoyé.");
    }

    datePage.style.display = "none";
    finalPage.style.display = "flex";

    createHearts();
    setTimeout(createHearts, 500);
    setTimeout(createHearts, 1200);

    // démarre le compteur "j'ai déjà hâte"
    startCountdown(date, heure);

});

// =============================
// COMPTEUR "J'AI DÉJÀ HÂTE ❤️"
// =============================

const moisFr = {
    "janvier": 0, "février": 1, "mars": 2, "avril": 3,
    "mai": 4, "juin": 5, "juillet": 6, "août": 7,
    "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11
};

let countdownInterval = null;

function startCountdown(dateStr, timeStr){

    // "2 août" -> jour=2, mois="août"
    const [jourStr, moisNom] = dateStr.trim().split(" ");
    const jour = parseInt(jourStr, 10);
    const mois = moisFr[moisNom.toLowerCase()];

    // "15h00" -> heures=15, minutes=00
    const [heuresStr, minutesStr] = timeStr.split("h");
    const heures = parseInt(heuresStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const now = new Date();
    let annee = now.getFullYear();

    let cible = new Date(annee, mois, jour, heures, minutes, 0);

    // si la date semble déjà passée cette année, on vise l'année suivante
    if (cible.getTime() < now.getTime()) {
        cible = new Date(annee + 1, mois, jour, heures, minutes, 0);
    }

    if (countdownInterval) clearInterval(countdownInterval);

    function tick(){

        const diff = cible.getTime() - Date.now();

        if (diff <= 0) {
            countdownEl.innerHTML = "🥹❤️ C'est le moment, à tout de suite !";
            clearInterval(countdownInterval);
            return;
        }

        const jours = Math.floor(diff / 86400000);
        const heuresRestantes = Math.floor((diff % 86400000) / 3600000);
        const minutesRestantes = Math.floor((diff % 3600000) / 60000);
        const secondesRestantes = Math.floor((diff % 60000) / 1000);

        let texte = "😍 Plus que ";

        if (jours > 0) texte += `${jours}j `;
        texte += `${String(heuresRestantes).padStart(2,"0")}h `;
        texte += `${String(minutesRestantes).padStart(2,"0")}min `;
        texte += `${String(secondesRestantes).padStart(2,"0")}s`;
        texte += " avant notre date ❤️";

        countdownEl.innerHTML = texte;

    }

    tick();
    countdownInterval = setInterval(tick, 1000);

}

// =============================
// PÉTALES / CŒURS
// =============================

function createHearts(){

    const container = document.getElementById("hearts");
    const emojis = ["🌸", "🌺"];

    for(let i = 0; i < 60; i++){

        const heart = document.createElement("div");

        heart.className = "heart";
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-50px";
        heart.style.fontSize = (18 + Math.random() * 24) + "px";
        heart.style.animationDuration = (3 + Math.random() * 3) + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 7000);

    }

}

// Petits pétales qui tombent en permanence
setInterval(() => {

    const container = document.getElementById("hearts");
    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "🌸";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = (14 + Math.random() * 16) + "px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000);

}, 700); 
let charIndex = 0;
 
// =============================
// MACHINE À ÉCRIRE
// =============================
 
function typeWriter(){
 
    if(charIndex < letterText.length){
 
        if(letterText.charAt(charIndex) === "\n"){
            typing.innerHTML += "<br>";
        }else{
            typing.innerHTML += letterText.charAt(charIndex);
        }
 
        charIndex++;
 
        setTimeout(typeWriter,35);
 
    }
 
}
 
// =============================
// OUVERTURE DE LA LETTRE
// =============================
 
openLetter.addEventListener("click",()=>{
 
    welcome.style.opacity="0";
 
    setTimeout(()=>{
 
        welcome.style.display="none";
 
        letterPage.style.display="flex";
 
        typing.innerHTML="";
 
        charIndex=0;
 
        typeWriter();
 
    },500);
 
});
 
// =============================
// BOUTON NON 😂
// =============================
 
const noMessages = [
    "Non 😔",
    "Vraiment ? 🥺",
    "Tu es sûre ? 😢",
    "Réfléchis encore...",
    "S'il te plaît 🥹",
    "Ça me rend triste 💔",
    "Ça ne sert à rien de dire non 😏",
    "Je sais que tu vas dire oui ❤️",
    "Allez Baby 🥹",
    "Bon... j'abandonne 😂"
];
 
let noClick = 0;
let yesScale = 1;
let noScale = 1;
 
noBtn.addEventListener("click", () => {
 
    if(noClick < noMessages.length){
        noBtn.innerHTML = noMessages[noClick];
    }
 
    noClick++;
 
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;
 
    noScale -= 0.08;
    noBtn.style.transform = `scale(${Math.max(noScale,0.25)})`;
 
    if(noClick >= 5){
        moveNoButton();
    }
 
});
 
// Le bouton fuit la souris une fois qu'on a assez insisté
function moveNoButton(){
 
    const x = Math.random() * (window.innerWidth - 180);
    const y = Math.random() * (window.innerHeight - 80);
 
    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.zIndex = "9999";
 
}
 
noBtn.addEventListener("mouseenter", () => {
 
    if(noClick >= 5){
        moveNoButton();
    }
 
});
 
// =============================
// BOUTON OUI ❤️
// =============================
 
yesBtn.addEventListener("click", () => {
 
    createHearts();
 
    setTimeout(() => {
 
        letterPage.style.display = "none";
 
        datePage.style.display = "flex";
        datePage.style.opacity = "0";
 
        setTimeout(() => {
            datePage.style.opacity = "1";
        }, 50);
 
    }, 800);
 
});
 
// =============================
// VALIDATION DU RENDEZ-VOUS
// =============================
 
send.addEventListener("click", () => {
 
    if (dateSelect.value === "") {
        alert("🥹 Choisis une date ❤️");
        return;
    }
 
    if (timeSelect.value === "") {
        alert("🥹 Choisis une heure ❤️");
        return;
    }
 
    const date = dateSelect.value;
    const heure = timeSelect.value;
    const message = messageInput.value.trim();
 
    finalTitle.innerHTML = "🎉 C'EST UN OUIIIII ❤️";
 
    if(message !== ""){
 
        finalText.innerHTML = `
        ❤️ Notre petit date est prévu le <b>${date}</b> à <b>${heure}</b>.<br><br>
 
        💌 Ton petit message :<br>
        <i>"${message}"</i><br><br>
 
        J'ai tellement hâte de te voir Baby 🥹❤️
        `;
 
    }else{
 
        finalText.innerHTML = `
        ❤️ Notre petit date est prévu le <b>${date}</b> à <b>${heure}</b>.<br><br>
 
        J'ai tellement hâte de te voir Baby 🥹❤️
        `;
 
    }
 
    // Envoi de l'email (nécessite que le SDK EmailJS soit chargé dans le HTML, voir remarque)
    if (typeof emailjs !== "undefined") {
 
        emailjs.send("service_aaleks7", "template_7pqx80i", {
            date: date,
            time: heure,
            message: message === "" ? "Aucun message ❤️" : message,
            to_name: "Leandra"
        })
        .then(function () {
            console.log("Email envoyé ❤️");
        })
        .catch(function (error) {
            console.error("Erreur :", error);
        });
 
    } else {
        console.warn("EmailJS n'est pas chargé : l'email n'a pas été envoyé.");
    }
 
    datePage.style.display = "none";
    finalPage.style.display = "flex";
 
    createHearts();
    setTimeout(createHearts, 500);
    setTimeout(createHearts, 1200);
 
});
 
// =============================
// CŒURS
// =============================
 
function createHearts(){
 
    const container = document.getElementById("hearts");
 
    for(let i = 0; i < 80; i++){
 
        const heart = document.createElement("div");
 
        heart.className = "heart";
        heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-50px";
        heart.style.fontSize = (18 + Math.random() * 28) + "px";
        heart.style.animationDuration = (3 + Math.random() * 3) + "s";
 
        container.appendChild(heart);
 
        setTimeout(() => {
            heart.remove();
        }, 7000);
 
    }
 
}
 
// Petits cœurs qui tombent en permanence
setInterval(() => {
 
    const container = document.getElementById("hearts");
    const heart = document.createElement("div");
 
    heart.className = "heart";
    heart.innerHTML = "💕";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = (16 + Math.random() * 18) + "px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";
 
    container.appendChild(heart);
 
    setTimeout(() => {
        heart.remove();
    }, 9000);
 
}, 700)
Alors j'aimerais te poser une petite question...

Accepterais-tu un petit date avec moi ? 🥹❤️`;

let charIndex = 0;

// =============================
// MACHINE À ÉCRIRE
// =============================

function typeWriter(){

    if(charIndex < letterText.length){

        if(letterText.charAt(charIndex) === "\n"){
            typing.innerHTML += "<br>";
        }else{
            typing.innerHTML += letterText.charAt(charIndex);
        }

        charIndex++;

        setTimeout(typeWriter,35);

    }

}

// =============================
// OUVERTURE DE LA LETTRE
// =============================

openLetter.addEventListener("click",()=>{

    welcome.style.opacity="0";

    setTimeout(()=>{

        welcome.style.display="none";

        letterPage.style.display="flex";

        typing.innerHTML="";

        charIndex=0;

        typeWriter();

    },500);

});        if(letterText.charAt(charIndex) === "\n"){
            typing.innerHTML += "<br>";
        }else{
            typing.innerHTML += letterText.charAt(charIndex);
        }

        charIndex++;

        setTimeout(typeWriter,40);

    }

}

openLetter.addEventListener("click",()=>{

    welcome.style.display="none";

    letterPage.style.display="flex";

    typing.innerHTML="";

    charIndex=0;

    typeWriter();

});

const messages=[

"Non 😔",
"Vraiment ? 🥺",
"Tu es sûr ? 😢",
"Réfléchis encore...",
"S'il te plaît 🥹",
"Ça me rend triste 💔",
"Ça ne sert à rien de dire non 😭",
"Tu vas finir par dire oui 😏",
"Allez ❤️",
"Bon... tu m'as eu 😂"

];

let click=0;

let yesScale=1;

let noScale=1;

noBtn.addEventListener("click",()=>{

    if(click<messages.length){

        noBtn.innerHTML=messages[click];

    }

    click++;

    yesScale+=0.18;

    noScale-=0.08;

    yesBtn.style.transform=`scale(${yesScale})`;

    noBtn.style.transform=`scale(${Math.max(noScale,0.2)})`;

    if(click>=5){

        moveNoButton();

    }

});

function moveNoButton(){

    const x=Math.random()*(window.innerWidth-200);

    const y=Math.random()*(window.innerHeight-120);

    noBtn.style.position="fixed";
    noBtn.style.left=x+"px";
    noBtn.style.top=y+"px";
    noBtn.style.zIndex="9999";

}

noBtn.addEventListener("mouseover",()=>{

    if(click<5) return;

    moveNoButton();

});

yesBtn.addEventListener("click",()=>{

    createHearts();

    setTimeout(()=>{

        letterPage.style.display="none";

        datePage.style.display="flex";

    },800);

});
send.addEventListener("click", () => {

    if (dateSelect.value === "") {
        alert("🥹 Choisis une date ❤️");
        return;
    }

    if (timeSelect.value === "") {
        alert("🥹 Choisis une heure ❤️");
        return;
    }

    const date = dateSelect.value;
    const heure = timeSelect.value;
    const message = messageInput.value.trim();

    finalTitle.innerHTML = "🎉 C'EST UN OUIIIII ❤️";

    if(message !== ""){

        finalText.innerHTML = `
        ❤️ Notre petit date est prévu le <b>${date}</b> à <b>${heure}</b>.<br><br>

        💌 Ton petit message :<br>
        <i>"${message}"</i><br><br>

        J'ai tellement hâte de te voir Baby 🥹❤️
        `;

    }else{

        finalText.innerHTML = `
        ❤️ Notre petit date est prévu le <b>${date}</b> à <b>${heure}</b>.<br><br>

        J'ai tellement hâte de te voir Baby 🥹❤️
        `;

    }

    emailjs.send("service_aaleks7", "template_7pqx80i", {
    date: date,
    time: heure,
    message: message === "" ? "Aucun message ❤️" : message,
    to_name: "Leandra"
})
        
.then(function () {
    
    console.log("Email envoyé ❤️");
    
})
        
.catch(function (error) {
    
    console.error("Erreur :", error);
});
    
    datePage.style.display="none";

    finalPage.style.display="flex";

    createHearts();

    setTimeout(createHearts,500);

    setTimeout(createHearts,1200);

});

function createHearts(){

    const container=document.getElementById("hearts");

    for(let i=0;i<80;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML=Math.random()>0.5?"❤️":"💖";

        heart.style.left=Math.random()*100+"vw";

        heart.style.top="-50px";

        heart.style.fontSize=(18+Math.random()*28)+"px";

        heart.style.animationDuration=(3+Math.random()*3)+"s";

        container.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },7000);

    }

}

// Petits cœurs qui tombent en permanence

setInterval(()=>{

    const container=document.getElementById("hearts");

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="💕";

    heart.style.left=Math.random()*100+"vw";

    heart.style.top="-20px";

    heart.style.fontSize=(16+Math.random()*18)+"px";

    heart.style.animationDuration=(5+Math.random()*4)+"s";

    container.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },9000);

},700);

// =============================
// BOUTON NON 😂
// =============================

const noMessages = [

"Non 😔",
"Vraiment ? 🥺",
"Tu es sûre ? 😢",
"Réfléchis encore...",
"S'il te plaît 🥹",
"Ça me rend triste 💔",
"Ça ne sert à rien de dire non 😏",
"Je sais que tu vas dire oui ❤️",
"Allez Baby 🥹",
"Bon... j'abandonne 😂"

];

let noClick = 0;
let yesScale = 1;
let noScale = 1;

noBtn.addEventListener("click", () => {

    if(noClick < noMessages.length){

        noBtn.innerHTML = noMessages[noClick];

    }

    noClick++;

    yesScale += 0.15;

    yesBtn.style.transform = `scale(${yesScale})`;

    noScale -= 0.08;

    noBtn.style.transform = `scale(${Math.max(noScale,0.25)})`;

    if(noClick >= 5){

        moveNoButton();

    }

});

// Le bouton fuit

function moveNoButton(){

    const x = Math.random() * (window.innerWidth - 180);

    const y = Math.random() * (window.innerHeight - 80);

    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.zIndex = "9999";

}

noBtn.addEventListener("mouseenter",()=>{

    if(noClick >= 5){

        moveNoButton();

    }

});

// =============================
// BOUTON OUI ❤️
// =============================

yesBtn.addEventListener("click",()=>{

    createHearts();

    setTimeout(()=>{

        letterPage.style.display="none";

        datePage.style.display="flex";

        datePage.style.opacity="0";

        setTimeout(()=>{

            datePage.style.opacity="1";

        },50);

    },800);

});
