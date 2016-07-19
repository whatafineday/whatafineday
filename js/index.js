

window.onload=function(){

    var oMain=document.getElementById('main');
    oMain.style.height=document.documentElement.clientHeight+'px';

    //点击右侧导航
    var oNavBall=document.getElementById('navball');
    var oContent=document.getElementById('content');
    var aCon=oContent.children;
    var aBall=oNavBall.children;
    var iNow=0;
    //点击事件
    for(var i=0; i<aBall.length; i++){
        aBall[i].index=i;
        aBall[i].onclick=function(){
            if(this.index<iNow){
                move(aCon[iNow],{'top': height});
                aCon[this.index].style.top=-height+'px';
                move(aCon[this.index], {'top': 0});
            }else if(this.index>iNow){
                move(aCon[iNow],{'top':-height});
                aCon[this.index].style.top=height+'px';
                move(aCon[this.index], {'top': 0});
            }
            iNow=this.index;
            for(var i=0; i<aBall.length; i++){
                aBall[i].className='';
            }
            this.className='active';
        }
    }
    
    //设置aCon的高度
    for(var i=0; i<aCon.length; i++){
        aCon[i].style.height=document.documentElement.clientHeight+'px';
    }
    var height=aCon[0].offsetHeight;
    aCon[1].style.top=aCon[2].style.top=aCon[3].style.top=document.documentElement.clientHeight+'px';
    //滚轮滚动
    if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        document.addEventListener('DOMMouseScroll', function(ev){
            var oEvent=ev || event;
            if(oEvent.wheelDelta){
                if(oEvent.wheelDelta>0){
                    //上
                    scrollUp();
                }else{
                    //下
                    scrollDown();
                }
            }else{
                if(oEvent.detail<0){
                    scrollUp();
                }else{
                    scrollDown();
                }
            }
        }, false);
    }else{
        document.onmousewheel=function(ev){
            var oEvent=ev || event;
            if(oEvent.wheelDelta){
                if(oEvent.wheelDelta>0){
                    scrollUp();
                }else{
                    scrollDown();
                }
            }else{
                if(oEvent.detail<0){
                    scrollUp();
                }else{
                    scrollDown();
                }
            }
        };
    }
    //滚轮向上
    var bFlag=false;
    function scrollUp(){
        if(bFlag)return;
        bFlag=true;
        move(aCon[iNow],{'top':height},{complete:function(){
            bFlag=false;
        }});
        iNow--;
        if(iNow<0){
            iNow=aCon.length-1;
        }
        aCon[iNow].style.top=-height+'px';
        move(aCon[iNow],{'top':0});
        tab();
    }
    //滚轮向下
    function scrollDown(){
        if(bFlag)return;
        bFlag=true;
        move(aCon[iNow],{'top':-height},{complete:function(){
            bFlag=false;
        }});
        iNow++;
        if(iNow>aCon.length-1){
            iNow=0
        }
        aCon[iNow].style.top=height+'px';
        move(aCon[iNow],{'top':0});
        tab();
    }
    function tab(){
        for(var i=0; i<aBall.length; i++){
            aBall[i].className='';
        }
        aBall[iNow].className='active';
    }
    //键盘控制
    document.onkeydown=function(ev){
        var oEvent=ev||event;
        if(oEvent.keyCode==38){
            scrollUp();
        }
        if(oEvent.keyCode==40){
            scrollDown();
        }
    };
};
	
