export async function getData(){

let dataList = await fetch("https://restcountries.eu/rest/v2/all");
dataList = await dataList.json()
return dataList;


}
