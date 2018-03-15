 
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
var canvas;    
var context;
const number = 1000;
const judge_dis = 50;

window.onload = function() {      
    canvas = document.getElementById("myCanvas"); 
     
    context = canvas.getContext("2d");
    // listener = document.addEventListener('click',updatehandler,false);       
    canvas.onmousedown = canvasClick;

    for (var i = 0; i < number; i++) {
        addCircles();
    }
    drawCircles();    
    console.log(circles);
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
        if (circle.isSelected) {           context.lineWidth = 5;         }        
        else {           context.lineWidth = 1;         }        
        context.fill();        
        context.stroke();      
    }    
} 

function MarkSelected(){  
    for(var i = 0;i < select.length;i++){
        var circle = select[i];
        context.globalAlpha = 0.85;        
        context.beginPath();        
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);        
        context.fillStyle = circle.color;        
        context.fill();        
        context.stroke();      
    }
}    

     
function canvasClick(e) {       
    // 取得画布上被单击的点      
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;        // 查找被单击的圆圈
    for (var i = circles.length - 1; i >= 0; i--) {        
        var circle = circles[i];         
        //使用勾股定理计算这个点与圆心之间的距离
        // var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2)) 
        //使用勾股定理计算这个点与其他圆之间的距离
        var dis = Math.sqrt(Math.pow(circle.x - clickX,2) + Math.pow(circle.y - clickY,2)) 
        //将在选中区域的点点亮
        if(dis < judge_dis){
           circle.color = "#ff0000";
           circle.isSelected = true;
           select.push(circle);
           MarkSelected();
        }      
    }  
    console.log([clickX,clickY]);
    console.log(select);
    for(var i = 0;i < select.length;i++){
        select[i].color = "#CAFF70";
    }
}      
//在某个范围内生成随机数    
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}