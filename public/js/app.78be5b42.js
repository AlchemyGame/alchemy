(function(e){function t(t){for(var n,o,i=t[0],c=t[1],l=t[2],u=0,d=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&d.push(s[o][0]),s[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);m&&m(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,o=1;o<r.length;o++){var i=r[o];0!==s[i]&&(n=!1)}n&&(a.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},o={app:0},s={app:0},a=[];function i(e){return c.p+"js/"+({Dashboard:"Dashboard",Elements:"Elements",Errors:"Errors",Game:"Game",Home:"Home",Recipes:"Recipes",Users:"Users"}[e]||e)+"."+{Dashboard:"b5582252",Elements:"630226ea",Errors:"4dfb66ac",Game:"c0f91beb",Home:"5d53a303",Recipes:"4ed0b1aa",Users:"b12c88f5"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(e){var t=[],r={Elements:1,Errors:1,Game:1,Home:1,Recipes:1,Users:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=new Promise((function(t,r){for(var n="css/"+({Dashboard:"Dashboard",Elements:"Elements",Errors:"Errors",Game:"Game",Home:"Home",Recipes:"Recipes",Users:"Users"}[e]||e)+"."+{Dashboard:"31d6cfe0",Elements:"e7e340c1",Errors:"87f1cb34",Game:"3a2517d5",Home:"0c3fd4ef",Recipes:"8f9dc00a",Users:"e19a7598"}[e]+".css",s=c.p+n,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var l=a[i],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===s))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){l=d[i],u=l.getAttribute("data-href");if(u===n||u===s)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var n=t&&t.target&&t.target.src||s,a=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=n,delete o[e],m.parentNode.removeChild(m),r(a)},m.href=s;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){o[e]=0})));var n=s[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise((function(t,r){n=s[e]=[t,r]}));t.push(n[2]=a);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=i(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(m);var r=s[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",d.name="ChunkLoadError",d.type=n,d.request=o,r[1](d)}s[e]=void 0}};var m=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var m=u;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"09e9":function(e,t,r){},"16a3":function(e,t,r){"use strict";var n=r("b415"),o=r.n(n);o.a},3790:function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return l})),r.d(t,"d",(function(){return d})),r.d(t,"a",(function(){return p}));var n=r("bc3a"),o=r.n(n);function s(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){s(a,n,o,i,c,"next",e)}function c(e){s(a,n,o,i,c,"throw",e)}i(void 0)}))}}function i(){return c.apply(this,arguments)}function c(){return c=a((function*(){try{const e=yield o()({method:"get",url:"/api/recipes"});return e}catch(e){return e.response}})),c.apply(this,arguments)}function l(e,t){return u.apply(this,arguments)}function u(){return u=a((function*(e,t){try{const r=yield o()({method:"post",url:"/api/recipe/add",data:{recipe:e,result:t}});return r}catch(r){return r.response}})),u.apply(this,arguments)}function d(e,t,r){return m.apply(this,arguments)}function m(){return m=a((function*(e,t,r){try{const n=yield o()({method:"put",url:"/api/recipe/update",data:{newRecipe:e,newResult:t,recipeId:r}});return n}catch(n){return n.response}})),m.apply(this,arguments)}function p(e){return h.apply(this,arguments)}function h(){return h=a((function*(e){try{const t=yield o()({method:"delete",url:"/api/recipe/delete",data:{recipeId:e}});return t}catch(t){return t.response}})),h.apply(this,arguments)}},"3d62":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);var n=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("body",[e._m(0),r("header",[r("b-navbar",{attrs:{type:"dark",variant:"dark"}},[r("Navbar")],1)],1),r("main",[r("router-view",{key:e.$route.fullPath})],1)])},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("noscript",[r("strong",[e._v("We're sorry but public doesn't work properly without JavaScript enabled. Please enable it to continue.")])])}],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-container",[n("b-navbar-brand",{attrs:{to:"/"}},[n("img",{attrs:{src:r("9b19"),heigth:"50px",width:"50px"}}),e._v("Home\n  ")]),n("div",{staticClass:"navbar-icons ml-auto"},[e.user.isLoggedIn&&"/game"===e.$route.path?n("button",{staticClass:"icon opened-recipes-button"},[n("font-awesome-icon",{attrs:{id:"opened-recipes-button",title:"Recipes",icon:"scroll"},on:{click:e.openedRecipesModalShow}})],1):e._e(),e.user.isLoggedIn&&"/game"===e.$route.path?n("button",{staticClass:"icon"},[e.fullscreenEnabled?e._e():n("font-awesome-icon",{attrs:{title:"Enable fullscreen",icon:"expand-arrows-alt"},on:{click:e.enableFullscreen}}),e.fullscreenEnabled?n("font-awesome-icon",{attrs:{title:"Disable fullscreen",icon:"compress-arrows-alt"},on:{click:e.disableFullScreen}}):e._e()],1):e._e()]),n("b-navbar-nav",[e.user.isLoggedIn||e.user.state.isLoading?e._e():n("b-btn",{staticClass:"text-white",attrs:{variant:"link"},on:{click:e.loginModalShow}},[e._v("\n      Sign in\n    ")]),e.user.isLoggedIn||e.user.state.isLoading?e._e():n("b-btn",{staticClass:"text-white",attrs:{variant:"link"},on:{click:e.registrationModalShow}},[e._v("\n      Sign up\n    ")]),e.user.isLoggedIn&&!e.user.state.isLoading?n("b-nav-item-dropdown",{attrs:{text:e.user.username,left:"left"}},[n("b-dropdown-item",{attrs:{to:"/game"}},[e._v("\n        Game\n      ")]),e.user.isLoggedIn&&"Admin"===e.user.role?[n("b-dropdown-divider"),n("b-dropdown-item",{attrs:{to:"/admin/dashboard"}},[e._v("\n          Dashboard\n        ")]),n("b-dropdown-item",{attrs:{to:"/admin/elements"}},[e._v("\n          Elements\n        ")]),n("b-dropdown-item",{attrs:{to:"/admin/recipes"}},[e._v("\n          Recipes\n        ")]),n("b-dropdown-item",{attrs:{to:"/admin/users"}},[e._v("\n          Users\n        ")])]:e._e(),n("b-dropdown-divider"),e.user.isLoggedIn?n("b-dropdown-item",{on:{click:function(t){return e.logout()}}},[e._v("\n        Logout\n      ")]):e._e()],2):e._e()],1),n("LoginModal"),n("RegistrationModal"),n("ResetPasswordModal"),n("OpenedRecipesModal")],1)},i=[],c=r("2f62"),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{attrs:{size:"md","hide-header":"hide-header","hide-footer":"hide-footer",centered:"centered"},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[r("b-row",{staticClass:"ml-3 mr-3"},[r("b-col",{staticClass:"mt-4",attrs:{cols:"8"}},[r("h4",[e._v("\n        Sign in\n      ")])]),r("b-col",{staticClass:"ml-auto text-right",attrs:{cols:"2"}},[r("button",{staticClass:"close-button",on:{click:function(t){e.showModal=!1}}},[r("font-awesome-icon",{attrs:{icon:"times"}})],1)]),r("b-col",{staticClass:"mt-2",attrs:{cols:"12"}},[r("b-form-group",{attrs:{label:"Email or username","label-for":"usernameOrEmail"}},[r("b-form-input",{attrs:{required:"required",id:"usernameOrEmail",type:"text",autocomplete:e.autocomplete},model:{value:e.usernameOrEmail,callback:function(t){e.usernameOrEmail=t},expression:"usernameOrEmail"}})],1)],1),r("b-col",{staticClass:"mt-2",attrs:{cols:"12"}},[r("b-form-group",{attrs:{label:"Password","label-for":"password"}},[r("b-form-input",{attrs:{required:"required",id:"password",type:"password",autocomplete:e.autocomplete},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),r("b-col",{attrs:{cols:"12"}},[r("b-form-checkbox",{attrs:{name:"remember-login-checkbox"},model:{value:e.rememberLogin,callback:function(t){e.rememberLogin=t},expression:"rememberLogin"}},[e._v("\n        Remember me\n      ")])],1),r("b-col",{staticClass:"mt-3",attrs:{cols:"12"}},[r("p",{staticClass:"text-center text-muted"},[r("u",{on:{click:function(t){return e.resetPasswordModalShow()}}},[e._v("\n          Don't remember your password?\n        ")])])]),r("b-col",{staticClass:"mt-2 mb-3",attrs:{cols:"12"}},[r("b-btn",{attrs:{block:"block",variant:"success"},on:{click:e.login}},[e._v("\n        Sign in\n      ")])],1),e.error?r("b-col",{attrs:{cols:"12"}},[r("b-alert",{attrs:{show:"show",variant:"danger"}},[e._v("\n        "+e._s(e.error)+"\n      ")])],1):e._e()],1)],1)},u=[],d=r("bc3a"),m=r.n(d);function p(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function h(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var s=e.apply(t,r);function a(e){p(s,n,o,a,i,"next",e)}function i(e){p(s,n,o,a,i,"throw",e)}a(void 0)}))}}function E(){return f.apply(this,arguments)}function f(){return f=h((function*(){try{const e=yield m()({method:"get",url:"/api/login"});return e}catch(e){return e.response}})),f.apply(this,arguments)}function b(e,t,r){return g.apply(this,arguments)}function g(){return g=h((function*(e,t,r){try{const n=yield m()({method:"post",url:"/api/login",data:{email:e,password:t,remember:r}});return n}catch(n){return n.response}})),g.apply(this,arguments)}function v(){return y.apply(this,arguments)}function y(){return y=h((function*(){try{const e=yield m()({method:"get",url:"/api/logout"});return e}catch(e){return e.response}})),y.apply(this,arguments)}function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(r,!0).forEach((function(t){O(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var S={data(){return{showModal:!1,error:null,usernameOrEmail:null,password:null,rememberLogin:!1}},computed:_({},Object(c["c"])({isLoggedIn:"user/isLoggedIn"}),{autocomplete(){return this.rememberLogin?"on":"off"}}),mounted(){this.$root.$on("loginModalShow",()=>{this.showModal=!0})},methods:_({},Object(c["b"])({setUser:"user/setUser"}),{validation(){return!(!this.usernameOrEmail||!this.password)},login(){!0===this.validation()&&b(this.usernameOrEmail,this.password,this.rememberLogin).then(e=>{200===e.status?(this.showModal=!1,this.setUser(e.data.user),this.clearInputs(),this.$router.push({path:"/game"})):this.error=e.data.error})},clearInputs(){this.usernameOrEmail=null,this.password=null,this.rememberLogin=!1},resetPasswordModalShow(){this.$root.$emit("resetPasswordModalShow"),this.showModal=!1}})},D=S,R=(r("a2e4"),r("2877")),T=Object(R["a"])(D,l,u,!1,null,"fb3bca80",null),C=T.exports,L=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{attrs:{size:"md","hide-header":"hide-header","hide-footer":"hide-footer",centered:"centered"},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[r("b-row",{staticClass:"ml-3 mr-3"},[r("b-col",{staticClass:"mt-4",attrs:{cols:"8"}},[r("h4",[e._v("\n        Sign up\n      ")])]),r("b-col",{staticClass:"ml-auto text-right",attrs:{cols:"2"}},[r("button",{staticClass:"close-button",on:{click:function(t){e.showModal=!1}}},[r("font-awesome-icon",{attrs:{icon:"times"}})],1)]),r("b-col",{staticClass:"mt-3",attrs:{cols:"12"}},[r("b-form-group",{attrs:{label:"Username","label-for":"registrationUsername"}},[r("b-form-input",{class:{"form-error":e.$v.username.$error,"form-success":!e.$v.username.$error&&this.username},attrs:{required:"required",id:"registrationUsername",type:"text",autocomplete:"off"},model:{value:e.$v.username.$model,callback:function(t){e.$set(e.$v.username,"$model","string"===typeof t?t.trim():t)},expression:"$v.username.$model"}})],1)],1),r("b-col",{staticClass:"mt-2",attrs:{cols:"12"}},[r("b-form-group",{attrs:{label:"Email","label-for":"registrationEmail"}},[r("b-form-input",{class:{"form-error":e.$v.email.$error,"form-success":!e.$v.email.$error&&this.email},attrs:{required:"required",id:"registrationEmail",type:"text",autocomplete:"off"},model:{value:e.$v.email.$model,callback:function(t){e.$set(e.$v.email,"$model","string"===typeof t?t.trim():t)},expression:"$v.email.$model"}})],1)],1),r("b-col",{staticClass:"mt-2",attrs:{cols:"12"}},[r("b-form-group",{attrs:{label:"Password","label-for":"registrationPassword"}},[r("b-form-input",{class:{"form-error":e.$v.password.$error,"form-success":!e.$v.password.$error&&this.password},attrs:{required:"required",id:"registrationPassword",type:"password",autocomplete:"off"},model:{value:e.$v.password.$model,callback:function(t){e.$set(e.$v.password,"$model","string"===typeof t?t.trim():t)},expression:"$v.password.$model"}}),r("p",{directives:[{name:"show",rawName:"v-show",value:e.$v.password.$error,expression:"$v.password.$error"}],staticClass:"error"},[e._v("\n          password must contain at least 4 characters\n        ")])],1)],1),r("b-col",{staticClass:"mt-2 mb-3",attrs:{cols:"12"}},[r("b-btn",{attrs:{block:"block",variant:"success"},on:{click:e.registration}},[e._v("\n        Sign up\n      ")])],1)],1)],1)},P=[],$=r("5edc"),A=r("b5ae");function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function x(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(r,!0).forEach((function(t){I(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function I(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var M={mounted(){this.$root.$on("registrationModalShow",()=>{this.showModal=!0})},data(){return{showModal:!1,email:"",username:"",password:""}},methods:x({},Object(c["b"])({setUser:"user/setUser"}),{validation(){return!!(this.username&&this.email&&this.password)&&!(this.$v.username.$error||this.$v.email.$error||this.$v.password.$error)},registration(){!0===this.validation()&&Object($["c"])(this.email,this.username,this.password).then(e=>{200===e.status&&(this.showModal=!1,this.clearInputs(),this.$router.push({path:"/game"}))})},clearInputs(){this.email="",this.username="",this.password=""}}),validations:{email:{required:A["required"],email:A["email"]},username:{required:A["required"]},password:{required:A["required"],minLength:Object(A["minLength"])(4)}}},N=M,k=(r("6ec4"),Object(R["a"])(N,L,P,!1,null,"65d5e9bb",null)),q=k.exports,G=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{attrs:{title:e.textStatus,size:"md","hide-footer":"hide-footer",centered:"centered"},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[e.resetSuccess?e._e():r("b-row",{staticClass:"ml-3 mr-3"},[r("b-col",{staticClass:"mt-4",attrs:{cols:"8"}},[r("h4",[e._v("\n        Reset password\n      ")])]),r("b-col",{staticClass:"ml-auto text-right",attrs:{cols:"2"}},[r("button",{staticClass:"close-button",on:{click:function(t){e.showModal=!1}}},[r("font-awesome-icon",{attrs:{icon:"times"}})],1)]),r("b-col",{staticClass:"mt-2",attrs:{cols:"12"}},[r("b-form-group",{attrs:{label:"Email","label-for":"email"}},[r("b-form-input",{class:{"form-error":e.$v.email.$error,"form-success":!e.$v.email.$error&&this.email},attrs:{required:"required",id:"email",type:"text"},model:{value:e.$v.email.$model,callback:function(t){e.$set(e.$v.email,"$model","string"===typeof t?t.trim():t)},expression:"$v.email.$model"}})],1)],1),r("b-col",{staticClass:"mt-2 mb-3",attrs:{cols:"12"}},[r("b-btn",{attrs:{block:"block",variant:"success"},on:{click:e.resetPassword}},[e._v("\n        Reset password\n      ")])],1),r("b-col",{staticClass:"mt-2",attrs:{cols:"12"}},[e.error?r("b-alert",{attrs:{show:"show",variant:"danger"}},[e._v("\n        "+e._s(e.error)+"\n      ")]):e._e()],1)],1),e.resetSuccess?r("b-row",{staticClass:"ml-3 mr-3"},[r("b-col",{staticClass:"ml-auto text-right",attrs:{cols:"2"}},[r("b-button",{staticClass:"close-button",attrs:{size:"sm",variant:"link"},on:{click:function(t){e.showModal=!1,e.resetSuccess=!1}}},[r("font-awesome-icon",{staticClass:"fa-2x",attrs:{icon:"times"}})],1)],1),r("b-col",{staticClass:"mt-4",attrs:{cols:"12"}},[r("p",[e._v("\n        Check your email\n      ")])])],1):e._e()],1)},U=[],F={mounted(){this.$root.$on("resetPasswordModalShow",()=>{this.showModal=!0})},data(){return{showModal:!1,error:"",textStatus:"",email:"",resetSuccess:""}},methods:{validation(){return!!this.email&&!this.$v.email.$error},resetPassword(){!0===this.validation()&&Object($["d"])(this.email).then(e=>{200===e.status?(this.resetSuccess=!0,this.clearInputs(),this.textStatus="Email has been sent"):404===e.status?(this.textStatus="Error",this.error="There is no user registered with that email address."):(this.textStatus="Error",this.error="Try later.")})},clearInputs(){this.email="",this.resetSuccess=""}},validations:{email:{required:A["required"],email:A["email"]}}},z=F,H=(r("ae54"),Object(R["a"])(z,G,U,!1,null,"3e94ec49",null)),Y=H.exports,V=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{attrs:{size:"xl","hide-header":"hide-header","hide-footer":"hide-footer",centered:"centered"},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[r("b-row",{staticClass:"ml-3 mr-3"},[r("b-col",{attrs:{cols:"8"}},[r("h4",[e._v("\n        Opened recipes\n      ")])]),r("b-col",{staticClass:"ml-auto text-right",attrs:{cols:"2"}},[r("b-button",{staticClass:"close-button",attrs:{size:"sm",variant:"link"},on:{click:function(t){e.showModal=!1}}},[r("font-awesome-icon",{staticClass:"fa-2x",attrs:{icon:"times"}})],1)],1),r("b-col",{staticClass:"mt-2 opened-recipes-categories",attrs:{cols:"4"}},e._l(e.openedCategories,(function(t){return r("b-btn",{key:t._id,class:{"btn-success":t.name===e.selectedCategory},attrs:{block:"block"},on:{click:function(r){e.selectedCategory=t.name}}},[e._v("\n        "+e._s(t.name)+"\n      ")])})),1),r("b-col",{staticClass:"mt-2 opened-recipes-list",attrs:{cols:"7"}},e._l(e.openedRecipes,(function(t){return t.result.category===e.selectedCategory?r("b-row",{key:t._id,staticClass:"opened-recipes-list-item"},[r("b-col",{staticClass:"mb-1",attrs:{cols:"12"}},[r("OpenedRecipe",{attrs:{recipe:t}})],1)],1):e._e()})),1)],1)],1)},B=[],J=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"opened-recipe"},[r("b-row",{staticClass:"row align-items-center"},[r("b-col",{attrs:{cols:"5"}},[r("b-row",[r("b-col",{attrs:{cols:"12"}},[e._v("\n          "+e._s(e.recipe.result.name)+"\n        ")]),r("b-col",{attrs:{cols:"12"}},[e._v("\n          descrption\n        ")])],1)],1),r("b-col",{staticClass:"text-right pr-0",attrs:{cols:"3"}},[r("strong",[e._v("\n        "+e._s(e.recipe.recipe[0].name)+"\n      ")])]),r("b-col",{staticClass:"text-center pl-0 pr-0",attrs:{cols:"1"}},[e._v("\n      +\n    ")]),r("b-col",{staticClass:"text-left pl-0",attrs:{cols:"3"}},[r("strong",[e._v("\n        "+e._s(e.recipe.recipe[1].name)+"\n      ")])])],1)],1)},Z=[],K={props:{recipe:Object},data(){return{showPopover:!1}}},W=K,Q=Object(R["a"])(W,J,Z,!1,null,"6308c2c9",null),X=Q.exports;function ee(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function te(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ee(r,!0).forEach((function(t){re(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ee(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function re(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ne={components:{OpenedRecipe:X},data(){return{showModal:!1,selectedCategory:"Elements"}},mounted(){this.$root.$on("openedRecipesModalShow",()=>{this.showModal=!0})},computed:te({},Object(c["c"])({openedCategories:"categories/openedCategories",openedRecipes:"recipes/openedRecipes"})),methods:te({},Object(c["b"])({setUser:"user/setUser"}))},oe=ne,se=(r("634d"),Object(R["a"])(oe,V,B,!1,null,"95118c6e",null)),ae=se.exports;function ie(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ce(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ie(r,!0).forEach((function(t){le(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ie(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function le(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ue={components:{LoginModal:C,RegistrationModal:q,ResetPasswordModal:Y,OpenedRecipesModal:ae},created(){this.user.isLoggedIn||this.getLogin()},data(){return{fullscreenEnabled:!1}},computed:ce({},Object(c["c"])({user:"user/user"})),methods:ce({},Object(c["b"])({getLogout:"user/getLogout",getLogin:"user/getLogin"}),{logout(){this.getLogout().then(()=>{this.$router.push({path:"/"})})},loginModalShow(){this.$root.$emit("loginModalShow")},registrationModalShow(){this.$root.$emit("registrationModalShow")},openedRecipesModalShow(){this.$root.$emit("openedRecipesModalShow")},enableFullscreen(){document.documentElement.requestFullscreen?document.documentElement.requestFullscreen():document.documentElement.mozRequestFullScreen?document.documentElement.mozRequestFullScreen():document.documentElement.webkitRequestFullscreen?document.documentElement.webkitRequestFullscreen():document.documentElement.msRequestFullscreen&&document.documentElement.msRequestFullscreen(),this.fullscreenEnabled=!0},disableFullScreen(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen(),this.fullscreenEnabled=!1}})},de=ue,me=(r("16a3"),Object(R["a"])(de,a,i,!1,null,null,null)),pe=me.exports,he={components:{Navbar:pe}},Ee=he,fe=(r("5c0b"),Object(R["a"])(Ee,o,s,!1,null,null,null)),be=fe.exports,ge=r("8c4f"),ve={state:{isLoading:!1,error:""},role:null,isDisabled:null,id:null,email:null,username:null,created:null,isLoggedIn:!1},ye={LOADING_START(e){e.state.isLoading=!0},LOADING_END(e){e.state.isLoading=!1},SET_USER(e,t){e.role=t.role,e.isDisabled=t.isDisabled,e.id=t.id,e.email=t.email,e.username=t.username,e.created=t.created,e.isLoggedIn=!0},DELETE_USER(e){e.role=null,e.isDisabled=null,e.id=null,e.email=null,e.username=null,e.created=null,e.isLoggedIn=!1}},we={user:e=>{return e}};function _e(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function Oe(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var s=e.apply(t,r);function a(e){_e(s,n,o,a,i,"next",e)}function i(e){_e(s,n,o,a,i,"throw",e)}a(void 0)}))}}var Se={getLogin(e){return Oe((function*(){let t=e.state,r=e.commit;t.isLoggedIn||(r("LOADING_START"),yield E().then(e=>{r("LOADING_END"),e.data.user&&r("SET_USER",e.data.user)}))}))()},getLogout(e){return Oe((function*(){let t=e.commit;t("LOADING_START"),yield v().then(e=>{t("LOADING_END"),200!==e.status&&304!==e.status||t("DELETE_USER")})}))()},setUser(e,t){let r=e.commit;r("SET_USER",t)}},De={namespaced:!0,state:ve,mutations:ye,getters:we,actions:Se},Re={history:{last:{firstElement:"",secondElement:"",result:""},past:[]},gameFieldSize:{x:0,y:0}},Te={SET_GAME_FIELD_SIZE(e,t){let r=t.x,n=t.y;e.gameFieldSize.x=r,e.gameFieldSize.y=n},ADD_HISTORY(e,t){e.history.last.firstElement=t.firstElement,e.history.last.secondElement=t.secondElement,e.history.last.result=t.result,e.history.past.push(t)}},Ce={gameFieldSize:e=>{return e.gameFieldSize},history:e=>{return e.history}},Le={setGameFieldSize(e,t){let r=e.commit,n=t.x,o=t.y;r("SET_GAME_FIELD_SIZE",{x:n,y:o})},addHistory(e,t){let r=e.commit;r("ADD_HISTORY",t)}},Pe={namespaced:!0,state:Re,mutations:Te,getters:Ce,actions:Le},$e={state:{isLoading:!1,error:""},openedElements:[],activeElements:[],selectedElement:{}},Ae={LOADING_START(e){e.state.isLoading=!0},LOADING_END(e){e.state.isLoading=!1},SET_ERROR(e,t){e.state.error=t},SET_OPENED_ELEMENTS(e,t){e.openedElements=t},ADD_OPENED_ELEMENT(e,t){e.openedElements.push(t)},SET_ACTIVE_ELEMENTS(e,t){e.activeElements=t},ADD_ACTIVE_ELEMENT(e,t){e.activeElements.push(t)},DELETE_ACTIVE_ELEMENT(e,t){e.activeElements.splice(t,1)},DELETE_ACTIVE_ELEMENTS(e){e.activeElements=[]},SET_SELECTED_ELEMENT(e,t){e.selectedElement=t},SET_SELECTED_ELEMENT_COORDINATES(e,t){let r=t.x,n=t.y,o=t.z;e.selectedElement.x=r,e.selectedElement.y=n,e.selectedElement.z=o},DELETE_SELECTED_ELEMENT(e){e.selectedElement={}},UPDATE_OPENED_ELEMENTS_POSITIONS(e){let t=0;e.openedElements.forEach(e=>{e.x=0,e.show?(e.y=45*t,t++):e.y=0})},UPDATE_OPENED_ELEMENTS_BY_CATEGORY(e,t){e.openedElements.forEach(e=>{e.show=!1,t._id===e.category&&(e.show=!0)})}},je={state:e=>{return e.state},openedElements:e=>{return e.openedElements},activeElements:e=>{return e.activeElements},selectedElement:e=>{return e.selectedElement}},xe=r("8dee");function Ie(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Me(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ie(r,!0).forEach((function(t){Ne(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ie(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Ne(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ke(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function qe(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var s=e.apply(t,r);function a(e){ke(s,n,o,a,i,"next",e)}function i(e){ke(s,n,o,a,i,"throw",e)}a(void 0)}))}}var Ge={getOpenedElements(e){return qe((function*(){let t=e.state,r=e.commit;0===t.openedElements.length&&(r("LOADING_START"),yield Object($["b"])().then(e=>{r("LOADING_END"),200===e.status?(e.data.elements.forEach(e=>{e.x=0,e.y=0,e.z=100,e.show=!1}),r("SET_OPENED_ELEMENTS",e.data.elements)):r("SET_ERROR",e)}))}))()},addOpenedElement(e,t){return qe((function*(){let r=e.commit,n=e.rootState,o=e.dispatch;r("LOADING_START"),yield Object($["a"])(t._id).then(e=>{r("LOADING_END"),200===e.status?(t=Me({},t,{x:0,y:0,z:100,show:!1}),r("ADD_OPENED_ELEMENT",t),o("updateOpenedElementsByCategory",n.categories.selectedCategory),o("updateOpenedElementsPositions")):r("SET_ERROR",e)})}))()},setActiveElements(e,t){let r=e.commit;r("SET_ACTIVE_ELEMENTS",t)},addActiveElement(e,t){let r=e.commit;t=Me({},t,{z:100,gameId:xe["generate"]()}),r("ADD_ACTIVE_ELEMENT",t)},deleteActiveElement(e,t){let r=e.commit,n=e.state;n.activeElements.forEach((e,n)=>{e.gameId===t.gameId&&r("DELETE_ACTIVE_ELEMENT",n)})},deleteActiveElements(e){let t=e.commit;t("DELETE_ACTIVE_ELEMENTS")},setSelectedElement(e,t){let r=e.commit;r("SET_SELECTED_ELEMENT",t)},setSelectedElementCoordinates(e,t){let r=e.commit,n=t.x,o=t.y,s=t.z;r("SET_SELECTED_ELEMENT_COORDINATES",{x:n,y:o,z:s})},deleteSelectedElement(e){let t=e.commit;t("DELETE_SELECTED_ELEMENT")},updateOpenedElementsPositions(e){let t=e.commit,r=e.rootState;t("UPDATE_OPENED_ELEMENTS_POSITIONS",r.game.gameFieldSize)},updateOpenedElementsByCategory(e,t){let r=e.commit;r("UPDATE_OPENED_ELEMENTS_BY_CATEGORY",t)}},Ue={namespaced:!0,state:$e,mutations:Ae,getters:je,actions:Ge},Fe={state:{isLoading:!1,error:""},openedCategories:[],selectedCategory:{}},ze={LOADING_START(e){e.state.isLoading=!0},LOADING_END(e){e.state.isLoading=!1},SET_ERROR(e,t){e.state.error=t},SET_OPENED_CATEGORIES(e,t){e.openedCategories=t},ADD_OPENED_CATEGORY(e,t){e.openedCategories.push(t)},SET_SELECTED_CATEGORY(e,t){e.selectedCategory=t},DELETE_SELECTED_CATEGORY(e){e.selectedCategory={}}},He={state:e=>{return e.state},openedCategories:e=>{return e.openedCategories},selectedCategory:e=>{return e.selectedCategory}},Ye=r("63c6");function Ve(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function Be(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var s=e.apply(t,r);function a(e){Ve(s,n,o,a,i,"next",e)}function i(e){Ve(s,n,o,a,i,"throw",e)}a(void 0)}))}}var Je={getOpenedCategories(e,t){return Be((function*(){let r=e.commit;r("LOADING_START"),yield Object(Ye["a"])().then(e=>{if(r("LOADING_END"),200===e.status){let n=[];t.forEach(t=>{let r=n.filter(e=>{return t.category===e._id});if(0===r.length){let r=e.data.response.filter(e=>{return e._id===t.category});n.push({_id:t.category,name:r[0].name})}}),r("SET_OPENED_CATEGORIES",n)}else r("SET_ERROR",e)})}))()},addOpenedCategory(e,t){let r=e.commit;r("ADD_OPENED_CATEGORY",t)},setSelectedCategory(e,t){let r=e.commit;r("SET_SELECTED_CATEGORY",t)},deleteSelectedCategory(e){let t=e.commit;t("DELETE_SELECTED_CATEGORY")}},Ze={namespaced:!0,state:Fe,mutations:ze,getters:He,actions:Je},Ke={state:{isLoading:!1,error:""},recipes:[],openedRecipes:[],selectedRecipe:{}},We={LOADING_START(e){e.state.isLoading=!0},LOADING_END(e){e.state.isLoading=!1},SET_ERROR(e,t){e.state.error=t},SET_RECIPES(e,t){e.recipes=t},SET_OPENED_RECIPES(e,t){e.openedRecipes=t},ADD_OPENED_RECIPE(e,t){e.openedRecipes.push(t)},SET_SELECTED_RECIPE(e,t){e.selectedRecipe=t},DELETE_SELECTED_RECIPE(e){e.selectedRecipe={}}},Qe={recipes:e=>{return e.recipes},openedRecipes:e=>{return e.openedRecipes},selectedRecipe:e=>{return e.selectedRecipe},state:e=>{return e.state}},Xe=r("3790");function et(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function tt(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var s=e.apply(t,r);function a(e){et(s,n,o,a,i,"next",e)}function i(e){et(s,n,o,a,i,"throw",e)}a(void 0)}))}}var rt={getRecipes(e){return tt((function*(){let t=e.state,r=e.commit;0===t.recipes.length&&(r("LOADING_START"),yield Object(Xe["b"])().then(e=>{r("LOADING_END"),200===e.status?r("SET_RECIPES",e.data.response):r("SET_ERROR",e.data)}))}))()},setOpenedRecipes(e,t){let r=e.commit;r("SET_OPENED_RECIPES",t)},addOpenedRecipe(e,t){let r=e.commit;r("ADD_OPENED_RECIPE",t)},setSelectedRecipe(e,t){let r=e.commit;r("SET_SELECTED_RECIPE",t)},deleteSelectedRecipe(e){let t=e.commit;t("DELETE_SELECTED_RECIPE")}},nt={namespaced:!0,state:Ke,mutations:We,getters:Qe,actions:rt};n["default"].use(c["a"]);var ot=new c["a"].Store({modules:{user:De,game:Pe,elements:Ue,categories:Ze,recipes:nt},strict:!0});n["default"].use(ge["a"]);const st=new ge["a"]({mode:"history",base:"/",routes:[{path:"/",component:()=>r.e("Home").then(r.bind(null,"5d0d")),meta:{title:"Alchemy",authRequired:!1,adminRoleRequired:!1}},{path:"/game",component:()=>r.e("Game").then(r.bind(null,"001c")),meta:{title:"Game | Alchemy",authRequired:!1,adminRoleRequired:!1}},{path:"/admin/dashboard/",component:()=>r.e("Dashboard").then(r.bind(null,"77ca")),meta:{title:"Dashboard | Alchemy",authRequired:!0,adminRoleRequired:!0}},{path:"/admin/elements",component:()=>r.e("Elements").then(r.bind(null,"ae8c")),meta:{title:"Elements | Alchemy",authRequired:!0,adminRoleRequired:!0}},{path:"/admin/recipes",component:()=>r.e("Recipes").then(r.bind(null,"ffc0")),meta:{title:"Recipes | Alchemy",authRequired:!0,adminRoleRequired:!0}},{path:"/admin/users",component:()=>r.e("Users").then(r.bind(null,"20fb")),meta:{title:"Users | Alchemy",authRequired:!0,adminRoleRequired:!0}},{path:"*",component:()=>r.e("Errors").then(r.bind(null,"6b32")),meta:{title:"Error | Alchemy",authRequired:!1,adminRoleRequired:!1}}]});function at(e){return!e.matched.some(e=>e.meta.authRequired)||!!ot.getters["user/user"].isLoggedIn}function it(e){return!e.matched.some(e=>e.meta.adminRoleRequired)||"Admin"===ot.getters["user/user"].role}st.beforeEach((e,t,r)=>{document.title=e.meta.title,r()}),st.beforeResolve((e,t,r)=>{!0===at(e)?r():r({path:"/"}),!0===it(e)?r():r({path:"/"})});var ct=st,lt=r("5f5b"),ut=r("1dce"),dt=r.n(ut),mt=r("ecee"),pt=r("c074"),ht=r("ad3d"),Et=r("8e5f"),ft=r.n(Et),bt=r("fb19"),gt=r.n(bt);r("278f"),r("e607");mt["c"].add(pt["e"],pt["n"],pt["j"],pt["c"],pt["m"],pt["o"],pt["l"],pt["p"],pt["h"],pt["g"],pt["b"],pt["a"],pt["i"],pt["k"],pt["f"],pt["d"]),n["default"].component("font-awesome-icon",ht["a"]),n["default"].component("multiselect",ft.a),n["default"].component("vue-draggable-resizable",gt.a),n["default"].use(lt["a"]),n["default"].use(dt.a),n["default"].config.productionTip=!1,new n["default"]({router:ct,store:ot,render:e=>e(be)}).$mount("body")},"5c0b":function(e,t,r){"use strict";var n=r("e332"),o=r.n(n);o.a},"5edc":function(e,t,r){"use strict";r.d(t,"c",(function(){return i})),r.d(t,"d",(function(){return l})),r.d(t,"b",(function(){return d})),r.d(t,"a",(function(){return p}));var n=r("bc3a"),o=r.n(n);function s(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){s(a,n,o,i,c,"next",e)}function c(e){s(a,n,o,i,c,"throw",e)}i(void 0)}))}}function i(e,t,r){return c.apply(this,arguments)}function c(){return c=a((function*(e,t,r){try{const n=yield o()({method:"post",url:"/api/account/add",data:{email:e,username:t,password:r}});return n}catch(n){return n.response}})),c.apply(this,arguments)}function l(e){return u.apply(this,arguments)}function u(){return u=a((function*(e){try{const t=yield o()({method:"put",url:"/api/account/password/reset",data:{email:e}});return t}catch(t){return t.response}})),u.apply(this,arguments)}function d(){return m.apply(this,arguments)}function m(){return m=a((function*(){try{const e=yield o()({method:"get",url:"/api/account/elements"});return e}catch(e){return e.response}})),m.apply(this,arguments)}function p(e){return h.apply(this,arguments)}function h(){return h=a((function*(e){try{const t=yield o()({method:"put",url:"/api/account/element/add",data:{elementId:e}});return t}catch(t){return t.response}})),h.apply(this,arguments)}},"634d":function(e,t,r){"use strict";var n=r("09e9"),o=r.n(n);o.a},"63c6":function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return l}));var n=r("bc3a"),o=r.n(n);function s(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){s(a,n,o,i,c,"next",e)}function c(e){s(a,n,o,i,c,"throw",e)}i(void 0)}))}}function i(){return c.apply(this,arguments)}function c(){return c=a((function*(){try{const e=yield o.a.get("/api/categories");return e}catch(e){return e.response}})),c.apply(this,arguments)}function l(e){return u.apply(this,arguments)}function u(){return u=a((function*(e){try{const t=yield o()({method:"post",url:"/api/category/add",data:{name:e}});return t}catch(t){return t.response}})),u.apply(this,arguments)}},"6ec4":function(e,t,r){"use strict";var n=r("97a6"),o=r.n(n);o.a},"91ea":function(e,t,r){},"97a6":function(e,t,r){},"9b19":function(e,t,r){e.exports=r.p+"img/logo.7e01d1c8.svg"},a2e4:function(e,t,r){"use strict";var n=r("3d62"),o=r.n(n);o.a},ae54:function(e,t,r){"use strict";var n=r("91ea"),o=r.n(n);o.a},b415:function(e,t,r){},e332:function(e,t,r){}});
//# sourceMappingURL=app.78be5b42.js.map