(function(){"use strict";var t={7079:function(t,e,r){var o=r(144),a=r(998),n=r(6072),s=r(8762),i=r(4324),u=r(3059),c=r(8718),l=function(){var t=this,e=t._self._c;return e(a.Z,[e(n.Z,{attrs:{app:"",flat:"",dark:""}},[e("img",{attrs:{width:"200px",src:r(6312),alt:"mongo logo"}}),e(c.Z),e("router-link",{staticClass:"nav-link",attrs:{"exact-active-class":"active",tag:"li",to:"/"}},[t._v("Home")]),e("router-link",{staticClass:"nav-link",attrs:{"active-class":"active",tag:"li",to:"/farmers"}},[t._v("Farmers")]),e("router-link",{staticClass:"nav-link",attrs:{"active-class":"active",tag:"li",to:"/reports"}},[t._v("Reports")]),e(c.Z),t.user?e(s.Z,{staticClass:"logoutBtn",attrs:{text:""},on:{click:t.logoutUser}},[t._v(" LOGOUT "),e(i.Z,{staticClass:"ml-1"},[t._v("mdi-logout")])],1):e("div",[e(s.Z,{staticClass:"mr-5 authBtn",attrs:{text:"",to:"/login"}},[t._v(" LOGIN "),e(i.Z,{staticClass:"ml-1"},[t._v("mdi-login")])],1),e(s.Z,{staticClass:"mr-5 authBtn",attrs:{text:"",to:"/register"}},[t._v(" SIGN UP "),e(i.Z,{staticClass:"ml-1"},[t._v("mdi-account-plus")])],1)],1)],1),e(u.Z,[e("router-view")],1)],1)},d=[],m=(r(7658),r(629)),f={name:"App",computed:{...(0,m.Se)(["user"])},watch:{user(t){null!==t&&void 0!==t&&this.$router.push("/")}},methods:{...(0,m.nv)(["logout"]),logoutUser(){this.logout(),this.$router.push("/login")}}},g=f,p=r(1001),h=(0,p.Z)(g,l,d,!1,null,null,null),v=h.exports,y=r(4702),b=r(6154),Z={state:{user:null,token:localStorage.getItem("token")||""},mutations:{setUser(t,e){t.user=e.user,t.token=e.token},logout(t){t.user=null,t.token="",t.error=null}},actions:{autoLogout({commit:t}){setTimeout((()=>{t("clearError"),t("logout"),localStorage.removeItem("token"),delete b.Z.defaults.headers.common.Authorization}),18e5)},async register({dispatch:t,commit:e},r){e("setLoading",!0);try{const o=await b.Z.post("/auth/register",r);if(201===o.status){let o=new FormData;o.append("name",r.name),o.append("phoneNo",r.phone),o.append("password",r.password),await t("login",o),e("setError",null),e("setLoading",!1)}}catch(o){e("setLoading",!1),e("setError",o.response.data.message)}},async login({commit:t,dispatch:e},r){t("setLoading",!0);try{const o=await b.Z.post("/auth/login",{phone:r.get("phone"),password:r.get("password")});if(200===o.status){let r=o.data.loadedUser,a=o.data.token;localStorage.setItem("token",a),b.Z.defaults.headers.common.Authorization=a,t("setUser",{user:r,token:a}),t("clearError"),t("setLoading",!1),e("autoLogout")}}catch(o){t("setLoading",!1),t("setError",o.response.data.message),localStorage.removeItem("token")}},logout({commit:t}){t("logout"),localStorage.removeItem("token"),delete b.Z.defaults.headers.common.Authorization},clearError({commit:t}){t("clearError")}},getters:{user:t=>t.user,isAuthenticated:t=>!!t.user}},w={state:{error:null,loading:!1},mutations:{setLoading(t,e){t.loading=e},setError(t,e){t.error=e},clearError(t){t.error=null}},actions:{setError({commit:t},e){t("setError",e)},clearError({commit:t}){t("clearError")}},getters:{isLoading:t=>t.loading,error:t=>t.error}},k={state:{farmers:[],farmer:null,totalWeight:0},mutations:{setFarmers(t,e){t.farmers=e},setFarmer(t,e){t.farmer=e},setTotalWeight(t){let e=0;for(let r of t.farmers)e+=r.totalWeight;t.totalWeight=e},updateFarmersQuantity(t,e){t.farmers=t.farmers.map((t=>t._id===e._id?Object.assign(t,e):t))}},actions:{async fetchFarmers({commit:t}){t("setLoading",!0);try{const e=await b.Z.get("/admin/get-farmers"),r=e.data;t("setLoading",!1),t("clearError"),t("setFarmers",r),t("setTotalWeight")}catch(e){t("setLoading",!1),t("setError",e.response.data.message)}},async fetchFarmer({commit:t},e){t("setLoading",!0);try{const r=await b.Z.get(`/admin/farmer/${e}`),o=r.data;t("setLoading",!1),t("clearError"),t("setFarmer",o)}catch(r){t("setLoading",!1),t("setError",r.response.data.message)}},async newFarmer({commit:t},e){t("setLoading",!0);try{const r=await b.Z.post("/admin/create-farmer",e),o=r.data;t("setLoading",!1),t("clearError"),t("setFarmer",o)}catch(r){t("setLoading",!1),t("setError",r.response.data.message)}},async updateFarmersQuantity({commit:t},e){t("setLoading",!0);try{const r=await b.Z.post(`/admin/update-weight/${e.id}`,{weight:e.weight}),o=r.data.result;t("setLoading",!1),t("clearError"),t("updateFarmersQuantity",o)}catch(r){t("setLoading",!1),t("setError",r.response.data.message)}}},getters:{farmers:t=>t.farmers,farmer:t=>t.farmer,totalWeight:t=>t.totalWeight}};o.ZP.use(m.ZP);var _=new m.ZP.Store({modules:{Auth:Z,Shared:w,Farmer:k},plugins:[(0,y.Z)()]}),E=r(8345),L=r(9582),C=r(4886),x=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"home"}},[e("section",{staticClass:"main"},[e(L.Z,{staticClass:"card pa-2",attrs:{width:"300px",height:"200px",outlined:""},on:{click:function(e){return t.$router.push("/farmers")}}},[e(i.Z,{attrs:{size:"100"}},[t._v("mdi-account-group")]),e(C.EB,[t._v(t._s(t.farmers.length))]),e(C.Qq,[t._v(" Number of farmers ")])],1),e(L.Z,{staticClass:"card pa-2",attrs:{width:"300px",height:"200px",outlined:""},on:{click:function(e){return t.$router.push("#")}}},[e(i.Z,{attrs:{size:"100"}},[t._v("mdi-scale-balance")]),e(C.EB,[t._v(t._s(t.totalWeight)+" Kgs")]),e(C.Qq,[t._v("Coffee brought by farmers")])],1)],1)])},P=[],S={name:"Home",created(){this.$store.dispatch("fetchFarmers")},computed:{...(0,m.Se)(["farmers","totalWeight"])}},F=S,A=(0,p.Z)(F,x,P,!1,null,"19b8be89",null),O=A.exports;o.ZP.use(E.ZP);const T=[{path:"/",name:"home",component:O},{path:"/login",name:"Login",component:()=>r.e(902).then(r.bind(r,6902))},{path:"/register",name:"Signup",component:()=>r.e(332).then(r.bind(r,332))},{path:"/farmers/:farmerId",name:"Farmer Details",component:()=>Promise.all([r.e(163),r.e(874)]).then(r.bind(r,4874)),meta:{requiresAuth:!0}},{path:"/farmers",name:"Farmers",component:()=>Promise.all([r.e(163),r.e(539)]).then(r.bind(r,9539)),meta:{requiresAuth:!0}}],j=new E.ZP({mode:"history",base:"/",routes:T});j.beforeEach(((t,e,r)=>{if(t.matched.some((t=>t.meta.requiresAuth))){if(_.getters.isAuthenticated)return void r();r("/login")}else r()}));const N="ePulp";j.afterEach(((t,e)=>{o.ZP.nextTick((()=>{document.title=t.meta.title||N}))}));var B=j,I=r(8864);o.ZP.use(I.Z);var U=new I.Z({}),W=r(9202),$=function(){var t=this,e=t._self._c;return e(W.Z,{attrs:{width:"350px"},model:{value:t.display,callback:function(e){t.display=e},expression:"display"}},[e(L.Z,{staticClass:"text-center pa-4"},[e(i.Z,{attrs:{size:"100",color:"red"}},[t._v("mdi-alert-circle-outline")]),e(C.ZB,{staticClass:"mt-3",domProps:{innerHTML:t._s(t.errorText)}}),e(C.h7,[e(c.Z),e(s.Z,{attrs:{text:"",block:""},on:{click:function(e){return t.$emit("close-dialog")}}},[t._v("close")])],1)],1)],1)},q=[],z={name:"error",props:{display:{type:Boolean,default:!1},errorText:String}},Q=z,D=(0,p.Z)(Q,$,q,!1,null,null,null),H=D.exports;b.Z.defaults.withCredentials=!1,b.Z.defaults.baseURL="http://161.35.206.66:81/api";const M=localStorage.getItem("token");M&&(b.Z.defaults.headers.common.Authorization=M),b.Z.interceptors.response.use(void 0,(t=>new Promise(((e,r)=>{401===t.status&&t.config&&!t.config.__isRetryRequest&&_.dispatch("logout"),r(t)})))),o.ZP.component("error-dialog",H),o.ZP.config.productionTip=!1,new o.ZP({store:_,router:B,vuetify:U,render:t=>t(v)}).$mount("#app")},6312:function(t,e,r){t.exports=r.p+"img/mongo_logo.a9df3262.png"}},e={};function r(o){var a=e[o];if(void 0!==a)return a.exports;var n=e[o]={exports:{}};return t[o].call(n.exports,n,n.exports,r),n.exports}r.m=t,function(){var t=[];r.O=function(e,o,a,n){if(!o){var s=1/0;for(l=0;l<t.length;l++){o=t[l][0],a=t[l][1],n=t[l][2];for(var i=!0,u=0;u<o.length;u++)(!1&n||s>=n)&&Object.keys(r.O).every((function(t){return r.O[t](o[u])}))?o.splice(u--,1):(i=!1,n<s&&(s=n));if(i){t.splice(l--,1);var c=a();void 0!==c&&(e=c)}}return e}n=n||0;for(var l=t.length;l>0&&t[l-1][2]>n;l--)t[l]=t[l-1];t[l]=[o,a,n]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){r.f={},r.e=function(t){return Promise.all(Object.keys(r.f).reduce((function(e,o){return r.f[o](t,e),e}),[]))}}(),function(){r.u=function(t){return"js/"+t+"."+{163:"a426aa3e",332:"1b902d6c",539:"e0a59ebd",874:"bc3de9cf",902:"357c268c"}[t]+".js"}}(),function(){r.miniCssF=function(t){return"css/"+t+"."+{163:"482fa775",332:"30d122d5",539:"8d2a90dc",874:"48c2c6bf",902:"bf3dc7f1"}[t]+".css"}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="admin:";r.l=function(o,a,n,s){if(t[o])t[o].push(a);else{var i,u;if(void 0!==n)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==e+n){i=d;break}}i||(u=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.setAttribute("data-webpack",e+n),i.src=o),t[o]=[a];var m=function(e,r){i.onerror=i.onload=null,clearTimeout(f);var a=t[o];if(delete t[o],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((function(t){return t(r)})),e)return e(r)},f=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),u&&document.head.appendChild(i)}}}(),function(){r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){r.p="/"}(),function(){if("undefined"!==typeof document){var t=function(t,e,r,o,a){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var s=function(r){if(n.onerror=n.onload=null,"load"===r.type)o();else{var s=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.href||e,u=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=s,u.request=i,n.parentNode&&n.parentNode.removeChild(n),a(u)}};return n.onerror=n.onload=s,n.href=e,r?r.parentNode.insertBefore(n,r.nextSibling):document.head.appendChild(n),n},e=function(t,e){for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var a=r[o],n=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(n===t||n===e))return a}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){a=s[o],n=a.getAttribute("data-href");if(n===t||n===e)return a}},o=function(o){return new Promise((function(a,n){var s=r.miniCssF(o),i=r.p+s;if(e(s,i))return a();t(o,i,null,a,n)}))},a={143:0};r.f.miniCss=function(t,e){var r={163:1,332:1,539:1,874:1,902:1};a[t]?e.push(a[t]):0!==a[t]&&r[t]&&e.push(a[t]=o(t).then((function(){a[t]=0}),(function(e){throw delete a[t],e})))}}}(),function(){var t={143:0};r.f.j=function(e,o){var a=r.o(t,e)?t[e]:void 0;if(0!==a)if(a)o.push(a[2]);else{var n=new Promise((function(r,o){a=t[e]=[r,o]}));o.push(a[2]=n);var s=r.p+r.u(e),i=new Error,u=function(o){if(r.o(t,e)&&(a=t[e],0!==a&&(t[e]=void 0),a)){var n=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;i.message="Loading chunk "+e+" failed.\n("+n+": "+s+")",i.name="ChunkLoadError",i.type=n,i.request=s,a[1](i)}};r.l(s,u,"chunk-"+e,e)}},r.O.j=function(e){return 0===t[e]};var e=function(e,o){var a,n,s=o[0],i=o[1],u=o[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(a in i)r.o(i,a)&&(r.m[a]=i[a]);if(u)var l=u(r)}for(e&&e(o);c<s.length;c++)n=s[c],r.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return r.O(l)},o=self["webpackChunkadmin"]=self["webpackChunkadmin"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=r.O(void 0,[998],(function(){return r(7079)}));o=r.O(o)})();
//# sourceMappingURL=app.8fc986f8.js.map