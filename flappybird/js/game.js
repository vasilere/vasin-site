var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//код добавления изображений в игру
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

//добавляем звук
var fly = new Audio();
var score_audio = new Audio();

//источник звука
fly.src = "audio/fly.mp3"
score_audio.src = "audio/score.mp3"


//чтобы птичка могла успешно пролететь в пикселях
var gap = 90;

//Прн нажатии на какую либо кнопку!!!!!!!!!!!!!!!!
// птичка будет подлетать вверх но двигается 
//вниз постоянно из-за гравитации

document.addEventListener("keydown", moveUp)

function moveUp() {
yPos -= 25;
fly.play();

}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
//позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

//рисуем задний фон
function draw() {
 ctx.drawImage(bg, 0, 0);

// рисование блоков будет проходить в цикле
for(var i=0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

//чтобы блоки передвигались
 pipe[i].x--;

//если позиция по икс = 125
// то есть если блок-труба находится в определённой части 
//экрана, то создаётся новый блок 
 if(pipe[i].x == 125) {
  pipe.push({
    x : cvs.width,
//надо чтобы проходы генерировались в случайном месте
//используем класс Math и метод floor а также random
//отвечающий за случайность
// умножаем на случайно генерируемый матпараметр Math на
//параметр высоты  блока трубы PipeUp и вычитаем
// из него высоту блока трубы PipeUp
    y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
});
}
//Далее мы задаём
//сложные условия для столкновения птички и блока 
//здесь проверяем если птичка находится в пределах ширины блока
//это либо начало блока, либо его конец или середина 
//и если птичка находится в пределах высоты этого блока, то есть она 
//дотронулась до него, то есть y позиция птички и блока совпадают, то 
// тогда действительно птичка столкнулась с блоком, а это значит 
// что мы (браузер) можем перезапустить страничку и начать игру заново
// теперь как только птичка натыкается на препятствие игра перезагружается
//тем не менее после выполнения данных условий птичка всё равно
//падает сквозь землю, чтобы этого не было надо написать условие
//по которому   при столкновении птички с землей игра перезапускалась

if(xPos + bird.width >= pipe[i].x 
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
    || yPos + bird.height >= pipe[i].y + pipe.height + gap)
    || yPos + bird.height >= cvs.height - fg.height) {
       location.reload(); //перезагрузка страницы
}
//добавляем очки
//за успешное прохождение препятствий
//надо добавить эту надпись на экране
if(pipe[i].x == 5) {
  score++;
  score_audio.play();

}


}

//земля из высоты канваса отнимаем высоту нашего переднего фона
 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);
//четвёрты и пятый параметр drawImage--ширина и высота картинки 
//но у нас уже готовые картинки

//гравитация
yPos += grav;

//добавим чтобы надпись очков отображалась на экране
ctx.fillStyle == "#000";
ctx.font = "24px Verdana";
ctx.fillText("Score: " + score, 10, cvs.height - 20);

////

requestAnimationFrame(draw);


}

pipeBottom.onload = draw;


