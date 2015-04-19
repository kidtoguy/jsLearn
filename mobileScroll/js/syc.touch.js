'use strict';
(function($){
    $(function(){
        //var console = window.console;

        var syc = window.syc||{};

        syc = {
            touch:function(option){
                var optDefault = {
                    'target':$(document),
                    'touchRightToLeft':touchRightToLeft,
                    'touchLeftToRight':touchLeftToRight,
                    'touchTopToBottom':touchTopToBottom,
                    'touchBottomToTop':touchBottomToTop
                };

                var opt = $.extend({},optDefault,option);

                var start = {
                    pageX:'',
                    pageY:''
                };
                var move = {
                    pageX:'',
                    pageY:''
                };
                var changeX,changeY;

                var touchEvent = {
                    touchStart:function(event){
                        var eventTouch = event.touches[0];
                        start.pageX = eventTouch.pageX;
                        start.pageY = eventTouch.pageY;
                    },
                    touchMove:function(event){
                        var eventTouch = event.touches[0];
                        move.pageX = eventTouch.pageX;
                        move.pageY = eventTouch.pageY;

                        changeX = Math.abs(move.pageX-start.pageX);
                        changeY = Math.abs(move.pageY-start.pageY);

                        //阻止上下滑动
                        if((move.pageY>start.pageY)&&(changeX<changeY)){
                            opt.touchTopToBottom(event);
                            event.preventDefault();
                        }
                        else if((move.pageY<start.pageY)&&(changeX<changeY)){
                            opt.touchBottomToTop(event);
                            event.preventDefault();
                        }
                    },
                    touchEnd:function(){
                        if((move.pageX>start.pageX)&&(changeX>changeY)){
                            opt.touchLeftToRight(event);
                        }
                        else if((move.pageX<start.pageX)&&(changeX>changeY)){
                            opt.touchRightToLeft(event);
                        }

                        start.pageX = '';
                        start.pageY = '';
                        changeX = '';
                        changeY = '';
                    }
                };

                opt.target.on('touchstart',function(){
                    touchEvent.touchStart(event);
                });
                opt.target.on('touchmove',function(){
                    touchEvent.touchMove(event);
                });
                opt.target.on('touchend',function(){
                    touchEvent.touchEnd();
                });


                function touchRightToLeft(){
                    // console.log('youhua');
                }
                function touchLeftToRight(){
                    // console.log('zuohua');
                }
                function touchTopToBottom(event){
                    // console.log('xiahua'); 
                }
                function touchBottomToTop(event){
                    // console.log('shanghua');
                }
            }
        };
        window.syc = syc;
    });
})(window.$);