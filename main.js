 
//储存每个圆圈对象    
function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isSelected = false;    
}     

// 保存画布上所有的圆圈    
var circles = [];
var distance = [];
var select = [];
var lastSelect = [];
var highlight;
var lastHighlight;
var target;
var lastTarget;

var canvas;
var context;
var el;
const number = 300;
const judge_dis = 40;
const swipeInterval = 30;


// MAIN
window.onload = function() {

    $("#myCanvas").attr("width", $(window).width())
    $("#myCanvas").attr("height", $(window).height())

    canvas = document.getElementById("myCanvas");
    // el = document.getElementById('swipezone');
    context = canvas.getContext("2d");
    // listener = document.addEventListener('click',updatehandler,false); 
    // canvas.onmousedown = canvasClick;

    for (var i = 0; i < number; i++) {
        addCircles();
    }

    drawCircles();    
    TargetBall();
    console.log(circles);
    swipedetect(canvas, function(swipedir) {
        // swipedir contains either "none", "left", "right", "top", or "down"
        // el.innerHTML = 'Swiped <span style="color:yellow">' + swipedir + '</span>';
    });

};


function addCircles() {
    // 为圆圈计算一个随机大小和位置
    var radius = 5;
    var x = randomFromTo(2, canvas.width);
    var y = randomFromTo(2, canvas.height); 
    var color = "#CAFF70";
    var circle = new Circle(x, y, radius, color);  
    circles.push(circle); 
}      
function drawCircles() {
    // 清除画布，准备绘制
    context.clearRect(0, 0, canvas.width, canvas.height); 
    // 遍历所有圆圈
    for (var i = 0; i < circles.length; i++) {  
        var circle = circles[i];   
        // 绘制圆圈  
        context.globalAlpha = 0.85;  
        context.beginPath();  
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);  
        context.fillStyle = circle.color;  
        context.strokeStyle = "black";   
        if (circle.isSelected) {     context.lineWidth = 5;   }  
        else {     context.lineWidth = 1;   }  
        context.fill();  
        context.stroke();
    }    
} 

// -------------------------------------

function TargetBall() {
    // Select a target ball
    var randomNum;
    randomNum = randomFromTo(0, number);
    target = circles[randomNum];
    target.color = "#0000ff";
    target.isSelected = true;
    MarkTargetBall();
}

function MarkTargetBall() {
    var circle = target;
    context.globalAlpha = 0.85;  
    context.beginPath();  
    context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);  
    context.fillStyle = circle.color;  
    context.fill();  
    context.stroke();
}

// -------------------------------------

function MarkSelected() {
    for (var i = 0; i < lastSelect.length; i++) {
        var circle = lastSelect[i];
        context.globalAlpha = 0.85;  
        context.beginPath();  
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);  
        context.fillStyle = circle.color;  
        context.fill();  
        context.stroke();
    }
    for (var i = 0; i < select.length; i++) {
        var circle = select[i];
        context.globalAlpha = 0.85;  
        context.beginPath();  
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);  
        context.fillStyle = circle.color;  
        context.fill();  
        context.stroke();
    }
}    

     
function canvasClick(clickX, clickY) {
    // 取得画布上被单击的点
    // var clickX = e.pageX - canvas.offsetLeft;
    // var clickY = e.pageY - canvas.offsetTop;  // 查找被单击的圆圈

    for (var i = circles.length - 1; i >= 0; i--) {  
        var circle = circles[i];  
        //使用勾股定理计算这个点与圆心之间的距离
        // var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2)) 
        //使用勾股定理计算这个点与其他圆之间的距离
        var dis = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2))
            //将在选中区域的点点亮，同时将上次选中的区域重新绘制
        if (dis < judge_dis) {
            circle.color = "#d8d8d8";
            circle.isSelected = true;
            select.push(circle);
            MarkSelected();
        }
    }  
    console.log([clickX, clickY]);
    console.log(select);

    // clear
    // for (var i = 0; i < select.length; i++) {
    //     select[i].color = "#CAFF70";
    // }
}


function MarkHighlighted(list) {
    console.info('LIST:');
    console.log(list);
    // TODO
    for (var i = 0; i < list.length; i++) {
        var circle = list[i];
        context.globalAlpha = 0.85;  
        context.beginPath();  
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);  
        context.fillStyle = circle.color;  
        context.fill();  
        context.stroke();
    }
}    

function canvasSwipe(clickX, clickY) {

    //计算斜边长
    var dis = Math.sqrt(Math.pow(clickX, 2) + Math.pow(clickY, 2))
    var n = parseInt((dis / swipeInterval) % select.length)
    if (n >= select.length) {
        n = select.length - 1
    }
    console.log('n = ' + n)

    var highlight = select[n];
    console.log(highlight)


    if (lastHighlight == null) {
        lastHighlight = highlight
    }

    target.color = "#0000ff";
    //将在选中区域的点点亮
    highlight.color = "#ff0000";
    highlight.isSelected = true;

    if (target == highlight) {
        highlight.color = "#ffff00";
        console.log('HIT');
        console.log(highlight.color);
    }
    // select.push(circle);

    // Recolor target ball
    MarkHighlighted([target, lastHighlight, highlight]);
    // console.log([clickX, clickY]);
    highlight.color = "#d8d8d8"
    highlight.isSelected = false;
    // select.push(highlight)

    lastHighlight = highlight
    console.log('Last high light: ')
    console.log(lastHighlight)
}

drawCircles();    
console.log(circles);

//在某个范围内生成随机数    
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

// ---------------------------

// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir) {}

    touchsurface.addEventListener('touchstart', function(e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY

        select = [];
        canvasClick(startX, startY)

        console.log([startX, startY])
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        console.log('x: ' + distX + ' y: ' + distY)
        canvasSwipe(distX, distY)

        // lastHighlight = highlight;
        console.log('lastHightlight=');
        console.log(lastHighlight);

        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
            // console.log('x: ' + distX + ' y: ' + distY)
            // elapsedTime = new Date().getTime() - startTime // get time elapsed
            // if (elapsedTime <= allowedTime) { // first condition for awipe met
            //     if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
            //         swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            //     } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
            //         swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            //     }
            // }
            // handleswipe(swipedir)


        lastSelect = select;
        for (var i = 0; i < lastSelect.length; i++) {
            lastSelect[i].color = "#CAFF70";
        }
        lastTarget = target;
        lastTarget.color = "#CAFF70";

        e.preventDefault()
    }, false)
}