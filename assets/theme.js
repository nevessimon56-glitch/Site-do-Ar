/**
 * VENDORS
 */

/**
 * vanilla-lazyload - v16.1.0: https://github.com/verlok/vanilla-lazyload
 */
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).LazyLoad=n()}(this,(function(){"use strict";function t(){return(t=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}).apply(this,arguments)}var n="undefined"!=typeof window,e=n&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),i=n&&"IntersectionObserver"in window,a=n&&"classList"in document.createElement("p"),o=n&&window.devicePixelRatio>1,r={elements_selector:"IMG",container:e||n?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!1,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1},c=function(n){return t({},r,n)},l=function(t,n){var e,i=new t(n);try{e=new CustomEvent("LazyLoad::Initialized",{detail:{instance:i}})}catch(t){(e=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:i})}window.dispatchEvent(e)},s=function(t,n){return t.getAttribute("data-"+n)},u=function(t,n,e){var i="data-"+n;null!==e?t.setAttribute(i,e):t.removeAttribute(i)},d=function(t){return s(t,"ll-status")},f=function(t,n){return u(t,"ll-status",n)},_=function(t){return f(t,null)},g=function(t){return null===d(t)},v=function(t){return"native"===d(t)},b=function(t,n,e,i){t&&(void 0===i?void 0===e?t(n):t(n,e):t(n,e,i))},p=function(t,n){a?t.classList.add(n):t.className+=(t.className?" ":"")+n},h=function(t,n){a?t.classList.remove(n):t.className=t.className.replace(new RegExp("(^|\\s+)"+n+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},m=function(t){return t.llTempImage},E=function(t,n){if(n){var e=n._observer;e&&e.unobserve(t)}},I=function(t,n){t&&(t.loadingCount+=n)},A=function(t,n){t&&(t.toLoadCount=n)},L=function(t){for(var n,e=[],i=0;n=t.children[i];i+=1)"SOURCE"===n.tagName&&e.push(n);return e},y=function(t,n,e){e&&t.setAttribute(n,e)},w=function(t,n){t.removeAttribute(n)},k=function(t){return!!t.llOriginalAttrs},z=function(t){if(!k(t)){var n={};n.src=t.getAttribute("src"),n.srcset=t.getAttribute("srcset"),n.sizes=t.getAttribute("sizes"),t.llOriginalAttrs=n}},O=function(t){if(k(t)){var n=t.llOriginalAttrs;y(t,"src",n.src),y(t,"srcset",n.srcset),y(t,"sizes",n.sizes)}},C=function(t,n){y(t,"sizes",s(t,n.data_sizes)),y(t,"srcset",s(t,n.data_srcset)),y(t,"src",s(t,n.data_src))},M=function(t){w(t,"src"),w(t,"srcset"),w(t,"sizes")},N=function(t,n){var e=t.parentNode;e&&"PICTURE"===e.tagName&&L(e).forEach(n)},x=function(t,n){L(t).forEach(n)},R={IMG:function(t,n){N(t,(function(t){z(t),C(t,n)})),z(t),C(t,n)},IFRAME:function(t,n){y(t,"src",s(t,n.data_src))},VIDEO:function(t,n){x(t,(function(t){y(t,"src",s(t,n.data_src))})),y(t,"poster",s(t,n.data_poster)),y(t,"src",s(t,n.data_src)),t.load()}},G=function(t,n){var e=R[t.tagName];e&&e(t,n)},T=function(t,n,e){I(e,1),p(t,n.class_loading),f(t,"loading"),b(n.callback_loading,t,e)},D={IMG:function(t,n){u(t,n.data_src,null),u(t,n.data_srcset,null),u(t,n.data_sizes,null),N(t,(function(t){u(t,n.data_srcset,null),u(t,n.data_sizes,null)}))},IFRAME:function(t,n){u(t,n.data_src,null)},VIDEO:function(t,n){u(t,n.data_src,null),u(t,n.data_poster,null),x(t,(function(t){u(t,n.data_src,null)}))}},F=function(t,n){u(t,n.data_bg_multi,null),u(t,n.data_bg_multi_hidpi,null)},V=function(t,n){var e=D[t.tagName];e?e(t,n):function(t,n){u(t,n.data_bg,null),u(t,n.data_bg_hidpi,null)}(t,n)},j=["IMG","IFRAME","VIDEO"],P=function(t,n){!n||function(t){return t.loadingCount>0}(n)||function(t){return t.toLoadCount>0}(n)||b(t.callback_finish,n)},S=function(t,n,e){t.addEventListener(n,e),t.llEvLisnrs[n]=e},U=function(t,n,e){t.removeEventListener(n,e)},$=function(t){return!!t.llEvLisnrs},q=function(t){if($(t)){var n=t.llEvLisnrs;for(var e in n){var i=n[e];U(t,e,i)}delete t.llEvLisnrs}},H=function(t,n,e){!function(t){delete t.llTempImage}(t),I(e,-1),function(t){t&&(t.toLoadCount-=1)}(e),h(t,n.class_loading),n.unobserve_completed&&E(t,e)},B=function(t,n,e){var i=m(t)||t;$(i)||function(t,n,e){$(t)||(t.llEvLisnrs={});var i="VIDEO"===t.tagName?"loadeddata":"load";S(t,i,n),S(t,"error",e)}(i,(function(a){!function(t,n,e,i){var a=v(n);H(n,e,i),p(n,e.class_loaded),f(n,"loaded"),V(n,e),b(e.callback_loaded,n,i),a||P(e,i)}(0,t,n,e),q(i)}),(function(a){!function(t,n,e,i){var a=v(n);H(n,e,i),p(n,e.class_error),f(n,"error"),b(e.callback_error,n,i),a||P(e,i)}(0,t,n,e),q(i)}))},J=function(t,n,e){!function(t){t.llTempImage=document.createElement("IMG")}(t),B(t,n,e),function(t,n,e){var i=s(t,n.data_bg),a=s(t,n.data_bg_hidpi),r=o&&a?a:i;r&&(t.style.backgroundImage='url("'.concat(r,'")'),m(t).setAttribute("src",r),T(t,n,e))}(t,n,e),function(t,n,e){var i=s(t,n.data_bg_multi),a=s(t,n.data_bg_multi_hidpi),r=o&&a?a:i;r&&(t.style.backgroundImage=r,function(t,n,e){p(t,n.class_applied),f(t,"applied"),F(t,n),n.unobserve_completed&&E(t,n),b(n.callback_applied,t,e)}(t,n,e))}(t,n,e)},K=function(t,n,e){!function(t){return j.indexOf(t.tagName)>-1}(t)?J(t,n,e):function(t,n,e){B(t,n,e),G(t,n),T(t,n,e)}(t,n,e)},Q=["IMG","IFRAME"],W=function(t){return t.use_native&&"loading"in HTMLImageElement.prototype},X=function(t,n,e){t.forEach((function(t){return function(t){return t.isIntersecting||t.intersectionRatio>0}(t)?function(t,n,e,i){b(e.callback_enter,t,n,i),function(t,n,e){n.unobserve_entered&&E(t,e)}(t,e,i),function(t){return!g(t)}(t)||K(t,e,i)}(t.target,t,n,e):function(t,n,e,i){g(t)||(function(t,n,e,i){e.cancel_on_exit&&function(t){return"loading"===d(t)}(t)&&"IMG"===t.tagName&&(q(t),function(t){N(t,(function(t){M(t)})),M(t)}(t),function(t){N(t,(function(t){O(t)})),O(t)}(t),h(t,e.class_loading),I(i,-1),_(t),b(e.callback_cancel,t,n,i))}(t,n,e,i),b(e.callback_exit,t,n,i))}(t.target,t,n,e)}))},Y=function(t){return Array.prototype.slice.call(t)},Z=function(t){return t.container.querySelectorAll(t.elements_selector)},tt=function(t){return function(t){return"error"===d(t)}(t)},nt=function(t,n){return function(t){return Y(t).filter(g)}(t||Z(n))},et=function(t,e){var a=c(t);this._settings=a,this.loadingCount=0,function(t,n){i&&!W(t)&&(n._observer=new IntersectionObserver((function(e){X(e,t,n)}),function(t){return{root:t.container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}}(t)))}(a,this),function(t,e){n&&window.addEventListener("online",(function(){!function(t,n){var e;(e=Z(t),Y(e).filter(tt)).forEach((function(n){h(n,t.class_error),_(n)})),n.update()}(t,e)}))}(a,this),this.update(e)};return et.prototype={update:function(t){var n,a,o=this._settings,r=nt(t,o);A(this,r.length),!e&&i?W(o)?function(t,n,e){t.forEach((function(t){-1!==Q.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),function(t,n,e){B(t,n,e),G(t,n),V(t,n),f(t,"native")}(t,n,e))})),A(e,0)}(r,o,this):(a=r,function(t){t.disconnect()}(n=this._observer),function(t,n){n.forEach((function(n){t.observe(n)}))}(n,a)):this.loadAll(r)},destroy:function(){this._observer&&this._observer.disconnect(),Z(this._settings).forEach((function(t){delete t.llOriginalAttrs})),delete this._observer,delete this._settings,delete this.loadingCount,delete this.toLoadCount},loadAll:function(t){var n=this,e=this._settings;nt(t,e).forEach((function(t){K(t,e,n)}))}},et.load=function(t,n){var e=c(n);K(t,e)},et.resetStatus=function(t){_(t)},n&&function(t,n){if(n)if(n.length)for(var e,i=0;e=n[i];i+=1)l(t,e);else l(t,n)}(et,window.lazyLoadOptions),et}));

/**
 * tiny-slider - v2.9.3: https://github.com/ganlanyuan/tiny-slider
 */
var tns=function(){var t=window,Ai=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(t){return setTimeout(t,16)},e=window,Ni=e.cancelAnimationFrame||e.mozCancelAnimationFrame||function(t){clearTimeout(t)};function Li(){for(var t,e,n,i=arguments[0]||{},a=1,r=arguments.length;a<r;a++)if(null!==(t=arguments[a]))for(e in t)i!==(n=t[e])&&void 0!==n&&(i[e]=n);return i}function Bi(t){return 0<=["true","false"].indexOf(t)?JSON.parse(t):t}function Si(t,e,n,i){if(i)try{t.setItem(e,n)}catch(t){}return n}function Hi(){var t=document,e=t.body;return e||((e=t.createElement("body")).fake=!0),e}var n=document.documentElement;function Oi(t){var e="";return t.fake&&(e=n.style.overflow,t.style.background="",t.style.overflow=n.style.overflow="hidden",n.appendChild(t)),e}function Di(t,e){t.fake&&(t.remove(),n.style.overflow=e,n.offsetHeight)}function ki(t,e,n,i){"insertRule"in t?t.insertRule(e+"{"+n+"}",i):t.addRule(e,n,i)}function Ri(t){return("insertRule"in t?t.cssRules:t.rules).length}function Ii(t,e,n){for(var i=0,a=t.length;i<a;i++)e.call(n,t[i],i)}var i="classList"in document.createElement("_"),Pi=i?function(t,e){return t.classList.contains(e)}:function(t,e){return 0<=t.className.indexOf(e)},zi=i?function(t,e){Pi(t,e)||t.classList.add(e)}:function(t,e){Pi(t,e)||(t.className+=" "+e)},Wi=i?function(t,e){Pi(t,e)&&t.classList.remove(e)}:function(t,e){Pi(t,e)&&(t.className=t.className.replace(e,""))};function qi(t,e){return t.hasAttribute(e)}function Fi(t,e){return t.getAttribute(e)}function r(t){return void 0!==t.item}function ji(t,e){if(t=r(t)||t instanceof Array?t:[t],"[object Object]"===Object.prototype.toString.call(e))for(var n=t.length;n--;)for(var i in e)t[n].setAttribute(i,e[i])}function Vi(t,e){t=r(t)||t instanceof Array?t:[t];for(var n=(e=e instanceof Array?e:[e]).length,i=t.length;i--;)for(var a=n;a--;)t[i].removeAttribute(e[a])}function Gi(t){for(var e=[],n=0,i=t.length;n<i;n++)e.push(t[n]);return e}function Qi(t,e){"none"!==t.style.display&&(t.style.display="none")}function Xi(t,e){"none"===t.style.display&&(t.style.display="")}function Yi(t){return"none"!==window.getComputedStyle(t).display}function Ki(e){if("string"==typeof e){var n=[e],i=e.charAt(0).toUpperCase()+e.substr(1);["Webkit","Moz","ms","O"].forEach(function(t){"ms"===t&&"transform"!==e||n.push(t+i)}),e=n}for(var t=document.createElement("fakeelement"),a=(e.length,0);a<e.length;a++){var r=e[a];if(void 0!==t.style[r])return r}return!1}function Ji(t,e){var n=!1;return/^Webkit/.test(t)?n="webkit"+e+"End":/^O/.test(t)?n="o"+e+"End":t&&(n=e.toLowerCase()+"end"),n}var a=!1;try{var o=Object.defineProperty({},"passive",{get:function(){a=!0}});window.addEventListener("test",null,o)}catch(t){}var u=!!a&&{passive:!0};function Ui(t,e,n){for(var i in e){var a=0<=["touchstart","touchmove"].indexOf(i)&&!n&&u;t.addEventListener(i,e[i],a)}}function _i(t,e){for(var n in e){var i=0<=["touchstart","touchmove"].indexOf(n)&&u;t.removeEventListener(n,e[n],i)}}function Zi(){return{topics:{},on:function(t,e){this.topics[t]=this.topics[t]||[],this.topics[t].push(e)},off:function(t,e){if(this.topics[t])for(var n=0;n<this.topics[t].length;n++)if(this.topics[t][n]===e){this.topics[t].splice(n,1);break}},emit:function(e,n){n.type=e,this.topics[e]&&this.topics[e].forEach(function(t){t(n,e)})}}}Object.keys||(Object.keys=function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}),"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});var $i=function(H){H=Li({container:".slider",mode:"carousel",axis:"horizontal",items:1,gutter:0,edgePadding:0,fixedWidth:!1,autoWidth:!1,viewportMax:!1,slideBy:1,center:!1,controls:!0,controlsPosition:"top",controlsText:["prev","next"],controlsContainer:!1,prevButton:!1,nextButton:!1,nav:!0,navPosition:"top",navContainer:!1,navAsThumbnails:!1,arrowKeys:!1,speed:300,autoplay:!1,autoplayPosition:"top",autoplayTimeout:5e3,autoplayDirection:"forward",autoplayText:["start","stop"],autoplayHoverPause:!1,autoplayButton:!1,autoplayButtonOutput:!0,autoplayResetOnVisibility:!0,animateIn:"tns-fadeIn",animateOut:"tns-fadeOut",animateNormal:"tns-normal",animateDelay:!1,loop:!0,rewind:!1,autoHeight:!1,responsive:!1,lazyload:!1,lazyloadSelector:".tns-lazy-img",touch:!0,mouseDrag:!1,swipeAngle:15,nested:!1,preventActionWhenRunning:!1,preventScrollOnTouch:!1,freezable:!0,onInit:!1,useLocalStorage:!0,nonce:!1},H||{});var O=document,m=window,a={ENTER:13,SPACE:32,LEFT:37,RIGHT:39},e={},n=H.useLocalStorage;if(n){var t=navigator.userAgent,i=new Date;try{(e=m.localStorage)?(e.setItem(i,i),n=e.getItem(i)==i,e.removeItem(i)):n=!1,n||(e={})}catch(t){n=!1}n&&(e.tnsApp&&e.tnsApp!==t&&["tC","tPL","tMQ","tTf","t3D","tTDu","tTDe","tADu","tADe","tTE","tAE"].forEach(function(t){e.removeItem(t)}),localStorage.tnsApp=t)}var y=e.tC?Bi(e.tC):Si(e,"tC",function(){var t=document,e=Hi(),n=Oi(e),i=t.createElement("div"),a=!1;e.appendChild(i);try{for(var r,o="(10px * 10)",u=["calc"+o,"-moz-calc"+o,"-webkit-calc"+o],l=0;l<3;l++)if(r=u[l],i.style.width=r,100===i.offsetWidth){a=r.replace(o,"");break}}catch(t){}return e.fake?Di(e,n):i.remove(),a}(),n),g=e.tPL?Bi(e.tPL):Si(e,"tPL",function(){var t,e=document,n=Hi(),i=Oi(n),a=e.createElement("div"),r=e.createElement("div"),o="";a.className="tns-t-subp2",r.className="tns-t-ct";for(var u=0;u<70;u++)o+="<div></div>";return r.innerHTML=o,a.appendChild(r),n.appendChild(a),t=Math.abs(a.getBoundingClientRect().left-r.children[67].getBoundingClientRect().left)<2,n.fake?Di(n,i):a.remove(),t}(),n),D=e.tMQ?Bi(e.tMQ):Si(e,"tMQ",function(){if(window.matchMedia||window.msMatchMedia)return!0;var t,e=document,n=Hi(),i=Oi(n),a=e.createElement("div"),r=e.createElement("style"),o="@media all and (min-width:1px){.tns-mq-test{position:absolute}}";return r.type="text/css",a.className="tns-mq-test",n.appendChild(r),n.appendChild(a),r.styleSheet?r.styleSheet.cssText=o:r.appendChild(e.createTextNode(o)),t=window.getComputedStyle?window.getComputedStyle(a).position:a.currentStyle.position,n.fake?Di(n,i):a.remove(),"absolute"===t}(),n),r=e.tTf?Bi(e.tTf):Si(e,"tTf",Ki("transform"),n),o=e.t3D?Bi(e.t3D):Si(e,"t3D",function(t){if(!t)return!1;if(!window.getComputedStyle)return!1;var e,n=document,i=Hi(),a=Oi(i),r=n.createElement("p"),o=9<t.length?"-"+t.slice(0,-9).toLowerCase()+"-":"";return o+="transform",i.insertBefore(r,null),r.style[t]="translate3d(1px,1px,1px)",e=window.getComputedStyle(r).getPropertyValue(o),i.fake?Di(i,a):r.remove(),void 0!==e&&0<e.length&&"none"!==e}(r),n),x=e.tTDu?Bi(e.tTDu):Si(e,"tTDu",Ki("transitionDuration"),n),u=e.tTDe?Bi(e.tTDe):Si(e,"tTDe",Ki("transitionDelay"),n),b=e.tADu?Bi(e.tADu):Si(e,"tADu",Ki("animationDuration"),n),l=e.tADe?Bi(e.tADe):Si(e,"tADe",Ki("animationDelay"),n),s=e.tTE?Bi(e.tTE):Si(e,"tTE",Ji(x,"Transition"),n),c=e.tAE?Bi(e.tAE):Si(e,"tAE",Ji(b,"Animation"),n),f=m.console&&"function"==typeof m.console.warn,d=["container","controlsContainer","prevButton","nextButton","navContainer","autoplayButton"],v={};if(d.forEach(function(t){if("string"==typeof H[t]){var e=H[t],n=O.querySelector(e);if(v[t]=e,!n||!n.nodeName)return void(f&&console.warn("Can't find",H[t]));H[t]=n}}),!(H.container.children.length<1)){var k=H.responsive,R=H.nested,I="carousel"===H.mode;if(k){0 in k&&(H=Li(H,k[0]),delete k[0]);var p={};for(var h in k){var w=k[h];w="number"==typeof w?{items:w}:w,p[h]=w}k=p,p=null}if(I||function t(e){for(var n in e)I||("slideBy"===n&&(e[n]="page"),"edgePadding"===n&&(e[n]=!1),"autoHeight"===n&&(e[n]=!1)),"responsive"===n&&t(e[n])}(H),!I){H.axis="horizontal",H.slideBy="page",H.edgePadding=!1;var P=H.animateIn,z=H.animateOut,C=H.animateDelay,W=H.animateNormal}var M,q,F="horizontal"===H.axis,T=O.createElement("div"),j=O.createElement("div"),V=H.container,E=V.parentNode,A=V.outerHTML,G=V.children,Q=G.length,X=rn(),Y=!1;k&&En(),I&&(V.className+=" tns-vpfix");var N,L,B,S,K,J,U,_,Z,$=H.autoWidth,tt=sn("fixedWidth"),et=sn("edgePadding"),nt=sn("gutter"),it=un(),at=sn("center"),rt=$?1:Math.floor(sn("items")),ot=sn("slideBy"),ut=H.viewportMax||H.fixedWidthViewportWidth,lt=sn("arrowKeys"),st=sn("speed"),ct=H.rewind,ft=!ct&&H.loop,dt=sn("autoHeight"),vt=sn("controls"),pt=sn("controlsText"),ht=sn("nav"),mt=sn("touch"),yt=sn("mouseDrag"),gt=sn("autoplay"),xt=sn("autoplayTimeout"),bt=sn("autoplayText"),wt=sn("autoplayHoverPause"),Ct=sn("autoplayResetOnVisibility"),Mt=(U=null,_=sn("nonce"),Z=document.createElement("style"),U&&Z.setAttribute("media",U),_&&Z.setAttribute("nonce",_),document.querySelector("head").appendChild(Z),Z.sheet?Z.sheet:Z.styleSheet),Tt=H.lazyload,Et=H.lazyloadSelector,At=[],Nt=ft?(K=function(){{if($||tt&&!ut)return Q-1;var t=tt?"fixedWidth":"items",e=[];if((tt||H[t]<Q)&&e.push(H[t]),k)for(var n in k){var i=k[n][t];i&&(tt||i<Q)&&e.push(i)}return e.length||e.push(0),Math.ceil(tt?ut/Math.min.apply(null,e):Math.max.apply(null,e))}}(),J=I?Math.ceil((5*K-Q)/2):4*K-Q,J=Math.max(K,J),ln("edgePadding")?J+1:J):0,Lt=I?Q+2*Nt:Q+Nt,Bt=!(!tt&&!$||ft),St=tt?_n():null,Ht=!I||!ft,Ot=F?"left":"top",Dt="",kt="",Rt=tt?function(){return at&&!ft?Q-1:Math.ceil(-St/(tt+nt))}:$?function(){for(var t=0;t<Lt;t++)if(N[t]>=-St)return t}:function(){return at&&I&&!ft?Q-1:ft||I?Math.max(0,Lt-Math.ceil(rt)):Lt-1},It=en(sn("startIndex")),Pt=It,zt=(tn(),0),Wt=$?null:Rt(),qt=H.preventActionWhenRunning,Ft=H.swipeAngle,jt=!Ft||"?",Vt=!1,Gt=H.onInit,Qt=new Zi,Xt=" tns-slider tns-"+H.mode,Yt=V.id||(S=window.tnsId,window.tnsId=S?S+1:1,"tns"+window.tnsId),Kt=sn("disable"),Jt=!1,Ut=H.freezable,_t=!(!Ut||$)&&Tn(),Zt=!1,$t={click:oi,keydown:function(t){t=pi(t);var e=[a.LEFT,a.RIGHT].indexOf(t.keyCode);0<=e&&(0===e?we.disabled||oi(t,-1):Ce.disabled||oi(t,1))}},te={click:function(t){if(Vt){if(qt)return;ai()}var e=hi(t=pi(t));for(;e!==Ae&&!qi(e,"data-nav");)e=e.parentNode;if(qi(e,"data-nav")){var n=Se=Number(Fi(e,"data-nav")),i=tt||$?n*Q/Le:n*rt,a=le?n:Math.min(Math.ceil(i),Q-1);ri(a,t),He===n&&(Pe&&fi(),Se=-1)}},keydown:function(t){t=pi(t);var e=O.activeElement;if(!qi(e,"data-nav"))return;var n=[a.LEFT,a.RIGHT,a.ENTER,a.SPACE].indexOf(t.keyCode),i=Number(Fi(e,"data-nav"));0<=n&&(0===n?0<i&&vi(Ee[i-1]):1===n?i<Le-1&&vi(Ee[i+1]):ri(Se=i,t))}},ee={mouseover:function(){Pe&&(li(),ze=!0)},mouseout:function(){ze&&(ui(),ze=!1)}},ne={visibilitychange:function(){O.hidden?Pe&&(li(),qe=!0):qe&&(ui(),qe=!1)}},ie={keydown:function(t){t=pi(t);var e=[a.LEFT,a.RIGHT].indexOf(t.keyCode);0<=e&&oi(t,0===e?-1:1)}},ae={touchstart:xi,touchmove:bi,touchend:wi,touchcancel:wi},re={mousedown:xi,mousemove:bi,mouseup:wi,mouseleave:wi},oe=ln("controls"),ue=ln("nav"),le=!!$||H.navAsThumbnails,se=ln("autoplay"),ce=ln("touch"),fe=ln("mouseDrag"),de="tns-slide-active",ve="tns-slide-cloned",pe="tns-complete",he={load:function(t){kn(hi(t))},error:function(t){e=hi(t),zi(e,"failed"),Rn(e);var e}},me="force"===H.preventScrollOnTouch;if(oe)var ye,ge,xe=H.controlsContainer,be=H.controlsContainer?H.controlsContainer.outerHTML:"",we=H.prevButton,Ce=H.nextButton,Me=H.prevButton?H.prevButton.outerHTML:"",Te=H.nextButton?H.nextButton.outerHTML:"";if(ue)var Ee,Ae=H.navContainer,Ne=H.navContainer?H.navContainer.outerHTML:"",Le=$?Q:Mi(),Be=0,Se=-1,He=an(),Oe=He,De="tns-nav-active",ke="Carousel Page ",Re=" (Current Slide)";if(se)var Ie,Pe,ze,We,qe,Fe="forward"===H.autoplayDirection?1:-1,je=H.autoplayButton,Ve=H.autoplayButton?H.autoplayButton.outerHTML:"",Ge=["<span class='tns-visually-hidden'>"," animation</span>"];if(ce||fe)var Qe,Xe,Ye={},Ke={},Je=!1,Ue=F?function(t,e){return t.x-e.x}:function(t,e){return t.y-e.y};$||$e(Kt||_t),r&&(Ot=r,Dt="translate",o?(Dt+=F?"3d(":"3d(0px, ",kt=F?", 0px, 0px)":", 0px)"):(Dt+=F?"X(":"Y(",kt=")")),I&&(V.className=V.className.replace("tns-vpfix","")),function(){ln("gutter");T.className="tns-outer",j.className="tns-inner",T.id=Yt+"-ow",j.id=Yt+"-iw",""===V.id&&(V.id=Yt);Xt+=g||$?" tns-subpixel":" tns-no-subpixel",Xt+=y?" tns-calc":" tns-no-calc",$&&(Xt+=" tns-autowidth");Xt+=" tns-"+H.axis,V.className+=Xt,I?((M=O.createElement("div")).id=Yt+"-mw",M.className="tns-ovh",T.appendChild(M),M.appendChild(j)):T.appendChild(j);if(dt){var t=M||j;t.className+=" tns-ah"}if(E.insertBefore(T,V),j.appendChild(V),Ii(G,function(t,e){zi(t,"tns-item"),t.id||(t.id=Yt+"-item"+e),!I&&W&&zi(t,W),ji(t,{"aria-hidden":"true",tabindex:"-1"})}),Nt){for(var e=O.createDocumentFragment(),n=O.createDocumentFragment(),i=Nt;i--;){var a=i%Q,r=G[a].cloneNode(!0);if(zi(r,ve),Vi(r,"id"),n.insertBefore(r,n.firstChild),I){var o=G[Q-1-a].cloneNode(!0);zi(o,ve),Vi(o,"id"),e.appendChild(o)}}V.insertBefore(e,V.firstChild),V.appendChild(n),G=V.children}}(),function(){if(!I)for(var t=It,e=It+Math.min(Q,rt);t<e;t++){var n=G[t];n.style.left=100*(t-It)/rt+"%",zi(n,P),Wi(n,W)}F&&(g||$?(ki(Mt,"#"+Yt+" > .tns-item","font-size:"+m.getComputedStyle(G[0]).fontSize+";",Ri(Mt)),ki(Mt,"#"+Yt,"font-size:0;",Ri(Mt))):I&&Ii(G,function(t,e){var n;t.style.marginLeft=(n=e,y?y+"("+100*n+"% / "+Lt+")":100*n/Lt+"%")}));if(D){if(x){var i=M&&H.autoHeight?hn(H.speed):"";ki(Mt,"#"+Yt+"-mw",i,Ri(Mt))}i=cn(H.edgePadding,H.gutter,H.fixedWidth,H.speed,H.autoHeight),ki(Mt,"#"+Yt+"-iw",i,Ri(Mt)),I&&(i=F&&!$?"width:"+fn(H.fixedWidth,H.gutter,H.items)+";":"",x&&(i+=hn(st)),ki(Mt,"#"+Yt,i,Ri(Mt))),i=F&&!$?dn(H.fixedWidth,H.gutter,H.items):"",H.gutter&&(i+=vn(H.gutter)),I||(x&&(i+=hn(st)),b&&(i+=mn(st))),i&&ki(Mt,"#"+Yt+" > .tns-item",i,Ri(Mt))}else{I&&dt&&(M.style[x]=st/1e3+"s"),j.style.cssText=cn(et,nt,tt,dt),I&&F&&!$&&(V.style.width=fn(tt,nt,rt));var i=F&&!$?dn(tt,nt,rt):"";nt&&(i+=vn(nt)),i&&ki(Mt,"#"+Yt+" > .tns-item",i,Ri(Mt))}if(k&&D)for(var a in k){a=parseInt(a);var r=k[a],i="",o="",u="",l="",s="",c=$?null:sn("items",a),f=sn("fixedWidth",a),d=sn("speed",a),v=sn("edgePadding",a),p=sn("autoHeight",a),h=sn("gutter",a);x&&M&&sn("autoHeight",a)&&"speed"in r&&(o="#"+Yt+"-mw{"+hn(d)+"}"),("edgePadding"in r||"gutter"in r)&&(u="#"+Yt+"-iw{"+cn(v,h,f,d,p)+"}"),I&&F&&!$&&("fixedWidth"in r||"items"in r||tt&&"gutter"in r)&&(l="width:"+fn(f,h,c)+";"),x&&"speed"in r&&(l+=hn(d)),l&&(l="#"+Yt+"{"+l+"}"),("fixedWidth"in r||tt&&"gutter"in r||!I&&"items"in r)&&(s+=dn(f,h,c)),"gutter"in r&&(s+=vn(h)),!I&&"speed"in r&&(x&&(s+=hn(d)),b&&(s+=mn(d))),s&&(s="#"+Yt+" > .tns-item{"+s+"}"),(i=o+u+l+s)&&Mt.insertRule("@media (min-width: "+a/16+"em) {"+i+"}",Mt.cssRules.length)}}(),yn();var _e=ft?I?function(){var t=zt,e=Wt;t+=ot,e-=ot,et?(t+=1,e-=1):tt&&(it+nt)%(tt+nt)&&(e-=1),Nt&&(e<It?It-=Q:It<t&&(It+=Q))}:function(){if(Wt<It)for(;zt+Q<=It;)It-=Q;else if(It<zt)for(;It<=Wt-Q;)It+=Q}:function(){It=Math.max(zt,Math.min(Wt,It))},Ze=I?function(){var e,n,i,a,t,r,o,u,l,s,c;Jn(V,""),x||!st?(ti(),st&&Yi(V)||ai()):(e=V,n=Ot,i=Dt,a=kt,t=Zn(),r=st,o=ai,u=Math.min(r,10),l=0<=t.indexOf("%")?"%":"px",t=t.replace(l,""),s=Number(e.style[n].replace(i,"").replace(a,"").replace(l,"")),c=(t-s)/r*u,setTimeout(function t(){r-=u,s+=c,e.style[n]=i+s+l+a,0<r?setTimeout(t,u):o()},u)),F||Ci()}:function(){At=[];var t={};t[s]=t[c]=ai,_i(G[Pt],t),Ui(G[It],t),ei(Pt,P,z,!0),ei(It,W,P),s&&c&&st&&Yi(V)||ai()};return{version:"2.9.3",getInfo:Ei,events:Qt,goTo:ri,play:function(){gt&&!Pe&&(ci(),We=!1)},pause:function(){Pe&&(fi(),We=!0)},isOn:Y,updateSliderHeight:Fn,refresh:yn,destroy:function(){if(Mt.disabled=!0,Mt.ownerNode&&Mt.ownerNode.remove(),_i(m,{resize:Cn}),lt&&_i(O,ie),xe&&_i(xe,$t),Ae&&_i(Ae,te),_i(V,ee),_i(V,ne),je&&_i(je,{click:di}),gt&&clearInterval(Ie),I&&s){var t={};t[s]=ai,_i(V,t)}mt&&_i(V,ae),yt&&_i(V,re);var r=[A,be,Me,Te,Ne,Ve];for(var e in d.forEach(function(t,e){var n="container"===t?T:H[t];if("object"==typeof n&&n){var i=!!n.previousElementSibling&&n.previousElementSibling,a=n.parentNode;n.outerHTML=r[e],H[t]=i?i.nextElementSibling:a.firstElementChild}}),d=P=z=C=W=F=T=j=V=E=A=G=Q=q=X=$=tt=et=nt=it=rt=ot=ut=lt=st=ct=ft=dt=Mt=Tt=N=At=Nt=Lt=Bt=St=Ht=Ot=Dt=kt=Rt=It=Pt=zt=Wt=Ft=jt=Vt=Gt=Qt=Xt=Yt=Kt=Jt=Ut=_t=Zt=$t=te=ee=ne=ie=ae=re=oe=ue=le=se=ce=fe=de=pe=he=L=vt=pt=xe=be=we=Ce=ye=ge=ht=Ae=Ne=Ee=Le=Be=Se=He=Oe=De=ke=Re=gt=xt=Fe=bt=wt=je=Ve=Ct=Ge=Ie=Pe=ze=We=qe=Ye=Ke=Qe=Je=Xe=Ue=mt=yt=null,this)"rebuild"!==e&&(this[e]=null);Y=!1},rebuild:function(){return $i(Li(H,v))}}}function $e(t){t&&(vt=ht=mt=yt=lt=gt=wt=Ct=!1)}function tn(){for(var t=I?It-Nt:It;t<0;)t+=Q;return t%Q+1}function en(t){return t=t?Math.max(0,Math.min(ft?Q-1:Q-rt,t)):0,I?t+Nt:t}function nn(t){for(null==t&&(t=It),I&&(t-=Nt);t<0;)t+=Q;return Math.floor(t%Q)}function an(){var t,e=nn();return t=le?e:tt||$?Math.ceil((e+1)*Le/Q-1):Math.floor(e/rt),!ft&&I&&It===Wt&&(t=Le-1),t}function rn(){return m.innerWidth||O.documentElement.clientWidth||O.body.clientWidth}function on(t){return"top"===t?"afterbegin":"beforeend"}function un(){var t=et?2*et-nt:0;return function t(e){if(null!=e){var n,i,a=O.createElement("div");return e.appendChild(a),i=(n=a.getBoundingClientRect()).right-n.left,a.remove(),i||t(e.parentNode)}}(E)-t}function ln(t){if(H[t])return!0;if(k)for(var e in k)if(k[e][t])return!0;return!1}function sn(t,e){if(null==e&&(e=X),"items"===t&&tt)return Math.floor((it+nt)/(tt+nt))||1;var n=H[t];if(k)for(var i in k)e>=parseInt(i)&&t in k[i]&&(n=k[i][t]);return"slideBy"===t&&"page"===n&&(n=sn("items")),I||"slideBy"!==t&&"items"!==t||(n=Math.floor(n)),n}function cn(t,e,n,i,a){var r="";if(void 0!==t){var o=t;e&&(o-=e),r=F?"margin: 0 "+o+"px 0 "+t+"px;":"margin: "+t+"px 0 "+o+"px 0;"}else if(e&&!n){var u="-"+e+"px";r="margin: 0 "+(F?u+" 0 0":"0 "+u+" 0")+";"}return!I&&a&&x&&i&&(r+=hn(i)),r}function fn(t,e,n){return t?(t+e)*Lt+"px":y?y+"("+100*Lt+"% / "+n+")":100*Lt/n+"%"}function dn(t,e,n){var i;if(t)i=t+e+"px";else{I||(n=Math.floor(n));var a=I?Lt:n;i=y?y+"(100% / "+a+")":100/a+"%"}return i="width:"+i,"inner"!==R?i+";":i+" !important;"}function vn(t){var e="";!1!==t&&(e=(F?"padding-":"margin-")+(F?"right":"bottom")+": "+t+"px;");return e}function pn(t,e){var n=t.substring(0,t.length-e).toLowerCase();return n&&(n="-"+n+"-"),n}function hn(t){return pn(x,18)+"transition-duration:"+t/1e3+"s;"}function mn(t){return pn(b,17)+"animation-duration:"+t/1e3+"s;"}function yn(){if(ln("autoHeight")||$||!F){var t=V.querySelectorAll("img");Ii(t,function(t){var e=t.src;Tt||(e&&e.indexOf("data:image")<0?(t.src="",Ui(t,he),zi(t,"loading"),t.src=e):kn(t))}),Ai(function(){zn(Gi(t),function(){L=!0})}),ln("autoHeight")&&(t=In(It,Math.min(It+rt-1,Lt-1))),Tt?gn():Ai(function(){zn(Gi(t),gn)})}else I&&$n(),bn(),wn()}function gn(){if($&&1<Q){var i=ft?It:Q-1;!function t(){var e=G[i].getBoundingClientRect().left,n=G[i-1].getBoundingClientRect().right;Math.abs(e-n)<=1?xn():setTimeout(function(){t()},16)}()}else xn()}function xn(){F&&!$||(jn(),$?(St=_n(),Ut&&(_t=Tn()),Wt=Rt(),$e(Kt||_t)):Ci()),I&&$n(),bn(),wn()}function bn(){if(Vn(),T.insertAdjacentHTML("afterbegin",'<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">'+Hn()+"</span>  of "+Q+"</div>"),B=T.querySelector(".tns-liveregion .current"),se){var t=gt?"stop":"start";je?ji(je,{"data-action":t}):H.autoplayButtonOutput&&(T.insertAdjacentHTML(on(H.autoplayPosition),'<button type="button" data-action="'+t+'">'+Ge[0]+t+Ge[1]+bt[0]+"</button>"),je=T.querySelector("[data-action]")),je&&Ui(je,{click:di}),gt&&(ci(),wt&&Ui(V,ee),Ct&&Ui(V,ne))}if(ue){if(Ae)ji(Ae,{"aria-label":"Carousel Pagination"}),Ii(Ee=Ae.children,function(t,e){ji(t,{"data-nav":e,tabindex:"-1","aria-label":ke+(e+1),"aria-controls":Yt})});else{for(var e="",n=le?"":'style="display:none"',i=0;i<Q;i++)e+='<button type="button" data-nav="'+i+'" tabindex="-1" aria-controls="'+Yt+'" '+n+' aria-label="'+ke+(i+1)+'"></button>';e='<div class="tns-nav" aria-label="Carousel Pagination">'+e+"</div>",T.insertAdjacentHTML(on(H.navPosition),e),Ae=T.querySelector(".tns-nav"),Ee=Ae.children}if(Ti(),x){var a=x.substring(0,x.length-18).toLowerCase(),r="transition: all "+st/1e3+"s";a&&(r="-"+a+"-"+r),ki(Mt,"[aria-controls^="+Yt+"-item]",r,Ri(Mt))}ji(Ee[He],{"aria-label":ke+(He+1)+Re}),Vi(Ee[He],"tabindex"),zi(Ee[He],De),Ui(Ae,te)}oe&&(xe||we&&Ce||(T.insertAdjacentHTML(on(H.controlsPosition),'<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="'+Yt+'">'+pt[0]+'</button><button type="button" data-controls="next" tabindex="-1" aria-controls="'+Yt+'">'+pt[1]+"</button></div>"),xe=T.querySelector(".tns-controls")),we&&Ce||(we=xe.children[0],Ce=xe.children[1]),H.controlsContainer&&ji(xe,{"aria-label":"Carousel Navigation",tabindex:"0"}),(H.controlsContainer||H.prevButton&&H.nextButton)&&ji([we,Ce],{"aria-controls":Yt,tabindex:"-1"}),(H.controlsContainer||H.prevButton&&H.nextButton)&&(ji(we,{"data-controls":"prev"}),ji(Ce,{"data-controls":"next"})),ye=Qn(we),ge=Qn(Ce),Kn(),xe?Ui(xe,$t):(Ui(we,$t),Ui(Ce,$t))),An()}function wn(){if(I&&s){var t={};t[s]=ai,Ui(V,t)}mt&&Ui(V,ae,H.preventScrollOnTouch),yt&&Ui(V,re),lt&&Ui(O,ie),"inner"===R?Qt.on("outerResized",function(){Mn(),Qt.emit("innerLoaded",Ei())}):(k||tt||$||dt||!F)&&Ui(m,{resize:Cn}),dt&&("outer"===R?Qt.on("innerLoaded",Pn):Kt||Pn()),Dn(),Kt?Bn():_t&&Ln(),Qt.on("indexChanged",Wn),"inner"===R&&Qt.emit("innerLoaded",Ei()),"function"==typeof Gt&&Gt(Ei()),Y=!0}function Cn(t){Ai(function(){Mn(pi(t))})}function Mn(t){if(Y){"outer"===R&&Qt.emit("outerResized",Ei(t)),X=rn();var e,n=q,i=!1;k&&(En(),(e=n!==q)&&Qt.emit("newBreakpointStart",Ei(t)));var a,r,o,u,l=rt,s=Kt,c=_t,f=lt,d=vt,v=ht,p=mt,h=yt,m=gt,y=wt,g=Ct,x=It;if(e){var b=tt,w=dt,C=pt,M=at,T=bt;if(!D)var E=nt,A=et}if(lt=sn("arrowKeys"),vt=sn("controls"),ht=sn("nav"),mt=sn("touch"),at=sn("center"),yt=sn("mouseDrag"),gt=sn("autoplay"),wt=sn("autoplayHoverPause"),Ct=sn("autoplayResetOnVisibility"),e&&(Kt=sn("disable"),tt=sn("fixedWidth"),st=sn("speed"),dt=sn("autoHeight"),pt=sn("controlsText"),bt=sn("autoplayText"),xt=sn("autoplayTimeout"),D||(et=sn("edgePadding"),nt=sn("gutter"))),$e(Kt),it=un(),F&&!$||Kt||(jn(),F||(Ci(),i=!0)),(tt||$)&&(St=_n(),Wt=Rt()),(e||tt)&&(rt=sn("items"),ot=sn("slideBy"),(r=rt!==l)&&(tt||$||(Wt=Rt()),_e())),e&&Kt!==s&&(Kt?Bn():function(){if(!Jt)return;if(Mt.disabled=!1,V.className+=Xt,$n(),ft)for(var t=Nt;t--;)I&&Xi(G[t]),Xi(G[Lt-t-1]);if(!I)for(var e=It,n=It+Q;e<n;e++){var i=G[e],a=e<It+rt?P:W;i.style.left=100*(e-It)/rt+"%",zi(i,a)}Nn(),Jt=!1}()),Ut&&(e||tt||$)&&(_t=Tn())!==c&&(_t?(ti(Zn(en(0))),Ln()):(!function(){if(!Zt)return;et&&D&&(j.style.margin="");if(Nt)for(var t="tns-transparent",e=Nt;e--;)I&&Wi(G[e],t),Wi(G[Lt-e-1],t);Nn(),Zt=!1}(),i=!0)),$e(Kt||_t),gt||(wt=Ct=!1),lt!==f&&(lt?Ui(O,ie):_i(O,ie)),vt!==d&&(vt?xe?Xi(xe):(we&&Xi(we),Ce&&Xi(Ce)):xe?Qi(xe):(we&&Qi(we),Ce&&Qi(Ce))),ht!==v&&(ht?(Xi(Ae),Ti()):Qi(Ae)),mt!==p&&(mt?Ui(V,ae,H.preventScrollOnTouch):_i(V,ae)),yt!==h&&(yt?Ui(V,re):_i(V,re)),gt!==m&&(gt?(je&&Xi(je),Pe||We||ci()):(je&&Qi(je),Pe&&fi())),wt!==y&&(wt?Ui(V,ee):_i(V,ee)),Ct!==g&&(Ct?Ui(O,ne):_i(O,ne)),e){if(tt===b&&at===M||(i=!0),dt!==w&&(dt||(j.style.height="")),vt&&pt!==C&&(we.innerHTML=pt[0],Ce.innerHTML=pt[1]),je&&bt!==T){var N=gt?1:0,L=je.innerHTML,B=L.length-T[N].length;L.substring(B)===T[N]&&(je.innerHTML=L.substring(0,B)+bt[N])}}else at&&(tt||$)&&(i=!0);if((r||tt&&!$)&&(Le=Mi(),Ti()),(a=It!==x)?(Qt.emit("indexChanged",Ei()),i=!0):r?a||Wn():(tt||$)&&(Dn(),Vn(),Sn()),r&&!I&&function(){for(var t=It+Math.min(Q,rt),e=Lt;e--;){var n=G[e];It<=e&&e<t?(zi(n,"tns-moving"),n.style.left=100*(e-It)/rt+"%",zi(n,P),Wi(n,W)):n.style.left&&(n.style.left="",zi(n,W),Wi(n,P)),Wi(n,z)}setTimeout(function(){Ii(G,function(t){Wi(t,"tns-moving")})},300)}(),!Kt&&!_t){if(e&&!D&&(et===A&&nt===E||(j.style.cssText=cn(et,nt,tt,st,dt)),F)){I&&(V.style.width=fn(tt,nt,rt));var S=dn(tt,nt,rt)+vn(nt);u=Ri(o=Mt)-1,"deleteRule"in o?o.deleteRule(u):o.removeRule(u),ki(Mt,"#"+Yt+" > .tns-item",S,Ri(Mt))}dt&&Pn(),i&&($n(),Pt=It)}e&&Qt.emit("newBreakpointEnd",Ei(t))}}function Tn(){if(!tt&&!$)return Q<=(at?rt-(rt-1)/2:rt);var t=tt?(tt+nt)*Q:N[Q],e=et?it+2*et:it+nt;return at&&(e-=tt?(it-tt)/2:(it-(N[It+1]-N[It]-nt))/2),t<=e}function En(){for(var t in q=0,k)(t=parseInt(t))<=X&&(q=t)}function An(){!gt&&je&&Qi(je),!ht&&Ae&&Qi(Ae),vt||(xe?Qi(xe):(we&&Qi(we),Ce&&Qi(Ce)))}function Nn(){gt&&je&&Xi(je),ht&&Ae&&Xi(Ae),vt&&(xe?Xi(xe):(we&&Xi(we),Ce&&Xi(Ce)))}function Ln(){if(!Zt){if(et&&(j.style.margin="0px"),Nt)for(var t="tns-transparent",e=Nt;e--;)I&&zi(G[e],t),zi(G[Lt-e-1],t);An(),Zt=!0}}function Bn(){if(!Jt){if(Mt.disabled=!0,V.className=V.className.replace(Xt.substring(1),""),Vi(V,["style"]),ft)for(var t=Nt;t--;)I&&Qi(G[t]),Qi(G[Lt-t-1]);if(F&&I||Vi(j,["style"]),!I)for(var e=It,n=It+Q;e<n;e++){var i=G[e];Vi(i,["style"]),Wi(i,P),Wi(i,W)}An(),Jt=!0}}function Sn(){var t=Hn();B.innerHTML!==t&&(B.innerHTML=t)}function Hn(){var t=On(),e=t[0]+1,n=t[1]+1;return e===n?e+"":e+" to "+n}function On(t){null==t&&(t=Zn());var n,i,a,r=It;if(at||et?($||tt)&&(i=-(parseFloat(t)+et),a=i+it+2*et):$&&(i=N[It],a=i+it),$)N.forEach(function(t,e){e<Lt&&((at||et)&&t<=i+.5&&(r=e),.5<=a-t&&(n=e))});else{if(tt){var e=tt+nt;at||et?(r=Math.floor(i/e),n=Math.ceil(a/e-1)):n=r+Math.ceil(it/e)-1}else if(at||et){var o=rt-1;if(at?(r-=o/2,n=It+o/2):n=It+o,et){var u=et*rt/it;r-=u,n+=u}r=Math.floor(r),n=Math.ceil(n)}else n=r+rt-1;r=Math.max(r,0),n=Math.min(n,Lt-1)}return[r,n]}function Dn(){if(Tt&&!Kt){var t=On();t.push(Et),In.apply(null,t).forEach(function(t){if(!Pi(t,pe)){var e={};e[s]=function(t){t.stopPropagation()},Ui(t,e),Ui(t,he),t.src=Fi(t,"data-src");var n=Fi(t,"data-srcset");n&&(t.srcset=n),zi(t,"loading")}})}}function kn(t){zi(t,"loaded"),Rn(t)}function Rn(t){zi(t,pe),Wi(t,"loading"),_i(t,he)}function In(t,e,n){var i=[];for(n||(n="img");t<=e;)Ii(G[t].querySelectorAll(n),function(t){i.push(t)}),t++;return i}function Pn(){var t=In.apply(null,On());Ai(function(){zn(t,Fn)})}function zn(n,t){return L?t():(n.forEach(function(t,e){!Tt&&t.complete&&Rn(t),Pi(t,pe)&&n.splice(e,1)}),n.length?void Ai(function(){zn(n,t)}):t())}function Wn(){Dn(),Vn(),Sn(),Kn(),function(){if(ht&&(He=0<=Se?Se:an(),Se=-1,He!==Oe)){var t=Ee[Oe],e=Ee[He];ji(t,{tabindex:"-1","aria-label":ke+(Oe+1)}),Wi(t,De),ji(e,{"aria-label":ke+(He+1)+Re}),Vi(e,"tabindex"),zi(e,De),Oe=He}}()}function qn(t,e){for(var n=[],i=t,a=Math.min(t+e,Lt);i<a;i++)n.push(G[i].offsetHeight);return Math.max.apply(null,n)}function Fn(){var t=dt?qn(It,rt):qn(Nt,Q),e=M||j;e.style.height!==t&&(e.style.height=t+"px")}function jn(){N=[0];var n=F?"left":"top",i=F?"right":"bottom",a=G[0].getBoundingClientRect()[n];Ii(G,function(t,e){e&&N.push(t.getBoundingClientRect()[n]-a),e===Lt-1&&N.push(t.getBoundingClientRect()[i]-a)})}function Vn(){var t=On(),n=t[0],i=t[1];Ii(G,function(t,e){n<=e&&e<=i?qi(t,"aria-hidden")&&(Vi(t,["aria-hidden","tabindex"]),zi(t,de)):qi(t,"aria-hidden")||(ji(t,{"aria-hidden":"true",tabindex:"-1"}),Wi(t,de))})}function Gn(t){return t.nodeName.toLowerCase()}function Qn(t){return"button"===Gn(t)}function Xn(t){return"true"===t.getAttribute("aria-disabled")}function Yn(t,e,n){t?e.disabled=n:e.setAttribute("aria-disabled",n.toString())}function Kn(){if(vt&&!ct&&!ft){var t=ye?we.disabled:Xn(we),e=ge?Ce.disabled:Xn(Ce),n=It<=zt,i=!ct&&Wt<=It;n&&!t&&Yn(ye,we,!0),!n&&t&&Yn(ye,we,!1),i&&!e&&Yn(ge,Ce,!0),!i&&e&&Yn(ge,Ce,!1)}}function Jn(t,e){x&&(t.style[x]=e)}function Un(t){return null==t&&(t=It),$?(it-(et?nt:0)-(N[t+1]-N[t]-nt))/2:tt?(it-tt)/2:(rt-1)/2}function _n(){var t=it+(et?nt:0)-(tt?(tt+nt)*Lt:N[Lt]);return at&&!ft&&(t=tt?-(tt+nt)*(Lt-1)-Un():Un(Lt-1)-N[Lt-1]),0<t&&(t=0),t}function Zn(t){var e;if(null==t&&(t=It),F&&!$)if(tt)e=-(tt+nt)*t,at&&(e+=Un());else{var n=r?Lt:rt;at&&(t-=Un()),e=100*-t/n}else e=-N[t],at&&$&&(e+=Un());return Bt&&(e=Math.max(e,St)),e+=!F||$||tt?"px":"%"}function $n(t){Jn(V,"0s"),ti(t)}function ti(t){null==t&&(t=Zn()),V.style[Ot]=Dt+t+kt}function ei(t,e,n,i){var a=t+rt;ft||(a=Math.min(a,Lt));for(var r=t;r<a;r++){var o=G[r];i||(o.style.left=100*(r-It)/rt+"%"),C&&u&&(o.style[u]=o.style[l]=C*(r-t)/1e3+"s"),Wi(o,e),zi(o,n),i&&At.push(o)}}function ni(t,e){Ht&&_e(),(It!==Pt||e)&&(Qt.emit("indexChanged",Ei()),Qt.emit("transitionStart",Ei()),dt&&Pn(),Pe&&t&&0<=["click","keydown"].indexOf(t.type)&&fi(),Vt=!0,Ze())}function ii(t){return t.toLowerCase().replace(/-/g,"")}function ai(t){if(I||Vt){if(Qt.emit("transitionEnd",Ei(t)),!I&&0<At.length)for(var e=0;e<At.length;e++){var n=At[e];n.style.left="",l&&u&&(n.style[l]="",n.style[u]=""),Wi(n,z),zi(n,W)}if(!t||!I&&t.target.parentNode===V||t.target===V&&ii(t.propertyName)===ii(Ot)){if(!Ht){var i=It;_e(),It!==i&&(Qt.emit("indexChanged",Ei()),$n())}"inner"===R&&Qt.emit("innerLoaded",Ei()),Vt=!1,Pt=It}}}function ri(t,e){if(!_t)if("prev"===t)oi(e,-1);else if("next"===t)oi(e,1);else{if(Vt){if(qt)return;ai()}var n=nn(),i=0;if("first"===t?i=-n:"last"===t?i=I?Q-rt-n:Q-1-n:("number"!=typeof t&&(t=parseInt(t)),isNaN(t)||(e||(t=Math.max(0,Math.min(Q-1,t))),i=t-n)),!I&&i&&Math.abs(i)<rt){var a=0<i?1:-1;i+=zt<=It+i-Q?Q*a:2*Q*a*-1}It+=i,I&&ft&&(It<zt&&(It+=Q),Wt<It&&(It-=Q)),nn(It)!==nn(Pt)&&ni(e)}}function oi(t,e){if(Vt){if(qt)return;ai()}var n;if(!e){for(var i=hi(t=pi(t));i!==xe&&[we,Ce].indexOf(i)<0;)i=i.parentNode;var a=[we,Ce].indexOf(i);0<=a&&(n=!0,e=0===a?-1:1)}if(ct){if(It===zt&&-1===e)return void ri("last",t);if(It===Wt&&1===e)return void ri("first",t)}e&&(It+=ot*e,$&&(It=Math.floor(It)),ni(n||t&&"keydown"===t.type?t:null))}function ui(){Ie=setInterval(function(){oi(null,Fe)},xt),Pe=!0}function li(){clearInterval(Ie),Pe=!1}function si(t,e){ji(je,{"data-action":t}),je.innerHTML=Ge[0]+t+Ge[1]+e}function ci(){ui(),je&&si("stop",bt[1])}function fi(){li(),je&&si("start",bt[0])}function di(){Pe?(fi(),We=!0):(ci(),We=!1)}function vi(t){t.focus()}function pi(t){return mi(t=t||m.event)?t.changedTouches[0]:t}function hi(t){return t.target||m.event.srcElement}function mi(t){return 0<=t.type.indexOf("touch")}function yi(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function gi(){return a=Ke.y-Ye.y,r=Ke.x-Ye.x,t=Math.atan2(a,r)*(180/Math.PI),e=Ft,n=!1,i=Math.abs(90-Math.abs(t)),90-e<=i?n="horizontal":i<=e&&(n="vertical"),n===H.axis;var t,e,n,i,a,r}function xi(t){if(Vt){if(qt)return;ai()}gt&&Pe&&li(),Je=!0,Xe&&(Ni(Xe),Xe=null);var e=pi(t);Qt.emit(mi(t)?"touchStart":"dragStart",Ei(t)),!mi(t)&&0<=["img","a"].indexOf(Gn(hi(t)))&&yi(t),Ke.x=Ye.x=e.clientX,Ke.y=Ye.y=e.clientY,I&&(Qe=parseFloat(V.style[Ot].replace(Dt,"")),Jn(V,"0s"))}function bi(t){if(Je){var e=pi(t);Ke.x=e.clientX,Ke.y=e.clientY,I?Xe||(Xe=Ai(function(){!function t(e){if(!jt)return void(Je=!1);Ni(Xe);Je&&(Xe=Ai(function(){t(e)}));"?"===jt&&(jt=gi());if(jt){!me&&mi(e)&&(me=!0);try{e.type&&Qt.emit(mi(e)?"touchMove":"dragMove",Ei(e))}catch(t){}var n=Qe,i=Ue(Ke,Ye);if(!F||tt||$)n+=i,n+="px";else{var a=r?i*rt*100/((it+nt)*Lt):100*i/(it+nt);n+=a,n+="%"}V.style[Ot]=Dt+n+kt}}(t)})):("?"===jt&&(jt=gi()),jt&&(me=!0)),("boolean"!=typeof t.cancelable||t.cancelable)&&me&&t.preventDefault()}}function wi(i){if(Je){Xe&&(Ni(Xe),Xe=null),I&&Jn(V,""),Je=!1;var t=pi(i);Ke.x=t.clientX,Ke.y=t.clientY;var a=Ue(Ke,Ye);if(Math.abs(a)){if(!mi(i)){var n=hi(i);Ui(n,{click:function t(e){yi(e),_i(n,{click:t})}})}I?Xe=Ai(function(){if(F&&!$){var t=-a*rt/(it+nt);t=0<a?Math.floor(t):Math.ceil(t),It+=t}else{var e=-(Qe+a);if(e<=0)It=zt;else if(e>=N[Lt-1])It=Wt;else for(var n=0;n<Lt&&e>=N[n];)e>N[It=n]&&a<0&&(It+=1),n++}ni(i,a),Qt.emit(mi(i)?"touchEnd":"dragEnd",Ei(i))}):jt&&oi(i,0<a?-1:1)}}"auto"===H.preventScrollOnTouch&&(me=!1),Ft&&(jt="?"),gt&&!Pe&&ui()}function Ci(){(M||j).style.height=N[It+rt]-N[It]+"px"}function Mi(){var t=tt?(tt+nt)*Q/it:Q/rt;return Math.min(Math.ceil(t),Q)}function Ti(){if(ht&&!le&&Le!==Be){var t=Be,e=Le,n=Xi;for(Le<Be&&(t=Le,e=Be,n=Qi);t<e;)n(Ee[t]),t++;Be=Le}}function Ei(t){return{container:V,slideItems:G,navContainer:Ae,navItems:Ee,controlsContainer:xe,hasControls:oe,prevButton:we,nextButton:Ce,items:rt,slideBy:ot,cloneCount:Nt,slideCount:Q,slideCountNew:Lt,index:It,indexCached:Pt,displayIndex:tn(),navCurrentIndex:He,navCurrentIndexCached:Oe,pages:Le,pagesCached:Be,sheet:Mt,isOn:Y,event:t||{}}}f&&console.warn("No slides found in",H.container)};return $i}();

/** notyf (https://github.com/caroso1222/notyf) - v3.0.0 */
var Notyf=function(){"use strict";var n,t,o=function(){return(o=Object.assign||function(t){for(var i,e=1,n=arguments.length;e<n;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);return t}).apply(this,arguments)},s=(i.prototype.on=function(t,i){var e=this.listeners[t]||[];this.listeners[t]=e.concat([i])},i.prototype.triggerEvent=function(t,i){var e=this;(this.listeners[t]||[]).forEach(function(t){return t({target:e,event:i})})},i);function i(t){this.options=t,this.listeners={}}(t=n=n||{})[t.Add=0]="Add",t[t.Remove=1]="Remove";var v,e,a=(r.prototype.push=function(t){this.notifications.push(t),this.updateFn(t,n.Add,this.notifications)},r.prototype.splice=function(t,i){var e=this.notifications.splice(t,i)[0];return this.updateFn(e,n.Remove,this.notifications),e},r.prototype.indexOf=function(t){return this.notifications.indexOf(t)},r.prototype.onUpdate=function(t){this.updateFn=t},r);function r(){this.notifications=[]}(e=v=v||{}).Dismiss="dismiss";var c={types:[{type:"success",className:"notyf__toast--success",backgroundColor:"#3dc763",icon:{className:"notyf__icon--success",tagName:"i"}},{type:"error",className:"notyf__toast--error",backgroundColor:"#ed3d3d",icon:{className:"notyf__icon--error",tagName:"i"}}],duration:2e3,ripple:!0,position:{x:"right",y:"bottom"},dismissible:!(e.Click="click")},p=(d.prototype.on=function(t,i){var e;this.events=o(o({},this.events),((e={})[t]=i,e))},d.prototype.update=function(t,i){i===n.Add?this.addNotification(t):i===n.Remove&&this.removeNotification(t)},d.prototype.removeNotification=function(t){var i,e,n=this,o=this._popRenderedNotification(t);o&&((e=o.node).classList.add("notyf__toast--disappear"),e.addEventListener(this.animationEndEventName,i=function(t){t.target===e&&(e.removeEventListener(n.animationEndEventName,i),n.container.removeChild(e))}))},d.prototype.addNotification=function(t){var i=this._renderNotification(t);this.notifications.push({notification:t,node:i}),this._announce(t.options.message||"Notification")},d.prototype._renderNotification=function(t){var i,e=this._buildNotificationCard(t),n=t.options.className;return n&&(i=e.classList).add.apply(i,n.split(" ")),this.container.appendChild(e),e},d.prototype._popRenderedNotification=function(t){for(var i=-1,e=0;e<this.notifications.length&&i<0;e++)this.notifications[e].notification===t&&(i=e);if(-1!==i)return this.notifications.splice(i,1)[0]},d.prototype.getXPosition=function(t){var i;return(null===(i=null==t?void 0:t.position)||void 0===i?void 0:i.x)||"right"},d.prototype.getYPosition=function(t){var i;return(null===(i=null==t?void 0:t.position)||void 0===i?void 0:i.y)||"bottom"},d.prototype.adjustContainerAlignment=function(t){var i=this.X_POSITION_FLEX_MAP[this.getXPosition(t)],e=this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],n=this.container.style;n.setProperty("justify-content",e),n.setProperty("align-items",i)},d.prototype._buildNotificationCard=function(n){var t,o=this,i=n.options,e=i.icon;this.adjustContainerAlignment(i);var s=this._createHTLMElement({tagName:"div",className:"notyf__toast"}),a=this._createHTLMElement({tagName:"div",className:"notyf__ripple"}),r=this._createHTLMElement({tagName:"div",className:"notyf__wrapper"}),c=this._createHTLMElement({tagName:"div",className:"notyf__message"});c.innerHTML=i.message||"";var p,d,l,u,f,h=i.background||i.backgroundColor;e&&"object"==typeof e&&(p=this._createHTLMElement({tagName:"div",className:"notyf__icon"}),d=this._createHTLMElement({tagName:e.tagName||"i",className:e.className,text:e.text}),(l=null!==(t=e.color)&&void 0!==t?t:h)&&(d.style.color=l),p.appendChild(d),r.appendChild(p)),r.appendChild(c),s.appendChild(r),h&&(i.ripple?(a.style.background=h,s.appendChild(a)):s.style.background=h),i.dismissible&&(u=this._createHTLMElement({tagName:"div",className:"notyf__dismiss"}),f=this._createHTLMElement({tagName:"button",className:"notyf__dismiss-btn"}),u.appendChild(f),r.appendChild(u),s.classList.add("notyf__toast--dismissible"),f.addEventListener("click",function(t){var i,e;null!==(e=(i=o.events)[v.Dismiss])&&void 0!==e&&e.call(i,{target:n,event:t}),t.stopPropagation()})),s.addEventListener("click",function(t){var i,e;return null===(e=(i=o.events)[v.Click])||void 0===e?void 0:e.call(i,{target:n,event:t})});var m="top"===this.getYPosition(i)?"upper":"lower";return s.classList.add("notyf__toast--"+m),s},d.prototype._createHTLMElement=function(t){var i=t.tagName,e=t.className,n=t.text,o=document.createElement(i);return e&&(o.className=e),o.textContent=n||null,o},d.prototype._createA11yContainer=function(){var t=this._createHTLMElement({tagName:"div",className:"notyf-announcer"});t.setAttribute("aria-atomic","true"),t.setAttribute("aria-live","polite"),t.style.border="0",t.style.clip="rect(0 0 0 0)",t.style.height="1px",t.style.margin="-1px",t.style.overflow="hidden",t.style.padding="0",t.style.position="absolute",t.style.width="1px",t.style.outline="0",document.body.appendChild(t),this.a11yContainer=t},d.prototype._announce=function(t){var i=this;this.a11yContainer.textContent="",setTimeout(function(){i.a11yContainer.textContent=t},100)},d.prototype._getAnimationEndEventName=function(){var t,i=document.createElement("_fake"),e={MozTransition:"animationend",OTransition:"oAnimationEnd",WebkitTransition:"webkitAnimationEnd",transition:"animationend"};for(t in e)if(void 0!==i.style[t])return e[t];return"animationend"},d);function d(){this.notifications=[],this.events={},this.X_POSITION_FLEX_MAP={left:"flex-start",center:"center",right:"flex-end"},this.Y_POSITION_FLEX_MAP={top:"flex-start",center:"center",bottom:"flex-end"};var t=document.createDocumentFragment(),i=this._createHTLMElement({tagName:"div",className:"notyf"});t.appendChild(i),document.body.appendChild(t),this.container=i,this.animationEndEventName=this._getAnimationEndEventName(),this._createA11yContainer()}function l(t){var n=this;this.dismiss=this._removeNotification,this.notifications=new a,this.view=new p;var i=this.registerTypes(t);this.options=o(o({},c),t),this.options.types=i,this.notifications.onUpdate(function(t,i){return n.view.update(t,i)}),this.view.on(v.Dismiss,function(t){var i=t.target,e=t.event;n._removeNotification(i),i.triggerEvent(v.Dismiss,e)}),this.view.on(v.Click,function(t){var i=t.target,e=t.event;return i.triggerEvent(v.Click,e)})}return l.prototype.error=function(t){var i=this.normalizeOptions("error",t);return this.open(i)},l.prototype.success=function(t){var i=this.normalizeOptions("success",t);return this.open(i)},l.prototype.open=function(i){var t=this.options.types.find(function(t){return t.type===i.type})||{},e=o(o({},t),i);this.assignProps(["ripple","position","dismissible"],e);var n=new s(e);return this._pushNotification(n),n},l.prototype.dismissAll=function(){for(;this.notifications.splice(0,1););},l.prototype.assignProps=function(t,i){var e=this;t.forEach(function(t){i[t]=null==i[t]?e.options[t]:i[t]})},l.prototype._pushNotification=function(t){var i=this;this.notifications.push(t);var e=void 0!==t.options.duration?t.options.duration:this.options.duration;e&&setTimeout(function(){return i._removeNotification(t)},e)},l.prototype._removeNotification=function(t){var i=this.notifications.indexOf(t);-1!==i&&this.notifications.splice(i,1)},l.prototype.normalizeOptions=function(t,i){var e={type:t};return"string"==typeof i?e.message=i:"object"==typeof i&&(e=o(o({},e),i)),e},l.prototype.registerTypes=function(t){var i=(t&&t.types||[]).slice();return c.types.map(function(e){var n=-1;i.forEach(function(t,i){t.type===e.type&&(n=i)});var t=-1!==n?i.splice(n,1)[0]:{};return o(o({},e),t)}).concat(i)},l}();


/**
 * metismenujs - v1.2.1
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).MetisMenu=e()}(this,function(){"use strict";
var i=function(){return(i=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var s in e=arguments[i])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)},n={parentTrigger:"li",subMenu:"ul",toggle:!0,triggerElement:"a"},g="mm-active",f="mm-collapse",m="mm-collapsed",p="mm-collapsing",t="metismenu",v="mm-show";function y(t,e){if(t.closest)return t.closest(e);for(var i,n,s=t;s;){if(n=e,((i=s).matches||i.webkitMatchesSelector||i.msMatchesSelector).call(i,n))return s;s=s.parentElement}return null}function s(t,e){this.element=s.isElement(t)?t:document.querySelector(t),this.config=i(i({},n),e),this.disposed=!1,this.triggerArr=[],this.init()}return s.attach=function(t,e){return new s(t,e)},s.prototype.init=function(){var n=this,s=g,r=f;this.element.classList.add(t),[].slice.call(this.element.querySelectorAll(this.config.subMenu)).forEach(function(t){t.classList.add(r);var e=y(t,n.config.parentTrigger);null!=e&&e.classList.contains(s)?n.show(t):n.hide(t);var i=null==e?void 0:e.querySelector(n.config.triggerElement);"true"!==(null==i?void 0:i.getAttribute("aria-disabled"))&&(null!=i&&i.setAttribute("aria-expanded","false"),null!=i&&i.addEventListener("click",n.clickEvent.bind(n)),n.triggerArr.push(i))})},s.prototype.clickEvent=function(t){var e,i,n;this.disposed||((e=null==t?void 0:t.currentTarget)&&"A"===e.tagName&&t.preventDefault(),n=null==(i=y(e,this.config.parentTrigger))?void 0:i.querySelector(this.config.subMenu),this.toggle(n))},s.prototype.update=function(){this.disposed=!1,this.init()},s.prototype.dispose=function(){var e=this;this.triggerArr.forEach(function(t){t.removeEventListener("click",e.clickEvent.bind(e))}),this.disposed=!0},s.prototype.on=function(t,e,i){return this.element.addEventListener(t,e,i),this},s.prototype.off=function(t,e,i){return this.element.removeEventListener(t,e,i),this},s.prototype.emit=function(t,e,i){var n;return void 0===i&&(i=!1),"function"==typeof CustomEvent?n=new CustomEvent(t,{bubbles:i,detail:e}):(n=document.createEvent("CustomEvent")).initCustomEvent(t,i,!1,e),this.element.dispatchEvent(n),this},s.prototype.toggle=function(t){var e=y(t,this.config.parentTrigger);null!=e&&e.classList.contains(g)?this.hide(t):this.show(t)},s.prototype.show=function(t){var e,i,n,s,r,o=this,l=t,a=g,c=f,u=m,h=p,d=v;this.isTransitioning||l.classList.contains(h)||(i=function(){l.classList.remove(h),l.style.height="",l.removeEventListener("transitionend",i),o.setTransitioning(!1),o.emit("shown.metisMenu",{shownElement:l})},null!=(n=y(l,this.config.parentTrigger))&&n.classList.add(a),null!=(s=null==n?void 0:n.querySelector(this.config.triggerElement))&&s.setAttribute("aria-expanded","true"),null!=s&&s.classList.remove(u),l.style.height="0px",l.classList.remove(c),l.classList.remove(d),l.classList.add(h),r=[].slice.call(null===(e=null==n?void 0:n.parentNode)||void 0===e?void 0:e.children).filter(function(t){return t!==n}),this.config.toggle&&0<r.length&&r.forEach(function(t){var e=t.querySelector(o.config.subMenu);e&&o.hide(e)}),this.setTransitioning(!0),l.classList.add(c),l.classList.add(d),l.style.height=l.scrollHeight+"px",this.emit("show.metisMenu",{showElement:l}),l.addEventListener("transitionend",i))},s.prototype.hide=function(t){var e,i,n,s=this,r=g,o=f,l=m,a=p,c=v,u=t;!this.isTransitioning&&u.classList.contains(c)&&(this.emit("hide.metisMenu",{hideElement:u}),null!=(e=y(u,this.config.parentTrigger))&&e.classList.remove(r),i=function(){u.classList.remove(a),u.classList.add(o),u.style.height="",u.removeEventListener("transitionend",i),s.setTransitioning(!1),s.emit("hidden.metisMenu",{hiddenElement:u})},u.style.height=u.getBoundingClientRect().height+"px",u.style.height=u.offsetHeight+"px",u.classList.add(a),u.classList.remove(o),u.classList.remove(c),this.setTransitioning(!0),u.addEventListener("transitionend",i),u.style.height="0px",null!=(n=null==e?void 0:e.querySelector(this.config.triggerElement))&&n.setAttribute("aria-expanded","false"),null!=n&&n.classList.add(l))},s.prototype.setTransitioning=function(t){this.isTransitioning=t},s.isElement=function(t){return Boolean(t.classList)},s});

/**
 * alpinejs - v2.8.1
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Alpine=t()}(this,(function(){"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function n(n){for(var i=1;i<arguments.length;i++){var r=null!=arguments[i]?arguments[i]:{};i%2?t(Object(r),!0).forEach((function(t){e(n,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}function i(e){return Array.from(new Set(e))}function r(){return navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom")}function s(e,t){return e==t}function o(e,t){"template"!==e.tagName.toLowerCase()?console.warn(`Alpine: [${t}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${t}`):1!==e.content.childElementCount&&console.warn(`Alpine: <template> tag with [${t}] encountered with an unexpected number of root elements. Make sure <template> has a single root element. `)}function a(e){return e.toLowerCase().replace(/-(\w)/g,((e,t)=>t.toUpperCase()))}function l(e,t){if(!1===t(e))return;let n=e.firstElementChild;for(;n;)l(n,t),n=n.nextElementSibling}function c(e,t){var n;return function(){var i=this,r=arguments,s=function(){n=null,e.apply(i,r)};clearTimeout(n),n=setTimeout(s,t)}}const u=(e,t,n)=>{if(console.warn(`Alpine Error: "${n}"\n\nExpression: "${t}"\nElement:`,e),!r())throw Object.assign(n,{el:e,expression:t}),n};function d(e,{el:t,expression:n}){try{const i=e();return i instanceof Promise?i.catch((e=>u(t,n,e))):i}catch(e){u(t,n,e)}}function f(e,t,n,i={}){return d((()=>"function"==typeof t?t.call(n):new Function(["$data",...Object.keys(i)],`var __alpine_result; with($data) { __alpine_result = ${t} }; return __alpine_result`)(n,...Object.values(i))),{el:e,expression:t})}const m=/^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;function p(e){const t=y(e.name);return m.test(t)}function h(e,t,n){let i=Array.from(e.attributes).filter(p).map(v),r=i.filter((e=>"spread"===e.type))[0];if(r){let n=f(e,r.expression,t.$data);i=i.concat(Object.entries(n).map((([e,t])=>v({name:e,value:t}))))}return n?i.filter((e=>e.type===n)):function(e){let t=["bind","model","show","catch-all"];return e.sort(((e,n)=>{let i=-1===t.indexOf(e.type)?"catch-all":e.type,r=-1===t.indexOf(n.type)?"catch-all":n.type;return t.indexOf(i)-t.indexOf(r)}))}(i)}function v({name:e,value:t}){const n=y(e),i=n.match(m),r=n.match(/:([a-zA-Z0-9\-:]+)/),s=n.match(/\.[^.\]]+(?=[^\]]*$)/g)||[];return{type:i?i[1]:null,value:r?r[1]:null,modifiers:s.map((e=>e.replace(".",""))),expression:t}}function y(e){return e.startsWith("@")?e.replace("@","x-on:"):e.startsWith(":")?e.replace(":","x-bind:"):e}function b(e,t=Boolean){return e.split(" ").filter(t)}const g="in",x="out",_="cancelled";function w(e,t,n,i,r=!1){if(r)return t();if(e.__x_transition&&e.__x_transition.type===g)return;const s=h(e,i,"transition"),o=h(e,i,"show")[0];if(o&&o.modifiers.includes("transition")){let i=o.modifiers;if(i.includes("out")&&!i.includes("in"))return t();const r=i.includes("in")&&i.includes("out");i=r?i.filter(((e,t)=>t<i.indexOf("out"))):i,function(e,t,n,i){const r={duration:O(t,"duration",150),origin:O(t,"origin","center"),first:{opacity:0,scale:O(t,"scale",95)},second:{opacity:1,scale:100}};k(e,t,n,(()=>{}),i,r,g)}(e,i,t,n)}else s.some((e=>["enter","enter-start","enter-end"].includes(e.value)))?function(e,t,n,i,r){const s=b(A((n.find((e=>"enter"===e.value))||{expression:""}).expression,e,t)),o=b(A((n.find((e=>"enter-start"===e.value))||{expression:""}).expression,e,t)),a=b(A((n.find((e=>"enter-end"===e.value))||{expression:""}).expression,e,t));S(e,s,o,a,i,(()=>{}),g,r)}(e,i,s,t,n):t()}function E(e,t,n,i,r=!1){if(r)return t();if(e.__x_transition&&e.__x_transition.type===x)return;const s=h(e,i,"transition"),o=h(e,i,"show")[0];if(o&&o.modifiers.includes("transition")){let i=o.modifiers;if(i.includes("in")&&!i.includes("out"))return t();const r=i.includes("in")&&i.includes("out");i=r?i.filter(((e,t)=>t>i.indexOf("out"))):i,function(e,t,n,i,r){const s={duration:n?O(t,"duration",150):O(t,"duration",150)/2,origin:O(t,"origin","center"),first:{opacity:1,scale:100},second:{opacity:0,scale:O(t,"scale",95)}};k(e,t,(()=>{}),i,r,s,x)}(e,i,r,t,n)}else s.some((e=>["leave","leave-start","leave-end"].includes(e.value)))?function(e,t,n,i,r){const s=b(A((n.find((e=>"leave"===e.value))||{expression:""}).expression,e,t)),o=b(A((n.find((e=>"leave-start"===e.value))||{expression:""}).expression,e,t)),a=b(A((n.find((e=>"leave-end"===e.value))||{expression:""}).expression,e,t));S(e,s,o,a,(()=>{}),i,x,r)}(e,i,s,t,n):t()}function O(e,t,n){if(-1===e.indexOf(t))return n;const i=e[e.indexOf(t)+1];if(!i)return n;if("scale"===t&&!P(i))return n;if("duration"===t){let e=i.match(/([0-9]+)ms/);if(e)return e[1]}return"origin"===t&&["top","right","left","center","bottom"].includes(e[e.indexOf(t)+2])?[i,e[e.indexOf(t)+2]].join(" "):i}function k(e,t,n,i,r,s,o){e.__x_transition&&e.__x_transition.cancel&&e.__x_transition.cancel();const a=e.style.opacity,l=e.style.transform,c=e.style.transformOrigin,u=!t.includes("opacity")&&!t.includes("scale"),d=u||t.includes("opacity"),f=u||t.includes("scale"),m={start(){d&&(e.style.opacity=s.first.opacity),f&&(e.style.transform=`scale(${s.first.scale/100})`)},during(){f&&(e.style.transformOrigin=s.origin),e.style.transitionProperty=[d?"opacity":"",f?"transform":""].join(" ").trim(),e.style.transitionDuration=s.duration/1e3+"s",e.style.transitionTimingFunction="cubic-bezier(0.4, 0.0, 0.2, 1)"},show(){n()},end(){d&&(e.style.opacity=s.second.opacity),f&&(e.style.transform=`scale(${s.second.scale/100})`)},hide(){i()},cleanup(){d&&(e.style.opacity=a),f&&(e.style.transform=l),f&&(e.style.transformOrigin=c),e.style.transitionProperty=null,e.style.transitionDuration=null,e.style.transitionTimingFunction=null}};$(e,m,o,r)}const A=(e,t,n)=>"function"==typeof e?n.evaluateReturnExpression(t,e):e;function S(e,t,n,i,r,s,o,a){e.__x_transition&&e.__x_transition.cancel&&e.__x_transition.cancel();const l=e.__x_original_classes||[],c={start(){e.classList.add(...n)},during(){e.classList.add(...t)},show(){r()},end(){e.classList.remove(...n.filter((e=>!l.includes(e)))),e.classList.add(...i)},hide(){s()},cleanup(){e.classList.remove(...t.filter((e=>!l.includes(e)))),e.classList.remove(...i.filter((e=>!l.includes(e))))}};$(e,c,o,a)}function $(e,t,n,i){const r=C((()=>{t.hide(),e.isConnected&&t.cleanup(),delete e.__x_transition}));e.__x_transition={type:n,cancel:C((()=>{i(_),r()})),finish:r,nextFrame:null},t.start(),t.during(),e.__x_transition.nextFrame=requestAnimationFrame((()=>{let n=1e3*Number(getComputedStyle(e).transitionDuration.replace(/,.*/,"").replace("s",""));0===n&&(n=1e3*Number(getComputedStyle(e).animationDuration.replace("s",""))),t.show(),e.__x_transition.nextFrame=requestAnimationFrame((()=>{t.end(),setTimeout(e.__x_transition.finish,n)}))}))}function P(e){return!Array.isArray(e)&&!isNaN(e)}function C(e){let t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}function j(e,t,i,r,s){o(t,"x-for");let a=D("function"==typeof i?e.evaluateReturnExpression(t,i):i),l=function(e,t,n,i){let r=h(t,e,"if")[0];if(r&&!e.evaluateReturnExpression(t,r.expression))return[];let s=e.evaluateReturnExpression(t,n.items,i);P(s)&&s>=0&&(s=Array.from(Array(s).keys(),(e=>e+1)));return s}(e,t,a,s),c=t;l.forEach(((i,o)=>{let u=function(e,t,i,r,s){let o=s?n({},s):{};o[e.item]=t,e.index&&(o[e.index]=i);e.collection&&(o[e.collection]=r);return o}(a,i,o,l,s()),d=function(e,t,n,i){let r=h(t,e,"bind").filter((e=>"key"===e.value))[0];return r?e.evaluateReturnExpression(t,r.expression,(()=>i)):n}(e,t,o,u),f=function(e,t){if(!e)return;if(void 0===e.__x_for_key)return;if(e.__x_for_key===t)return e;let n=e;for(;n;){if(n.__x_for_key===t)return n.parentElement.insertBefore(n,e);n=!(!n.nextElementSibling||void 0===n.nextElementSibling.__x_for_key)&&n.nextElementSibling}}(c.nextElementSibling,d);f?(delete f.__x_for_key,f.__x_for=u,e.updateElements(f,(()=>f.__x_for))):(f=function(e,t){let n=document.importNode(e.content,!0);return t.parentElement.insertBefore(n,t.nextElementSibling),t.nextElementSibling}(t,c),w(f,(()=>{}),(()=>{}),e,r),f.__x_for=u,e.initializeElements(f,(()=>f.__x_for))),c=f,c.__x_for_key=d})),function(e,t){var n=!(!e.nextElementSibling||void 0===e.nextElementSibling.__x_for_key)&&e.nextElementSibling;for(;n;){let e=n,i=n.nextElementSibling;E(n,(()=>{e.remove()}),(()=>{}),t),n=!(!i||void 0===i.__x_for_key)&&i}}(c,e)}function D(e){let t=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,n=String(e).match(/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/);if(!n)return;let i={};i.items=n[2].trim();let r=n[1].trim().replace(/^\(|\)$/g,""),s=r.match(t);return s?(i.item=r.replace(t,"").trim(),i.index=s[1].trim(),s[2]&&(i.collection=s[2].trim())):i.item=r,i}function T(e,t,n,r,o,l,c){var u=e.evaluateReturnExpression(t,r,o);if("value"===n){if(ge.ignoreFocusedForValueBinding&&document.activeElement.isSameNode(t))return;if(void 0===u&&String(r).match(/\./)&&(u=""),"radio"===t.type)void 0===t.attributes.value&&"bind"===l?t.value=u:"bind"!==l&&(t.checked=s(t.value,u));else if("checkbox"===t.type)"boolean"==typeof u||[null,void 0].includes(u)||"bind"!==l?"bind"!==l&&(Array.isArray(u)?t.checked=u.some((e=>s(e,t.value))):t.checked=!!u):t.value=String(u);else if("SELECT"===t.tagName)!function(e,t){const n=[].concat(t).map((e=>e+""));Array.from(e.options).forEach((e=>{e.selected=n.includes(e.value||e.text)}))}(t,u);else{if(t.value===u)return;t.value=u}}else if("class"===n)if(Array.isArray(u)){const e=t.__x_original_classes||[];t.setAttribute("class",i(e.concat(u)).join(" "))}else if("object"==typeof u){Object.keys(u).sort(((e,t)=>u[e]-u[t])).forEach((e=>{u[e]?b(e).forEach((e=>t.classList.add(e))):b(e).forEach((e=>t.classList.remove(e)))}))}else{const e=t.__x_original_classes||[],n=u?b(u):[];t.setAttribute("class",i(e.concat(n)).join(" "))}else n=c.includes("camel")?a(n):n,[null,void 0,!1].includes(u)?t.removeAttribute(n):!function(e){return["disabled","checked","required","readonly","hidden","open","selected","autofocus","itemscope","multiple","novalidate","allowfullscreen","allowpaymentrequest","formnovalidate","autoplay","controls","loop","muted","playsinline","default","ismap","reversed","async","defer","nomodule"].includes(e)}(n)?L(t,n,u):L(t,n,n)}function L(e,t,n){e.getAttribute(t)!=n&&e.setAttribute(t,n)}function N(e,t,n,i,r,s={}){const o={passive:i.includes("passive")};let l,u;if(i.includes("camel")&&(n=a(n)),i.includes("away")?(u=document,l=a=>{t.contains(a.target)||t.offsetWidth<1&&t.offsetHeight<1||(z(e,r,a,s),i.includes("once")&&document.removeEventListener(n,l,o))}):(u=i.includes("window")?window:i.includes("document")?document:t,l=a=>{if(u!==window&&u!==document||document.body.contains(t)){if(!(function(e){return["keydown","keyup"].includes(e)}(n)&&function(e,t){let n=t.filter((e=>!["window","document","prevent","stop"].includes(e)));if(n.includes("debounce")){let e=n.indexOf("debounce");n.splice(e,P((n[e+1]||"invalid-wait").split("ms")[0])?2:1)}if(0===n.length)return!1;if(1===n.length&&n[0]===R(e.key))return!1;const i=["ctrl","shift","alt","meta","cmd","super"].filter((e=>n.includes(e)));if(n=n.filter((e=>!i.includes(e))),i.length>0){if(i.filter((t=>("cmd"!==t&&"super"!==t||(t="meta"),e[t+"Key"]))).length===i.length&&n[0]===R(e.key))return!1}return!0}(a,i)||(i.includes("prevent")&&a.preventDefault(),i.includes("stop")&&a.stopPropagation(),i.includes("self")&&a.target!==t))){z(e,r,a,s).then((e=>{!1===e?a.preventDefault():i.includes("once")&&u.removeEventListener(n,l,o)}))}}else u.removeEventListener(n,l,o)}),i.includes("debounce")){let e=i[i.indexOf("debounce")+1]||"invalid-wait",t=P(e.split("ms")[0])?Number(e.split("ms")[0]):250;l=c(l,t)}u.addEventListener(n,l,o)}function z(e,t,i,r){return e.evaluateCommandExpression(i.target,t,(()=>n(n({},r()),{},{$event:i})))}function R(e){switch(e){case"/":return"slash";case" ":case"Spacebar":return"space";default:return e&&e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase()}}function F(e,t,n){return"radio"===e.type&&(e.hasAttribute("name")||e.setAttribute("name",n)),(n,i)=>{if(n instanceof CustomEvent&&n.detail)return n.detail;if("checkbox"===e.type){if(Array.isArray(i)){const e=t.includes("number")?I(n.target.value):n.target.value;return n.target.checked?i.concat([e]):i.filter((t=>!s(t,e)))}return n.target.checked}if("select"===e.tagName.toLowerCase()&&e.multiple)return t.includes("number")?Array.from(n.target.selectedOptions).map((e=>I(e.value||e.text))):Array.from(n.target.selectedOptions).map((e=>e.value||e.text));{const e=n.target.value;return t.includes("number")?I(e):t.includes("trim")?e.trim():e}}}function I(e){const t=e?parseFloat(e):null;return P(t)?t:e}const{isArray:M}=Array,{getPrototypeOf:B,create:q,defineProperty:U,defineProperties:W,isExtensible:K,getOwnPropertyDescriptor:G,getOwnPropertyNames:H,getOwnPropertySymbols:V,preventExtensions:Z,hasOwnProperty:J}=Object,{push:Q,concat:X,map:Y}=Array.prototype;function ee(e){return void 0===e}function te(e){return"function"==typeof e}const ne=new WeakMap;function ie(e,t){ne.set(e,t)}const re=e=>ne.get(e)||e;function se(e,t){return e.valueIsObservable(t)?e.getProxy(t):t}function oe(e,t,n){X.call(H(n),V(n)).forEach((i=>{let r=G(n,i);r.configurable||(r=ve(e,r,se)),U(t,i,r)})),Z(t)}class ae{constructor(e,t){this.originalTarget=t,this.membrane=e}get(e,t){const{originalTarget:n,membrane:i}=this,r=n[t],{valueObserved:s}=i;return s(n,t),i.getProxy(r)}set(e,t,n){const{originalTarget:i,membrane:{valueMutated:r}}=this;return i[t]!==n?(i[t]=n,r(i,t)):"length"===t&&M(i)&&r(i,t),!0}deleteProperty(e,t){const{originalTarget:n,membrane:{valueMutated:i}}=this;return delete n[t],i(n,t),!0}apply(e,t,n){}construct(e,t,n){}has(e,t){const{originalTarget:n,membrane:{valueObserved:i}}=this;return i(n,t),t in n}ownKeys(e){const{originalTarget:t}=this;return X.call(H(t),V(t))}isExtensible(e){const t=K(e);if(!t)return t;const{originalTarget:n,membrane:i}=this,r=K(n);return r||oe(i,e,n),r}setPrototypeOf(e,t){}getPrototypeOf(e){const{originalTarget:t}=this;return B(t)}getOwnPropertyDescriptor(e,t){const{originalTarget:n,membrane:i}=this,{valueObserved:r}=this.membrane;r(n,t);let s=G(n,t);if(ee(s))return s;const o=G(e,t);return ee(o)?(s=ve(i,s,se),s.configurable||U(e,t,s),s):o}preventExtensions(e){const{originalTarget:t,membrane:n}=this;return oe(n,e,t),Z(t),!0}defineProperty(e,t,n){const{originalTarget:i,membrane:r}=this,{valueMutated:s}=r,{configurable:o}=n;if(J.call(n,"writable")&&!J.call(n,"value")){const e=G(i,t);n.value=e.value}return U(i,t,function(e){return J.call(e,"value")&&(e.value=re(e.value)),e}(n)),!1===o&&U(e,t,ve(r,n,se)),s(i,t),!0}}function le(e,t){return e.valueIsObservable(t)?e.getReadOnlyProxy(t):t}class ce{constructor(e,t){this.originalTarget=t,this.membrane=e}get(e,t){const{membrane:n,originalTarget:i}=this,r=i[t],{valueObserved:s}=n;return s(i,t),n.getReadOnlyProxy(r)}set(e,t,n){return!1}deleteProperty(e,t){return!1}apply(e,t,n){}construct(e,t,n){}has(e,t){const{originalTarget:n,membrane:{valueObserved:i}}=this;return i(n,t),t in n}ownKeys(e){const{originalTarget:t}=this;return X.call(H(t),V(t))}setPrototypeOf(e,t){}getOwnPropertyDescriptor(e,t){const{originalTarget:n,membrane:i}=this,{valueObserved:r}=i;r(n,t);let s=G(n,t);if(ee(s))return s;const o=G(e,t);return ee(o)?(s=ve(i,s,le),J.call(s,"set")&&(s.set=void 0),s.configurable||U(e,t,s),s):o}preventExtensions(e){return!1}defineProperty(e,t,n){return!1}}function ue(e){let t=void 0;return M(e)?t=[]:"object"==typeof e&&(t={}),t}const de=Object.prototype;function fe(e){if(null===e)return!1;if("object"!=typeof e)return!1;if(M(e))return!0;const t=B(e);return t===de||null===t||null===B(t)}const me=(e,t)=>{},pe=(e,t)=>{},he=e=>e;function ve(e,t,n){const{set:i,get:r}=t;return J.call(t,"value")?t.value=n(e,t.value):(ee(r)||(t.get=function(){return n(e,r.call(re(this)))}),ee(i)||(t.set=function(t){i.call(re(this),e.unwrapProxy(t))})),t}class ye{constructor(e){if(this.valueDistortion=he,this.valueMutated=pe,this.valueObserved=me,this.valueIsObservable=fe,this.objectGraph=new WeakMap,!ee(e)){const{valueDistortion:t,valueMutated:n,valueObserved:i,valueIsObservable:r}=e;this.valueDistortion=te(t)?t:he,this.valueMutated=te(n)?n:pe,this.valueObserved=te(i)?i:me,this.valueIsObservable=te(r)?r:fe}}getProxy(e){const t=re(e),n=this.valueDistortion(t);if(this.valueIsObservable(n)){const i=this.getReactiveState(t,n);return i.readOnly===e?e:i.reactive}return n}getReadOnlyProxy(e){e=re(e);const t=this.valueDistortion(e);return this.valueIsObservable(t)?this.getReactiveState(e,t).readOnly:t}unwrapProxy(e){return re(e)}getReactiveState(e,t){const{objectGraph:n}=this;let i=n.get(t);if(i)return i;const r=this;return i={get reactive(){const n=new ae(r,t),i=new Proxy(ue(t),n);return ie(i,e),U(this,"reactive",{value:i}),i},get readOnly(){const n=new ce(r,t),i=new Proxy(ue(t),n);return ie(i,e),U(this,"readOnly",{value:i}),i}},n.set(t,i),i}}class be{constructor(e,t=null){this.$el=e;const n=this.$el.getAttribute("x-data"),i=""===n?"{}":n,r=this.$el.getAttribute("x-init");let s={$el:this.$el},o=t?t.$el:this.$el;Object.entries(ge.magicProperties).forEach((([e,t])=>{Object.defineProperty(s,"$"+e,{get:function(){return t(o)}})})),this.unobservedData=t?t.getUnobservedData():f(e,i,s);let{membrane:a,data:l}=this.wrapDataInObservable(this.unobservedData);var c;this.$data=l,this.membrane=a,this.unobservedData.$el=this.$el,this.unobservedData.$refs=this.getRefsProxy(),this.nextTickStack=[],this.unobservedData.$nextTick=e=>{this.nextTickStack.push(e)},this.watchers={},this.unobservedData.$watch=(e,t)=>{this.watchers[e]||(this.watchers[e]=[]),this.watchers[e].push(t)},Object.entries(ge.magicProperties).forEach((([e,t])=>{Object.defineProperty(this.unobservedData,"$"+e,{get:function(){return t(o,this.$el)}})})),this.showDirectiveStack=[],this.showDirectiveLastElement,t||ge.onBeforeComponentInitializeds.forEach((e=>e(this))),r&&!t&&(this.pauseReactivity=!0,c=this.evaluateReturnExpression(this.$el,r),this.pauseReactivity=!1),this.initializeElements(this.$el,(()=>{}),!t),this.listenForNewElementsToInitialize(),"function"==typeof c&&c.call(this.$data),t||setTimeout((()=>{ge.onComponentInitializeds.forEach((e=>e(this)))}),0)}getUnobservedData(){return function(e,t){let n=e.unwrapProxy(t),i={};return Object.keys(n).forEach((e=>{["$el","$refs","$nextTick","$watch"].includes(e)||(i[e]=n[e])})),i}(this.membrane,this.$data)}wrapDataInObservable(e){var t=this;let n=c((function(){t.updateElements(t.$el)}),0);return function(e,t){let n=new ye({valueMutated(e,n){t(e,n)}});return{data:n.getProxy(e),membrane:n}}(e,((e,i)=>{t.watchers[i]?t.watchers[i].forEach((t=>t(e[i]))):Array.isArray(e)?Object.keys(t.watchers).forEach((n=>{let r=n.split(".");"length"!==i&&r.reduce(((i,r)=>(Object.is(e,i[r])&&t.watchers[n].forEach((t=>t(e))),i[r])),t.unobservedData)})):Object.keys(t.watchers).filter((e=>e.includes("."))).forEach((n=>{let r=n.split(".");i===r[r.length-1]&&r.reduce(((r,s)=>(Object.is(e,r)&&t.watchers[n].forEach((t=>t(e[i]))),r[s])),t.unobservedData)})),t.pauseReactivity||n()}))}walkAndSkipNestedComponents(e,t,n=(()=>{})){l(e,(e=>e.hasAttribute("x-data")&&!e.isSameNode(this.$el)?(e.__x||n(e),!1):t(e)))}initializeElements(e,t=(()=>{}),n=!0){this.walkAndSkipNestedComponents(e,(e=>void 0===e.__x_for_key&&(void 0===e.__x_inserted_me&&void this.initializeElement(e,t,n))),(e=>{e.__x=new be(e)})),this.executeAndClearRemainingShowDirectiveStack(),this.executeAndClearNextTickStack(e)}initializeElement(e,t,n=!0){e.hasAttribute("class")&&h(e,this).length>0&&(e.__x_original_classes=b(e.getAttribute("class"))),n&&this.registerListeners(e,t),this.resolveBoundAttributes(e,!0,t)}updateElements(e,t=(()=>{})){this.walkAndSkipNestedComponents(e,(e=>{if(void 0!==e.__x_for_key&&!e.isSameNode(this.$el))return!1;this.updateElement(e,t)}),(e=>{e.__x=new be(e)})),this.executeAndClearRemainingShowDirectiveStack(),this.executeAndClearNextTickStack(e)}executeAndClearNextTickStack(e){e===this.$el&&this.nextTickStack.length>0&&requestAnimationFrame((()=>{for(;this.nextTickStack.length>0;)this.nextTickStack.shift()()}))}executeAndClearRemainingShowDirectiveStack(){this.showDirectiveStack.reverse().map((e=>new Promise(((t,n)=>{e(t,n)})))).reduce(((e,t)=>e.then((()=>t.then((e=>{e()}))))),Promise.resolve((()=>{}))).catch((e=>{if(e!==_)throw e})),this.showDirectiveStack=[],this.showDirectiveLastElement=void 0}updateElement(e,t){this.resolveBoundAttributes(e,!1,t)}registerListeners(e,t){h(e,this).forEach((({type:i,value:r,modifiers:s,expression:o})=>{switch(i){case"on":N(this,e,r,s,o,t);break;case"model":!function(e,t,i,r,s){var o="select"===t.tagName.toLowerCase()||["checkbox","radio"].includes(t.type)||i.includes("lazy")?"change":"input";N(e,t,o,i,`${r} = rightSideOfExpression($event, ${r})`,(()=>n(n({},s()),{},{rightSideOfExpression:F(t,i,r)})))}(this,e,s,o,t)}}))}resolveBoundAttributes(e,t=!1,n){let i=h(e,this);i.forEach((({type:r,value:s,modifiers:a,expression:l})=>{switch(r){case"model":T(this,e,"value",l,n,r,a);break;case"bind":if("template"===e.tagName.toLowerCase()&&"key"===s)return;T(this,e,s,l,n,r,a);break;case"text":var c=this.evaluateReturnExpression(e,l,n);!function(e,t,n){void 0===t&&String(n).match(/\./)&&(t=""),e.textContent=t}(e,c,l);break;case"html":!function(e,t,n,i){t.innerHTML=e.evaluateReturnExpression(t,n,i)}(this,e,l,n);break;case"show":c=this.evaluateReturnExpression(e,l,n);!function(e,t,n,i,r=!1){const s=()=>{t.style.display="none",t.__x_is_shown=!1},o=()=>{1===t.style.length&&"none"===t.style.display?t.removeAttribute("style"):t.style.removeProperty("display"),t.__x_is_shown=!0};if(!0===r)return void(n?o():s());const a=(i,r)=>{n?(("none"===t.style.display||t.__x_transition)&&w(t,(()=>{o()}),r,e),i((()=>{}))):"none"!==t.style.display?E(t,(()=>{i((()=>{s()}))}),r,e):i((()=>{}))};i.includes("immediate")?a((e=>e()),(()=>{})):(e.showDirectiveLastElement&&!e.showDirectiveLastElement.contains(t)&&e.executeAndClearRemainingShowDirectiveStack(),e.showDirectiveStack.push(a),e.showDirectiveLastElement=t)}(this,e,c,a,t);break;case"if":if(i.some((e=>"for"===e.type)))return;c=this.evaluateReturnExpression(e,l,n);!function(e,t,n,i,r){o(t,"x-if");const s=t.nextElementSibling&&!0===t.nextElementSibling.__x_inserted_me;if(!n||s&&!t.__x_transition)!n&&s&&E(t.nextElementSibling,(()=>{t.nextElementSibling.remove()}),(()=>{}),e,i);else{const n=document.importNode(t.content,!0);t.parentElement.insertBefore(n,t.nextElementSibling),w(t.nextElementSibling,(()=>{}),(()=>{}),e,i),e.initializeElements(t.nextElementSibling,r),t.nextElementSibling.__x_inserted_me=!0}}(this,e,c,t,n);break;case"for":j(this,e,l,t,n);break;case"cloak":e.removeAttribute("x-cloak")}}))}evaluateReturnExpression(e,t,i=(()=>{})){return f(e,t,this.$data,n(n({},i()),{},{$dispatch:this.getDispatchFunction(e)}))}evaluateCommandExpression(e,t,i=(()=>{})){return function(e,t,n,i={}){return d((()=>{if("function"==typeof t)return Promise.resolve(t.call(n,i.$event));let e=Function;if(e=Object.getPrototypeOf((async function(){})).constructor,Object.keys(n).includes(t)){let e=new Function(["dataContext",...Object.keys(i)],`with(dataContext) { return ${t} }`)(n,...Object.values(i));return"function"==typeof e?Promise.resolve(e.call(n,i.$event)):Promise.resolve()}return Promise.resolve(new e(["dataContext",...Object.keys(i)],`with(dataContext) { ${t} }`)(n,...Object.values(i)))}),{el:e,expression:t})}(e,t,this.$data,n(n({},i()),{},{$dispatch:this.getDispatchFunction(e)}))}getDispatchFunction(e){return(t,n={})=>{e.dispatchEvent(new CustomEvent(t,{detail:n,bubbles:!0}))}}listenForNewElementsToInitialize(){const e=this.$el;new MutationObserver((e=>{for(let t=0;t<e.length;t++){const n=e[t].target.closest("[x-data]");if(n&&n.isSameNode(this.$el)){if("attributes"===e[t].type&&"x-data"===e[t].attributeName){const n=e[t].target.getAttribute("x-data")||"{}",i=f(this.$el,n,{$el:this.$el});Object.keys(i).forEach((e=>{this.$data[e]!==i[e]&&(this.$data[e]=i[e])}))}e[t].addedNodes.length>0&&e[t].addedNodes.forEach((e=>{1!==e.nodeType||e.__x_inserted_me||(!e.matches("[x-data]")||e.__x?this.initializeElements(e):e.__x=new be(e))}))}}})).observe(e,{childList:!0,attributes:!0,subtree:!0})}getRefsProxy(){var e=this;return new Proxy({},{get(t,n){return"$isAlpineProxy"===n||(e.walkAndSkipNestedComponents(e.$el,(e=>{e.hasAttribute("x-ref")&&e.getAttribute("x-ref")===n&&(i=e)})),i);var i}})}}const ge={version:"2.8.1",pauseMutationObserver:!1,magicProperties:{},onComponentInitializeds:[],onBeforeComponentInitializeds:[],ignoreFocusedForValueBinding:!1,start:async function(){r()||await new Promise((e=>{"loading"==document.readyState?document.addEventListener("DOMContentLoaded",e):e()})),this.discoverComponents((e=>{this.initializeComponent(e)})),document.addEventListener("turbolinks:load",(()=>{this.discoverUninitializedComponents((e=>{this.initializeComponent(e)}))})),this.listenForNewUninitializedComponentsAtRunTime()},discoverComponents:function(e){document.querySelectorAll("[x-data]").forEach((t=>{e(t)}))},discoverUninitializedComponents:function(e,t=null){const n=(t||document).querySelectorAll("[x-data]");Array.from(n).filter((e=>void 0===e.__x)).forEach((t=>{e(t)}))},listenForNewUninitializedComponentsAtRunTime:function(){const e=document.querySelector("body");new MutationObserver((e=>{if(!this.pauseMutationObserver)for(let t=0;t<e.length;t++)e[t].addedNodes.length>0&&e[t].addedNodes.forEach((e=>{1===e.nodeType&&(e.parentElement&&e.parentElement.closest("[x-data]")||this.discoverUninitializedComponents((e=>{this.initializeComponent(e)}),e.parentElement))}))})).observe(e,{childList:!0,attributes:!0,subtree:!0})},initializeComponent:function(e){if(!e.__x)try{e.__x=new be(e)}catch(e){setTimeout((()=>{throw e}),0)}},clone:function(e,t){t.__x||(t.__x=new be(t,e))},addMagicProperty:function(e,t){this.magicProperties[e]=t},onComponentInitialized:function(e){this.onComponentInitializeds.push(e)},onBeforeComponentInitialized:function(e){this.onBeforeComponentInitializeds.push(e)}};return r()||(window.Alpine=ge,window.deferLoadingAlpine?window.deferLoadingAlpine((function(){window.Alpine.start()})):window.Alpine.start()),ge}));


/**
 * maska - v1.4.1
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Maska={})}(this,(function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t,n){var a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return u(t).length>1?s(t)(e,t,n,a):l(e,t,n,a)}function u(e){try{return JSON.parse(e)}catch(t){return[e]}}function s(e){var t=u(e).sort((function(e,t){return e.length-t.length}));return function(e,a,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=t.map((function(t){return l(e,t,r,!1)})),u=o.pop();for(var s in t)if(n(u,t[s],r))return l(e,t[s],r,i);return""};function n(e,t,n){for(var a in n)n[a].escape&&(t=t.replace(new RegExp(a+".{1}","g"),""));return t.split("").filter((function(e){return n[e]&&n[e].pattern})).length>=e.length}}function l(e,t,n){for(var a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=0,i=0,o="",u="";r<t.length&&i<e.length;){var s=t[r],l=e[i],f=n[s];if(f&&f.pattern)f.pattern.test(l)&&(o+=c(l,f),r++,a&&t[r]&&!n[t[r]]&&(o+=t[r],r++)),i++;else if(f&&f.repeat){var p=n[t[r-1]];p&&!p.pattern.test(l)?r++:r--}else f&&f.escape&&(s=t[++r]),a&&(o+=s),l===s&&i++,r++}for(;a&&r<t.length;){var v=t[r];if(n[v]){u="";break}u+=v,r++}return o+u}function c(e,t){return t.transform&&(e=t.transform(e)),t.uppercase?e.toLocaleUpperCase():t.lowercase?e.toLocaleLowerCase():e}var f={"#":{pattern:/[0-9]/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,uppercase:!0},a:{pattern:/[a-zA-Z]/,lowercase:!0},"!":{escape:!0},"*":{repeat:!0}};function p(e){return e instanceof HTMLInputElement?e:e.querySelector("input")||e}function v(e){return"[object String]"===Object.prototype.toString.call(e)}var d=function(){function e(n){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t(this,e),!n)throw new Error("Maska: no element for mask");if(a.tokens)for(var r in a.tokens)a.tokens[r]=i({},a.tokens[r]),a.tokens[r].pattern&&v(a.tokens[r].pattern)&&(a.tokens[r].pattern=new RegExp(a.tokens[r].pattern));this._opts={mask:a.mask,tokens:i(i({},f),a.tokens)},this._el=v(n)?document.querySelectorAll(n):n.length?n:[n],this.init()}var a,r,u;return a=e,(r=[{key:"init",value:function(){for(var e=this,t=0;t<this._el.length;t++){var n=p(this._el[t]);!this._opts.mask||n.dataset.mask&&n.dataset.mask===this._opts.mask||(n.dataset.mask=this._opts.mask),this.updateValue(n),n.dataset.maskInited||(n.dataset.maskInited=!0,n.addEventListener("input",(function(t){return e.updateValue(t.target,t)})),n.addEventListener("beforeinput",(function(t){return e.beforeInput(t)})))}}},{key:"destroy",value:function(){for(var e=this,t=0;t<this._el.length;t++){var n=p(this._el[t]);n.removeEventListener("input",(function(t){return e.updateValue(t.target,t)})),n.removeEventListener("beforeinput",(function(t){return e.beforeInput(t)})),delete n.dataset.mask,delete n.dataset.maskInited}}},{key:"updateValue",value:function(e,t){var n=e.type.match(/^number$/i)&&e.validity.badInput;if(!e.value&&!n||!e.dataset.mask)return e.dataset.maskRawValue="",void this.dispatch("maska",e,t);var a=e.selectionEnd,r=e.value,i=r[a-1];e.dataset.maskRawValue=o(e.value,e.dataset.mask,this._opts.tokens,!1),e.value=o(e.value,e.dataset.mask,this._opts.tokens),t&&"insertText"===t.inputType&&a===r.length&&(a=e.value.length),function(e,t,n){for(;t&&t<e.value.length&&e.value.charAt(t-1)!==n;)t++;(e.type?e.type.match(/^(text|search|password|tel|url)$/i):!e.type)&&e===document.activeElement&&(e.setSelectionRange(t,t),setTimeout((function(){e.setSelectionRange(t,t)}),0))}(e,a,i),this.dispatch("maska",e,t),e.value!==r&&this.dispatch("input",e,t)}},{key:"beforeInput",value:function(e){e.target.type.match(/^number$/i)&&e.data&&isNaN(e.target.value+e.data)&&e.preventDefault()}},{key:"dispatch",value:function(e,t,n){t.dispatchEvent(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=document.createEvent("Event");return n.initEvent(e,!0,!0),t&&(n.inputType=t),n}(e,n&&n.inputType||null))}}])&&n(a.prototype,r),u&&n(a,u),e}();function h(e,t){if(t.value)return t.value&&function(e){return!(v(e.value)&&e.value===e.oldValue||Array.isArray(e.value)&&JSON.stringify(e.value)===JSON.stringify(e.oldValue)||e.value&&e.value.mask&&e.oldValue&&e.oldValue.mask&&e.value.mask===e.oldValue.mask)}(t)?new d(e,function(e){var t={};return e.mask?(t.mask=Array.isArray(e.mask)?JSON.stringify(e.mask):e.mask,t.tokens=e.tokens?i({},e.tokens):{}):t.mask=Array.isArray(e)?JSON.stringify(e):e,t}(t.value)):void 0}function k(e){e.directive("maska",h)}"undefined"!=typeof window&&window.Vue&&window.Vue.use&&window.Vue.use(k),e.create=function(e,t){return new d(e,t)},e.default=k,e.install=k,e.mask=o,e.maska=h,e.tokens=f,Object.defineProperty(e,"__esModule",{value:!0})}));

/**
 * Socket.IO v4.0.1
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()}(self,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=18)}([function(t,e,n){var r=n(24),o=n(25),i=String.fromCharCode(30);t.exports={protocol:4,encodePacket:r,encodePayload:function(t,e){var n=t.length,o=new Array(n),s=0;t.forEach((function(t,c){r(t,!1,(function(t){o[c]=t,++s===n&&e(o.join(i))}))}))},decodePacket:o,decodePayload:function(t,e){for(var n=t.split(i),r=[],s=0;s<n.length;s++){var c=o(n[s],e);if(r.push(c),"error"===c.type)break}return r}}},function(t,e,n){function r(t){if(t)return function(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}(t)}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var o=0;o<r.length;o++)if((n=r[o])===e||n.fn===e){r.splice(o,1);break}return 0===r.length&&delete this._callbacks["$"+t],this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){r=0;for(var o=(n=n.slice(0)).length;r<o;++r)n[r].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e){t.exports="undefined"!=typeof self?self:"undefined"!=typeof window?window:Function("return this")()},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=n(0),f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(a,t);var e,n,r,c=s(a);function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=c.call(this)).opts=t,e.query=t.query,e.readyState="",e.socket=t.socket,e}return e=a,(n=[{key:"onError",value:function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this}},{key:"open",value:function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this}},{key:"close",value:function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this}},{key:"send",value:function(t){"open"===this.readyState&&this.write(t)}},{key:"onOpen",value:function(){this.readyState="open",this.writable=!0,this.emit("open")}},{key:"onData",value:function(t){var e=u.decodePacket(t,this.socket.binaryType);this.onPacket(e)}},{key:"onPacket",value:function(t){this.emit("packet",t)}},{key:"onClose",value:function(){this.readyState="closed",this.emit("close")}}])&&o(e.prototype,n),r&&o(e,r),a}(n(1));t.exports=f},function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e,n){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=a(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e,n){return e&&f(t.prototype,e),n&&f(t,n),t}Object.defineProperty(e,"__esModule",{value:!0}),e.Decoder=e.Encoder=e.PacketType=e.protocol=void 0;var l,h=n(1),y=n(30),d=n(15);e.protocol=5,function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"}(l=e.PacketType||(e.PacketType={}));var v=function(){function t(){u(this,t)}return p(t,[{key:"encode",value:function(t){return t.type!==l.EVENT&&t.type!==l.ACK||!d.hasBinary(t)?[this.encodeAsString(t)]:(t.type=t.type===l.EVENT?l.BINARY_EVENT:l.BINARY_ACK,this.encodeAsBinary(t))}},{key:"encodeAsString",value:function(t){var e=""+t.type;return t.type!==l.BINARY_EVENT&&t.type!==l.BINARY_ACK||(e+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(e+=t.nsp+","),null!=t.id&&(e+=t.id),null!=t.data&&(e+=JSON.stringify(t.data)),e}},{key:"encodeAsBinary",value:function(t){var e=y.deconstructPacket(t),n=this.encodeAsString(e.packet),r=e.buffers;return r.unshift(n),r}}]),t}();e.Encoder=v;var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(n,t);var e=s(n);function n(){return u(this,n),e.call(this)}return p(n,[{key:"add",value:function(t){var e;if("string"==typeof t)(e=this.decodeString(t)).type===l.BINARY_EVENT||e.type===l.BINARY_ACK?(this.reconstructor=new m(e),0===e.attachments&&o(a(n.prototype),"emit",this).call(this,"decoded",e)):o(a(n.prototype),"emit",this).call(this,"decoded",e);else{if(!d.isBinary(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(e=this.reconstructor.takeBinaryData(t))&&(this.reconstructor=null,o(a(n.prototype),"emit",this).call(this,"decoded",e))}}},{key:"decodeString",value:function(t){var e=0,r={type:Number(t.charAt(0))};if(void 0===l[r.type])throw new Error("unknown packet type "+r.type);if(r.type===l.BINARY_EVENT||r.type===l.BINARY_ACK){for(var o=e+1;"-"!==t.charAt(++e)&&e!=t.length;);var i=t.substring(o,e);if(i!=Number(i)||"-"!==t.charAt(e))throw new Error("Illegal attachments");r.attachments=Number(i)}if("/"===t.charAt(e+1)){for(var s=e+1;++e;){if(","===t.charAt(e))break;if(e===t.length)break}r.nsp=t.substring(s,e)}else r.nsp="/";var c=t.charAt(e+1);if(""!==c&&Number(c)==c){for(var a=e+1;++e;){var u=t.charAt(e);if(null==u||Number(u)!=u){--e;break}if(e===t.length)break}r.id=Number(t.substring(a,e+1))}if(t.charAt(++e)){var f=function(t){try{return JSON.parse(t)}catch(t){return!1}}(t.substr(e));if(!n.isPayloadValid(r.type,f))throw new Error("invalid payload");r.data=f}return r}},{key:"destroy",value:function(){this.reconstructor&&this.reconstructor.finishedReconstruction()}}],[{key:"isPayloadValid",value:function(t,e){switch(t){case l.CONNECT:return"object"===r(e);case l.DISCONNECT:return void 0===e;case l.CONNECT_ERROR:return"string"==typeof e||"object"===r(e);case l.EVENT:case l.BINARY_EVENT:return Array.isArray(e)&&e.length>0;case l.ACK:case l.BINARY_ACK:return Array.isArray(e)}}}]),n}(h);e.Decoder=b;var m=function(){function t(e){u(this,t),this.packet=e,this.buffers=[],this.reconPack=e}return p(t,[{key:"takeBinaryData",value:function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=y.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}},{key:"finishedReconstruction",value:function(){this.reconPack=null,this.buffers=[]}}]),t}()},function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");-1!=o&&-1!=i&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s,c,a=n.exec(t||""),u={},f=14;f--;)u[r[f]]=a[f]||"";return-1!=o&&-1!=i&&(u.source=e,u.host=u.host.substring(1,u.host.length-1).replace(/;/g,":"),u.authority=u.authority.replace("[","").replace("]","").replace(/;/g,":"),u.ipv6uri=!0),u.pathNames=function(t,e){var n=e.replace(/\/{2,9}/g,"/").split("/");"/"!=e.substr(0,1)&&0!==e.length||n.splice(0,1);"/"==e.substr(e.length-1,1)&&n.splice(n.length-1,1);return n}(0,u.path),u.queryKey=(s=u.query,c={},s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(t,e,n){e&&(c[e]=n)})),c),u}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.Manager=void 0;var u=n(20),f=n(14),p=n(5),l=n(16),h=n(31),y=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(y,t);var e,n,c,a=s(y);function y(t,e){var n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,y),(n=a.call(this)).nsps={},n.subs=[],t&&"object"===r(t)&&(e=t,t=void 0),(e=e||{}).path=e.path||"/socket.io",n.opts=e,n.reconnection(!1!==e.reconnection),n.reconnectionAttempts(e.reconnectionAttempts||1/0),n.reconnectionDelay(e.reconnectionDelay||1e3),n.reconnectionDelayMax(e.reconnectionDelayMax||5e3),n.randomizationFactor(e.randomizationFactor||.5),n.backoff=new h({min:n.reconnectionDelay(),max:n.reconnectionDelayMax(),jitter:n.randomizationFactor()}),n.timeout(null==e.timeout?2e4:e.timeout),n._readyState="closed",n.uri=t;var o=e.parser||p;return n.encoder=new o.Encoder,n.decoder=new o.Decoder,n._autoConnect=!1!==e.autoConnect,n._autoConnect&&n.open(),n}return e=y,(n=[{key:"reconnection",value:function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection}},{key:"reconnectionAttempts",value:function(t){return void 0===t?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}},{key:"reconnectionDelay",value:function(t){var e;return void 0===t?this._reconnectionDelay:(this._reconnectionDelay=t,null===(e=this.backoff)||void 0===e||e.setMin(t),this)}},{key:"randomizationFactor",value:function(t){var e;return void 0===t?this._randomizationFactor:(this._randomizationFactor=t,null===(e=this.backoff)||void 0===e||e.setJitter(t),this)}},{key:"reconnectionDelayMax",value:function(t){var e;return void 0===t?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,null===(e=this.backoff)||void 0===e||e.setMax(t),this)}},{key:"timeout",value:function(t){return arguments.length?(this._timeout=t,this):this._timeout}},{key:"maybeReconnectOnOpen",value:function(){!this._reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()}},{key:"open",value:function(t){var e=this;if(~this._readyState.indexOf("open"))return this;this.engine=u(this.uri,this.opts);var n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;var o=l.on(n,"open",(function(){r.onopen(),t&&t()})),i=l.on(n,"error",(function(n){r.cleanup(),r._readyState="closed",e.emitReserved("error",n),t?t(n):r.maybeReconnectOnOpen()}));if(!1!==this._timeout){var s=this._timeout;0===s&&o();var c=setTimeout((function(){o(),n.close(),n.emit("error",new Error("timeout"))}),s);this.opts.autoUnref&&c.unref(),this.subs.push((function(){clearTimeout(c)}))}return this.subs.push(o),this.subs.push(i),this}},{key:"connect",value:function(t){return this.open(t)}},{key:"onopen",value:function(){this.cleanup(),this._readyState="open",this.emitReserved("open");var t=this.engine;this.subs.push(l.on(t,"ping",this.onping.bind(this)),l.on(t,"data",this.ondata.bind(this)),l.on(t,"error",this.onerror.bind(this)),l.on(t,"close",this.onclose.bind(this)),l.on(this.decoder,"decoded",this.ondecoded.bind(this)))}},{key:"onping",value:function(){this.emitReserved("ping")}},{key:"ondata",value:function(t){this.decoder.add(t)}},{key:"ondecoded",value:function(t){this.emitReserved("packet",t)}},{key:"onerror",value:function(t){this.emitReserved("error",t)}},{key:"socket",value:function(t,e){var n=this.nsps[t];return n||(n=new f.Socket(this,t,e),this.nsps[t]=n),n}},{key:"_destroy",value:function(t){for(var e=0,n=Object.keys(this.nsps);e<n.length;e++){var r=n[e];if(this.nsps[r].active)return}this._close()}},{key:"_packet",value:function(t){for(var e=this.encoder.encode(t),n=0;n<e.length;n++)this.engine.write(e[n],t.options)}},{key:"cleanup",value:function(){this.subs.forEach((function(t){return t()})),this.subs.length=0,this.decoder.destroy()}},{key:"_close",value:function(){this.skipReconnect=!0,this._reconnecting=!1,"opening"===this._readyState&&this.cleanup(),this.backoff.reset(),this._readyState="closed",this.engine&&this.engine.close()}},{key:"disconnect",value:function(){return this._close()}},{key:"onclose",value:function(t){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()}},{key:"reconnect",value:function(){var t=this;if(this._reconnecting||this.skipReconnect)return this;var e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{var n=this.backoff.duration();this._reconnecting=!0;var r=setTimeout((function(){e.skipReconnect||(t.emitReserved("reconnect_attempt",e.backoff.attempts),e.skipReconnect||e.open((function(n){n?(e._reconnecting=!1,e.reconnect(),t.emitReserved("reconnect_error",n)):e.onreconnect()})))}),n);this.opts.autoUnref&&r.unref(),this.subs.push((function(){clearTimeout(r)}))}}},{key:"onreconnect",value:function(){var t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}])&&o(e.prototype,n),c&&o(e,c),y}(n(17).StrictEventEmitter);e.Manager=y},function(t,e,n){var r=n(9),o=n(23),i=n(27),s=n(28);e.polling=function(t){var e=!1,n=!1,s=!1!==t.jsonp;if("undefined"!=typeof location){var c="https:"===location.protocol,a=location.port;a||(a=c?443:80),e=t.hostname!==location.hostname||a!==t.port,n=t.secure!==c}if(t.xdomain=e,t.xscheme=n,"open"in new r(t)&&!t.forceJSONP)return new o(t);if(!s)throw new Error("JSONP disabled");return new i(t)},e.websocket=s},function(t,e,n){var r=n(22),o=n(2);t.exports=function(t){var e=t.xdomain,n=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!e||r))return new XMLHttpRequest}catch(t){}try{if("undefined"!=typeof XDomainRequest&&!n&&i)return new XDomainRequest}catch(t){}if(!e)try{return new(o[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=n(3),p=n(4),l=n(0),h=n(12),y=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(u,t);var e,n,r,a=c(u);function u(){return o(this,u),a.apply(this,arguments)}return e=u,(n=[{key:"doOpen",value:function(){this.poll()}},{key:"pause",value:function(t){var e=this;function n(){e.readyState="paused",t()}if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(r++,this.once("pollComplete",(function(){--r||n()}))),this.writable||(r++,this.once("drain",(function(){--r||n()})))}else n()}},{key:"poll",value:function(){this.polling=!0,this.doPoll(),this.emit("poll")}},{key:"onData",value:function(t){var e=this;l.decodePayload(t,this.socket.binaryType).forEach((function(t,n,r){if("opening"===e.readyState&&"open"===t.type&&e.onOpen(),"close"===t.type)return e.onClose(),!1;e.onPacket(t)})),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState&&this.poll())}},{key:"doClose",value:function(){var t=this;function e(){t.write([{type:"close"}])}"open"===this.readyState?e():this.once("open",e)}},{key:"write",value:function(t){var e=this;this.writable=!1,l.encodePayload(t,(function(t){e.doWrite(t,(function(){e.writable=!0,e.emit("drain")}))}))}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"https":"http",n="";return!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=h()),this.supportsBinary||t.sid||(t.b64=1),t=p.encode(t),this.opts.port&&("https"===e&&443!==Number(this.opts.port)||"http"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port),t.length&&(t="?"+t),e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+t}},{key:"name",get:function(){return"polling"}}])&&i(e.prototype,n),r&&i(e,r),u}(f);t.exports=y},function(t,e){var n=Object.create(null);n.open="0",n.close="1",n.ping="2",n.pong="3",n.message="4",n.upgrade="5",n.noop="6";var r=Object.create(null);Object.keys(n).forEach((function(t){r[n[t]]=t}));t.exports={PACKET_TYPES:n,PACKET_TYPES_REVERSE:r,ERROR_PACKET:{type:"error",data:"parser error"}}},function(t,e,n){"use strict";var r,o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),i={},s=0,c=0;function a(t){var e="";do{e=o[t%64]+e,t=Math.floor(t/64)}while(t>0);return e}function u(){var t=a(+new Date);return t!==r?(s=0,r=t):t+"."+a(s++)}for(;c<64;c++)i[o[c]]=c;u.encode=a,u.decode=function(t){var e=0;for(c=0;c<t.length;c++)e=64*e+i[t.charAt(c)];return e},t.exports=u},function(t,e){t.exports.pick=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.reduce((function(e,n){return t.hasOwnProperty(n)&&(e[n]=t[n]),e}),{})}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,c=!0,a=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){a=!0,s=t},f:function(){try{c||null==n.return||n.return()}finally{if(a)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=p(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=p(t);if(e){var o=p(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.Socket=void 0;var l=n(5),h=n(16),y=n(17),d=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(f,t);var e,n,r,i=u(f);function f(t,e,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),(r=i.call(this)).receiveBuffer=[],r.sendBuffer=[],r.ids=0,r.acks={},r.flags={},r.io=t,r.nsp=e,r.ids=0,r.acks={},r.receiveBuffer=[],r.sendBuffer=[],r.connected=!1,r.disconnected=!0,r.flags={},n&&n.auth&&(r.auth=n.auth),r.io._autoConnect&&r.open(),r}return e=f,(n=[{key:"subEvents",value:function(){if(!this.subs){var t=this.io;this.subs=[h.on(t,"open",this.onopen.bind(this)),h.on(t,"packet",this.onpacket.bind(this)),h.on(t,"error",this.onerror.bind(this)),h.on(t,"close",this.onclose.bind(this))]}}},{key:"connect",value:function(){return this.connected||(this.subEvents(),this.io._reconnecting||this.io.open(),"open"===this.io._readyState&&this.onopen()),this}},{key:"open",value:function(){return this.connect()}},{key:"send",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.unshift("message"),this.emit.apply(this,e),this}},{key:"emit",value:function(t){if(d.hasOwnProperty(t))throw new Error('"'+t+'" is a reserved event name');for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];n.unshift(t);var o={type:l.PacketType.EVENT,data:n,options:{}};o.options.compress=!1!==this.flags.compress,"function"==typeof n[n.length-1]&&(this.acks[this.ids]=n.pop(),o.id=this.ids++);var i=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable,s=this.flags.volatile&&(!i||!this.connected);return s||(this.connected?this.packet(o):this.sendBuffer.push(o)),this.flags={},this}},{key:"packet",value:function(t){t.nsp=this.nsp,this.io._packet(t)}},{key:"onopen",value:function(){var t=this;"function"==typeof this.auth?this.auth((function(e){t.packet({type:l.PacketType.CONNECT,data:e})})):this.packet({type:l.PacketType.CONNECT,data:this.auth})}},{key:"onerror",value:function(t){this.connected||this.emitReserved("connect_error",t)}},{key:"onclose",value:function(t){this.connected=!1,this.disconnected=!0,delete this.id,this.emitReserved("disconnect",t)}},{key:"onpacket",value:function(t){if(t.nsp===this.nsp)switch(t.type){case l.PacketType.CONNECT:if(t.data&&t.data.sid){var e=t.data.sid;this.onconnect(e)}else this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case l.PacketType.EVENT:case l.PacketType.BINARY_EVENT:this.onevent(t);break;case l.PacketType.ACK:case l.PacketType.BINARY_ACK:this.onack(t);break;case l.PacketType.DISCONNECT:this.ondisconnect();break;case l.PacketType.CONNECT_ERROR:var n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n)}}},{key:"onevent",value:function(t){var e=t.data||[];null!=t.id&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}},{key:"emitEvent",value:function(t){if(this._anyListeners&&this._anyListeners.length){var e,n=o(this._anyListeners.slice());try{for(n.s();!(e=n.n()).done;)e.value.apply(this,t)}catch(t){n.e(t)}finally{n.f()}}c(p(f.prototype),"emit",this).apply(this,t)}},{key:"ack",value:function(t){var e=this,n=!1;return function(){if(!n){n=!0;for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];e.packet({type:l.PacketType.ACK,id:t,data:o})}}}},{key:"onack",value:function(t){var e=this.acks[t.id];"function"==typeof e&&(e.apply(this,t.data),delete this.acks[t.id])}},{key:"onconnect",value:function(t){this.id=t,this.connected=!0,this.disconnected=!1,this.emitReserved("connect"),this.emitBuffered()}},{key:"emitBuffered",value:function(){var t=this;this.receiveBuffer.forEach((function(e){return t.emitEvent(e)})),this.receiveBuffer=[],this.sendBuffer.forEach((function(e){return t.packet(e)})),this.sendBuffer=[]}},{key:"ondisconnect",value:function(){this.destroy(),this.onclose("io server disconnect")}},{key:"destroy",value:function(){this.subs&&(this.subs.forEach((function(t){return t()})),this.subs=void 0),this.io._destroy(this)}},{key:"disconnect",value:function(){return this.connected&&this.packet({type:l.PacketType.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}},{key:"close",value:function(){return this.disconnect()}},{key:"compress",value:function(t){return this.flags.compress=t,this}},{key:"onAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}},{key:"prependAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}},{key:"offAny",value:function(t){if(!this._anyListeners)return this;if(t){for(var e=this._anyListeners,n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyListeners=[];return this}},{key:"listenersAny",value:function(){return this._anyListeners||[]}},{key:"active",get:function(){return!!this.subs}},{key:"volatile",get:function(){return this.flags.volatile=!0,this}}])&&s(e.prototype,n),r&&s(e,r),f}(y.StrictEventEmitter);e.Socket=v},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.hasBinary=e.isBinary=void 0;var o="function"==typeof ArrayBuffer,i=Object.prototype.toString,s="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===i.call(Blob),c="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===i.call(File);function a(t){return o&&(t instanceof ArrayBuffer||function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer}(t))||s&&t instanceof Blob||c&&t instanceof File}e.isBinary=a,e.hasBinary=function t(e,n){if(!e||"object"!==r(e))return!1;if(Array.isArray(e)){for(var o=0,i=e.length;o<i;o++)if(t(e[o]))return!0;return!1}if(a(e))return!0;if(e.toJSON&&"function"==typeof e.toJSON&&1===arguments.length)return t(e.toJSON(),!0);for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)&&t(e[s]))return!0;return!1}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.on=void 0,e.on=function(t,e,n){return t.on(e,n),function(){t.off(e,n)}}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return(s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)}}function u(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.StrictEventEmitter=void 0;var p=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(p,t);var e,n,r,u=a(p);function p(){return o(this,p),u.apply(this,arguments)}return e=p,(n=[{key:"on",value:function(t,e){return s(f(p.prototype),"on",this).call(this,t,e),this}},{key:"once",value:function(t,e){return s(f(p.prototype),"once",this).call(this,t,e),this}},{key:"emit",value:function(t){for(var e,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(e=s(f(p.prototype),"emit",this)).call.apply(e,[this,t].concat(r)),this}},{key:"emitReserved",value:function(t){for(var e,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return(e=s(f(p.prototype),"emit",this)).call.apply(e,[this,t].concat(r)),this}},{key:"listeners",value:function(t){return s(f(p.prototype),"listeners",this).call(this,t)}}])&&i(e.prototype,n),r&&i(e,r),p}(n(1));e.StrictEventEmitter=p},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.Socket=e.io=e.Manager=e.protocol=void 0;var o=n(19),i=n(7),s=n(14);Object.defineProperty(e,"Socket",{enumerable:!0,get:function(){return s.Socket}}),t.exports=e=a;var c=e.managers={};function a(t,e){"object"===r(t)&&(e=t,t=void 0),e=e||{};var n,s=o.url(t,e.path),a=s.source,u=s.id,f=s.path,p=c[u]&&f in c[u].nsps;return e.forceNew||e["force new connection"]||!1===e.multiplex||p?n=new i.Manager(a,e):(c[u]||(c[u]=new i.Manager(a,e)),n=c[u]),s.query&&!e.query&&(e.query=s.queryKey),n.socket(s.path,e)}e.io=a;var u=n(5);Object.defineProperty(e,"protocol",{enumerable:!0,get:function(){return u.protocol}}),e.connect=a;var f=n(7);Object.defineProperty(e,"Manager",{enumerable:!0,get:function(){return f.Manager}}),e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.url=void 0;var r=n(6);e.url=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,o=t;n=n||"undefined"!=typeof location&&location,null==t&&(t=n.protocol+"//"+n.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?n.protocol+t:n.host+t),/^(https?|wss?):\/\//.test(t)||(t=void 0!==n?n.protocol+"//"+t:"https://"+t),o=r(t)),o.port||(/^(http|ws)$/.test(o.protocol)?o.port="80":/^(http|ws)s$/.test(o.protocol)&&(o.port="443")),o.path=o.path||"/";var i=-1!==o.host.indexOf(":"),s=i?"["+o.host+"]":o.host;return o.id=o.protocol+"://"+s+":"+o.port+e,o.href=o.protocol+"://"+s+(n&&n.port===o.port?"":":"+o.port),o}},function(t,e,n){var r=n(21);t.exports=function(t,e){return new r(t,e)},t.exports.Socket=r,t.exports.protocol=r.protocol,t.exports.Transport=n(3),t.exports.transports=n(8),t.exports.parser=n(0)},function(t,e,n){function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)}}function u(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var p=n(8),l=n(1),h=n(0),y=n(6),d=n(4),v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(l,t);var e,n,u,f=a(l);function l(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i(this,l),e=f.call(this),t&&"object"===o(t)&&(n=t,t=null),t?(t=y(t),n.hostname=t.host,n.secure="https"===t.protocol||"wss"===t.protocol,n.port=t.port,t.query&&(n.query=t.query)):n.host&&(n.hostname=y(n.host).host),e.secure=null!=n.secure?n.secure:"undefined"!=typeof location&&"https:"===location.protocol,n.hostname&&!n.port&&(n.port=e.secure?"443":"80"),e.hostname=n.hostname||("undefined"!=typeof location?location.hostname:"localhost"),e.port=n.port||("undefined"!=typeof location&&location.port?location.port:e.secure?443:80),e.transports=n.transports||["polling","websocket"],e.readyState="",e.writeBuffer=[],e.prevBufferLen=0,e.opts=r({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,jsonp:!0,timestampParam:"t",rememberUpgrade:!1,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{}},n),e.opts.path=e.opts.path.replace(/\/$/,"")+"/","string"==typeof e.opts.query&&(e.opts.query=d.decode(e.opts.query)),e.id=null,e.upgrades=null,e.pingInterval=null,e.pingTimeout=null,e.pingTimeoutTimer=null,"function"==typeof addEventListener&&(addEventListener("beforeunload",(function(){e.transport&&(e.transport.removeAllListeners(),e.transport.close())}),!1),"localhost"!==e.hostname&&(e.offlineEventListener=function(){e.onClose("transport close")},addEventListener("offline",e.offlineEventListener,!1))),e.open(),e}return e=l,(n=[{key:"createTransport",value:function(t){var e=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(this.opts.query);e.EIO=h.protocol,e.transport=t,this.id&&(e.sid=this.id);var n=r({},this.opts.transportOptions[t],this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new p[t](n)}},{key:"open",value:function(){var t;if(this.opts.rememberUpgrade&&l.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout((function(){e.emit("error","No transports available")}),0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)}},{key:"setTransport",value:function(t){var e=this;this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",(function(){e.onDrain()})).on("packet",(function(t){e.onPacket(t)})).on("error",(function(t){e.onError(t)})).on("close",(function(){e.onClose("transport close")}))}},{key:"probe",value:function(t){var e=this.createTransport(t,{probe:1}),n=!1,r=this;function o(){if(r.onlyBinaryUpgrades){var t=!this.supportsBinary&&r.transport.supportsBinary;n=n||t}n||(e.send([{type:"ping",data:"probe"}]),e.once("packet",(function(t){if(!n)if("pong"===t.type&&"probe"===t.data){if(r.upgrading=!0,r.emit("upgrading",e),!e)return;l.priorWebsocketSuccess="websocket"===e.name,r.transport.pause((function(){n||"closed"!==r.readyState&&(f(),r.setTransport(e),e.send([{type:"upgrade"}]),r.emit("upgrade",e),e=null,r.upgrading=!1,r.flush())}))}else{var o=new Error("probe error");o.transport=e.name,r.emit("upgradeError",o)}})))}function i(){n||(n=!0,f(),e.close(),e=null)}function s(t){var n=new Error("probe error: "+t);n.transport=e.name,i(),r.emit("upgradeError",n)}function c(){s("transport closed")}function a(){s("socket closed")}function u(t){e&&t.name!==e.name&&i()}function f(){e.removeListener("open",o),e.removeListener("error",s),e.removeListener("close",c),r.removeListener("close",a),r.removeListener("upgrading",u)}l.priorWebsocketSuccess=!1,e.once("open",o),e.once("error",s),e.once("close",c),this.once("close",a),this.once("upgrading",u),e.open()}},{key:"onOpen",value:function(){if(this.readyState="open",l.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.opts.upgrade&&this.transport.pause)for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},{key:"onPacket",value:function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}}},{key:"onHandshake",value:function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&this.resetPingTimeout()}},{key:"resetPingTimeout",value:function(){var t=this;clearTimeout(this.pingTimeoutTimer),this.pingTimeoutTimer=setTimeout((function(){t.onClose("ping timeout")}),this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}},{key:"onDrain",value:function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()}},{key:"flush",value:function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))}},{key:"write",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"send",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"sendPacket",value:function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){(n=n||{}).compress=!1!==n.compress;var o={type:t,data:e,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}}},{key:"close",value:function(){var t=this;function e(){t.onClose("forced close"),t.transport.close()}function n(){t.removeListener("upgrade",n),t.removeListener("upgradeError",n),e()}function r(){t.once("upgrade",n),t.once("upgradeError",n)}return"opening"!==this.readyState&&"open"!==this.readyState||(this.readyState="closing",this.writeBuffer.length?this.once("drain",(function(){this.upgrading?r():e()})):this.upgrading?r():e()),this}},{key:"onError",value:function(t){l.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)}},{key:"onClose",value:function(t,e){"opening"!==this.readyState&&"open"!==this.readyState&&"closing"!==this.readyState||(clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),"function"==typeof removeEventListener&&removeEventListener("offline",this.offlineEventListener,!1),this.readyState="closed",this.id=null,this.emit("close",t,e),this.writeBuffer=[],this.prevBufferLen=0)}},{key:"filterUpgrades",value:function(t){for(var e=[],n=0,r=t.length;n<r;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}}])&&s(e.prototype,n),u&&s(e,u),l}(l);v.priorWebsocketSuccess=!1,v.protocol=h.protocol,t.exports=v},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(e){t.exports=!1}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=l(t);if(e){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p(this,n)}}function p(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var h=n(9),y=n(10),d=n(1),v=n(13).pick,b=n(2);function m(){}var g=null!=new h({xdomain:!1}).responseType,k=function(t){a(n,t);var e=f(n);function n(t){var r;if(i(this,n),r=e.call(this,t),"undefined"!=typeof location){var o="https:"===location.protocol,s=location.port;s||(s=o?443:80),r.xd="undefined"!=typeof location&&t.hostname!==location.hostname||s!==t.port,r.xs=t.secure!==o}var c=t&&t.forceBase64;return r.supportsBinary=g&&!c,r}return c(n,[{key:"request",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return o(t,{xd:this.xd,xs:this.xs},this.opts),new w(this.uri(),t)}},{key:"doWrite",value:function(t,e){var n=this.request({method:"POST",data:t}),r=this;n.on("success",e),n.on("error",(function(t){r.onError("xhr post error",t)}))}},{key:"doPoll",value:function(){var t=this.request(),e=this;t.on("data",(function(t){e.onData(t)})),t.on("error",(function(t){e.onError("xhr poll error",t)})),this.pollXhr=t}}]),n}(y),w=function(t){a(n,t);var e=f(n);function n(t,r){var o;return i(this,n),(o=e.call(this)).opts=r,o.method=r.method||"GET",o.uri=t,o.async=!1!==r.async,o.data=void 0!==r.data?r.data:null,o.create(),o}return c(n,[{key:"create",value:function(){var t=v(this.opts,"agent","enablesXDR","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this.opts.xd,t.xscheme=!!this.opts.xs;var e=this.xhr=new h(t),r=this;try{e.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders)for(var o in e.setDisableHeaderCheck&&e.setDisableHeaderCheck(!0),this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(o)&&e.setRequestHeader(o,this.opts.extraHeaders[o])}catch(t){}if("POST"===this.method)try{e.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{e.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in e&&(e.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(e.timeout=this.opts.requestTimeout),this.hasXDR()?(e.onload=function(){r.onLoad()},e.onerror=function(){r.onError(e.responseText)}):e.onreadystatechange=function(){4===e.readyState&&(200===e.status||1223===e.status?r.onLoad():setTimeout((function(){r.onError("number"==typeof e.status?e.status:0)}),0))},e.send(this.data)}catch(t){return void setTimeout((function(){r.onError(t)}),0)}"undefined"!=typeof document&&(this.index=n.requestsCount++,n.requests[this.index]=this)}},{key:"onSuccess",value:function(){this.emit("success"),this.cleanup()}},{key:"onData",value:function(t){this.emit("data",t),this.onSuccess()}},{key:"onError",value:function(t){this.emit("error",t),this.cleanup(!0)}},{key:"cleanup",value:function(t){if(void 0!==this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=m:this.xhr.onreadystatechange=m,t)try{this.xhr.abort()}catch(t){}"undefined"!=typeof document&&delete n.requests[this.index],this.xhr=null}}},{key:"onLoad",value:function(){var t=this.xhr.responseText;null!==t&&this.onData(t)}},{key:"hasXDR",value:function(){return"undefined"!=typeof XDomainRequest&&!this.xs&&this.enablesXDR}},{key:"abort",value:function(){this.cleanup()}}]),n}(d);if(w.requestsCount=0,w.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",_);else if("function"==typeof addEventListener){addEventListener("onpagehide"in b?"pagehide":"unload",_,!1)}function _(){for(var t in w.requests)w.requests.hasOwnProperty(t)&&w.requests[t].abort()}t.exports=k,t.exports.Request=w},function(t,e,n){var r=n(11).PACKET_TYPES,o="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===Object.prototype.toString.call(Blob),i="function"==typeof ArrayBuffer,s=function(t,e){var n=new FileReader;return n.onload=function(){var t=n.result.split(",")[1];e("b"+t)},n.readAsDataURL(t)};t.exports=function(t,e,n){var c,a=t.type,u=t.data;return o&&u instanceof Blob?e?n(u):s(u,n):i&&(u instanceof ArrayBuffer||(c=u,"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(c):c&&c.buffer instanceof ArrayBuffer))?e?n(u instanceof ArrayBuffer?u:u.buffer):s(new Blob([u]),n):n(r[a]+(u||""))}},function(t,e,n){var r,o=n(11),i=o.PACKET_TYPES_REVERSE,s=o.ERROR_PACKET;"function"==typeof ArrayBuffer&&(r=n(26));var c=function(t,e){if(r){var n=r.decode(t);return a(n,e)}return{base64:!0,data:t}},a=function(t,e){switch(e){case"blob":return t instanceof ArrayBuffer?new Blob([t]):t;case"arraybuffer":default:return t}};t.exports=function(t,e){if("string"!=typeof t)return{type:"message",data:a(t,e)};var n=t.charAt(0);return"b"===n?{type:"message",data:c(t.substring(1),e)}:i[n]?t.length>1?{type:i[n],data:t.substring(1)}:{type:i[n]}:s}},function(t,e){!function(t){"use strict";e.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;n<o;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3==2?i=i.substring(0,i.length-1)+"=":o%3==1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(e){var n,r,o,i,s,c=.75*e.length,a=e.length,u=0;"="===e[e.length-1]&&(c--,"="===e[e.length-2]&&c--);var f=new ArrayBuffer(c),p=new Uint8Array(f);for(n=0;n<a;n+=4)r=t.indexOf(e[n]),o=t.indexOf(e[n+1]),i=t.indexOf(e[n+2]),s=t.indexOf(e[n+3]),p[u++]=r<<2|o>>4,p[u++]=(15&o)<<4|i>>2,p[u++]=(3&i)<<6|63&s;return f}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return(i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?u(t):e}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var p,l=n(10),h=n(2),y=/\n/g,d=/\\n/g,v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(l,t);var e,n,r,a=c(l);function l(t){var e;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),(e=a.call(this,t)).query=e.query||{},p||(p=h.___eio=h.___eio||[]),e.index=p.length;var n=u(e);return p.push((function(t){n.onData(t)})),e.query.j=e.index,e}return e=l,(n=[{key:"doClose",value:function(){this.script&&(this.script.onerror=function(){},this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i(f(l.prototype),"doClose",this).call(this)}},{key:"doPoll",value:function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(e,n):(document.head||document.body).appendChild(e),this.script=e,"undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent)&&setTimeout((function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)}),100)}},{key:"doWrite",value:function(t,e){var n,r=this;if(!this.form){var o=document.createElement("form"),i=document.createElement("textarea"),s=this.iframeId="eio_iframe_"+this.index;o.className="socketio",o.style.position="absolute",o.style.top="-1000px",o.style.left="-1000px",o.target=s,o.method="POST",o.setAttribute("accept-charset","utf-8"),i.name="d",o.appendChild(i),document.body.appendChild(o),this.form=o,this.area=i}function c(){a(),e()}function a(){if(r.iframe)try{r.form.removeChild(r.iframe)}catch(t){r.onError("jsonp polling iframe removal error",t)}try{var t='<iframe src="javascript:0" name="'+r.iframeId+'">';n=document.createElement(t)}catch(t){(n=document.createElement("iframe")).name=r.iframeId,n.src="javascript:0"}n.id=r.iframeId,r.form.appendChild(n),r.iframe=n}this.form.action=this.uri(),a(),t=t.replace(d,"\\\n"),this.area.value=t.replace(y,"\\n");try{this.form.submit()}catch(t){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===r.iframe.readyState&&c()}:this.iframe.onload=c}},{key:"supportsBinary",get:function(){return!1}}])&&o(e.prototype,n),r&&o(e,r),l}(l);t.exports=v},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=n(3),f=n(0),p=n(4),l=n(12),h=n(13).pick,y=n(29),d=y.WebSocket,v=y.usingBrowserWebSocket,b=y.defaultBinaryType,m="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(a,t);var e,n,r,c=s(a);function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=c.call(this,t)).supportsBinary=!t.forceBase64,e}return e=a,(n=[{key:"doOpen",value:function(){if(this.check()){var t=this.uri(),e=this.opts.protocols,n=m?{}:h(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=v&&!m?e?new d(t,e):new d(t):new d(t,e,n)}catch(t){return this.emit("error",t)}this.ws.binaryType=this.socket.binaryType||b,this.addEventListeners()}}},{key:"addEventListeners",value:function(){var t=this;this.ws.onopen=function(){t.opts.autoUnref&&t.ws._socket.unref(),t.onOpen()},this.ws.onclose=this.onClose.bind(this),this.ws.onmessage=function(e){return t.onData(e.data)},this.ws.onerror=function(e){return t.onError("websocket error",e)}}},{key:"write",value:function(t){var e=this;this.writable=!1;for(var n=t.length,r=0,o=n;r<o;r++)!function(t){f.encodePacket(t,e.supportsBinary,(function(r){var o={};v||(t.options&&(o.compress=t.options.compress),e.opts.perMessageDeflate&&("string"==typeof r?Buffer.byteLength(r):r.length)<e.opts.perMessageDeflate.threshold&&(o.compress=!1));try{v?e.ws.send(r):e.ws.send(r,o)}catch(t){}--n||(e.emit("flush"),setTimeout((function(){e.writable=!0,e.emit("drain")}),0))}))}(t[r])}},{key:"onClose",value:function(){u.prototype.onClose.call(this)}},{key:"doClose",value:function(){void 0!==this.ws&&(this.ws.close(),this.ws=null)}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"wss":"ws",n="";return this.opts.port&&("wss"===e&&443!==Number(this.opts.port)||"ws"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port),this.opts.timestampRequests&&(t[this.opts.timestampParam]=l()),this.supportsBinary||(t.b64=1),(t=p.encode(t)).length&&(t="?"+t),e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+t}},{key:"check",value:function(){return!(!d||"__initialize"in d&&this.name===a.prototype.name)}},{key:"name",get:function(){return"websocket"}}])&&o(e.prototype,n),r&&o(e,r),a}(u);t.exports=g},function(t,e,n){var r=n(2);t.exports={WebSocket:r.WebSocket||r.MozWebSocket,usingBrowserWebSocket:!0,defaultBinaryType:"arraybuffer"}},function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.reconstructPacket=e.deconstructPacket=void 0;var o=n(15);e.deconstructPacket=function(t){var e=[],n=t.data,i=t;return i.data=function t(e,n){if(!e)return e;if(o.isBinary(e)){var i={_placeholder:!0,num:n.length};return n.push(e),i}if(Array.isArray(e)){for(var s=new Array(e.length),c=0;c<e.length;c++)s[c]=t(e[c],n);return s}if("object"===r(e)&&!(e instanceof Date)){var a={};for(var u in e)e.hasOwnProperty(u)&&(a[u]=t(e[u],n));return a}return e}(n,e),i.attachments=e.length,{packet:i,buffers:e}},e.reconstructPacket=function(t,e){return t.data=function t(e,n){if(!e)return e;if(e&&e._placeholder)return n[e.num];if(Array.isArray(e))for(var o=0;o<e.length;o++)e[o]=t(e[o],n);else if("object"===r(e))for(var i in e)e.hasOwnProperty(i)&&(e[i]=t(e[i],n));return e}(t.data,e),t.attachments=void 0,t}},function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}}])}));

/**
 * nouislider - 14.7.0 - 4/6/2021
 */
!function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():window.noUiSlider=t()}(function(){"use strict";var lt="14.7.0";function ut(t){t.parentElement.removeChild(t)}function ct(t){return null!=t}function pt(t){t.preventDefault()}function o(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function ft(t,e,r){0<r&&(mt(t,e),setTimeout(function(){gt(t,e)},r))}function dt(t){return Math.max(Math.min(t,100),0)}function ht(t){return Array.isArray(t)?t:[t]}function e(t){var e=(t=String(t)).split(".");return 1<e.length?e[1].length:0}function mt(t,e){t.classList&&!/\s/.test(e)?t.classList.add(e):t.className+=" "+e}function gt(t,e){t.classList&&!/\s/.test(e)?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function vt(t){var e=void 0!==window.pageXOffset,r="CSS1Compat"===(t.compatMode||"");return{x:e?window.pageXOffset:r?t.documentElement.scrollLeft:t.body.scrollLeft,y:e?window.pageYOffset:r?t.documentElement.scrollTop:t.body.scrollTop}}function c(t,e){return 100/(e-t)}function p(t,e,r){return 100*e/(t[r+1]-t[r])}function f(t,e){for(var r=1;t>=e[r];)r+=1;return r}function r(t,e,r){if(r>=t.slice(-1)[0])return 100;var n,i,o=f(r,t),s=t[o-1],a=t[o],l=e[o-1],u=e[o];return l+(i=r,p(n=[s,a],n[0]<0?i+Math.abs(n[0]):i-n[0],0)/c(l,u))}function n(t,e,r,n){if(100===n)return n;var i,o,s=f(n,t),a=t[s-1],l=t[s];return r?(l-a)/2<n-a?l:a:e[s-1]?t[s-1]+(i=n-t[s-1],o=e[s-1],Math.round(i/o)*o):n}function s(t,e,r){var n;if("number"==typeof e&&(e=[e]),!Array.isArray(e))throw new Error("noUiSlider ("+lt+"): 'range' contains invalid value.");if(!o(n="min"===t?0:"max"===t?100:parseFloat(t))||!o(e[0]))throw new Error("noUiSlider ("+lt+"): 'range' value isn't numeric.");r.xPct.push(n),r.xVal.push(e[0]),n?r.xSteps.push(!isNaN(e[1])&&e[1]):isNaN(e[1])||(r.xSteps[0]=e[1]),r.xHighestCompleteStep.push(0)}function a(t,e,r){if(e)if(r.xVal[t]!==r.xVal[t+1]){r.xSteps[t]=p([r.xVal[t],r.xVal[t+1]],e,0)/c(r.xPct[t],r.xPct[t+1]);var n=(r.xVal[t+1]-r.xVal[t])/r.xNumSteps[t],i=Math.ceil(Number(n.toFixed(3))-1),o=r.xVal[t]+r.xNumSteps[t]*i;r.xHighestCompleteStep[t]=o}else r.xSteps[t]=r.xHighestCompleteStep[t]=r.xVal[t]}function i(t,e,r){var n;this.xPct=[],this.xVal=[],this.xSteps=[r||!1],this.xNumSteps=[!1],this.xHighestCompleteStep=[],this.snap=e;var i=[];for(n in t)t.hasOwnProperty(n)&&i.push([t[n],n]);for(i.length&&"object"==typeof i[0][0]?i.sort(function(t,e){return t[0][0]-e[0][0]}):i.sort(function(t,e){return t[0]-e[0]}),n=0;n<i.length;n++)s(i[n][1],i[n][0],this);for(this.xNumSteps=this.xSteps.slice(0),n=0;n<this.xNumSteps.length;n++)a(n,this.xNumSteps[n],this)}i.prototype.getDistance=function(t){var e,r=[];for(e=0;e<this.xNumSteps.length-1;e++){var n=this.xNumSteps[e];if(n&&t/n%1!=0)throw new Error("noUiSlider ("+lt+"): 'limit', 'margin' and 'padding' of "+this.xPct[e]+"% range must be divisible by step.");r[e]=p(this.xVal,t,e)}return r},i.prototype.getAbsoluteDistance=function(t,e,r){var n,i=0;if(t<this.xPct[this.xPct.length-1])for(;t>this.xPct[i+1];)i++;else t===this.xPct[this.xPct.length-1]&&(i=this.xPct.length-2);r||t!==this.xPct[i+1]||i++;var o=1,s=e[i],a=0,l=0,u=0,c=0;for(n=r?(t-this.xPct[i])/(this.xPct[i+1]-this.xPct[i]):(this.xPct[i+1]-t)/(this.xPct[i+1]-this.xPct[i]);0<s;)a=this.xPct[i+1+c]-this.xPct[i+c],100<e[i+c]*o+100-100*n?(l=a*n,o=(s-100*n)/e[i+c],n=1):(l=e[i+c]*a/100*o,o=0),r?(u-=l,1<=this.xPct.length+c&&c--):(u+=l,1<=this.xPct.length-c&&c++),s=e[i+c]*o;return t+u},i.prototype.toStepping=function(t){return t=r(this.xVal,this.xPct,t)},i.prototype.fromStepping=function(t){return function(t,e,r){if(100<=r)return t.slice(-1)[0];var n,i=f(r,e),o=t[i-1],s=t[i],a=e[i-1],l=e[i];return n=[o,s],(r-a)*c(a,l)*(n[1]-n[0])/100+n[0]}(this.xVal,this.xPct,t)},i.prototype.getStep=function(t){return t=n(this.xPct,this.xSteps,this.snap,t)},i.prototype.getDefaultStep=function(t,e,r){var n=f(t,this.xPct);return(100===t||e&&t===this.xPct[n-1])&&(n=Math.max(n-1,1)),(this.xVal[n]-this.xVal[n-1])/r},i.prototype.getNearbySteps=function(t){var e=f(t,this.xPct);return{stepBefore:{startValue:this.xVal[e-2],step:this.xNumSteps[e-2],highestStep:this.xHighestCompleteStep[e-2]},thisStep:{startValue:this.xVal[e-1],step:this.xNumSteps[e-1],highestStep:this.xHighestCompleteStep[e-1]},stepAfter:{startValue:this.xVal[e],step:this.xNumSteps[e],highestStep:this.xHighestCompleteStep[e]}}},i.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(e);return Math.max.apply(null,t)},i.prototype.convert=function(t){return this.getStep(this.toStepping(t))};var l={to:function(t){return void 0!==t&&t.toFixed(2)},from:Number},u={target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",touchArea:"touch-area",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",textDirectionLtr:"txt-dir-ltr",textDirectionRtl:"txt-dir-rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"},bt={tooltips:".__tooltips",aria:".__aria"};function d(t){if("object"==typeof(e=t)&&"function"==typeof e.to&&"function"==typeof e.from)return!0;var e;throw new Error("noUiSlider ("+lt+"): 'format' requires 'to' and 'from' methods.")}function h(t,e){if(!o(e))throw new Error("noUiSlider ("+lt+"): 'step' is not numeric.");t.singleStep=e}function m(t,e){if(!o(e))throw new Error("noUiSlider ("+lt+"): 'keyboardPageMultiplier' is not numeric.");t.keyboardPageMultiplier=e}function g(t,e){if(!o(e))throw new Error("noUiSlider ("+lt+"): 'keyboardDefaultStep' is not numeric.");t.keyboardDefaultStep=e}function v(t,e){if("object"!=typeof e||Array.isArray(e))throw new Error("noUiSlider ("+lt+"): 'range' is not an object.");if(void 0===e.min||void 0===e.max)throw new Error("noUiSlider ("+lt+"): Missing 'min' or 'max' in 'range'.");if(e.min===e.max)throw new Error("noUiSlider ("+lt+"): 'range' 'min' and 'max' cannot be equal.");t.spectrum=new i(e,t.snap,t.singleStep)}function b(t,e){if(e=ht(e),!Array.isArray(e)||!e.length)throw new Error("noUiSlider ("+lt+"): 'start' option is incorrect.");t.handles=e.length,t.start=e}function x(t,e){if("boolean"!=typeof(t.snap=e))throw new Error("noUiSlider ("+lt+"): 'snap' option must be a boolean.")}function S(t,e){if("boolean"!=typeof(t.animate=e))throw new Error("noUiSlider ("+lt+"): 'animate' option must be a boolean.")}function w(t,e){if("number"!=typeof(t.animationDuration=e))throw new Error("noUiSlider ("+lt+"): 'animationDuration' option must be a number.")}function y(t,e){var r,n=[!1];if("lower"===e?e=[!0,!1]:"upper"===e&&(e=[!1,!0]),!0===e||!1===e){for(r=1;r<t.handles;r++)n.push(e);n.push(!1)}else{if(!Array.isArray(e)||!e.length||e.length!==t.handles+1)throw new Error("noUiSlider ("+lt+"): 'connect' option doesn't match handle count.");n=e}t.connect=n}function E(t,e){switch(e){case"horizontal":t.ort=0;break;case"vertical":t.ort=1;break;default:throw new Error("noUiSlider ("+lt+"): 'orientation' option is invalid.")}}function C(t,e){if(!o(e))throw new Error("noUiSlider ("+lt+"): 'margin' option must be numeric.");0!==e&&(t.margin=t.spectrum.getDistance(e))}function P(t,e){if(!o(e))throw new Error("noUiSlider ("+lt+"): 'limit' option must be numeric.");if(t.limit=t.spectrum.getDistance(e),!t.limit||t.handles<2)throw new Error("noUiSlider ("+lt+"): 'limit' option is only supported on linear sliders with 2 or more handles.")}function N(t,e){var r;if(!o(e)&&!Array.isArray(e))throw new Error("noUiSlider ("+lt+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(e)&&2!==e.length&&!o(e[0])&&!o(e[1]))throw new Error("noUiSlider ("+lt+"): 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==e){for(Array.isArray(e)||(e=[e,e]),t.padding=[t.spectrum.getDistance(e[0]),t.spectrum.getDistance(e[1])],r=0;r<t.spectrum.xNumSteps.length-1;r++)if(t.padding[0][r]<0||t.padding[1][r]<0)throw new Error("noUiSlider ("+lt+"): 'padding' option must be a positive number(s).");var n=e[0]+e[1],i=t.spectrum.xVal[0];if(1<n/(t.spectrum.xVal[t.spectrum.xVal.length-1]-i))throw new Error("noUiSlider ("+lt+"): 'padding' option must not exceed 100% of the range.")}}function k(t,e){switch(e){case"ltr":t.dir=0;break;case"rtl":t.dir=1;break;default:throw new Error("noUiSlider ("+lt+"): 'direction' option was not recognized.")}}function U(t,e){if("string"!=typeof e)throw new Error("noUiSlider ("+lt+"): 'behaviour' must be a string containing options.");var r=0<=e.indexOf("tap"),n=0<=e.indexOf("drag"),i=0<=e.indexOf("fixed"),o=0<=e.indexOf("snap"),s=0<=e.indexOf("hover"),a=0<=e.indexOf("unconstrained");if(i){if(2!==t.handles)throw new Error("noUiSlider ("+lt+"): 'fixed' behaviour must be used with 2 handles");C(t,t.start[1]-t.start[0])}if(a&&(t.margin||t.limit))throw new Error("noUiSlider ("+lt+"): 'unconstrained' behaviour cannot be used with margin or limit");t.events={tap:r||o,drag:n,fixed:i,snap:o,hover:s,unconstrained:a}}function A(t,e){if(!1!==e)if(!0===e){t.tooltips=[];for(var r=0;r<t.handles;r++)t.tooltips.push(!0)}else{if(t.tooltips=ht(e),t.tooltips.length!==t.handles)throw new Error("noUiSlider ("+lt+"): must pass a formatter for all handles.");t.tooltips.forEach(function(t){if("boolean"!=typeof t&&("object"!=typeof t||"function"!=typeof t.to))throw new Error("noUiSlider ("+lt+"): 'tooltips' must be passed a formatter or 'false'.")})}}function V(t,e){d(t.ariaFormat=e)}function D(t,e){d(t.format=e)}function M(t,e){if("boolean"!=typeof(t.keyboardSupport=e))throw new Error("noUiSlider ("+lt+"): 'keyboardSupport' option must be a boolean.")}function O(t,e){t.documentElement=e}function L(t,e){if("string"!=typeof e&&!1!==e)throw new Error("noUiSlider ("+lt+"): 'cssPrefix' must be a string or `false`.");t.cssPrefix=e}function z(t,e){if("object"!=typeof e)throw new Error("noUiSlider ("+lt+"): 'cssClasses' must be an object.");if("string"==typeof t.cssPrefix)for(var r in t.cssClasses={},e)e.hasOwnProperty(r)&&(t.cssClasses[r]=t.cssPrefix+e[r]);else t.cssClasses=e}function xt(e){var r={margin:0,limit:0,padding:0,animate:!0,animationDuration:300,ariaFormat:l,format:l},n={step:{r:!1,t:h},keyboardPageMultiplier:{r:!1,t:m},keyboardDefaultStep:{r:!1,t:g},start:{r:!0,t:b},connect:{r:!0,t:y},direction:{r:!0,t:k},snap:{r:!1,t:x},animate:{r:!1,t:S},animationDuration:{r:!1,t:w},range:{r:!0,t:v},orientation:{r:!1,t:E},margin:{r:!1,t:C},limit:{r:!1,t:P},padding:{r:!1,t:N},behaviour:{r:!0,t:U},ariaFormat:{r:!1,t:V},format:{r:!1,t:D},tooltips:{r:!1,t:A},keyboardSupport:{r:!0,t:M},documentElement:{r:!1,t:O},cssPrefix:{r:!0,t:L},cssClasses:{r:!0,t:z}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:u,keyboardPageMultiplier:5,keyboardDefaultStep:10};e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(n).forEach(function(t){if(!ct(e[t])&&void 0===i[t]){if(n[t].r)throw new Error("noUiSlider ("+lt+"): '"+t+"' is required.");return!0}n[t].t(r,ct(e[t])?e[t]:i[t])}),r.pips=e.pips;var t=document.createElement("div"),o=void 0!==t.style.msTransform,s=void 0!==t.style.transform;r.transformRule=s?"transform":o?"msTransform":"webkitTransform";return r.style=[["left","top"],["right","bottom"]][r.dir][r.ort],r}function H(t,b,o){var l,u,s,c,i,a,e,p,f=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},d=window.CSS&&CSS.supports&&CSS.supports("touch-action","none")&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),h=t,y=b.spectrum,x=[],S=[],m=[],g=0,v={},w=t.ownerDocument,E=b.documentElement||w.documentElement,C=w.body,P=-1,N=0,k=1,U=2,A="rtl"===w.dir||1===b.ort?0:100;function V(t,e){var r=w.createElement("div");return e&&mt(r,e),t.appendChild(r),r}function D(t,e){var r=V(t,b.cssClasses.origin),n=V(r,b.cssClasses.handle);return V(n,b.cssClasses.touchArea),n.setAttribute("data-handle",e),b.keyboardSupport&&(n.setAttribute("tabindex","0"),n.addEventListener("keydown",function(t){return function(t,e){if(O()||L(e))return!1;var r=["Left","Right"],n=["Down","Up"],i=["PageDown","PageUp"],o=["Home","End"];b.dir&&!b.ort?r.reverse():b.ort&&!b.dir&&(n.reverse(),i.reverse());var s,a=t.key.replace("Arrow",""),l=a===i[0],u=a===i[1],c=a===n[0]||a===r[0]||l,p=a===n[1]||a===r[1]||u,f=a===o[0],d=a===o[1];if(!(c||p||f||d))return!0;if(t.preventDefault(),p||c){var h=b.keyboardPageMultiplier,m=c?0:1,g=at(e),v=g[m];if(null===v)return!1;!1===v&&(v=y.getDefaultStep(S[e],c,b.keyboardDefaultStep)),(u||l)&&(v*=h),v=Math.max(v,1e-7),v*=c?-1:1,s=x[e]+v}else s=d?b.spectrum.xVal[b.spectrum.xVal.length-1]:b.spectrum.xVal[0];return rt(e,y.toStepping(s),!0,!0),J("slide",e),J("update",e),J("change",e),J("set",e),!1}(t,e)})),n.setAttribute("role","slider"),n.setAttribute("aria-orientation",b.ort?"vertical":"horizontal"),0===e?mt(n,b.cssClasses.handleLower):e===b.handles-1&&mt(n,b.cssClasses.handleUpper),r}function M(t,e){return!!e&&V(t,b.cssClasses.connect)}function r(t,e){return!!b.tooltips[e]&&V(t.firstChild,b.cssClasses.tooltip)}function O(){return h.hasAttribute("disabled")}function L(t){return u[t].hasAttribute("disabled")}function z(){i&&(G("update"+bt.tooltips),i.forEach(function(t){t&&ut(t)}),i=null)}function H(){z(),i=u.map(r),$("update"+bt.tooltips,function(t,e,r){if(i[e]){var n=t[e];!0!==b.tooltips[e]&&(n=b.tooltips[e].to(r[e])),i[e].innerHTML=n}})}function j(e,i,o){var s=w.createElement("div"),a=[];a[N]=b.cssClasses.valueNormal,a[k]=b.cssClasses.valueLarge,a[U]=b.cssClasses.valueSub;var l=[];l[N]=b.cssClasses.markerNormal,l[k]=b.cssClasses.markerLarge,l[U]=b.cssClasses.markerSub;var u=[b.cssClasses.valueHorizontal,b.cssClasses.valueVertical],c=[b.cssClasses.markerHorizontal,b.cssClasses.markerVertical];function p(t,e){var r=e===b.cssClasses.value,n=r?a:l;return e+" "+(r?u:c)[b.ort]+" "+n[t]}return mt(s,b.cssClasses.pips),mt(s,0===b.ort?b.cssClasses.pipsHorizontal:b.cssClasses.pipsVertical),Object.keys(e).forEach(function(t){!function(t,e,r){if((r=i?i(e,r):r)!==P){var n=V(s,!1);n.className=p(r,b.cssClasses.marker),n.style[b.style]=t+"%",N<r&&((n=V(s,!1)).className=p(r,b.cssClasses.value),n.setAttribute("data-value",e),n.style[b.style]=t+"%",n.innerHTML=o.to(e))}}(t,e[t][0],e[t][1])}),s}function F(){c&&(ut(c),c=null)}function R(t){F();var m,g,v,b,e,r,x,S,w,n=t.mode,i=t.density||1,o=t.filter||!1,s=function(t,e,r){if("range"===t||"steps"===t)return y.xVal;if("count"===t){if(e<2)throw new Error("noUiSlider ("+lt+"): 'values' (>= 2) required for mode 'count'.");var n=e-1,i=100/n;for(e=[];n--;)e[n]=n*i;e.push(100),t="positions"}return"positions"===t?e.map(function(t){return y.fromStepping(r?y.getStep(t):t)}):"values"===t?r?e.map(function(t){return y.fromStepping(y.getStep(y.toStepping(t)))}):e:void 0}(n,t.values||!1,t.stepped||!1),a=(m=i,g=n,v=s,b={},e=y.xVal[0],r=y.xVal[y.xVal.length-1],S=x=!1,w=0,(v=v.slice().sort(function(t,e){return t-e}).filter(function(t){return!this[t]&&(this[t]=!0)},{}))[0]!==e&&(v.unshift(e),x=!0),v[v.length-1]!==r&&(v.push(r),S=!0),v.forEach(function(t,e){var r,n,i,o,s,a,l,u,c,p,f=t,d=v[e+1],h="steps"===g;if(h&&(r=y.xNumSteps[e]),r||(r=d-f),!1!==f)for(void 0===d&&(d=f),r=Math.max(r,1e-7),n=f;n<=d;n=(n+r).toFixed(7)/1){for(u=(s=(o=y.toStepping(n))-w)/m,p=s/(c=Math.round(u)),i=1;i<=c;i+=1)b[(a=w+i*p).toFixed(5)]=[y.fromStepping(a),0];l=-1<v.indexOf(n)?k:h?U:N,!e&&x&&n!==d&&(l=0),n===d&&S||(b[o.toFixed(5)]=[n,l]),w=o}}),b),l=t.format||{to:Math.round};return c=h.appendChild(j(a,o,l))}function T(){var t=l.getBoundingClientRect(),e="offset"+["Width","Height"][b.ort];return 0===b.ort?t.width||l[e]:t.height||l[e]}function _(n,i,o,s){var e=function(t){return!!(t=function(t,e,r){var n,i,o=0===t.type.indexOf("touch"),s=0===t.type.indexOf("mouse"),a=0===t.type.indexOf("pointer");0===t.type.indexOf("MSPointer")&&(a=!0);if("mousedown"===t.type&&!t.buttons&&!t.touches)return!1;if(o){var l=function(t){return t.target===r||r.contains(t.target)||t.target.shadowRoot&&t.target.shadowRoot.contains(r)};if("touchstart"===t.type){var u=Array.prototype.filter.call(t.touches,l);if(1<u.length)return!1;n=u[0].pageX,i=u[0].pageY}else{var c=Array.prototype.find.call(t.changedTouches,l);if(!c)return!1;n=c.pageX,i=c.pageY}}e=e||vt(w),(s||a)&&(n=t.clientX+e.x,i=t.clientY+e.y);return t.pageOffset=e,t.points=[n,i],t.cursor=s||a,t}(t,s.pageOffset,s.target||i))&&(!(O()&&!s.doNotReject)&&(e=h,r=b.cssClasses.tap,!((e.classList?e.classList.contains(r):new RegExp("\\b"+r+"\\b").test(e.className))&&!s.doNotReject)&&(!(n===f.start&&void 0!==t.buttons&&1<t.buttons)&&((!s.hover||!t.buttons)&&(d||t.preventDefault(),t.calcPoint=t.points[b.ort],void o(t,s))))));var e,r},r=[];return n.split(" ").forEach(function(t){i.addEventListener(t,e,!!d&&{passive:!0}),r.push([t,e])}),r}function B(t){var e,r,n,i,o,s,a=100*(t-(e=l,r=b.ort,n=e.getBoundingClientRect(),i=e.ownerDocument,o=i.documentElement,s=vt(i),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(s.x=0),r?n.top+s.y-o.clientTop:n.left+s.x-o.clientLeft))/T();return a=dt(a),b.dir?100-a:a}function q(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&Y(t,e)}function X(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return Y(t,e);var r=(b.dir?-1:1)*(t.calcPoint-e.startCalcPoint);Z(0<r,100*r/e.baseSize,e.locations,e.handleNumbers)}function Y(t,e){e.handle&&(gt(e.handle,b.cssClasses.active),g-=1),e.listeners.forEach(function(t){E.removeEventListener(t[0],t[1])}),0===g&&(gt(h,b.cssClasses.drag),et(),t.cursor&&(C.style.cursor="",C.removeEventListener("selectstart",pt))),e.handleNumbers.forEach(function(t){J("change",t),J("set",t),J("end",t)})}function I(t,e){if(e.handleNumbers.some(L))return!1;var r;1===e.handleNumbers.length&&(r=u[e.handleNumbers[0]].children[0],g+=1,mt(r,b.cssClasses.active));t.stopPropagation();var n=[],i=_(f.move,E,X,{target:t.target,handle:r,listeners:n,startCalcPoint:t.calcPoint,baseSize:T(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:S.slice()}),o=_(f.end,E,Y,{target:t.target,handle:r,listeners:n,doNotReject:!0,handleNumbers:e.handleNumbers}),s=_("mouseout",E,q,{target:t.target,handle:r,listeners:n,doNotReject:!0,handleNumbers:e.handleNumbers});n.push.apply(n,i.concat(o,s)),t.cursor&&(C.style.cursor=getComputedStyle(t.target).cursor,1<u.length&&mt(h,b.cssClasses.drag),C.addEventListener("selectstart",pt,!1)),e.handleNumbers.forEach(function(t){J("start",t)})}function n(t){t.stopPropagation();var i,o,s,e=B(t.calcPoint),r=(i=e,s=!(o=100),u.forEach(function(t,e){if(!L(e)){var r=S[e],n=Math.abs(r-i);(n<o||n<=o&&r<i||100===n&&100===o)&&(s=e,o=n)}}),s);if(!1===r)return!1;b.events.snap||ft(h,b.cssClasses.tap,b.animationDuration),rt(r,e,!0,!0),et(),J("slide",r,!0),J("update",r,!0),J("change",r,!0),J("set",r,!0),b.events.snap&&I(t,{handleNumbers:[r]})}function W(t){var e=B(t.calcPoint),r=y.getStep(e),n=y.fromStepping(r);Object.keys(v).forEach(function(t){"hover"===t.split(".")[0]&&v[t].forEach(function(t){t.call(a,n)})})}function $(t,e){v[t]=v[t]||[],v[t].push(e),"update"===t.split(".")[0]&&u.forEach(function(t,e){J("update",e)})}function G(t){var i=t&&t.split(".")[0],o=i?t.substring(i.length):t;Object.keys(v).forEach(function(t){var e,r=t.split(".")[0],n=t.substring(r.length);i&&i!==r||o&&o!==n||((e=n)!==bt.aria&&e!==bt.tooltips||o===n)&&delete v[t]})}function J(r,n,i){Object.keys(v).forEach(function(t){var e=t.split(".")[0];r===e&&v[t].forEach(function(t){t.call(a,x.map(b.format.to),n,x.slice(),i||!1,S.slice(),a)})})}function K(t,e,r,n,i,o){var s;return 1<u.length&&!b.events.unconstrained&&(n&&0<e&&(s=y.getAbsoluteDistance(t[e-1],b.margin,0),r=Math.max(r,s)),i&&e<u.length-1&&(s=y.getAbsoluteDistance(t[e+1],b.margin,1),r=Math.min(r,s))),1<u.length&&b.limit&&(n&&0<e&&(s=y.getAbsoluteDistance(t[e-1],b.limit,0),r=Math.min(r,s)),i&&e<u.length-1&&(s=y.getAbsoluteDistance(t[e+1],b.limit,1),r=Math.max(r,s))),b.padding&&(0===e&&(s=y.getAbsoluteDistance(0,b.padding[0],0),r=Math.max(r,s)),e===u.length-1&&(s=y.getAbsoluteDistance(100,b.padding[1],1),r=Math.min(r,s))),!((r=dt(r=y.getStep(r)))===t[e]&&!o)&&r}function Q(t,e){var r=b.ort;return(r?e:t)+", "+(r?t:e)}function Z(t,n,r,e){var i=r.slice(),o=[!t,t],s=[t,!t];e=e.slice(),t&&e.reverse(),1<e.length?e.forEach(function(t,e){var r=K(i,t,i[t]+n,o[e],s[e],!1);!1===r?n=0:(n=r-i[t],i[t]=r)}):o=s=[!0];var a=!1;e.forEach(function(t,e){a=rt(t,r[t]+n,o[e],s[e])||a}),a&&e.forEach(function(t){J("update",t),J("slide",t)})}function tt(t,e){return b.dir?100-t-e:t}function et(){m.forEach(function(t){var e=50<S[t]?-1:1,r=3+(u.length+e*t);u[t].style.zIndex=r})}function rt(t,e,r,n,i){return i||(e=K(S,t,e,r,n,!1)),!1!==e&&(function(t,e){S[t]=e,x[t]=y.fromStepping(e);var r="translate("+Q(10*(tt(e,0)-A)+"%","0")+")";u[t].style[b.transformRule]=r,nt(t),nt(t+1)}(t,e),!0)}function nt(t){if(s[t]){var e=0,r=100;0!==t&&(e=S[t-1]),t!==s.length-1&&(r=S[t]);var n=r-e,i="translate("+Q(tt(e,n)+"%","0")+")",o="scale("+Q(n/100,"1")+")";s[t].style[b.transformRule]=i+" "+o}}function it(t,e){return null===t||!1===t||void 0===t?S[e]:("number"==typeof t&&(t=String(t)),t=b.format.from(t),!1===(t=y.toStepping(t))||isNaN(t)?S[e]:t)}function ot(t,e,r){var n=ht(t),i=void 0===S[0];e=void 0===e||!!e,b.animate&&!i&&ft(h,b.cssClasses.tap,b.animationDuration),m.forEach(function(t){rt(t,it(n[t],t),!0,!1,r)});for(var o=1===m.length?0:1;o<m.length;++o)m.forEach(function(t){rt(t,S[t],!0,!0,r)});et(),m.forEach(function(t){J("update",t),null!==n[t]&&e&&J("set",t)})}function st(){var t=x.map(b.format.to);return 1===t.length?t[0]:t}function at(t){var e=S[t],r=y.getNearbySteps(e),n=x[t],i=r.thisStep.step,o=null;if(b.snap)return[n-r.stepBefore.startValue||null,r.stepAfter.startValue-n||null];!1!==i&&n+i>r.stepAfter.startValue&&(i=r.stepAfter.startValue-n),o=n>r.thisStep.startValue?r.thisStep.step:!1!==r.stepBefore.step&&n-r.stepBefore.highestStep,100===e?i=null:0===e&&(o=null);var s=y.countStepDecimals();return null!==i&&!1!==i&&(i=Number(i.toFixed(s))),null!==o&&!1!==o&&(o=Number(o.toFixed(s))),[o,i]}return mt(e=h,b.cssClasses.target),0===b.dir?mt(e,b.cssClasses.ltr):mt(e,b.cssClasses.rtl),0===b.ort?mt(e,b.cssClasses.horizontal):mt(e,b.cssClasses.vertical),mt(e,"rtl"===getComputedStyle(e).direction?b.cssClasses.textDirectionRtl:b.cssClasses.textDirectionLtr),l=V(e,b.cssClasses.base),function(t,e){var r=V(e,b.cssClasses.connects);u=[],(s=[]).push(M(r,t[0]));for(var n=0;n<b.handles;n++)u.push(D(e,n)),m[n]=n,s.push(M(r,t[n+1]))}(b.connect,l),(p=b.events).fixed||u.forEach(function(t,e){_(f.start,t.children[0],I,{handleNumbers:[e]})}),p.tap&&_(f.start,l,n,{}),p.hover&&_(f.move,l,W,{hover:!0}),p.drag&&s.forEach(function(t,e){if(!1!==t&&0!==e&&e!==s.length-1){var r=u[e-1],n=u[e],i=[t];mt(t,b.cssClasses.draggable),p.fixed&&(i.push(r.children[0]),i.push(n.children[0])),i.forEach(function(t){_(f.start,t,I,{handles:[r,n],handleNumbers:[e-1,e]})})}}),ot(b.start),b.pips&&R(b.pips),b.tooltips&&H(),G("update"+bt.aria),$("update"+bt.aria,function(t,e,s,r,a){m.forEach(function(t){var e=u[t],r=K(S,t,0,!0,!0,!0),n=K(S,t,100,!0,!0,!0),i=a[t],o=b.ariaFormat.to(s[t]);r=y.fromStepping(r).toFixed(1),n=y.fromStepping(n).toFixed(1),i=y.fromStepping(i).toFixed(1),e.children[0].setAttribute("aria-valuemin",r),e.children[0].setAttribute("aria-valuemax",n),e.children[0].setAttribute("aria-valuenow",i),e.children[0].setAttribute("aria-valuetext",o)})}),a={destroy:function(){for(var t in G(bt.aria),G(bt.tooltips),b.cssClasses)b.cssClasses.hasOwnProperty(t)&&gt(h,b.cssClasses[t]);for(;h.firstChild;)h.removeChild(h.firstChild);delete h.noUiSlider},steps:function(){return m.map(at)},on:$,off:G,get:st,set:ot,setHandle:function(t,e,r,n){if(!(0<=(t=Number(t))&&t<m.length))throw new Error("noUiSlider ("+lt+"): invalid handle number, got: "+t);rt(t,it(e,t),!0,!0,n),J("update",t),r&&J("set",t)},reset:function(t){ot(b.start,t)},__moveHandles:function(t,e,r){Z(t,e,S,r)},options:o,updateOptions:function(e,t){var r=st(),n=["margin","limit","padding","range","animate","snap","step","format","pips","tooltips"];n.forEach(function(t){void 0!==e[t]&&(o[t]=e[t])});var i=xt(o);n.forEach(function(t){void 0!==e[t]&&(b[t]=i[t])}),y=i.spectrum,b.margin=i.margin,b.limit=i.limit,b.padding=i.padding,b.pips?R(b.pips):F(),b.tooltips?H():z(),S=[],ot(ct(e.start)?e.start:r,t)},target:h,removePips:F,removeTooltips:z,getTooltips:function(){return i},getOrigins:function(){return u},pips:R}}return{__spectrum:i,version:lt,cssClasses:u,create:function(t,e){if(!t||!t.nodeName)throw new Error("noUiSlider ("+lt+"): create requires a single element, got: "+t);if(t.noUiSlider)throw new Error("noUiSlider ("+lt+"): Slider was already initialized.");var r=H(t,xt(e),e);return t.noUiSlider=r}}});

/**
 * photo-swipe (photoswipe-ui-default.min.js) - 4.1.3
 */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipeUI_Default=b()}(this,function(){"use strict";var a=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=this,w=!1,x=!0,y=!0,z={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(a,b){return a.title?(b.children[0].innerHTML=a.title,!0):(b.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return a.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return a.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},A=function(a){if(r)return!0;a=a||window.event,q.timeToIdle&&q.mouseUsed&&!k&&K();for(var c,d,e=a.target||a.srcElement,f=e.getAttribute("class")||"",g=0;g<S.length;g++)c=S[g],c.onTap&&f.indexOf("pswp__"+c.name)>-1&&(c.onTap(),d=!0);if(d){a.stopPropagation&&a.stopPropagation(),r=!0;var h=b.features.isOldAndroid?600:30;s=setTimeout(function(){r=!1},h)}},B=function(){return!a.likelyTouchDevice||q.mouseUsed||screen.width>q.fitControlsWidth},C=function(a,c,d){b[(d?"add":"remove")+"Class"](a,"pswp__"+c)},D=function(){var a=1===q.getNumItemsFn();a!==p&&(C(d,"ui--one-slide",a),p=a)},E=function(){C(i,"share-modal--hidden",y)},F=function(){return y=!y,y?(b.removeClass(i,"pswp__share-modal--fade-in"),setTimeout(function(){y&&E()},300)):(E(),setTimeout(function(){y||b.addClass(i,"pswp__share-modal--fade-in")},30)),y||H(),!1},G=function(b){b=b||window.event;var c=b.target||b.srcElement;return a.shout("shareLinkClick",b,c),!!c.href&&(!!c.hasAttribute("download")||(window.open(c.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),y||F(),!1))},H=function(){for(var a,b,c,d,e,f="",g=0;g<q.shareButtons.length;g++)a=q.shareButtons[g],c=q.getImageURLForShare(a),d=q.getPageURLForShare(a),e=q.getTextForShare(a),b=a.url.replace("{{url}}",encodeURIComponent(d)).replace("{{image_url}}",encodeURIComponent(c)).replace("{{raw_image_url}}",c).replace("{{text}}",encodeURIComponent(e)),f+='<a href="'+b+'" target="_blank" class="pswp__share--'+a.id+'"'+(a.download?"download":"")+">"+a.label+"</a>",q.parseShareButtonOut&&(f=q.parseShareButtonOut(a,f));i.children[0].innerHTML=f,i.children[0].onclick=G},I=function(a){for(var c=0;c<q.closeElClasses.length;c++)if(b.hasClass(a,"pswp__"+q.closeElClasses[c]))return!0},J=0,K=function(){clearTimeout(u),J=0,k&&v.setIdle(!1)},L=function(a){a=a?a:window.event;var b=a.relatedTarget||a.toElement;b&&"HTML"!==b.nodeName||(clearTimeout(u),u=setTimeout(function(){v.setIdle(!0)},q.timeToIdleOutside))},M=function(){q.fullscreenEl&&!b.features.isOldAndroid&&(c||(c=v.getFullscreenAPI()),c?(b.bind(document,c.eventK,v.updateFullscreen),v.updateFullscreen(),b.addClass(a.template,"pswp--supports-fs")):b.removeClass(a.template,"pswp--supports-fs"))},N=function(){q.preloaderEl&&(O(!0),l("beforeChange",function(){clearTimeout(o),o=setTimeout(function(){a.currItem&&a.currItem.loading?(!a.allowProgressiveImg()||a.currItem.img&&!a.currItem.img.naturalWidth)&&O(!1):O(!0)},q.loadingIndicatorDelay)}),l("imageLoadComplete",function(b,c){a.currItem===c&&O(!0)}))},O=function(a){n!==a&&(C(m,"preloader--active",!a),n=a)},P=function(a){var c=a.vGap;if(B()){var g=q.barsSize;if(q.captionEl&&"auto"===g.bottom)if(f||(f=b.createEl("pswp__caption pswp__caption--fake"),f.appendChild(b.createEl("pswp__caption__center")),d.insertBefore(f,e),b.addClass(d,"pswp__ui--fit")),q.addCaptionHTMLFn(a,f,!0)){var h=f.clientHeight;c.bottom=parseInt(h,10)||44}else c.bottom=g.top;else c.bottom="auto"===g.bottom?0:g.bottom;c.top=g.top}else c.top=c.bottom=0},Q=function(){q.timeToIdle&&l("mouseUsed",function(){b.bind(document,"mousemove",K),b.bind(document,"mouseout",L),t=setInterval(function(){J++,2===J&&v.setIdle(!0)},q.timeToIdle/2)})},R=function(){l("onVerticalDrag",function(a){x&&a<.95?v.hideControls():!x&&a>=.95&&v.showControls()});var a;l("onPinchClose",function(b){x&&b<.9?(v.hideControls(),a=!0):a&&!x&&b>.9&&v.showControls()}),l("zoomGestureEnded",function(){a=!1,a&&!x&&v.showControls()})},S=[{name:"caption",option:"captionEl",onInit:function(a){e=a}},{name:"share-modal",option:"shareEl",onInit:function(a){i=a},onTap:function(){F()}},{name:"button--share",option:"shareEl",onInit:function(a){h=a},onTap:function(){F()}},{name:"button--zoom",option:"zoomEl",onTap:a.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(a){g=a}},{name:"button--close",option:"closeEl",onTap:a.close},{name:"button--arrow--left",option:"arrowEl",onTap:a.prev},{name:"button--arrow--right",option:"arrowEl",onTap:a.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){c.isFullscreen()?c.exit():c.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(a){m=a}}],T=function(){var a,c,e,f=function(d){if(d)for(var f=d.length,g=0;g<f;g++){a=d[g],c=a.className;for(var h=0;h<S.length;h++)e=S[h],c.indexOf("pswp__"+e.name)>-1&&(q[e.option]?(b.removeClass(a,"pswp__element--disabled"),e.onInit&&e.onInit(a)):b.addClass(a,"pswp__element--disabled"))}};f(d.children);var g=b.getChildByClass(d,"pswp__top-bar");g&&f(g.children)};v.init=function(){b.extend(a.options,z,!0),q=a.options,d=b.getChildByClass(a.scrollWrap,"pswp__ui"),l=a.listen,R(),l("beforeChange",v.update),l("doubleTap",function(b){var c=a.currItem.initialZoomLevel;a.getZoomLevel()!==c?a.zoomTo(c,b,333):a.zoomTo(q.getDoubleTapZoom(!1,a.currItem),b,333)}),l("preventDragEvent",function(a,b,c){var d=a.target||a.srcElement;d&&d.getAttribute("class")&&a.type.indexOf("mouse")>-1&&(d.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(d.tagName))&&(c.prevent=!1)}),l("bindEvents",function(){b.bind(d,"pswpTap click",A),b.bind(a.scrollWrap,"pswpTap",v.onGlobalTap),a.likelyTouchDevice||b.bind(a.scrollWrap,"mouseover",v.onMouseOver)}),l("unbindEvents",function(){y||F(),t&&clearInterval(t),b.unbind(document,"mouseout",L),b.unbind(document,"mousemove",K),b.unbind(d,"pswpTap click",A),b.unbind(a.scrollWrap,"pswpTap",v.onGlobalTap),b.unbind(a.scrollWrap,"mouseover",v.onMouseOver),c&&(b.unbind(document,c.eventK,v.updateFullscreen),c.isFullscreen()&&(q.hideAnimationDuration=0,c.exit()),c=null)}),l("destroy",function(){q.captionEl&&(f&&d.removeChild(f),b.removeClass(e,"pswp__caption--empty")),i&&(i.children[0].onclick=null),b.removeClass(d,"pswp__ui--over-close"),b.addClass(d,"pswp__ui--hidden"),v.setIdle(!1)}),q.showAnimationDuration||b.removeClass(d,"pswp__ui--hidden"),l("initialZoomIn",function(){q.showAnimationDuration&&b.removeClass(d,"pswp__ui--hidden")}),l("initialZoomOut",function(){b.addClass(d,"pswp__ui--hidden")}),l("parseVerticalMargin",P),T(),q.shareEl&&h&&i&&(y=!0),D(),Q(),M(),N()},v.setIdle=function(a){k=a,C(d,"ui--idle",a)},v.update=function(){x&&a.currItem?(v.updateIndexIndicator(),q.captionEl&&(q.addCaptionHTMLFn(a.currItem,e),C(e,"caption--empty",!a.currItem.title)),w=!0):w=!1,y||F(),D()},v.updateFullscreen=function(d){d&&setTimeout(function(){a.setScrollOffset(0,b.getScrollY())},50),b[(c.isFullscreen()?"add":"remove")+"Class"](a.template,"pswp--fs")},v.updateIndexIndicator=function(){q.counterEl&&(g.innerHTML=a.getCurrentIndex()+1+q.indexIndicatorSep+q.getNumItemsFn())},v.onGlobalTap=function(c){c=c||window.event;var d=c.target||c.srcElement;if(!r)if(c.detail&&"mouse"===c.detail.pointerType){if(I(d))return void a.close();b.hasClass(d,"pswp__img")&&(1===a.getZoomLevel()&&a.getZoomLevel()<=a.currItem.fitRatio?q.clickToCloseNonZoomable&&a.close():a.toggleDesktopZoom(c.detail.releasePoint))}else if(q.tapToToggleControls&&(x?v.hideControls():v.showControls()),q.tapToClose&&(b.hasClass(d,"pswp__img")||I(d)))return void a.close()},v.onMouseOver=function(a){a=a||window.event;var b=a.target||a.srcElement;C(d,"ui--over-close",I(b))},v.hideControls=function(){b.addClass(d,"pswp__ui--hidden"),x=!1},v.showControls=function(){x=!0,w||v.update(),b.removeClass(d,"pswp__ui--hidden")},v.supportsFullscreen=function(){var a=document;return!!(a.exitFullscreen||a.mozCancelFullScreen||a.webkitExitFullscreen||a.msExitFullscreen)},v.getFullscreenAPI=function(){var b,c=document.documentElement,d="fullscreenchange";return c.requestFullscreen?b={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:d}:c.mozRequestFullScreen?b={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+d}:c.webkitRequestFullscreen?b={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+d}:c.msRequestFullscreen&&(b={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),b&&(b.enter=function(){return j=q.closeOnScroll,q.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?a.template[this.enterK]():void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},b.exit=function(){return q.closeOnScroll=j,document[this.exitK]()},b.isFullscreen=function(){return document[this.elementK]}),b}};return a});

/**
 * photo-swipe (photoswipe.min.js) - 4.1.3
 */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipe=b()}(this,function(){"use strict";var a=function(a,b,c,d){var e={features:null,bind:function(a,b,c,d){var e=(d?"remove":"add")+"EventListener";b=b.split(" ");for(var f=0;f<b.length;f++)b[f]&&a[e](b[f],c,!1)},isArray:function(a){return a instanceof Array},createEl:function(a,b){var c=document.createElement(b||"div");return a&&(c.className=a),c},getScrollY:function(){var a=window.pageYOffset;return void 0!==a?a:document.documentElement.scrollTop},unbind:function(a,b,c){e.bind(a,b,c,!0)},removeClass:function(a,b){var c=new RegExp("(\\s|^)"+b+"(\\s|$)");a.className=a.className.replace(c," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(a,b){e.hasClass(a,b)||(a.className+=(a.className?" ":"")+b)},hasClass:function(a,b){return a.className&&new RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)},getChildByClass:function(a,b){for(var c=a.firstChild;c;){if(e.hasClass(c,b))return c;c=c.nextSibling}},arraySearch:function(a,b,c){for(var d=a.length;d--;)if(a[d][c]===b)return d;return-1},extend:function(a,b,c){for(var d in b)if(b.hasOwnProperty(d)){if(c&&a.hasOwnProperty(d))continue;a[d]=b[d]}},easing:{sine:{out:function(a){return Math.sin(a*(Math.PI/2))},inOut:function(a){return-(Math.cos(Math.PI*a)-1)/2}},cubic:{out:function(a){return--a*a*a+1}}},detectFeatures:function(){if(e.features)return e.features;var a=e.createEl(),b=a.style,c="",d={};if(d.oldIE=document.all&&!document.addEventListener,d.touch="ontouchstart"in window,window.requestAnimationFrame&&(d.raf=window.requestAnimationFrame,d.caf=window.cancelAnimationFrame),d.pointerEvent=!!window.PointerEvent||navigator.msPointerEnabled,!d.pointerEvent){var f=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var g=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);g&&g.length>0&&(g=parseInt(g[1],10),g>=1&&g<8&&(d.isOldIOSPhone=!0))}var h=f.match(/Android\s([0-9\.]*)/),i=h?h[1]:0;i=parseFloat(i),i>=1&&(i<4.4&&(d.isOldAndroid=!0),d.androidVersion=i),d.isMobileOpera=/opera mini|opera mobi/i.test(f)}for(var j,k,l=["transform","perspective","animationName"],m=["","webkit","Moz","ms","O"],n=0;n<4;n++){c=m[n];for(var o=0;o<3;o++)j=l[o],k=c+(c?j.charAt(0).toUpperCase()+j.slice(1):j),!d[j]&&k in b&&(d[j]=k);c&&!d.raf&&(c=c.toLowerCase(),d.raf=window[c+"RequestAnimationFrame"],d.raf&&(d.caf=window[c+"CancelAnimationFrame"]||window[c+"CancelRequestAnimationFrame"]))}if(!d.raf){var p=0;d.raf=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-p)),d=window.setTimeout(function(){a(b+c)},c);return p=b+c,d},d.caf=function(a){clearTimeout(a)}}return d.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,e.features=d,d}};e.detectFeatures(),e.features.oldIE&&(e.bind=function(a,b,c,d){b=b.split(" ");for(var e,f=(d?"detach":"attach")+"Event",g=function(){c.handleEvent.call(c)},h=0;h<b.length;h++)if(e=b[h])if("object"==typeof c&&c.handleEvent){if(d){if(!c["oldIE"+e])return!1}else c["oldIE"+e]=g;a[f]("on"+e,c["oldIE"+e])}else a[f]("on"+e,c)});var f=this,g=25,h=3,i={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(a){return"A"===a.tagName},getDoubleTapZoom:function(a,b){return a?1:b.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};e.extend(i,d);var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma=function(){return{x:0,y:0}},na=ma(),oa=ma(),pa=ma(),qa={},ra=0,sa={},ta=ma(),ua=0,va=!0,wa=[],xa={},ya=!1,za=function(a,b){e.extend(f,b.publicMethods),wa.push(a)},Aa=function(a){var b=ac();return a>b-1?a-b:a<0?b+a:a},Ba={},Ca=function(a,b){return Ba[a]||(Ba[a]=[]),Ba[a].push(b)},Da=function(a){var b=Ba[a];if(b){var c=Array.prototype.slice.call(arguments);c.shift();for(var d=0;d<b.length;d++)b[d].apply(f,c)}},Ea=function(){return(new Date).getTime()},Fa=function(a){ja=a,f.bg.style.opacity=a*i.bgOpacity},Ga=function(a,b,c,d,e){(!ya||e&&e!==f.currItem)&&(d/=e?e.fitRatio:f.currItem.fitRatio),a[E]=u+b+"px, "+c+"px"+v+" scale("+d+")"},Ha=function(a){ea&&(a&&(s>f.currItem.fitRatio?ya||(mc(f.currItem,!1,!0),ya=!0):ya&&(mc(f.currItem),ya=!1)),Ga(ea,pa.x,pa.y,s))},Ia=function(a){a.container&&Ga(a.container.style,a.initialPosition.x,a.initialPosition.y,a.initialZoomLevel,a)},Ja=function(a,b){b[E]=u+a+"px, 0px"+v},Ka=function(a,b){if(!i.loop&&b){var c=m+(ta.x*ra-a)/ta.x,d=Math.round(a-tb.x);(c<0&&d>0||c>=ac()-1&&d<0)&&(a=tb.x+d*i.mainScrollEndFriction)}tb.x=a,Ja(a,n)},La=function(a,b){var c=ub[a]-sa[a];return oa[a]+na[a]+c-c*(b/t)},Ma=function(a,b){a.x=b.x,a.y=b.y,b.id&&(a.id=b.id)},Na=function(a){a.x=Math.round(a.x),a.y=Math.round(a.y)},Oa=null,Pa=function(){Oa&&(e.unbind(document,"mousemove",Pa),e.addClass(a,"pswp--has_mouse"),i.mouseUsed=!0,Da("mouseUsed")),Oa=setTimeout(function(){Oa=null},100)},Qa=function(){e.bind(document,"keydown",f),N.transform&&e.bind(f.scrollWrap,"click",f),i.mouseUsed||e.bind(document,"mousemove",Pa),e.bind(window,"resize scroll orientationchange",f),Da("bindEvents")},Ra=function(){e.unbind(window,"resize scroll orientationchange",f),e.unbind(window,"scroll",r.scroll),e.unbind(document,"keydown",f),e.unbind(document,"mousemove",Pa),N.transform&&e.unbind(f.scrollWrap,"click",f),V&&e.unbind(window,p,f),clearTimeout(O),Da("unbindEvents")},Sa=function(a,b){var c=ic(f.currItem,qa,a);return b&&(da=c),c},Ta=function(a){return a||(a=f.currItem),a.initialZoomLevel},Ua=function(a){return a||(a=f.currItem),a.w>0?i.maxSpreadZoom:1},Va=function(a,b,c,d){return d===f.currItem.initialZoomLevel?(c[a]=f.currItem.initialPosition[a],!0):(c[a]=La(a,d),c[a]>b.min[a]?(c[a]=b.min[a],!0):c[a]<b.max[a]&&(c[a]=b.max[a],!0))},Wa=function(){if(E){var b=N.perspective&&!G;return u="translate"+(b?"3d(":"("),void(v=N.perspective?", 0px)":")")}E="left",e.addClass(a,"pswp--ie"),Ja=function(a,b){b.left=a+"px"},Ia=function(a){var b=a.fitRatio>1?1:a.fitRatio,c=a.container.style,d=b*a.w,e=b*a.h;c.width=d+"px",c.height=e+"px",c.left=a.initialPosition.x+"px",c.top=a.initialPosition.y+"px"},Ha=function(){if(ea){var a=ea,b=f.currItem,c=b.fitRatio>1?1:b.fitRatio,d=c*b.w,e=c*b.h;a.width=d+"px",a.height=e+"px",a.left=pa.x+"px",a.top=pa.y+"px"}}},Xa=function(a){var b="";i.escKey&&27===a.keyCode?b="close":i.arrowKeys&&(37===a.keyCode?b="prev":39===a.keyCode&&(b="next")),b&&(a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||(a.preventDefault?a.preventDefault():a.returnValue=!1,f[b]()))},Ya=function(a){a&&(Y||X||fa||T)&&(a.preventDefault(),a.stopPropagation())},Za=function(){f.setScrollOffset(0,e.getScrollY())},$a={},_a=0,ab=function(a){$a[a]&&($a[a].raf&&I($a[a].raf),_a--,delete $a[a])},bb=function(a){$a[a]&&ab(a),$a[a]||(_a++,$a[a]={})},cb=function(){for(var a in $a)$a.hasOwnProperty(a)&&ab(a)},db=function(a,b,c,d,e,f,g){var h,i=Ea();bb(a);var j=function(){if($a[a]){if(h=Ea()-i,h>=d)return ab(a),f(c),void(g&&g());f((c-b)*e(h/d)+b),$a[a].raf=H(j)}};j()},eb={shout:Da,listen:Ca,viewportSize:qa,options:i,isMainScrollAnimating:function(){return fa},getZoomLevel:function(){return s},getCurrentIndex:function(){return m},isDragging:function(){return V},isZooming:function(){return aa},setScrollOffset:function(a,b){sa.x=a,M=sa.y=b,Da("updateScrollOffset",sa)},applyZoomPan:function(a,b,c,d){pa.x=b,pa.y=c,s=a,Ha(d)},init:function(){if(!j&&!k){var c;f.framework=e,f.template=a,f.bg=e.getChildByClass(a,"pswp__bg"),J=a.className,j=!0,N=e.detectFeatures(),H=N.raf,I=N.caf,E=N.transform,L=N.oldIE,f.scrollWrap=e.getChildByClass(a,"pswp__scroll-wrap"),f.container=e.getChildByClass(f.scrollWrap,"pswp__container"),n=f.container.style,f.itemHolders=y=[{el:f.container.children[0],wrap:0,index:-1},{el:f.container.children[1],wrap:0,index:-1},{el:f.container.children[2],wrap:0,index:-1}],y[0].el.style.display=y[2].el.style.display="none",Wa(),r={resize:f.updateSize,orientationchange:function(){clearTimeout(O),O=setTimeout(function(){qa.x!==f.scrollWrap.clientWidth&&f.updateSize()},500)},scroll:Za,keydown:Xa,click:Ya};var d=N.isOldIOSPhone||N.isOldAndroid||N.isMobileOpera;for(N.animationName&&N.transform&&!d||(i.showAnimationDuration=i.hideAnimationDuration=0),c=0;c<wa.length;c++)f["init"+wa[c]]();if(b){var g=f.ui=new b(f,e);g.init()}Da("firstUpdate"),m=m||i.index||0,(isNaN(m)||m<0||m>=ac())&&(m=0),f.currItem=_b(m),(N.isOldIOSPhone||N.isOldAndroid)&&(va=!1),a.setAttribute("aria-hidden","false"),i.modal&&(va?a.style.position="fixed":(a.style.position="absolute",a.style.top=e.getScrollY()+"px")),void 0===M&&(Da("initialLayout"),M=K=e.getScrollY());var l="pswp--open ";for(i.mainClass&&(l+=i.mainClass+" "),i.showHideOpacity&&(l+="pswp--animate_opacity "),l+=G?"pswp--touch":"pswp--notouch",l+=N.animationName?" pswp--css_animation":"",l+=N.svg?" pswp--svg":"",e.addClass(a,l),f.updateSize(),o=-1,ua=null,c=0;c<h;c++)Ja((c+o)*ta.x,y[c].el.style);L||e.bind(f.scrollWrap,q,f),Ca("initialZoomInEnd",function(){f.setContent(y[0],m-1),f.setContent(y[2],m+1),y[0].el.style.display=y[2].el.style.display="block",i.focus&&a.focus(),Qa()}),f.setContent(y[1],m),f.updateCurrItem(),Da("afterInit"),va||(w=setInterval(function(){_a||V||aa||s!==f.currItem.initialZoomLevel||f.updateSize()},1e3)),e.addClass(a,"pswp--visible")}},close:function(){j&&(j=!1,k=!0,Da("close"),Ra(),cc(f.currItem,null,!0,f.destroy))},destroy:function(){Da("destroy"),Xb&&clearTimeout(Xb),a.setAttribute("aria-hidden","true"),a.className=J,w&&clearInterval(w),e.unbind(f.scrollWrap,q,f),e.unbind(window,"scroll",f),zb(),cb(),Ba=null},panTo:function(a,b,c){c||(a>da.min.x?a=da.min.x:a<da.max.x&&(a=da.max.x),b>da.min.y?b=da.min.y:b<da.max.y&&(b=da.max.y)),pa.x=a,pa.y=b,Ha()},handleEvent:function(a){a=a||window.event,r[a.type]&&r[a.type](a)},goTo:function(a){a=Aa(a);var b=a-m;ua=b,m=a,f.currItem=_b(m),ra-=b,Ka(ta.x*ra),cb(),fa=!1,f.updateCurrItem()},next:function(){f.goTo(m+1)},prev:function(){f.goTo(m-1)},updateCurrZoomItem:function(a){if(a&&Da("beforeChange",0),y[1].el.children.length){var b=y[1].el.children[0];ea=e.hasClass(b,"pswp__zoom-wrap")?b.style:null}else ea=null;da=f.currItem.bounds,t=s=f.currItem.initialZoomLevel,pa.x=da.center.x,pa.y=da.center.y,a&&Da("afterChange")},invalidateCurrItems:function(){x=!0;for(var a=0;a<h;a++)y[a].item&&(y[a].item.needsUpdate=!0)},updateCurrItem:function(a){if(0!==ua){var b,c=Math.abs(ua);if(!(a&&c<2)){f.currItem=_b(m),ya=!1,Da("beforeChange",ua),c>=h&&(o+=ua+(ua>0?-h:h),c=h);for(var d=0;d<c;d++)ua>0?(b=y.shift(),y[h-1]=b,o++,Ja((o+2)*ta.x,b.el.style),f.setContent(b,m-c+d+1+1)):(b=y.pop(),y.unshift(b),o--,Ja(o*ta.x,b.el.style),f.setContent(b,m+c-d-1-1));if(ea&&1===Math.abs(ua)){var e=_b(z);e.initialZoomLevel!==s&&(ic(e,qa),mc(e),Ia(e))}ua=0,f.updateCurrZoomItem(),z=m,Da("afterChange")}}},updateSize:function(b){if(!va&&i.modal){var c=e.getScrollY();if(M!==c&&(a.style.top=c+"px",M=c),!b&&xa.x===window.innerWidth&&xa.y===window.innerHeight)return;xa.x=window.innerWidth,xa.y=window.innerHeight,a.style.height=xa.y+"px"}if(qa.x=f.scrollWrap.clientWidth,qa.y=f.scrollWrap.clientHeight,Za(),ta.x=qa.x+Math.round(qa.x*i.spacing),ta.y=qa.y,Ka(ta.x*ra),Da("beforeResize"),void 0!==o){for(var d,g,j,k=0;k<h;k++)d=y[k],Ja((k+o)*ta.x,d.el.style),j=m+k-1,i.loop&&ac()>2&&(j=Aa(j)),g=_b(j),g&&(x||g.needsUpdate||!g.bounds)?(f.cleanSlide(g),f.setContent(d,j),1===k&&(f.currItem=g,f.updateCurrZoomItem(!0)),g.needsUpdate=!1):d.index===-1&&j>=0&&f.setContent(d,j),g&&g.container&&(ic(g,qa),mc(g),Ia(g));x=!1}t=s=f.currItem.initialZoomLevel,da=f.currItem.bounds,da&&(pa.x=da.center.x,pa.y=da.center.y,Ha(!0)),Da("resize")},zoomTo:function(a,b,c,d,f){b&&(t=s,ub.x=Math.abs(b.x)-pa.x,ub.y=Math.abs(b.y)-pa.y,Ma(oa,pa));var g=Sa(a,!1),h={};Va("x",g,h,a),Va("y",g,h,a);var i=s,j={x:pa.x,y:pa.y};Na(h);var k=function(b){1===b?(s=a,pa.x=h.x,pa.y=h.y):(s=(a-i)*b+i,pa.x=(h.x-j.x)*b+j.x,pa.y=(h.y-j.y)*b+j.y),f&&f(b),Ha(1===b)};c?db("customZoomTo",0,1,c,d||e.easing.sine.inOut,k):k(1)}},fb=30,gb=10,hb={},ib={},jb={},kb={},lb={},mb=[],nb={},ob=[],pb={},qb=0,rb=ma(),sb=0,tb=ma(),ub=ma(),vb=ma(),wb=function(a,b){return a.x===b.x&&a.y===b.y},xb=function(a,b){return Math.abs(a.x-b.x)<g&&Math.abs(a.y-b.y)<g},yb=function(a,b){return pb.x=Math.abs(a.x-b.x),pb.y=Math.abs(a.y-b.y),Math.sqrt(pb.x*pb.x+pb.y*pb.y)},zb=function(){Z&&(I(Z),Z=null)},Ab=function(){V&&(Z=H(Ab),Qb())},Bb=function(){return!("fit"===i.scaleMode&&s===f.currItem.initialZoomLevel)},Cb=function(a,b){return!(!a||a===document)&&(!(a.getAttribute("class")&&a.getAttribute("class").indexOf("pswp__scroll-wrap")>-1)&&(b(a)?a:Cb(a.parentNode,b)))},Db={},Eb=function(a,b){return Db.prevent=!Cb(a.target,i.isClickableElement),Da("preventDragEvent",a,b,Db),Db.prevent},Fb=function(a,b){return b.x=a.pageX,b.y=a.pageY,b.id=a.identifier,b},Gb=function(a,b,c){c.x=.5*(a.x+b.x),c.y=.5*(a.y+b.y)},Hb=function(a,b,c){if(a-Q>50){var d=ob.length>2?ob.shift():{};d.x=b,d.y=c,ob.push(d),Q=a}},Ib=function(){var a=pa.y-f.currItem.initialPosition.y;return 1-Math.abs(a/(qa.y/2))},Jb={},Kb={},Lb=[],Mb=function(a){for(;Lb.length>0;)Lb.pop();return F?(la=0,mb.forEach(function(a){0===la?Lb[0]=a:1===la&&(Lb[1]=a),la++})):a.type.indexOf("touch")>-1?a.touches&&a.touches.length>0&&(Lb[0]=Fb(a.touches[0],Jb),a.touches.length>1&&(Lb[1]=Fb(a.touches[1],Kb))):(Jb.x=a.pageX,Jb.y=a.pageY,Jb.id="",Lb[0]=Jb),Lb},Nb=function(a,b){var c,d,e,g,h=0,j=pa[a]+b[a],k=b[a]>0,l=tb.x+b.x,m=tb.x-nb.x;return c=j>da.min[a]||j<da.max[a]?i.panEndFriction:1,j=pa[a]+b[a]*c,!i.allowPanToNext&&s!==f.currItem.initialZoomLevel||(ea?"h"!==ga||"x"!==a||X||(k?(j>da.min[a]&&(c=i.panEndFriction,h=da.min[a]-j,d=da.min[a]-oa[a]),(d<=0||m<0)&&ac()>1?(g=l,m<0&&l>nb.x&&(g=nb.x)):da.min.x!==da.max.x&&(e=j)):(j<da.max[a]&&(c=i.panEndFriction,h=j-da.max[a],d=oa[a]-da.max[a]),(d<=0||m>0)&&ac()>1?(g=l,m>0&&l<nb.x&&(g=nb.x)):da.min.x!==da.max.x&&(e=j))):g=l,"x"!==a)?void(fa||$||s>f.currItem.fitRatio&&(pa[a]+=b[a]*c)):(void 0!==g&&(Ka(g,!0),$=g!==nb.x),da.min.x!==da.max.x&&(void 0!==e?pa.x=e:$||(pa.x+=b.x*c)),void 0!==g)},Ob=function(a){if(!("mousedown"===a.type&&a.button>0)){if($b)return void a.preventDefault();if(!U||"mousedown"!==a.type){if(Eb(a,!0)&&a.preventDefault(),Da("pointerDown"),F){var b=e.arraySearch(mb,a.pointerId,"id");b<0&&(b=mb.length),mb[b]={x:a.pageX,y:a.pageY,id:a.pointerId}}var c=Mb(a),d=c.length;_=null,cb(),V&&1!==d||(V=ha=!0,e.bind(window,p,f),S=ka=ia=T=$=Y=W=X=!1,ga=null,Da("firstTouchStart",c),Ma(oa,pa),na.x=na.y=0,Ma(kb,c[0]),Ma(lb,kb),nb.x=ta.x*ra,ob=[{x:kb.x,y:kb.y}],Q=P=Ea(),Sa(s,!0),zb(),Ab()),!aa&&d>1&&!fa&&!$&&(t=s,X=!1,aa=W=!0,na.y=na.x=0,Ma(oa,pa),Ma(hb,c[0]),Ma(ib,c[1]),Gb(hb,ib,vb),ub.x=Math.abs(vb.x)-pa.x,ub.y=Math.abs(vb.y)-pa.y,ba=ca=yb(hb,ib))}}},Pb=function(a){if(a.preventDefault(),F){var b=e.arraySearch(mb,a.pointerId,"id");if(b>-1){var c=mb[b];c.x=a.pageX,c.y=a.pageY}}if(V){var d=Mb(a);if(ga||Y||aa)_=d;else if(tb.x!==ta.x*ra)ga="h";else{var f=Math.abs(d[0].x-kb.x)-Math.abs(d[0].y-kb.y);Math.abs(f)>=gb&&(ga=f>0?"h":"v",_=d)}}},Qb=function(){if(_){var a=_.length;if(0!==a)if(Ma(hb,_[0]),jb.x=hb.x-kb.x,jb.y=hb.y-kb.y,aa&&a>1){if(kb.x=hb.x,kb.y=hb.y,!jb.x&&!jb.y&&wb(_[1],ib))return;Ma(ib,_[1]),X||(X=!0,Da("zoomGestureStarted"));var b=yb(hb,ib),c=Vb(b);c>f.currItem.initialZoomLevel+f.currItem.initialZoomLevel/15&&(ka=!0);var d=1,e=Ta(),g=Ua();if(c<e)if(i.pinchToClose&&!ka&&t<=f.currItem.initialZoomLevel){var h=e-c,j=1-h/(e/1.2);Fa(j),Da("onPinchClose",j),ia=!0}else d=(e-c)/e,d>1&&(d=1),c=e-d*(e/3);else c>g&&(d=(c-g)/(6*e),d>1&&(d=1),c=g+d*e);d<0&&(d=0),ba=b,Gb(hb,ib,rb),na.x+=rb.x-vb.x,na.y+=rb.y-vb.y,Ma(vb,rb),pa.x=La("x",c),pa.y=La("y",c),S=c>s,s=c,Ha()}else{if(!ga)return;if(ha&&(ha=!1,Math.abs(jb.x)>=gb&&(jb.x-=_[0].x-lb.x),Math.abs(jb.y)>=gb&&(jb.y-=_[0].y-lb.y)),kb.x=hb.x,kb.y=hb.y,0===jb.x&&0===jb.y)return;if("v"===ga&&i.closeOnVerticalDrag&&!Bb()){na.y+=jb.y,pa.y+=jb.y;var k=Ib();return T=!0,Da("onVerticalDrag",k),Fa(k),void Ha()}Hb(Ea(),hb.x,hb.y),Y=!0,da=f.currItem.bounds;var l=Nb("x",jb);l||(Nb("y",jb),Na(pa),Ha())}}},Rb=function(a){if(N.isOldAndroid){if(U&&"mouseup"===a.type)return;a.type.indexOf("touch")>-1&&(clearTimeout(U),U=setTimeout(function(){U=0},600))}Da("pointerUp"),Eb(a,!1)&&a.preventDefault();var b;if(F){var c=e.arraySearch(mb,a.pointerId,"id");if(c>-1)if(b=mb.splice(c,1)[0],navigator.msPointerEnabled){var d={4:"mouse",2:"touch",3:"pen"};b.type=d[a.pointerType],b.type||(b.type=a.pointerType||"mouse")}else b.type=a.pointerType||"mouse"}var g,h=Mb(a),j=h.length;if("mouseup"===a.type&&(j=0),2===j)return _=null,!0;1===j&&Ma(lb,h[0]),0!==j||ga||fa||(b||("mouseup"===a.type?b={x:a.pageX,y:a.pageY,type:"mouse"}:a.changedTouches&&a.changedTouches[0]&&(b={x:a.changedTouches[0].pageX,y:a.changedTouches[0].pageY,type:"touch"})),Da("touchRelease",a,b));var k=-1;if(0===j&&(V=!1,e.unbind(window,p,f),zb(),aa?k=0:sb!==-1&&(k=Ea()-sb)),sb=1===j?Ea():-1,g=k!==-1&&k<150?"zoom":"swipe",aa&&j<2&&(aa=!1,1===j&&(g="zoomPointerUp"),Da("zoomGestureEnded")),_=null,Y||X||fa||T)if(cb(),R||(R=Sb()),R.calculateSwipeSpeed("x"),T){var l=Ib();if(l<i.verticalDragRange)f.close();else{var m=pa.y,n=ja;db("verticalDrag",0,1,300,e.easing.cubic.out,function(a){pa.y=(f.currItem.initialPosition.y-m)*a+m,Fa((1-n)*a+n),Ha()}),Da("onVerticalDrag",1)}}else{if(($||fa)&&0===j){var o=Ub(g,R);if(o)return;g="zoomPointerUp"}if(!fa)return"swipe"!==g?void Wb():void(!$&&s>f.currItem.fitRatio&&Tb(R))}},Sb=function(){var a,b,c={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(d){ob.length>1?(a=Ea()-Q+50,b=ob[ob.length-2][d]):(a=Ea()-P,b=lb[d]),c.lastFlickOffset[d]=kb[d]-b,c.lastFlickDist[d]=Math.abs(c.lastFlickOffset[d]),c.lastFlickDist[d]>20?c.lastFlickSpeed[d]=c.lastFlickOffset[d]/a:c.lastFlickSpeed[d]=0,Math.abs(c.lastFlickSpeed[d])<.1&&(c.lastFlickSpeed[d]=0),c.slowDownRatio[d]=.95,c.slowDownRatioReverse[d]=1-c.slowDownRatio[d],c.speedDecelerationRatio[d]=1},calculateOverBoundsAnimOffset:function(a,b){c.backAnimStarted[a]||(pa[a]>da.min[a]?c.backAnimDestination[a]=da.min[a]:pa[a]<da.max[a]&&(c.backAnimDestination[a]=da.max[a]),void 0!==c.backAnimDestination[a]&&(c.slowDownRatio[a]=.7,c.slowDownRatioReverse[a]=1-c.slowDownRatio[a],c.speedDecelerationRatioAbs[a]<.05&&(c.lastFlickSpeed[a]=0,c.backAnimStarted[a]=!0,db("bounceZoomPan"+a,pa[a],c.backAnimDestination[a],b||300,e.easing.sine.out,function(b){pa[a]=b,Ha()}))))},calculateAnimOffset:function(a){c.backAnimStarted[a]||(c.speedDecelerationRatio[a]=c.speedDecelerationRatio[a]*(c.slowDownRatio[a]+c.slowDownRatioReverse[a]-c.slowDownRatioReverse[a]*c.timeDiff/10),c.speedDecelerationRatioAbs[a]=Math.abs(c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]),c.distanceOffset[a]=c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]*c.timeDiff,pa[a]+=c.distanceOffset[a])},panAnimLoop:function(){if($a.zoomPan&&($a.zoomPan.raf=H(c.panAnimLoop),c.now=Ea(),c.timeDiff=c.now-c.lastNow,c.lastNow=c.now,c.calculateAnimOffset("x"),c.calculateAnimOffset("y"),Ha(),c.calculateOverBoundsAnimOffset("x"),c.calculateOverBoundsAnimOffset("y"),c.speedDecelerationRatioAbs.x<.05&&c.speedDecelerationRatioAbs.y<.05))return pa.x=Math.round(pa.x),pa.y=Math.round(pa.y),Ha(),void ab("zoomPan")}};return c},Tb=function(a){return a.calculateSwipeSpeed("y"),da=f.currItem.bounds,a.backAnimDestination={},a.backAnimStarted={},Math.abs(a.lastFlickSpeed.x)<=.05&&Math.abs(a.lastFlickSpeed.y)<=.05?(a.speedDecelerationRatioAbs.x=a.speedDecelerationRatioAbs.y=0,a.calculateOverBoundsAnimOffset("x"),a.calculateOverBoundsAnimOffset("y"),!0):(bb("zoomPan"),a.lastNow=Ea(),void a.panAnimLoop())},Ub=function(a,b){var c;fa||(qb=m);var d;if("swipe"===a){var g=kb.x-lb.x,h=b.lastFlickDist.x<10;g>fb&&(h||b.lastFlickOffset.x>20)?d=-1:g<-fb&&(h||b.lastFlickOffset.x<-20)&&(d=1)}var j;d&&(m+=d,m<0?(m=i.loop?ac()-1:0,j=!0):m>=ac()&&(m=i.loop?0:ac()-1,j=!0),j&&!i.loop||(ua+=d,ra-=d,c=!0));var k,l=ta.x*ra,n=Math.abs(l-tb.x);return c||l>tb.x==b.lastFlickSpeed.x>0?(k=Math.abs(b.lastFlickSpeed.x)>0?n/Math.abs(b.lastFlickSpeed.x):333,k=Math.min(k,400),k=Math.max(k,250)):k=333,qb===m&&(c=!1),fa=!0,Da("mainScrollAnimStart"),db("mainScroll",tb.x,l,k,e.easing.cubic.out,Ka,function(){cb(),fa=!1,qb=-1,(c||qb!==m)&&f.updateCurrItem(),Da("mainScrollAnimComplete")}),c&&f.updateCurrItem(!0),c},Vb=function(a){return 1/ca*a*t},Wb=function(){var a=s,b=Ta(),c=Ua();s<b?a=b:s>c&&(a=c);var d,g=1,h=ja;return ia&&!S&&!ka&&s<b?(f.close(),!0):(ia&&(d=function(a){Fa((g-h)*a+h)}),f.zoomTo(a,0,200,e.easing.cubic.out,d),!0)};za("Gestures",{publicMethods:{initGestures:function(){var a=function(a,b,c,d,e){A=a+b,B=a+c,C=a+d,D=e?a+e:""};F=N.pointerEvent,F&&N.touch&&(N.touch=!1),F?navigator.msPointerEnabled?a("MSPointer","Down","Move","Up","Cancel"):a("pointer","down","move","up","cancel"):N.touch?(a("touch","start","move","end","cancel"),G=!0):a("mouse","down","move","up"),p=B+" "+C+" "+D,q=A,F&&!G&&(G=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),f.likelyTouchDevice=G,r[A]=Ob,r[B]=Pb,r[C]=Rb,D&&(r[D]=r[C]),N.touch&&(q+=" mousedown",p+=" mousemove mouseup",r.mousedown=r[A],r.mousemove=r[B],r.mouseup=r[C]),G||(i.allowPanToNext=!1)}}});var Xb,Yb,Zb,$b,_b,ac,bc,cc=function(b,c,d,g){Xb&&clearTimeout(Xb),$b=!0,Zb=!0;var h;b.initialLayout?(h=b.initialLayout,b.initialLayout=null):h=i.getThumbBoundsFn&&i.getThumbBoundsFn(m);var j=d?i.hideAnimationDuration:i.showAnimationDuration,k=function(){ab("initialZoom"),d?(f.template.removeAttribute("style"),f.bg.removeAttribute("style")):(Fa(1),c&&(c.style.display="block"),e.addClass(a,"pswp--animated-in"),Da("initialZoom"+(d?"OutEnd":"InEnd"))),g&&g(),$b=!1};if(!j||!h||void 0===h.x)return Da("initialZoom"+(d?"Out":"In")),s=b.initialZoomLevel,Ma(pa,b.initialPosition),Ha(),a.style.opacity=d?0:1,Fa(1),void(j?setTimeout(function(){k()},j):k());var n=function(){var c=l,g=!f.currItem.src||f.currItem.loadError||i.showHideOpacity;b.miniImg&&(b.miniImg.style.webkitBackfaceVisibility="hidden"),d||(s=h.w/b.w,pa.x=h.x,pa.y=h.y-K,f[g?"template":"bg"].style.opacity=.001,Ha()),bb("initialZoom"),d&&!c&&e.removeClass(a,"pswp--animated-in"),g&&(d?e[(c?"remove":"add")+"Class"](a,"pswp--animate_opacity"):setTimeout(function(){e.addClass(a,"pswp--animate_opacity")},30)),Xb=setTimeout(function(){if(Da("initialZoom"+(d?"Out":"In")),d){var f=h.w/b.w,i={x:pa.x,y:pa.y},l=s,m=ja,n=function(b){1===b?(s=f,pa.x=h.x,pa.y=h.y-M):(s=(f-l)*b+l,pa.x=(h.x-i.x)*b+i.x,pa.y=(h.y-M-i.y)*b+i.y),Ha(),g?a.style.opacity=1-b:Fa(m-b*m)};c?db("initialZoom",0,1,j,e.easing.cubic.out,n,k):(n(1),Xb=setTimeout(k,j+20))}else s=b.initialZoomLevel,Ma(pa,b.initialPosition),Ha(),Fa(1),g?a.style.opacity=1:Fa(1),Xb=setTimeout(k,j+20)},d?25:90)};n()},dc={},ec=[],fc={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Yb.length}},gc=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},hc=function(a,b,c){var d=a.bounds;d.center.x=Math.round((dc.x-b)/2),d.center.y=Math.round((dc.y-c)/2)+a.vGap.top,d.max.x=b>dc.x?Math.round(dc.x-b):d.center.x,d.max.y=c>dc.y?Math.round(dc.y-c)+a.vGap.top:d.center.y,d.min.x=b>dc.x?0:d.center.x,d.min.y=c>dc.y?a.vGap.top:d.center.y},ic=function(a,b,c){if(a.src&&!a.loadError){var d=!c;if(d&&(a.vGap||(a.vGap={top:0,bottom:0}),Da("parseVerticalMargin",a)),dc.x=b.x,dc.y=b.y-a.vGap.top-a.vGap.bottom,d){var e=dc.x/a.w,f=dc.y/a.h;a.fitRatio=e<f?e:f;var g=i.scaleMode;"orig"===g?c=1:"fit"===g&&(c=a.fitRatio),c>1&&(c=1),a.initialZoomLevel=c,a.bounds||(a.bounds=gc())}if(!c)return;return hc(a,a.w*c,a.h*c),d&&c===a.initialZoomLevel&&(a.initialPosition=a.bounds.center),a.bounds}return a.w=a.h=0,a.initialZoomLevel=a.fitRatio=1,a.bounds=gc(),a.initialPosition=a.bounds.center,a.bounds},jc=function(a,b,c,d,e,g){b.loadError||d&&(b.imageAppended=!0,mc(b,d,b===f.currItem&&ya),c.appendChild(d),g&&setTimeout(function(){b&&b.loaded&&b.placeholder&&(b.placeholder.style.display="none",b.placeholder=null)},500))},kc=function(a){a.loading=!0,a.loaded=!1;var b=a.img=e.createEl("pswp__img","img"),c=function(){a.loading=!1,a.loaded=!0,a.loadComplete?a.loadComplete(a):a.img=null,b.onload=b.onerror=null,b=null};return b.onload=c,b.onerror=function(){a.loadError=!0,c()},b.src=a.src,b},lc=function(a,b){if(a.src&&a.loadError&&a.container)return b&&(a.container.innerHTML=""),a.container.innerHTML=i.errorMsg.replace("%url%",a.src),!0},mc=function(a,b,c){if(a.src){b||(b=a.container.lastChild);var d=c?a.w:Math.round(a.w*a.fitRatio),e=c?a.h:Math.round(a.h*a.fitRatio);a.placeholder&&!a.loaded&&(a.placeholder.style.width=d+"px",a.placeholder.style.height=e+"px"),b.style.width=d+"px",b.style.height=e+"px"}},nc=function(){if(ec.length){for(var a,b=0;b<ec.length;b++)a=ec[b],a.holder.index===a.index&&jc(a.index,a.item,a.baseDiv,a.img,!1,a.clearPlaceholder);ec=[]}};za("Controller",{publicMethods:{lazyLoadItem:function(a){a=Aa(a);var b=_b(a);b&&(!b.loaded&&!b.loading||x)&&(Da("gettingData",a,b),b.src&&kc(b))},initController:function(){e.extend(i,fc,!0),f.items=Yb=c,_b=f.getItemAt,ac=i.getNumItemsFn,bc=i.loop,ac()<3&&(i.loop=!1),Ca("beforeChange",function(a){var b,c=i.preload,d=null===a||a>=0,e=Math.min(c[0],ac()),g=Math.min(c[1],ac());for(b=1;b<=(d?g:e);b++)f.lazyLoadItem(m+b);for(b=1;b<=(d?e:g);b++)f.lazyLoadItem(m-b)}),Ca("initialLayout",function(){f.currItem.initialLayout=i.getThumbBoundsFn&&i.getThumbBoundsFn(m)}),Ca("mainScrollAnimComplete",nc),Ca("initialZoomInEnd",nc),Ca("destroy",function(){for(var a,b=0;b<Yb.length;b++)a=Yb[b],a.container&&(a.container=null),a.placeholder&&(a.placeholder=null),a.img&&(a.img=null),a.preloader&&(a.preloader=null),a.loadError&&(a.loaded=a.loadError=!1);ec=null})},getItemAt:function(a){return a>=0&&(void 0!==Yb[a]&&Yb[a])},allowProgressiveImg:function(){return i.forceProgressiveLoading||!G||i.mouseUsed||screen.width>1200},setContent:function(a,b){i.loop&&(b=Aa(b));var c=f.getItemAt(a.index);c&&(c.container=null);var d,g=f.getItemAt(b);if(!g)return void(a.el.innerHTML="");Da("gettingData",b,g),a.index=b,a.item=g;var h=g.container=e.createEl("pswp__zoom-wrap");if(!g.src&&g.html&&(g.html.tagName?h.appendChild(g.html):h.innerHTML=g.html),lc(g),ic(g,qa),!g.src||g.loadError||g.loaded)g.src&&!g.loadError&&(d=e.createEl("pswp__img","img"),d.style.opacity=1,d.src=g.src,mc(g,d),jc(b,g,h,d,!0));else{if(g.loadComplete=function(c){if(j){if(a&&a.index===b){if(lc(c,!0))return c.loadComplete=c.img=null,ic(c,qa),Ia(c),void(a.index===m&&f.updateCurrZoomItem());c.imageAppended?!$b&&c.placeholder&&(c.placeholder.style.display="none",c.placeholder=null):N.transform&&(fa||$b)?ec.push({item:c,baseDiv:h,img:c.img,index:b,holder:a,clearPlaceholder:!0}):jc(b,c,h,c.img,fa||$b,!0)}c.loadComplete=null,c.img=null,Da("imageLoadComplete",b,c)}},e.features.transform){var k="pswp__img pswp__img--placeholder";k+=g.msrc?"":" pswp__img--placeholder--blank";var l=e.createEl(k,g.msrc?"img":"");g.msrc&&(l.src=g.msrc),mc(g,l),h.appendChild(l),g.placeholder=l}g.loading||kc(g),f.allowProgressiveImg()&&(!Zb&&N.transform?ec.push({item:g,baseDiv:h,img:g.img,index:b,holder:a}):jc(b,g,h,g.img,!0,!0))}Zb||b!==m?Ia(g):(ea=h.style,cc(g,d||g.img)),a.el.innerHTML="",a.el.appendChild(h)},cleanSlide:function(a){a.img&&(a.img.onload=a.img.onerror=null),a.loaded=a.loading=a.img=a.imageAppended=!1}}});var oc,pc={},qc=function(a,b,c){var d=document.createEvent("CustomEvent"),e={origEvent:a,target:a.target,releasePoint:b,pointerType:c||"touch"};d.initCustomEvent("pswpTap",!0,!0,e),a.target.dispatchEvent(d)};za("Tap",{publicMethods:{initTap:function(){Ca("firstTouchStart",f.onTapStart),Ca("touchRelease",f.onTapRelease),Ca("destroy",function(){pc={},oc=null})},onTapStart:function(a){a.length>1&&(clearTimeout(oc),oc=null)},onTapRelease:function(a,b){if(b&&!Y&&!W&&!_a){var c=b;if(oc&&(clearTimeout(oc),oc=null,xb(c,pc)))return void Da("doubleTap",c);if("mouse"===b.type)return void qc(a,b,"mouse");var d=a.target.tagName.toUpperCase();if("BUTTON"===d||e.hasClass(a.target,"pswp__single-tap"))return void qc(a,b);Ma(pc,c),oc=setTimeout(function(){qc(a,b),oc=null},300)}}}});var rc;za("DesktopZoom",{publicMethods:{initDesktopZoom:function(){L||(G?Ca("mouseUsed",function(){f.setupDesktopZoom()}):f.setupDesktopZoom(!0))},setupDesktopZoom:function(b){rc={};var c="wheel mousewheel DOMMouseScroll";Ca("bindEvents",function(){e.bind(a,c,f.handleMouseWheel)}),Ca("unbindEvents",function(){rc&&e.unbind(a,c,f.handleMouseWheel)}),f.mouseZoomedIn=!1;var d,g=function(){f.mouseZoomedIn&&(e.removeClass(a,"pswp--zoomed-in"),f.mouseZoomedIn=!1),s<1?e.addClass(a,"pswp--zoom-allowed"):e.removeClass(a,"pswp--zoom-allowed"),h()},h=function(){d&&(e.removeClass(a,"pswp--dragging"),d=!1)};Ca("resize",g),Ca("afterChange",g),Ca("pointerDown",function(){f.mouseZoomedIn&&(d=!0,e.addClass(a,"pswp--dragging"))}),Ca("pointerUp",h),b||g()},handleMouseWheel:function(a){if(s<=f.currItem.fitRatio)return i.modal&&(!i.closeOnScroll||_a||V?a.preventDefault():E&&Math.abs(a.deltaY)>2&&(l=!0,f.close())),!0;if(a.stopPropagation(),rc.x=0,"deltaX"in a)1===a.deltaMode?(rc.x=18*a.deltaX,rc.y=18*a.deltaY):(rc.x=a.deltaX,rc.y=a.deltaY);else if("wheelDelta"in a)a.wheelDeltaX&&(rc.x=-.16*a.wheelDeltaX),a.wheelDeltaY?rc.y=-.16*a.wheelDeltaY:rc.y=-.16*a.wheelDelta;else{if(!("detail"in a))return;rc.y=a.detail}Sa(s,!0);var b=pa.x-rc.x,c=pa.y-rc.y;(i.modal||b<=da.min.x&&b>=da.max.x&&c<=da.min.y&&c>=da.max.y)&&a.preventDefault(),f.panTo(b,c)},toggleDesktopZoom:function(b){b=b||{x:qa.x/2+sa.x,y:qa.y/2+sa.y};var c=i.getDoubleTapZoom(!0,f.currItem),d=s===c;f.mouseZoomedIn=!d,f.zoomTo(d?f.currItem.initialZoomLevel:c,b,333),e[(d?"remove":"add")+"Class"](a,"pswp--zoomed-in")}}});var sc,tc,uc,vc,wc,xc,yc,zc,Ac,Bc,Cc,Dc,Ec={history:!0,galleryUID:1},Fc=function(){return Cc.hash.substring(1)},Gc=function(){sc&&clearTimeout(sc),uc&&clearTimeout(uc)},Hc=function(){var a=Fc(),b={};if(a.length<5)return b;var c,d=a.split("&");for(c=0;c<d.length;c++)if(d[c]){var e=d[c].split("=");e.length<2||(b[e[0]]=e[1])}if(i.galleryPIDs){var f=b.pid;for(b.pid=0,c=0;c<Yb.length;c++)if(Yb[c].pid===f){b.pid=c;break}}else b.pid=parseInt(b.pid,10)-1;return b.pid<0&&(b.pid=0),b},Ic=function(){if(uc&&clearTimeout(uc),_a||V)return void(uc=setTimeout(Ic,500));vc?clearTimeout(tc):vc=!0;var a=m+1,b=_b(m);b.hasOwnProperty("pid")&&(a=b.pid);var c=yc+"&gid="+i.galleryUID+"&pid="+a;zc||Cc.hash.indexOf(c)===-1&&(Bc=!0);var d=Cc.href.split("#")[0]+"#"+c;Dc?"#"+c!==window.location.hash&&history[zc?"replaceState":"pushState"]("",document.title,d):zc?Cc.replace(d):Cc.hash=c,zc=!0,tc=setTimeout(function(){vc=!1},60)};za("History",{publicMethods:{initHistory:function(){if(e.extend(i,Ec,!0),i.history){Cc=window.location,Bc=!1,Ac=!1,zc=!1,yc=Fc(),Dc="pushState"in history,yc.indexOf("gid=")>-1&&(yc=yc.split("&gid=")[0],yc=yc.split("?gid=")[0]),Ca("afterChange",f.updateURL),Ca("unbindEvents",function(){e.unbind(window,"hashchange",f.onHashChange)});var a=function(){xc=!0,Ac||(Bc?history.back():yc?Cc.hash=yc:Dc?history.pushState("",document.title,Cc.pathname+Cc.search):Cc.hash=""),Gc()};Ca("unbindEvents",function(){l&&a()}),Ca("destroy",function(){xc||a()}),Ca("firstUpdate",function(){m=Hc().pid});var b=yc.indexOf("pid=");b>-1&&(yc=yc.substring(0,b),"&"===yc.slice(-1)&&(yc=yc.slice(0,-1))),setTimeout(function(){j&&e.bind(window,"hashchange",f.onHashChange)},40)}},onHashChange:function(){return Fc()===yc?(Ac=!0,void f.close()):void(vc||(wc=!0,f.goTo(Hc().pid),wc=!1))},updateURL:function(){Gc(),wc||(zc?sc=setTimeout(Ic,800):Ic())}}}),e.extend(f,eb)};return a});

/**
 *  THEME SCRIPTS
 */

 /*** Start - Init ***/
document.addEventListener("DOMContentLoaded", function (e) {
    e.stopImmediatePropagation();
    vanillaLazyload();
    sliderBanner();
    sliderBannerDescriptionGrid();
    sliderBannerFull();
    sliderBannerGrid();
    sliderBannerInstagram();
    sliderBannerVideo();
    sliderImageGrid();
    slidersStore();
    navMobile();
    onChangeFormGroupSideOverlay();
    renderViewTypeSearch();
    onChangeFormGroupCustom();
    handlerProductEvents(false);
});


/*** End - Init ***/

/*** Start - Lazy Load ***/
function vanillaLazyload() {
    return new LazyLoad(
        {
            elements_selector: ".lazy, .img-lazy"
        }
    );
}
/*** End - Lazy Load ***/

var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));

/*** Start - Events SideNav Overlay ***/
function openUserPassword() {
    openSideNavOverlay('.sidenav-password', true);
}

function openForgotPassword() {
    openSideNavOverlay('.sidenav-forgot-password', true);
}

function changeSidenavOverlayBackground(type){
    var elsBodySearchOverlay = document.querySelectorAll('body.search-overlay_open');
    for (var i = 0; i < elsBodySearchOverlay.length; i++) {
        closeOverlaySearch();
    }
    var elsBodySideNavOverlay = document.querySelectorAll('body.sidenav-overlay_open');
    for (var i = 0; i < elsBodySideNavOverlay.length; i++) {
        closeSideNavOverlay();
    }
}
/*** End - Events SideNav Overlay ***/

/*** Start - Events Search Overlay ***/
var isOpenSearch = true;
function openSearch() {
    if (isOpenSearch === true) {
        openOverlaySearch();
        isOpenSearch = false
    } else {
        closeOverlaySearch();
        isOpenSearch = true
    }
}
/*** End - Events Search Overlay ***/

/*** Start - Events NavSide Mobile Overlay ***/
var isOpenNavMobile = true;
function openNavMobile() {
    if (isOpenNavMobile === true) {
        openOverlayNavMobile();
        isOpenNavMobile = false
    } else {
        closeOverlayNavMobile();
        isOpenNavMobile = true
    }
}
/*** End - Events NavSide Mobile Overlay ***/

/*** Start - Event Open and Close SideNav Overlay ***/
var elsSidenavOverlay = document.querySelectorAll('.sidenav-overlay');

function openSideNavOverlay(element, focus, data) {
    if(!element) {
        return false;
    }
    var elsSidenavOverlayOpen = document.querySelectorAll(element);
    for (var i = 0; i < elsSidenavOverlayOpen.length; i++) {
        var elSidenavOverlayOpen = elsSidenavOverlayOpen[i];
        elSidenavOverlayOpen.classList.add('open');
        elSidenavOverlayOpen.classList.remove('close');

        if (typeof elSidenavOverlayOpen.querySelectorAll('input')[0] !== 'undefined' && focus === true) {
            elSidenavOverlayOpen.querySelectorAll('input')[0].focus();
        }
    }

    var elsBody = document.querySelectorAll('body');
    for (var i = 0; i < elsBody.length; i++) {
        elsBody[i].classList.add('sidenav-overlay_open');
    }

    var elsBodysearchOverlay = document.querySelectorAll('body.search-overlay_open');
    for (var i = 0; i < elsBodysearchOverlay.length; i++) {
        closeOverlaySearch();
    }

    switch(element) {
        case '.sidenav-overlay_cart':
            window.dispatchEvent(
                new CustomEvent("cart-open", { detail: data } )
            );
            break;
    }
}

function closeSideNavOverlay() {
    var elsSidenavOverlay = document.querySelectorAll('.sidenav-overlay');
    for (var i = 0; i < elsSidenavOverlay.length; i++) {
        var elSidenavOverlay = elsSidenavOverlay[i];
        elSidenavOverlay.classList.add('close');
        elSidenavOverlay.classList.remove('open');
    }
    var elsBody = document.querySelectorAll('body');
    for (var i = 0; i < elsBody.length; i++) {
        elsBody[i].classList.remove('sidenav-overlay_open');
    }
}
/*** End - Event Open and Close SideNav Overlay ***/

/*** Start - Event Open and Close Search Overlay ***/
function openOverlaySearch() {
    var elsOverlaySearch = document.querySelectorAll('.search');
    for (var i = 0; i < elsOverlaySearch.length; i++) {
        var elOverlaySearch = elsOverlaySearch[i];
        elOverlaySearch.classList.add('open');
        elOverlaySearch.classList.remove('close');
        Array.prototype.forEach.call(elsOverlaySearch[i].querySelectorAll('input'), function (searchInput) {
            searchInput.focus();
        });
    }

    var btnsSearch = document.querySelectorAll('.search_link');
    for (var i = 0; i < btnsSearch.length; i++) {
        var btnSearch = btnsSearch[i];
        btnSearch.classList.add('active');
    }

    var elsBody = document.querySelectorAll('body');
    for (var i = 0; i < elsBody.length; i++) {
        elsBody[i].classList.add('search-overlay_open');
    }
}

function closeOverlaySearch() {
    var elsOverlaySearch = document.querySelectorAll('.search');
    for (var i = 0; i < elsOverlaySearch.length; i++) {
        var elOverlaySearch = elsOverlaySearch[i];
        elOverlaySearch.classList.remove('open');
        elOverlaySearch.classList.add('close');
    }

    var btnsSearch = document.querySelectorAll('.search_link');
    for (var i = 0; i < btnsSearch.length; i++) {
        var btnSearch = btnsSearch[i];
        btnSearch.classList.remove('active');
    }

    var elsBody = document.querySelectorAll('body');
    for (var i = 0; i < elsBody.length; i++) {
        elsBody[i].classList.remove('search-overlay_open');
    }
}
/*** End - Event Open and Close Search Overlay ***/

/*** Start - Event Open and Close NavMobile Overlay ***/
function openOverlayNavMobile() {
    var elsOverlayNavMobile = document.querySelectorAll('.sidebar-nav');
    for (var i = 0; i < elsOverlayNavMobile.length; i++) {
        var elOverlayNavMobile = elsOverlayNavMobile[i];
        elOverlayNavMobile.classList.add('open');
        elOverlayNavMobile.classList.remove('close');
    }

    var btnsNavMobile = document.querySelectorAll('.menu-mobile_link');
    for (var i = 0; i < btnsNavMobile.length; i++) {
        var btnNavMobile = btnsNavMobile[i];
        btnNavMobile.classList.add('active');
    }

    var elsBody = document.querySelectorAll('body');
    for (var i = 0; i < elsBody.length; i++) {
        elsBody[i].style.overflow= 'hidden';
    }
}

function closeOverlayNavMobile() {
    var elsOverlayNavMobile = document.querySelectorAll('.sidebar-nav');
    for (var i = 0; i < elsOverlayNavMobile.length; i++) {
        var elOverlayNavMobile = elsOverlayNavMobile[i];
        elOverlayNavMobile.classList.remove('open');
        elOverlayNavMobile.classList.add('close');
    }
    var btnsNavMobile = document.querySelectorAll('.menu-mobile_link');
    for (var i = 0; i < btnsNavMobile.length; i++) {
        var btnNavMobile = btnsNavMobile[i];
        btnNavMobile.classList.remove('active');
    }

    var elsBody = document.querySelectorAll('body');
    for (var i = 0; i < elsBody.length; i++) {
        elsBody[i].style.overflow= null;
    }
}
/*** End - Event Open and Close NavMobile Overlay ***/

function navMobile() {
    var navsMobile = document.querySelectorAll('#nav-mobile');
    for (var i = 0; i < navsMobile.length; i++) {
        var navMobile = navsMobile[i];
        new MetisMenu(navMobile, {
            triggerElement: '.nav-mobile_link'
        });
    }
}

function onChangeFormGroupCustom() {
    var inputsCustom = document.querySelectorAll('.form-group.form-group_custom input');
    for (var i = 0; i < inputsCustom.length; i++) {
        inputsCustom[i].onkeyup = function() {
            onFocusFormGroup(this);
        }
    }
    var selectsCustom = document.querySelectorAll('.form-group.form-group_custom select');
    for (var i = 0; i < selectsCustom.length; i++) {
        selectsCustom[i].onkeyup = function() {
            onFocusFormGroup(this);
        }
    }
}

function onChangeFormGroupSideOverlay() {
    var inputsCustom2 = document.querySelectorAll('.sidenav-overlay .form-group input');
    for (var i = 0; i < inputsCustom2.length; i++) {
        onFocusFormGroup(inputsCustom2[i]);
        inputsCustom2[i].addEventListener('change', (event) => {
            onFocusFormGroup(event.target);
        });
        inputsCustom2[i].onkeyup = function() {
            onFocusFormGroup(this);
        }
    }
    var selectsCustom2 = document.querySelectorAll('.sidenav-overlay .form-group select');
    for (var i = 0; i < selectsCustom2.length; i++) {
        selectsCustom2(inputsCustom2[i]);
        selectsCustom2[i].addEventListener('change', (event) => {
            onFocusFormGroup(event.target);
        });
        selectsCustom2[i].onkeyup = function() {
            onFocusFormGroup(this);
        }
    }
}

function onFocusFormGroup(el) {
    var input_val = el.value;
    if (input_val !== '') {
        if (el.parentNode.classList.contains('onFocus')) {
            el.parentNode.classList.remove('onFocus');
        }
    } else {
        if (!el.parentNode.classList.contains('onFocus')) {
            el.parentNode.classList.add('onFocus');
        }
    }
}


function slidersStore() {
    var showcasesSlider5 = document.querySelectorAll('.showcase-products_carousel .showcase-list-5');
    for (var i = 0; i < showcasesSlider5.length; i++) {
        Array.prototype.forEach.call(showcasesSlider5[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            var tnsShowcase5 = {
                container: document.querySelectorAll('.showcase-products_carousel .showcase-slider-5')[i],
                autoplay: false,
                controls: true,
                controlsContainer: showcaseControl,
                gutter: 16,
                items: 2,
                lazyload: false,
                loop: false,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1400: {
                        items: 5,
                    },
                    1200: {
                        items: 4,
                    },
                    992: {
                        items: 3,
                    },
                    768: {
                        items: 2,
                    },
                },
            }

            var parentShowcasesSlider5 = showcasesSlider5[i].closest('.showcase-products_carousel');
            if (parentShowcasesSlider5 && parentShowcasesSlider5.classList.contains('showcase-products-list_carousel')) {
                tnsShowcase5.items = 1;
            }

            tns(tnsShowcase5);
        });
    }
    var showcasesSlider4 = document.querySelectorAll('.showcase-products_carousel .showcase-list-4');
    for (var i = 0; i < showcasesSlider4.length; i++) {
        Array.prototype.forEach.call(showcasesSlider4[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            var tnsShowcase4 = {
                container: document.querySelectorAll('.showcase-products_carousel .showcase-slider-4')[i],
                autoplay: false,
                controls: true,
                controlsContainer: showcaseControl,
                gutter: 16,
                items: 2,
                lazyload: false,
                loop: false,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 4,
                    },
                    992: {
                        items: 3,
                    },
                    768: {
                        items: 2,
                    },
                },
            }

            var parentShowcasesSlider4 = showcasesSlider4[i].closest('.showcase-products_carousel');
            if (parentShowcasesSlider4 && parentShowcasesSlider4.classList.contains('showcase-products-list_carousel')) {
                tnsShowcase4.items = 1;
            }

            tns(tnsShowcase4);
        });
    }
    var showcasesSlider3 = document.querySelectorAll('.showcase-products_carousel .showcase-list-3');
    for (var i = 0; i < showcasesSlider3.length; i++) {
        Array.prototype.forEach.call(showcasesSlider3[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            var tnsShowcase3 = {
                container: document.querySelectorAll('.showcase-products_carousel .showcase-slider-3')[i],
                autoplay: false,
                controls: true,
                controlsContainer: showcaseControl,
                gutter: 16,
                items: 2,
                lazyload: false,
                loop: false,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 3,
                    },
                    992: {
                        items: 2,
                    },
                    768: {
                        items: 2,
                    },
                },
            };
            if(showcasesSlider3[i].classList.contains('showcase4-list-3')){
                tnsShowcase3.responsive = {
                    1400: {
                        items: 3,
                    },
                    1200: {
                        items: 2,
                    },
                }
            }

            var parentShowcasesSlider3 = showcasesSlider3[i].closest('.showcase-products_carousel');
            if (parentShowcasesSlider3 && parentShowcasesSlider3.classList.contains('showcase-products-list_carousel')) {
                tnsShowcase3.items = 1;
            }

            tns(tnsShowcase3);
        });
    }
    var showcasesSlider2 = document.querySelectorAll('.showcase-products_carousel .showcase-list-2');
    for (var i = 0; i < showcasesSlider2.length; i++) {
        Array.prototype.forEach.call(showcasesSlider2[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            var tnsShowcase2 = {
                container: document.querySelectorAll('.showcase-products_carousel .showcase-slider-2')[i],
                autoplay: false,
                controls: true,
                controlsContainer: showcaseControl,
                gutter: 16,
                items: 2,
                lazyload: false,
                loop: false,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 2,
                    },
                    992: {
                        items: 2,
                    },
                    768: {
                        items: 2,
                    },
                },
            };
            if(showcasesSlider2[i].classList.contains('showcase4-list-2')){
                tnsShowcase2.responsive = {
                    1400: {
                        items: 2,
                    },
                    1200: {
                        items: 1,
                    },
                }
            }

            var parentShowcasesSlider2 = showcasesSlider2[i].closest('.showcase-products_carousel');
            if (parentShowcasesSlider2 && parentShowcasesSlider2.classList.contains('showcase-products-list_carousel')) {
                tnsShowcase2.items = 1;
            }

            tns(tnsShowcase2);
        });
    }
    var showcasesSlider1 = document.querySelectorAll('.showcase-products_carousel .showcase-list-1');
    for (var i = 0; i < showcasesSlider1.length; i++) {
        Array.prototype.forEach.call(showcasesSlider1[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-products_carousel .showcase-slider-1')[i],
                autoplay: false,
                controls: true,
                controlsContainer: showcaseControl,
                gutter: 16,
                items: 1,
                lazyload: false,
                loop: false,
                mouseDrag: true,
                nav: false,
            });
        });
    }

    var showcaseModel8 = document.querySelectorAll('.showcase-model-8 .showcase-banner_carousel');
    for (var i = 0; i < showcaseModel8.length; i++) {
        Array.prototype.forEach.call(showcaseModel8[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-model-8 .showcase-banner_carousel .showcase-banner_slider')[i],
                autoplay: false,
                controls: true,
                controlsContainer: showcaseControl,
                gutter: 16,
                items: 1,
                lazyload: false,
                loop: false,
                mouseDrag: true,
                nav: false,
            });
        });
    }

    var showcaseModel11Mobile = document.querySelectorAll('.showcase-model-11 .showcase-banner_carousel');
    for (var i = 0; i < showcaseModel11Mobile.length; i++) {
        Array.prototype.forEach.call(showcaseModel11Mobile[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-model-11 .showcase-banner_carousel .showcase-banner_slider')[i],
                autoplay: false,
                controls: true,
                controlsContainer: showcaseControl,
                gutter: 16,
                items: 1,
                lazyload: false,
                loop: false,
                mouseDrag: true,
                nav: false,
            });
        });
    }
}

function sliderRelated() {
    var showcaseRelatedSlider = document.querySelectorAll('.showcase-list-related .showcase-slider-related');
    for (var i = 0; i < showcaseRelatedSlider.length; i++) {
        tns({
            container: showcaseRelatedSlider[i],
            autoplay: false,
            controls: true,
            controlsContainer: ".showcase-list-related .controls-arrow",
            gutter: 16,
            items: 1,
            lazyload: false,
            loop: false,
            mouseDrag: true,
            nav: false,
            preventScrollOnTouch: 'auto',
            swipeAngle: false,
            touch: true,
            responsive: {
                1200: {
                    items: 3,
                },
                992: {
                    items: 2,
                },
            },
        });
    }
}

function sliderBannerFull() {
    var bannersFullSlider = document.querySelectorAll('.banner-full_slider');
    for (var i = 0; i < bannersFullSlider.length; i++) {
        tns({
            container: bannersFullSlider[i],
            autoplay: true,
            autoplayTimeout: 8000,
            controls: false,
            items: 1,
            lazyload: true,
            lazyloadSelector: ".lazy-slider",
            navPosition: 'bottom',
            loop: true,
            mouseDrag: true,
            nav: true,
        });
    }
}

function sliderBanner() {
    var bannersSlider = document.querySelectorAll('.banner-slider');
    for (var i = 0; i < bannersSlider.length; i++) {
        var tnsBanners = {
            container: bannersSlider[i],
            autoplay: false,
            controls: false,
            items: 1,
            lazyload: true,
            lazyloadSelector: ".lazy-slider",
            navPosition: 'bottom',
            loop: true,
            mouseDrag: true,
            nav: true,
        };
        tns(tnsBanners);
    }
}

function sliderBannerGrid() {
    var bannersSlider6 = document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .showcase-list-6');
    for (var i = 0; i < bannersSlider6.length; i++) {
        Array.prototype.forEach.call(bannersSlider6[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .banners-slider-6')[i],
                autoplay: true,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 6,
                    },
                    992: {
                        items: 3,
                    },
                    768: {
                        items: 2,
                    },
                },
            });
        });
    }
    var bannersSlider5 = document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .showcase-list-5');
    for (var i = 0; i < bannersSlider5.length; i++) {
        Array.prototype.forEach.call(bannersSlider5[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .banners-slider-5')[i],
                autoplay: true,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 5,
                    },
                    992: {
                        items: 3,
                    },
                    768: {
                        items: 2,
                    },
                },
            });
        });
    }
    var bannersSlider4 = document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .showcase-list-4');
    for (var i = 0; i < bannersSlider4.length; i++) {
        Array.prototype.forEach.call(bannersSlider4[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .banners-slider-4')[i],
                autoplay: true,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 4,
                    },
                    992: {
                        items: 3,
                    },
                    768: {
                        items: 2,
                    },
                },
            });
        });
    }
    var bannersSlider3 = document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .showcase-list-3');
    for (var i = 0; i < bannersSlider3.length; i++) {
        Array.prototype.forEach.call(bannersSlider3[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .banners-slider-3')[i],
                autoplay: true,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    992: {
                        items: 3,
                    },
                    576: {
                        items: 2,
                    },
                },
            });
        });
    }
    var bannersSlider2 = document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .showcase-list-2');
    for (var i = 0; i < bannersSlider2.length; i++) {
        Array.prototype.forEach.call(bannersSlider2[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .banners-slider-2')[i],
                autoplay: true,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 2,
                    },
                    992: {
                        items: 2,
                    },
                    768: {
                        items: 2,
                    },
                },
            });
        });
    }
    var bannersSlider1 = document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .showcase-list-1');
    for (var i = 0; i < bannersSlider1.length; i++) {
        Array.prototype.forEach.call(bannersSlider1[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners:not(.showcase-banners_video) .banners-slider-1')[i],
                autoplay: true,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
            });
        });
    }
}

function sliderBannerDescriptionGrid() {
    var bannersSliderDescription5 = document.querySelectorAll('.showcase-banners-description_carousel .showcase-list-5');
    for (var i = 0; i < bannersSliderDescription5.length; i++) {
        Array.prototype.forEach.call(bannersSliderDescription5[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.banners-slider-description-5')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 0,
                items: 1,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1400: {
                        items: 5,
                    },
                    1200: {
                        items: 5,
                    },
                    992: {
                        items: 4,
                    },
                    768: {
                        items: 3,
                        gutter: 10,
                    },
                    576: {
                        items: 2,
                        gutter: 28,
                    },
                },
            });
        });
    }

    var bannersSliderDescription4 = document.querySelectorAll('.showcase-banners-description_carousel .showcase-list-4');
    for (var i = 0; i < bannersSliderDescription4.length; i++) {
        Array.prototype.forEach.call(bannersSliderDescription4[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            var tempResponsive4 = {
                1200: {
                    items: 4,
                },
                992: {
                    items: 3,
                    gutter: 16,
                },
                768: {
                    items: 3,
                    gutter: 10,
                },
                576: {
                    items: 2,
                },
            };
            var positionImage4 = bannersSliderDescription4[i].getAttribute('data-img-position');
            if (positionImage4 === 'left' || positionImage4 === 'right') {
                tempResponsive4 = {
                    1200: {
                        items: 4,
                    },
                    992: {
                        items: 3,
                        gutter: 16,
                    },
                    768: {
                        items: 2,
                        gutter: 10,
                    },
                    576: {
                        items: 1,
                    },
                };
            }
            tns({
                container: document.querySelectorAll('.banners-slider-description-4')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 16,
                items: 1,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: tempResponsive4,
            });
        });
    }

    var bannersSliderDescription3 = document.querySelectorAll('.showcase-banners-description_carousel .showcase-list-3');
    for (var i = 0; i < bannersSliderDescription3.length; i++) {
        Array.prototype.forEach.call(bannersSliderDescription3[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            var tempResponsive3 = {
                992: {
                    items: 3,
                },
                576: {
                    items: 2,
                },
                425: {
                    items: 2,
                },
            };
            var positionImage = bannersSliderDescription3[i].getAttribute('data-img-position');
            if (positionImage === 'left' || positionImage === 'right') {
                tempResponsive3 = {
                    992: {
                        items: 3,
                    },
                    576: {
                        items: 1,
                    },
                    425: {
                        items: 1,
                    },
                };
            }
            tns({
                container: document.querySelectorAll('.banners-slider-description-3')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 16,
                items: 1,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: tempResponsive3,
            });
        });
    }

    var bannersSliderDescription2 = document.querySelectorAll('.showcase-banners-description_carousel-desktop_2 .showcase-list-2');
    for (var i = 0; i < bannersSliderDescription2.length; i++) {
        Array.prototype.forEach.call(bannersSliderDescription2[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.banners-slider-description-2')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 16,
                items: 1,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    768: {
                        items: 2,
                    },
                },
            });
        });
    }

    var bannersSliderDescriptionMobile2 = document.querySelectorAll('.showcase-banners-description_carousel-mobile_2 .showcase-list-2');
    for (var i = 0; i < bannersSliderDescriptionMobile2.length; i++) {
        Array.prototype.forEach.call(bannersSliderDescriptionMobile2[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.banners-slider-description-2')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 8,
                items: 2,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
            });
        });
    }


    var bannersSliderDescription1 = document.querySelectorAll('.showcase-banners-description_carousel .showcase-list-1');
    for (var i = 0; i < bannersSliderDescription1.length; i++) {
        Array.prototype.forEach.call(bannersSliderDescription1[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.banners-slider-description-1')[i],
                autoplay: true,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
            });
        });
    }
}

function sliderBannerVideo() {
    var bannersVideoSlider3 = document.querySelectorAll('.showcase-banners.showcase-banners_video .showcase-list-3');
    for (var i = 0; i < bannersVideoSlider3.length; i++) {
        Array.prototype.forEach.call(bannersVideoSlider3[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners.showcase-banners_video .banners-slider-3')[i],
                autoplay: (bannersVideoSlider3[i].getAttribute('data-autoplay') === 'true') || false,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: false,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1520: {
                        gutter: 40,
                    },
                    1400: {
                        gutter: 30,
                    },
                    1200: {
                        gutter: 20,
                    },
                    992: {
                        items: 3,
                        gutter: 16,
                    },
                    768: {
                        items: 2,
                    },
                },
            });
        });
    }
    var bannersVideoSlider2 = document.querySelectorAll('.showcase-banners.showcase-banners_video.showcase-banners_video_default .showcase-list-2');
    for (var i = 0; i < bannersVideoSlider2.length; i++) {
        Array.prototype.forEach.call(bannersVideoSlider2[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners.showcase-banners_video.showcase-banners_video_default .banners-slider-2')[i],
                autoplay: (bannersVideoSlider2[i].getAttribute('data-autoplay') === 'true') || false,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: false,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1520: {
                        gutter: 40,
                    },
                    1400: {
                        gutter: 30,
                    },
                    1200: {
                        gutter: 20,
                    },
                    992: {
                        items: 2,
                        gutter: 16,
                    },
                    768: {
                        items: 2,
                    },
                },
            });
        });
    }
    var bannersVideoSliderInline2 = document.querySelectorAll('.showcase-banners.showcase-banners_video.showcase-banners_video_inline .showcase-list-2');
    for (var i = 0; i < bannersVideoSliderInline2.length; i++) {
        Array.prototype.forEach.call(bannersVideoSliderInline2[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners.showcase-banners_video.showcase-banners_video_inline .banners-slider-2')[i],
                autoplay: (bannersVideoSliderInline2[i].getAttribute('data-autoplay') === 'true') || false,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: false,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1520: {
                        gutter: 40,
                    },
                    1400: {
                        gutter: 40,
                    },
                    1200: {
                        gutter: 32,
                    },
                    992: {
                        items: 2,
                        gutter: 24,
                    },
                    768: {
                        items: 1,
                    },
                },
            });
        });
    }
    var bannersVideoSlider1 = document.querySelectorAll('.showcase-banners.showcase-banners_video .showcase-list-1');
    for (var i = 0; i < bannersVideoSlider1.length; i++) {
        Array.prototype.forEach.call(bannersVideoSlider1[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-banners.showcase-banners_video .banners-slider-1')[i],
                autoplay: (bannersVideoSlider1[i].getAttribute('data-autoplay') === 'true') || false,
                autoplayTimeout: 15000,
                autoplayButtonOutput: false,
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: false,
                mouseDrag: true,
                nav: false,
            });
        });
    }
}

function sliderImageGrid() {
    var imagemSlider12 = document.querySelectorAll('.showcase-image-carousel-12');
    for (var i = 0; i < imagemSlider12.length; i++) {
        Array.prototype.forEach.call(imagemSlider12[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-12')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 12,
                    },
                    992: {
                        items: 10,
                    },
                    768: {
                        items: 7,
                    },
                },
            });
        });
    }
    var imagemSlider11 = document.querySelectorAll('.showcase-image-carousel-11');
    for (var i = 0; i < imagemSlider11.length; i++) {
        Array.prototype.forEach.call(imagemSlider11[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-11')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 11,
                    },
                    992: {
                        items: 9,
                    },
                    768: {
                        items: 7,
                    },
                },
            });
        });
    }
    var imagemSlider10 = document.querySelectorAll('.showcase-image-carousel-10');
    for (var i = 0; i < imagemSlider10.length; i++) {
        Array.prototype.forEach.call(imagemSlider10[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-10')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 10,
                    },
                    992: {
                        items: 8,
                    },
                    768: {
                        items: 6,
                    },
                },
            });
        });
    }
    var imagemSlider9 = document.querySelectorAll('.showcase-image-carousel-9');
    for (var i = 0; i < imagemSlider9.length; i++) {
        Array.prototype.forEach.call(imagemSlider9[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-9')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 9,
                    },
                    992: {
                        items: 7,
                    },
                    768: {
                        items: 5,
                    },
                },
            });
        });
    }
    var imagemSlider8 = document.querySelectorAll('.showcase-image-carousel-8');
    for (var i = 0; i < imagemSlider8.length; i++) {
        Array.prototype.forEach.call(imagemSlider8[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-8')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 8,
                    },
                    992: {
                        items: 6,
                    },
                    768: {
                        items: 5,
                    },
                },
            });
        });
    }
    var imagemSlider7 = document.querySelectorAll('.showcase-image-carousel-7');
    for (var i = 0; i < imagemSlider7.length; i++) {
        Array.prototype.forEach.call(imagemSlider7[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-7')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 7,
                    },
                    992: {
                        items: 5,
                    },
                    768: {
                        items: 4,
                    },
                },
            });
        });
    }
    var imagemSlider6 = document.querySelectorAll('.showcase-image-carousel-6');
    for (var i = 0; i < imagemSlider6.length; i++) {
        Array.prototype.forEach.call(imagemSlider6[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-6')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 6,
                    },
                    992: {
                        items: 5,
                    },
                    768: {
                        items: 4,
                    },
                },
            });
        });
    }
    var imagemSlider5 = document.querySelectorAll('.showcase-image-carousel-5');
    for (var i = 0; i < imagemSlider5.length; i++) {
        Array.prototype.forEach.call(imagemSlider5[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-5')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 5,
                    },
                    992: {
                        items: 4,
                    },
                    768: {
                        items: 3,
                    },
                },
            });
        });
    }
    var imagemSlider4 = document.querySelectorAll('.showcase-image-carousel-4');
    for (var i = 0; i < imagemSlider4.length; i++) {
        Array.prototype.forEach.call(imagemSlider4[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-4')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 4,
                    },
                    992: {
                        items: 3,
                    },
                    768: {
                        items: 2,
                    },
                },
            });
        });
    }
    var imagemSlider3 = document.querySelectorAll('.showcase-image-carousel-3');
    for (var i = 0; i < imagemSlider3.length; i++) {
        Array.prototype.forEach.call(imagemSlider3[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-3')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 3,
                    },
                    992: {
                        items: 2,
                    },
                },
            });
        });
    }
    var imagemSlider2 = document.querySelectorAll('.showcase-image-carousel-2');
    for (var i = 0; i < imagemSlider2.length; i++) {
        Array.prototype.forEach.call(imagemSlider2[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-2')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    1200: {
                        items: 2,
                    },
                },
            });
        });
    }
    var imagemSlider1 = document.querySelectorAll('.showcase-image-carousel-1');
    for (var i = 0; i < imagemSlider1.length; i++) {
        Array.prototype.forEach.call(imagemSlider1[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-image-1')[i],
                controls: true,
                controlsContainer: showcaseControl,
                items: 1,
                gutter: 16,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
            });
        });
    }
}

function sliderBannerInstagram() {

    var bannersSliderInstagram8 = document.querySelectorAll('.showcase-insta_carousel__8 .showcase-box-carousel');
    for (var i = 0; i < bannersSliderInstagram8.length; i++) {
        Array.prototype.forEach.call(bannersSliderInstagram8[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-box-carousel .banners-slider-insta-8')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 4,
                items: 4,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    992: {
                        items: 8,
                    },
                    768: {
                        items: 6,
                    },
                },
            });
        });
    }

    var bannersSliderInstagram7 = document.querySelectorAll('.showcase-insta_carousel__7 .showcase-box-carousel');
    for (var i = 0; i < bannersSliderInstagram7.length; i++) {
        Array.prototype.forEach.call(bannersSliderInstagram7[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-box-carousel .banners-slider-insta-7')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 4,
                items: 4,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    992: {
                        items: 7,
                    },
                    768: {
                        items: 6,
                    },
                },
            });
        });
    }

    var bannersSliderInstagram6 = document.querySelectorAll('.showcase-insta_carousel__6 .showcase-box-carousel');
    for (var i = 0; i < bannersSliderInstagram6.length; i++) {
        Array.prototype.forEach.call(bannersSliderInstagram6[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-box-carousel .banners-slider-insta-6')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 4,
                items: 4,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    768: {
                        items: 6,
                    },
                },
            });
        });
    }

    var bannersSliderInstagram5 = document.querySelectorAll('.showcase-insta_carousel__5 .showcase-box-carousel');
    for (var i = 0; i < bannersSliderInstagram5.length; i++) {
        Array.prototype.forEach.call(bannersSliderInstagram5[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-box-carousel .banners-slider-insta-5')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 4,
                items: 4,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false,
                responsive: {
                    768: {
                        items: 5,
                    },
                },
            });
        });
    }

    var bannersSliderInstagram4 = document.querySelectorAll('.showcase-insta_carousel__4 .showcase-box-carousel');
    for (var i = 0; i < bannersSliderInstagram4.length; i++) {
        Array.prototype.forEach.call(bannersSliderInstagram4[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-box-carousel .banners-slider-insta-4')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 4,
                items: 4,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false
            });
        });
    }

    var bannersSliderInstagram3 = document.querySelectorAll('.showcase-insta_carousel__3 .showcase-box-carousel');
    for (var i = 0; i < bannersSliderInstagram3.length; i++) {
        Array.prototype.forEach.call(bannersSliderInstagram3[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-box-carousel .banners-slider-insta-3')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 4,
                items: 3,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false
            });
        });
    }

    var bannersSliderInstagram2 = document.querySelectorAll('.showcase-insta_carousel__2 .showcase-box-carousel');
    for (var i = 0; i < bannersSliderInstagram2.length; i++) {
        Array.prototype.forEach.call(bannersSliderInstagram2[i].querySelectorAll('.controls-arrow'), function (showcaseControl) {
            tns({
                container: document.querySelectorAll('.showcase-box-carousel .banners-slider-insta-2')[i],
                controlsContainer: showcaseControl,
                autoplay: true,
                autoplayButtonOutput: false,
                autoplayTimeout: 15000,
                controls: true,
                gutter: 4,
                items: 2,
                lazyload: true,
                lazyloadSelector: ".lazy-slider",
                loop: true,
                mouseDrag: true,
                nav: false
            });
        });
    }
}

/*** End - All Sliders ***/

/*** Start - Slider Gallery ***/
function sliderGallery() {
    var galleryDesktopSlider = document.querySelectorAll('.product-gallery_desktop .product-gallery-slider');
    for (var i = 0; i < galleryDesktopSlider.length; i++) {
        tns({
            container: galleryDesktopSlider[i],
            autoplay: false,
            axis: 'vertical',
            controls: true,
            controlsContainer: ".product-gallery.product-gallery_desktop .controls-arrow",
            gutter: 25,
            items: 3,
            lazyload: true,
            lazyloadSelector: ".lazy-slider",
            loop: false,
            mouseDrag: true,
            nav: false,
            onInit: function (info) {
                if (info.slideCount < info.items) {
                    var elsGallery = document.querySelectorAll('.product-gallery.product-gallery_desktop');
                    for (var i = 0; i < elsGallery.length; i++) {
                        var elGallery = elsGallery[i];
                        if (!elGallery.classList.contains('product-simple_gallery')) {
                            elGallery.classList.add('product-simple_gallery');
                        }
                    }
                }

                var elsGalleryList = document.querySelectorAll('.product-gallery_desktop .product-gallery_list');
                for (var i = 0; i < elsGalleryList.length; i++) {
                    var elGalleryList = elsGalleryList[i];
                    if (elGalleryList.classList.contains('slider-hide')) {
                        elGalleryList.classList.remove('slider-hide');
                    }
                }
            }
        });
    }
    var galleryMobileSlider = document.querySelectorAll('.product-gallery_mobile .product-gallery-slider');
    for (var i = 0; i < galleryMobileSlider.length; i++) {
        tns({
            container: galleryMobileSlider[i],
            autoplay: false,
            controls: true,
            controlsContainer: ".product-gallery.product-gallery_mobile .controls-arrow",
            gutter: 5,
            items: 2,
            lazyload: true,
            lazyloadSelector: ".lazy-slider",
            loop: false,
            mouseDrag: true,
            nav: false,
            autoHeight: true,
            responsive: {
                768: {
                    items: 5,
                },
                576: {
                    items: 3,
                },
            },
            onInit: function (info) {
                var elsGalleryList = document.querySelectorAll('.product-gallery_mobile .product-gallery_list');
                for (var i = 0; i < elsGalleryList.length; i++) {
                    var elGalleryList = elsGalleryList[i];
                    if (elGalleryList.classList.contains('slider-hide')) {
                        elGalleryList.classList.remove('slider-hide');
                    }
                }
                if (info.slideCount < info.items) {
                    var elsGallery = document.querySelectorAll('.product-gallery.product-gallery_mobile');
                    for (var i = 0; i < elsGallery.length; i++) {
                        var elGallery = elsGallery[i];
                        if (!elGallery.classList.contains('product-simple_gallery')) {
                            elGallery.classList.add('product-simple_gallery');
                        }
                    }
                }
            }
        });
    }
}

function renderViewTypeSearch() {
    var viewType = 'grid';

    if (isMobile) {
        var viewType = 'list';
    }
    if (typeof getCookie('viewType') !== 'undefined' && getCookie('viewType') !== '') {
        viewType = getCookie('viewType');
    }
    var searchViewLink = document.querySelectorAll('.search-view_link[data-type="' + viewType + '"]');
    for (var i = 0; i < searchViewLink.length; i++) {
        searchViewLink[i].classList.add('active');
    }

    var searchViewLinkMobile = document.querySelectorAll('.search-view_link.search-view_link__mobile');
    for (var x = 0; x < searchViewLinkMobile.length; x++) {
        searchViewLinkMobile[x].setAttribute('data-type', viewType);
    }

    var showcasesSearch = document.querySelectorAll('.showcase-search');
    for (var i = 0; i < showcasesSearch.length; i++) {
        var showcaseSearch = showcasesSearch[i];
        if (viewType === 'grid') {
            if (!showcaseSearch.classList.contains('showcase-search_grid')) {
                showcaseSearch.classList.add('showcase-search_grid');
            }
            if (showcaseSearch.classList.contains('showcase-search_list')) {
                showcaseSearch.classList.remove('showcase-search_list');
            }

        } else if (viewType === 'list') {
            if (!showcaseSearch.classList.contains('showcase-search_list')) {
                showcaseSearch.classList.add('showcase-search_list');
            }
            if (showcaseSearch.classList.contains('showcase-search_grid')) {
                showcaseSearch.classList.remove('showcase-search_grid');
            }
        }
    }
}

/*** Start - Cookie: SET / GET ***/
function setCookie(name, cvalue, expires, domain) {
    document.cookie = name + "=" + cvalue + ";expires=" + expires + ";domain=" + domain + ";path=/";
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
/*** End - Cookie: SET / GET ***/

function handleAddToCart(id, quantity = 1, state, sku, title, price) {
    if (typeof mb_track !== 'undefined') {
        console.log('in addToCart theme product');
        window.mb_track('addToCart', {
            products: [
                {
                    product_id: id,
                    sku: sku || id,
                    name: title,
                    quantity,
                    price,
                },
            ],
        });
    }

    if (state && state.productKit) {
        openLoadingMain();
        if (state.productKit.errorProductKit.length > 0) {
            state.productKit.errorProductKit.map((error) => {
                notyf.open(
                    {
                        type: 'warning',
                        message: error.alertMessage,
                    }
                );
            });
            setTimeout(function () {
                document.getElementById("showcase-kit_" + state.productKit.errorProductKit[0].index).scrollIntoView({behavior: 'smooth'});
                closeLoadingMain();
            }, 500);
        } else {
            localStorage.removeItem('productKit');

            const newProduct = [
                {
                    "id": state.productId,
                    "quantity": 1,
                    "products": state.productKit.products
                }
            ];
            window.dispatchEvent(new CustomEvent("cart-add", {detail: newProduct}));

            openSideNavOverlay('.sidenav-overlay_cart', false, {isViewCart: false});
            closeLoadingMain();
        }
    } else if (state && state.groupPurchase) {
        const tempGroupPurchaseItens = state.groupPurchase.map((groupPurchaseItem) => {
            return {
                ...groupPurchaseItem,
                quantity: groupPurchaseItem.status ? 1 : 0
            }
        });
        let dateSendCart = {
            id: id,
            quantity: quantity
        };
        if (tempGroupPurchaseItens.length > 0) {
            dateSendCart = {
                id: id,
                quantity: quantity,
                groupPurchase: tempGroupPurchaseItens
            };
        }

        window.dispatchEvent(new CustomEvent("cart-add", {detail: [dateSendCart]}));
        openSideNavOverlay('.sidenav-overlay_cart', false, {isViewCart: false});
        window.dispatchEvent(
            new CustomEvent("cart-change-quantity-parent", {detail: {quantity: quantity}})
        );
        closeLoadingMain();
    } else {
        window.dispatchEvent(new CustomEvent("cart-add", {detail: [{id: id, quantity: quantity}]}));
        openSideNavOverlay('.sidenav-overlay_cart', false, {isViewCart: false});
        window.dispatchEvent(
            new CustomEvent("cart-change-quantity-parent", {detail: {quantity: quantity}})
        );
        closeLoadingMain();
    }
}

function changeQuantityProdutBuyToGether(quantity = 1) {
    window.dispatchEvent(
        new CustomEvent("cart-change-quantity-parent", {detail: {quantity: quantity}})
    );
    window.dispatchEvent(
        new CustomEvent("cart-change-quantity", {detail: {quantity: quantity}})
    );
}

/*** Start - Event Open and Close Loading Main Overlay ***/
function openLoadingMain() {
    var elsLoadingMainOpen = document.querySelectorAll('.loading-main');
    for (var i = 0; i < elsLoadingMainOpen.length; i++) {
        if (!elsLoadingMainOpen[i].classList.contains('open')) {
            elsLoadingMainOpen[i].classList.add('open');
        }
    }
}

function closeLoadingMain() {
    var elsLoadingMainClose = document.querySelectorAll('.loading-main');
    for (var i = 0; i < elsLoadingMainClose.length; i++) {
        if (elsLoadingMainClose[i].classList.contains('open')) {
            elsLoadingMainClose[i].classList.remove('open');
        }
    }
}
/*** End - Event Open and Close Loading Main Overlay ***/

/*** Start - Event Open and Close Loading Main Overlay ***/
function openLoadingSideOverlay(el) {
    var contentsSideOverlay = document.querySelectorAll(el);
    for (var i = 0; i < contentsSideOverlay.length; i++) {
        if (!contentsSideOverlay[i].classList.contains('loading')) {
            contentsSideOverlay[i].classList.add('loading');
        }
    }
}

function closeLoadingSideOverlay(el) {
    var contentsSideOverlay = document.querySelectorAll(el);
    for (var i = 0; i < contentsSideOverlay.length; i++) {
        if (contentsSideOverlay[i].classList.contains('loading')) {
            contentsSideOverlay[i].classList.remove('loading');
        }
    }
}
/*** End - Event Open and Close Loading Main Overlay ***/

function setupCustomer() {
    return {
        data: {
            login: '',
            password: '',
            isLogged: false,
            errors: {}
        },

        validate: function validate() {
            const errors = {};

            if (!this.data.login) {
                errors.login = 'Por favor, digite seu login';
            }
            if (!this.data.password) {
                errors.password = 'Por favor, digite sua senha';
            }

            this.data.errors = errors;
            return Object.keys(errors).length === 0;
        },

        customerLogin: function customerLogin(data) {
            if (!this.validate()) {
                return;
            }
            openLoadingSideOverlay('.sidenav-overlay_account');
            const body = {
                login: data.login,
                password: data.password,
            };
            StoreSDK.request.post(`/ajax/login?nocache=${Date.now()}`, body).then((res) => {
                // TODO: GA login: Adicionando
                this.loginGA();
                if (typeof mb_track !== 'undefined') {
                    console.log('in accountSync theme login');
                    window.mb_track('accountSync', {
                        user: {
                            user_id: res?.id,
                            email: res.contacts?.find(contact => contact.contactGroupId === 1)?.value,
                            phone: res.contacts?.find(contact => contact.contactGroupId === 2)?.value,
                            name: res?.name || res?.fantasyName,
                        }
                    });
                }

                if (localStorage.getItem('customer_documentTypeSelected')) {
                    localStorage.removeItem('customer_documentTypeSelected');
                }
                if (localStorage.getItem('checkoutOldState')) {
                    localStorage.removeItem('checkoutOldState');
                }
                window.location.href = window.location.href;
                setTimeout(function () {
                    closeLoadingSideOverlay('.sidenav-overlay_account');
                }, 5000);
            }).catch((error) => {
                if (error.data && error.data.code && error.data.message) {
                    notyf.open({
                        type: 'warning',
                        message: error.data.message,
                    });
                } else {
                    notyf.open({
                        type: 'warning',
                        message: 'Não foi possível realizar o login',
                    });
                }
                setTimeout(function () {
                    closeLoadingSideOverlay('.sidenav-overlay_account');
                }, 500);
            })
        },

        loginGA: function loginGA() {
            if (typeof gtag !== 'undefined') {
                gtag("event", "login");
            }
        },

        customerLogout: function customerLogout() {
            openLoadingSideOverlay('.sidenav-overlay_account');
            StoreSDK.request.post(`/ajax/logout?nocache=${Date.now()}`).then((res) => {
                window.location.href = window.location.href;
                setTimeout(function () {
                    closeLoadingSideOverlay('.sidenav-overlay_account');
                }, 5000);
            });
        },
        getCustomer: function getCustomer() {
            StoreSDK.request.get('/ajax/customer').then((customer) => {
                this.data.isLogged = !!customer;
                window.dispatchEvent(
                    new CustomEvent("change-customer-login", {detail: {customer: customer}})
                );
                window.dispatchEvent(
                    new CustomEvent("change-customer-account", {detail: {customer: customer}})
                );
            });
        },
    }
}

/** Start - Mask input */
var customInputMask = null;

function loadInputMask() {
    customInputMask = Maska.create('.masked-input');
}

function reloadInputMask() {
    if (customInputMask) {
        customInputMask.destroy();
    }
    customInputMask = Maska.create('.masked-input');
}
/** End - Mask input */

/**** Start - Product Gallery Images ****/
function onChangeProductGallery(newindex, newImage, newImageMobile) {
    if ((typeof newImage !== 'undefined') && (newImage !== '') && (typeof newindex !== 'undefined') && (newindex !== '')) {
        newImageMobile = typeof newImageMobile !== 'undefined' ? newImageMobile : newImage;

        /*** Retirar classe "image-main" ***/
        var elsImageMain = document.querySelectorAll('.image-main');
        for (var x = 0; x < elsImageMain.length; x++) {
            elsImageMain[x].classList.remove('image-main');
        }

        /*** Add classe "image-main" em novo index ***/
        var itensImgMain = document.querySelectorAll('.product-gallery_link');
        for (var y = 0; y < itensImgMain.length; y++) {
            if (itensImgMain[y].getAttribute('data-index') === newindex) {
                itensImgMain[y].classList.add('image-main');
            }
        }

        /*** Alterar Imagem do Zoom ***/
        var elsImage = document.querySelectorAll('.product-zoom');
        for (var x = 0; x < elsImage.length; x++) {
            Array.prototype.forEach.call(elsImage[x].querySelectorAll('.product-zoom_image'), function (elImage) {
                setTimeout(function () {
                    fadeOut(elImage);
                }, 0);
                setTimeout(function () {
                    elImage.src = newImage;
                }, 200);
                setTimeout(function () {
                    fadeIn(elImage);
                }, 800);
            });
            Array.prototype.forEach.call(elsImage[x].querySelectorAll('.product-zoom_image__mobile'), function (elImageMobile) {
                setTimeout(function () {
                    elImageMobile.srcset = newImageMobile;
                }, 200);
            });
            Array.prototype.forEach.call(elsImage[x].querySelectorAll('.loading'), function (elLoading) {
                setTimeout(function () {
                    fadeIn(elLoading);
                }, 100);
                setTimeout(function () {
                    fadeOut(elLoading);
                }, 790);
            });
            Array.prototype.forEach.call(elsImage[x].querySelectorAll('.product-zoom_link'), function (elImageLink) {
                elImageLink.setAttribute('data-index', newindex);
            });
        }
    }
}

function onClickProductZoom() {
    var elsProductZoomLink = document.querySelectorAll('.product-zoom_link');
    for (var x = 0; x < elsProductZoomLink.length; x++) {
        var productZoomLink = elsProductZoomLink[x];
        productZoomLink.addEventListener("click", function (event) {
            var index = this.getAttribute('data-index');
            openPhotoSwipe(index);
        });
    }
}

var openPhotoSwipe = function (index) {
    var listImagesProductZoom = [];
    var elsGalleryLink = document.querySelectorAll('.product-gallery.product-gallery_desktop .product-gallery_link');
    for (var x = 0; x < elsGalleryLink.length; x++) {
        var elGalleryLink = elsGalleryLink[x];
        var srcImg = elGalleryLink.getAttribute('data-zoom');
        listImagesProductZoom.push({src: srcImg, w: 0, h: 0});
    }

    if ((typeof listImagesProductZoom !== 'undefined') && (listImagesProductZoom.length)) {
        var indexInit = (typeof index !== 'undefined') ? index : 0;
        var options = {index: parseInt(indexInit)};
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, listImagesProductZoom, options);
        gallery.listen('imageLoadComplete', function (index, item) {
            if (item.h < 1 || item.w < 1) {
                var img = new Image();
                img.onload = function () {
                    item.w = img.width;
                    item.h = img.height;
                    gallery.invalidateCurrItems();
                    gallery.updateSize(true);
                };
                img.src = item.src;
            }
        });
        gallery.init();
    }
};
/**** End - Product Gallery Images ****/

/**** Start - FadeOut / Fade In ****/
function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
/**** End - FadeOut / Fade In ****/

function handlerProductEvents(isUpdate) {
    if (isUpdate === true) {
        vanillaLazyload();
        sliderBannerFull();
        sliderBannerGrid();
    }
    sliderGallery();
    sliderRelated();
    onClickProductZoom();
}

function maskInt(event)
{
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function countdownTimer(countDownDate){
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
}
