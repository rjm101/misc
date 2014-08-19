/* 
 * Trigger javascript based on media queries passed to MQMatcher object
 */
var MQMatcher = function(mqBreakpoints) {
	
    this.mqBreakpoints = mqBreakpoints;
    this.mq = {};
    this.mqListeners = {};
    
    this.init();
};

MQMatcher.prototype = {
    
    init: function(){
        
        for(var breakpoint in this.mqBreakpoints){
            
            // Store query conditions
            this.mq[breakpoint] = window.matchMedia(breakpoint);
            
            // Add a listener to the MediaQueryList
            this.mqListeners[breakpoint] = this.mq[breakpoint].addListener(this.mqBreakpoints[breakpoint]);
            
            // Check breakpoint on load
            if(this.mq[breakpoint].matches){
                this.mqBreakpoints[breakpoint]({matches: true});
            }
        }
    }
};