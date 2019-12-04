!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("http-status-codes")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("passport")},function(e,t){e.exports=require("mongoose-unique-validator")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("passport-jwt")},function(e,t){e.exports=require("passport-local")},function(e,t){e.exports=require("serve-favicon")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("https")},function(e,t,n){"use strict";n.r(t);n(6);var r=n(2),o=n.n(r),s=(n(2).Router(),n(7)),a=n(3),u={login:function(e,t,n){a.authenticate("local",{session:!1},(function(n,r,o){if(n||!r)return t.status(204).json({message:o?o.message:"Login failed",user:r});e.login(r,{session:!1},(function(e){e&&t.send(e),delete r.password,delete r.username;var n=s.sign(r,"your_jwt_secret");return t.json({token:n,user:r})}))}))(e,t,n)}},i=n(0),c=n.n(i),l="mongodb://appadmin:appadmingorilla@206.189.133.87:27017/gorilla",p=(new Promise((function(e,t){console.log("test Comment"),c.a.connect(l,{useNewUrlParser:!0});var n=c.a.connection;n.on("error",(function(e){console.log(e),t(e)})),n.once("open",(function(){console.log("success"),e(c.a)}))})),n(4)),d={username:String,password:String,email:String,firstname:String,surname:String,district:String,city:String,mobilenumber:String,qualifications:Array,skills:Array},f=new c.a.Schema(d);f.plugin(p);var g=c.a.model("Seeker",f),m={status:"",payload:{}};function h(){this.status="ok",this.payload={}}function y(){this.status="error",this.payload={}}h.prototype=m,h.prototype=m;var S=function(e){var t=new h;return e&&(t.payload=e),t},v=function(e){var t=new y;return t.payload=e||"System Error",t},x=n(1),b=n.n(x),w={getSeeker:function(e,t){g.findOne({_id:e.params.id}).exec().then((function(e){t.status(200).send(S(e))})).catch((function(e){t.status(b.a.BAD_REQUEST).send(v())}))},addSeeker:function(e,t){new g(e.body).save().then((function(e){t.status(b.a.OK).send(S())})).catch((function(e){console.log(e),t.status(b.a.BAD_REQUEST).send(v())}))}},k=n(4),j={name:{type:String},username:{type:String,index:!0,unique:!0},email:{type:String,unique:!0},password:String},q=new c.a.Schema(j);q.plugin(k);var _=c.a.model("AuthUser",q);var E={registerSeeker:function(e,t){new _(e.body).save().then((function(e){t.status(b.a.OK).send(S())})).catch((function(e){console.log(e),t.status(b.a.BAD_REQUEST).send(v())}))},isValueTaken:function(e,t){var n,r,o;_.countDocuments((n={},r=e.params.prop,o=e.params.value,r in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,n)).exec().then((function(n){console.log(e.params.value),t.send(S({count:n}))})).catch((function(e){console.log(e),t.status(b.a.BAD_REQUEST).send(resp_error)}))}},O={property:{type:String,index:!0,unique:!0},values:{type:Array}},T=new c.a.Schema(O),A=c.a.model("metaData",T),D={getMeta:function(e,t){A.findOne({property:e.params.property}).exec().then((function(e){t.status(200).send(S(e))})).catch((function(e){console.log(e),t.status(HttpStatus.BAD_REQUEST).send(v())}))}},P=n(3),R=n.n(P),U={company:{type:String},title:{type:String},location:{type:String},experiance:{type:String},skills:{type:Array}},B=new c.a.Schema(U),M=c.a.model("jobadd",B),Q={getJobs:function(e,t){M.find({}).exec().then((function(e){t.status(200).send(S(e))})).catch((function(e){console.log(e),t.status(HttpStatus.BAD_REQUEST).send(v())}))}},F=o.a.Router(),H=[{method:"post",auth:!1,path:"/login",controller:u.login},{method:"get",path:"/seeker/:id",auth:!1,controller:w.getSeeker},{method:"get",auth:!1,path:"/exist/seeker/:prop/:value",controller:E.isValueTaken},{method:"post",auth:!0,path:"/seeker",controller:w.addSeeker},{method:"post",auth:!1,path:"/register",controller:E.registerSeeker},{method:"get",auth:!1,path:"/meta/:property",controller:D.getMeta},{method:"get",auth:!1,path:"/jobadds",controller:Q.getJobs}];F.use("/",(function(e,t,n){n()}));var J=R.a.authenticate("jwt",{session:!1});H.forEach((function(e){e.auth&&F[e.method](e.path,J,e.controller),F[e.method](e.path,e.controller)}));var K=F,N=n(5),C=n.n(N),V=n(3),z=n(8),I=z.ExtractJwt,L=n(9).Strategy,G=z.Strategy;V.use(new L({usernameField:"username",passwordField:"password"},(function(e,t,n){return _.findOne({username:e,password:t}).then((function(e){return e?n(null,e.toJSON(),{message:"Logged In Successfully"}):n(null,!1,{message:"Incorrect email or password."})})).catch((function(e){return n(e)}))}))),V.use(new G({jwtFromRequest:I.fromAuthHeaderAsBearerToken(),secretOrKey:"your_jwt_secret"},(function(e,t){return t(null,e)})));n(10);var W=n(11),X=(n(12),n(13)),Y={key:W.readFileSync("./src/keys/server.key","utf8"),cert:W.readFileSync("./src/keys/server.cert","utf8")},Z=o()();console.log("process.env.NODE_ENV : production"),Z.get("*.js",(function(e,t,n){e.url=e.url+".gz",t.set("Content-Encoding","gzip"),t.set("Content-Type","text/javascript"),n()})),Z.use(C.a.json()),Z.disable("etag"),Z.use("/api",K),Z.use("/health",(function(e,t){t.send({status:"OK"})})),X.createServer(Y,Z).listen(443),console.log("HTTPS Server listening on %s:%s","HOST",443)}]);