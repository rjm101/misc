(function(MQ){
    "use strict";
    
    var mq = new MQ({
        "(min-width: 801px)": desktopEnter,
        "(max-width: 800px) and (min-width: 676px)": tabletEnter,
        "(max-width: 675px)": mobileEnter
    }),
    currentViewport;
    
    function mobileEnter(e){
        if(e.matches){
            currentViewport = 'mobile';
            write();
        }
    }
    
    function tabletEnter(e){
        if(e.matches){
            currentViewport = 'tablet'; 
            write();
        }
    }
    
    function desktopEnter(e){
        if(e.matches){
            currentViewport = 'desktop';
            write();
        }
    }
    
    function write(){
        document.body.innerHTML = currentViewport + ' entered at '+window.innerWidth+'px';
    }
    
}(MQMatcher));