const welcome = document.getElementById("welcome");
const letterPage = document.getElementById("letterPage");
const datePage = document.getElementById("datePage");
const finalPage = document.getElementById("finalPage");

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

const letterText = `Pour Baby ❤️

Depuis quelque temps...

Je me suis rendu compte que les meilleurs moments sont ceux passés avec toi.

Alors j'aimerais te poser une petite question...

Accepterais-tu un petit date avec moi ? 🥹❤️`;

let charIndex = 0;

function typeWriter(){

    if(charIndex < letterText.length){

        if(letterText.charAt(charIndex) === "\n"){
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
