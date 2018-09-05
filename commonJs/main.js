var myModule = require('./myModule.js');
var myModuleInstance = new myModule();
console.log("====>",myModuleInstance.hello()); // 'hello!' 
console.log("====>",myModuleInstance.goodbye()); // 'goodbye!'
