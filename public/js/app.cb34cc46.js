(function(e){function n(n){for(var r,i,u=n[0],s=n[1],d=n[2],c=0,m=[];c<u.length;c++)i=u[c],a[i]&&m.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(n);while(m.length)m.shift()();return o.push.apply(o,d||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,i=1;i<t.length;i++){var s=t[i];0!==a[s]&&(r=!1)}r&&(o.splice(n--,1),e=u(u.s=t[0]))}return e}var r={},a={app:0},o=[];function i(e){return u.p+"js/"+({adminDashboard:"adminDashboard",adminEditor:"adminEditor",game:"game",home:"home",notFound:"notFound"}[e]||e)+"."+{adminDashboard:"bfe06032",adminEditor:"5d5eb371",game:"4c12e5e2",home:"91a3a405",notFound:"744ca037"}[e]+".js"}function u(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t=a[e];if(0!==t)if(t)n.push(t[2]);else{var r=new Promise(function(n,r){t=a[e]=[n,r]});n.push(t[2]=r);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=i(e),o=function(n){s.onerror=s.onload=null,clearTimeout(d);var t=a[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,t[1](i)}a[e]=void 0}};var d=setTimeout(function(){o({type:"timeout",target:s})},12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(n)},u.m=e,u.c=r,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)u.d(t,r,function(n){return e[n]}.bind(null,r));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=n,s=s.slice();for(var c=0;c<s.length;c++)n(s[c]);var l=d;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},1643:function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("Navbar"),t("router-view",{key:e.$route.fullPath})],1)},o=[],i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("b-navbar",{staticClass:"mb-3",attrs:{toggleable:"sm",type:"dark",variant:"dark"}},[t("b-navbar-brand",{attrs:{to:"/"}},[e._v("Home")]),t("b-collapse",{attrs:{id:"nav_collapse","is-nav":""}}),t("b-navbar-nav",{staticClass:"ml-auto"},[t("b-nav-item-dropdown",{attrs:{text:"Username",right:""}},[t("b-dropdown-item",{attrs:{to:"/game"}},[e._v("Game")]),t("b-dropdown-item",{attrs:{to:"/admin/dashboard"}},[e._v("Dashboard")]),t("b-dropdown-item",{attrs:{to:"/admin/editor"}},[e._v("Editor")])],1)],1)],1)},u=[],s={name:"Navbar"},d=s,c=(t("997d"),t("2877")),l=Object(c["a"])(d,i,u,!1,null,"0368d1ac",null),m=l.exports,p={name:"App",components:{Navbar:m}},f=p,b=(t("5c0b"),Object(c["a"])(f,a,o,!1,null,null,null)),h=b.exports,v=t("8c4f"),g=function(){return t.e("home").then(t.bind(null,"6f82"))},y=function(){return t.e("game").then(t.bind(null,"6a8e"))},w=function(){return t.e("adminDashboard").then(t.bind(null,"115f"))},_=function(){return t.e("adminEditor").then(t.bind(null,"5dcd"))},j=function(){return t.e("notFound").then(t.bind(null,"0b6a"))};r["a"].use(v["a"]);var O=new v["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:g},{path:"/game",name:"game",component:y},{path:"/admin/dashboard",name:"adminDashboard",component:w},{path:"/admin/editor",name:"adminEditor",component:_},{path:"*",name:"404",component:j}]}),E=t("2f62");r["a"].use(E["a"]);var x=new E["a"].Store({state:{},mutations:{},actions:{}}),C=t("9f7b"),P=(t("ab8b"),t("177c"),t("ecee")),S=t("c074"),z=t("ad3d"),k=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("b-row",{staticClass:"justify-content-md-center mb-5 mt-5"},[t("b-col",{staticClass:"loading",attrs:{cols:"12",md:"auto"}},["small"==e.size?t("breeding-rhombus-spinner",{attrs:{"animation-duration":2e3,size:25,color:"#00CB31"}}):e._e(),"medium"==e.size?t("breeding-rhombus-spinner",{attrs:{"animation-duration":2e3,size:50,color:"#00CB31"}}):e._e(),"large"==e.size?t("breeding-rhombus-spinner",{attrs:{"animation-duration":2e3,size:75,color:"#00CB31"}}):e._e()],1)],1)},D=[],T=t("4583"),$={name:"LoadingSpinner",props:{size:{type:String,default:"medium"}},components:{BreedingRhombusSpinner:T["a"]},created:function(){this.size.toLowerCase()}},B=$,F=Object(c["a"])(B,k,D,!1,null,null,null),M=F.exports;P["c"].add(S["a"],S["b"]),r["a"].component("font-awesome-icon",z["a"]),r["a"].component("loading-spinner",M),r["a"].use(C["a"]),r["a"].config.productionTip=!1,new r["a"]({router:O,store:x,render:function(e){return e(h)}}).$mount("#app")},"5c0b":function(e,n,t){"use strict";var r=t("5e27"),a=t.n(r);a.a},"5e27":function(e,n,t){},"997d":function(e,n,t){"use strict";var r=t("1643"),a=t.n(r);a.a}});
//# sourceMappingURL=app.cb34cc46.js.map