const body = document.querySelector("body");

const IMG_NUMBER = 6;

function handleImgLoad() {
    conso
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `img/${imgNumber+1}.jpg`;
    image.classList.add('bgImage');
    body.appendChild(image);
}


function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const ranNum = genRandom();
    paintImage(ranNum);
}

init();