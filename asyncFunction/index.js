function pr1(time){

return new Promise((resolve, reject)=>{

	setTimeout(()=>{ resolve(time)}, time)

});

}



function pr2(time){


return new Promise((resolve, reject)=>{

setTimeout(()=>{

reject(new Error(time))

}, time)

})
}




async function testAsyncPromiseAll(){

	try{
		let result = await Promise.all([pr1(1000), pr2(2000), pr1(2000)]);
		console.log(result);
		document.write(result);
		return result;
	}catch(e){
		document.write(e);
		return e;
	}
}


testAsyncPromiseAll().then(resp=> console.log("resp::", resp)).catch(error=>console.log("error::", error))




async function testAsync(time=1000){


	try{
		let a = await pr1(time);
		let b = await pr1(a+1000)

		throw new Error('error in try')
		return b
	}catch(e){
		//console.log("error try catch testAsync::", e)
		return e
	
	}

}


testAsync(100).then(resp=>console.log("resp testAsync ::", resp)).catch(error=>console.log("error testAsync::", error))


async function testAsyncLets(){
	let a = await pr1(100);
	let b = await pr1(100);
	let c = await pr1(1000);



	return a*b*c

}


testAsyncLets().then(resp=>console.log("resp testAsyncLets::", resp))





async function testAsyncP(){

	try{
		const result = await Promise.all([pr1(100), pr1(1000),pr1(600)]);
		return result.reduce((item,current)=>item+current,233333)
	}catch(e){

		return e
	
	}
}



testAsyncP().then(resp=>console.log("resp testAsyncP::", resp)).catch(error=>console.log("error testAsyncP::", error))
