/**
 * scroll-intent - Scroll-Intent tracks user scroll direction without jitter
 * @version v1.1.0
 * @link https://github.com/pwfisher/scroll-intent.js#readme
 * @author Patrick Fisher <patrick@pwfisher.com>
 * @license MIT
**/
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.scrollIntent=n()}(this,function(){"use strict";function t(t){return"off"===t?e.off("scroll",w):(a=e.scrollTop(),o.attr("scroll-intent",u),e.on("scroll",w))}var n=$(document),o=$("html"),e=$(window),r=32,i=512,f=64,d=Array(r),u="down",l=void 0,a=void 0,c=0,s=function(){var t=e.scrollTop(),s=l.timeStamp,w="down"===u?Math.max:Math.min,h=n.height()-e.height();if(t=Math.max(0,t),t=Math.min(h,t),d.unshift({y:t,t:s}),d.pop(),t===w(a,t))return c=s,void(a=t);var m=s-i;if(m>c){a=t;for(var p=0;p<r&&(d[p]&&!(d[p].t<m));p+=1)a=w(a,d[p].y)}Math.abs(t-a)>f&&(a=t,c=s,u="down"===u?"up":"down",o.attr("scroll-intent",u))},w=function(t){l=t,window.requestAnimationFrame(s)},h=window.$||window.jQuery||window.Zepto;if(!h)throw Error("scroll-intent requires jQuery or Zepto");return h.fn.extend({scrollIntent:function(n){return t(n)}}),t});
