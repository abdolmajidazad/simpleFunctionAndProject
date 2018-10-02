//
// module.exports =  function validateAMA(){
// 	const checkName = checkNameFunc();
// 	return function(){
//
// 	}
// }
// function checkNameFunc(){
// 	return 'name is valide'
// }
// exports.printMsg = function() {
//
//
// 	  console.log("This is a message from the demo package");
// }

(function(){
	const variA = 'salam';
	const variB = (data)=>{
		return data && data.length || 0;

	};

	function majidAzadFunc() {
		const majidAzad = {};
        majidAzad.variA = variA;
        majidAzad.variB = variB;
        console.log("**", majidAzad)
        return majidAzad
    }

    module.exports = majidAzadFunc()
}.call(this));


