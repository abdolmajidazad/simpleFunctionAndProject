
//https://www.sitepoint.com/jquery-document-ready-plain-javascript/
if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

function callback(){
	
	console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
	// let option = new Option("Text1111", "value11111", true, true);
// setTimeout(function(){
  console.log("document.getElementById('email')", document.getElementById('EMail-id'))
// },3000)


// document.getElementById('select1').add(option);
// console.log("option", option)



let form = document.forms



var tt={}

// let formData
function GEEKFORGEEKS()                                    
{ 
  console.log("document.getElementById('email')", document.getElementById('EMail-id'))
  // event.preventDefault()
   let formElements = form.RegFormId.elements;
  // console.log(form,form.RegForm,form.RegFormId)
   Array.from(formElements).forEach(input=>{

    // console.log(input , input.value, input.name)
     if(input.name === 'multiple'){
        let selected = Array.from(input.options)
          .filter(option => option.selected)
          .map(option => option.value);
       
       
       

        // alert(selected); // blues,rock
     }else if(input.name ==='myfile'){
              // console.log("files", input.files)
     }else if(input.name ==='genderS'){
       console.log("genderS", input.checked)
       
       if(input.checked){
         tt[input.name] = input.value
       }
     }
  })
  
    // var name = document.forms["RegForm"]["Name"];               
    // var email = document.forms["RegForm"]["EMail"];    
    // var phone = document.forms["RegForm"]["Telephone"];  
    // var what =  document.forms["RegForm"]["Subject"];  
    // var password = document.forms["RegForm"]["Password"];  
    // var address = document.forms["RegForm"]["Address"];  
   
//     if (name.value == "")                                  
//     { 
//         window.alert("Please enter your name."); 
//         name.focus(); 
//         return false; 
//     } 
   
//     if (address.value == "")                               
//     { 
//         window.alert("Please enter your address."); 
//         name.focus(); 
//         return false; 
//     } 
       
//     if (email.value == "")                                   
//     { 
//         window.alert("Please enter a valid e-mail address."); 
//         email.focus(); 
//         return false; 
//     } 
   
//     if (email.value.indexOf("@", 0) < 0)                 
//     { 
//         window.alert("Please enter a valid e-mail address."); 
//         email.focus(); 
//         return false; 
//     } 
   
//     if (email.value.indexOf(".", 0) < 0)                 
//     { 
//         window.alert("Please enter a valid e-mail address."); 
//         email.focus(); 
//         return false; 
//     } 
   
//     if (phone.value == "")                           
//     { 
//         window.alert("Please enter your telephone number."); 
//         phone.focus(); 
//         return false; 
//     } 
   
//     if (password.value == "")                        
//     { 
//         window.alert("Please enter your password"); 
//         password.focus(); 
//         return false; 
//     } 
   
//     if (what.selectedIndex < 1)                  
//     { 
//         alert("Please enter your course."); 
//         what.focus(); 
//         return false; 
//     } 
   console.log("tt:", tt)
    return false; 
}



document.getElementById('EMail-id').addEventListener('input', function (evt) {
   console.log("this.value", this)
   console.log("evt", evt)

});
};
