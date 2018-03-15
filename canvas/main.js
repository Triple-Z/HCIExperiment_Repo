function mousePos(e)    
    {//获取鼠标所在位置的坐标，相对于整个页面    
      var x,y;     
      var e = e||window.event;     
      return {     
        x:e.clientX+document.body.scrollLeft + document.documentElement.scrollLeft,     
        y:e.clientY+document.body.scrollTop + document.documentElement.scrollTop     
      };     
    }    
      
    function getStyles(obj){//兼容FF，IE10; IE9及以下未测试  
        return document.defaultView.getComputedStyle(obj);  
    }   
    function getCanvasPos(canvas,e)    
    {//获取鼠标在canvas上的坐标    
        var rect = canvas.getBoundingClientRect();   
        var leftB = parseInt(getStyles(canvas).borderLeftWidth);//获取的是样式，需要转换为数值  
        var topB = parseInt(getStyles(canvas).borderTopWidth);  
        return {     
         x: (e.clientX - rect.left) - leftB,    
         y: (e.clientY - rect.top) - topB   
       };    
    }    
    function draw(e)    
    {    
        var c=document.getElementById("myCanvas");    
        var cxt=c.getContext("2d");    
        cxt.clearRect(0,0,c.width,c.height);    
        cxt.fillStyle="#FF0000";    
        cxt.beginPath();    
        //cxt.arc(mousePos(e).x,mousePos(e).y,15,0,Math.PI*2,true);    
        cxt.arc(getCanvasPos(c,e).x,getCanvasPos(c,e).y,15,0,Math.PI*2,true);    
        cxt.closePath();    
        cxt.fill();    
    }  