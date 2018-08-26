"use strict";angular.module("angularSails.io",[]).constant("$$sailsConnectionMetaData",{version:"__sails_io_sdk_version",platform:"__sails_io_sdk_platform",language:"__sails_io_sdk_language"}).constant("$$sailsSDKParams",{version:"0.10.0",platform:"undefined"==typeof module?"browser":"node",language:"javascript",flavor:"angular"}).factory("$$sailsSDKInfo",["$$sailsConnectionMetaData","$$sailsSDKParams",function(e,t){return{getVersionString:function(){return e.version+"="+t.version+"&"+e.platform+"="+t.platform+"&"+e.language+"="+t.language}}}]).factory("SocketIo",["$window",function(e){if(!e.io)throw new Error("Socket IO Not Found!");return e.io}]).provider("$sailsSocket",function(){return{$get:["$q","$timeout","SocketIo","$$sailsSDKInfo",function(e,t,o,n){var r=n.getVersionString(),s=function(e,o){return o?function(){var n=arguments;t(function(){o.apply(e,n)},0)}:angular.noop};function a(e,t){var o=t.response;delete t.response;var n=t.method;e.emit(n,t,s(e,function(e){var n=new function(e,t){angular.isString(t)&&(t=angular.fromJson(t)),this.data=t.body||{},this.headers=t.headers||{},this.status=t.statusCode||200,this.config=e}(t,e);n.status>=400?o.reject(n):o.resolve(n)}))}var i=function(e){var t=this;t._requestQueue=[],t._socketOptions=e||{},t._socket=new function(){var e={};this.socket={connected:!1},this.on=function(t,o){return e[t]=o,this},this.become=function(t){for(var o in e)t.on(o,e[o]);return t}}};return i.prototype.connect=function(t,n){var s=e.defer(),i=this;n=n||{},t=t||i._socketOptions.baseUrl||void 0,"string"!=typeof n.query?n.query=r:n.query+="&"+r;var u=o.connect(t,n);return i._socket=i._socket.become(u),i._socket.on("connect",function(){angular.forEach(i._requestQueue,function(e,t){a(i._socket,e)})}),i._socket.once("connect",s.resolve),i._socket.on("connecting",s.notify),i._socket.once("connect_failed",s.reject),s.promise},i.prototype.isConnected=function(){return this._socket.connected},i.prototype.get=function(e,t){return this._request({method:"get",url:e,data:t})},i.prototype.post=function(e,t){return this._request({method:"post",url:e,data:t})},i.prototype.delete=function(e,t){return this._request({method:"delete",url:e,data:t})},i.prototype._request=function(t){var o=e.defer(),n="Usage:\n socket."+(t.method||"request")+"( destinationURL, [dataToSend] )";if((t=t||{}).data=t.data||{},t.headers=t.headers||{},t.url=t.url.replace(/^(.+)\/*\s*$/,"$1"),"string"!=typeof t.url)throw new Error("Invalid or missing URL!\n"+n);var r=this,s={method:t.method,data:t.data,url:t.url,headers:t.headers,response:o};return o.promise.success=function(e){return o.promise.then(function(t){e(t.data,t.statusCode,t.headers,s)}),o.promise},o.promise.error=function(e){return o.promise.then(null,function(t){e(t.data,t.statusCode,t.headers,s)}),o.promise},r._socket&&r.isConnected()?a(r._socket,s):r._requestQueue.push(s),o.promise},i.prototype.on=function(e,t){this._socket.on(e,s(this._socket,t))},function(e){return new i(e)}}]}});