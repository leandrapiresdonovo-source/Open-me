const welcome = document.getElementById("welcome");
const letterPage = document.getElementById("letterPage");
const datePage = document.getElementById("datePage");
const finalPage = document.getElementById("finalPage");

const openLetter = document.getElementById("openLetter");
const typing = document.getElementById("typing");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const send = document.getElementById("send");

const text =
`J'ai une petite question...

Depuis quelque temps, j'ai envie de passer un moment rien qu'avec toi.

Accepterais-tu un petit date avec moi ? 🥹❤️`;

let i = 0;

function typeWriter(){

    if(i < text.length){

        typing.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter,45);

    }

}

openLetter.onclick = () => {

    welcome.style.display="none";

    letterPage.style.display="flex";

    typeWriter();

}

const messages = [

"Non 😔",
"Vraiment ? 🥺",
"Tu es sûr ? 😢",
"Réfléchis encore...",
"S'il te plaît 🥹",
"Ça me rend triste 💔",
"Ça ne sert à rien de dire non 😭",
"Tu es vraiment têtu 😂",
"Allez ❤️",
"Tu vas finir par dire oui 😏"

];

let click=0;

let yesScale=1;

let noScale=1;

noBtn.onclick=()=>{

    if(click<messages.length){

        noBtn.innerHTML=messages[click];

    }

    click++;

    yesScale+=0.18;

    noScale-=0.08;

    yesBtn.style.transform=`scale(${yesScale})`;

    noBtn.style.transform=`scale(${Math.max(noScale,.25)})`;

    if(click>=messages.length){

        noBtn.style.opacity=".3";

    }

}

yesBtn.onclick=()=>{

    letterPage.style.display="none";

    datePage.style.display="flex";

    createHearts();

}

send.onclick=()=>{

    datePage.style.display="none";

    finalPage.style.display="flex";

    createHearts();

}

function createHearts(){

    const container=document.getElementById("hearts");

    for(let i=0;i<60;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤️";

        heart.style.left=Math.random()*100+"vw";

        heart.style.animationDuration=(Math.random()*3+3)+"s";

        heart.style.fontSize=(20+Math.random()*25)+"px";

        container.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },6000);

    }

}
