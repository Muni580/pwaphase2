var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query)
{
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
// if(!idb in window)
// {
//   alert("Browser is not supported");
// }
var open=idb.open("Store Data",1);
console.log("IndexedDB created");
open.onupgradeneeded=function(event){
var request=event.target.result;
var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error)
{
  console.log("object store is not created",+error);
}
open.onsuccess=function(event){
request=event.target.result;
var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");
var info=storeDB.get(paramValue);
info.onsuccess=function(data)
{
  console.log(data.target.result);
  display(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data){
  console.log("gdg");
  var image=document.createElement("img");
  image.src="images/muni.svg";
  left.append(image);
  var h3=document.createElement("h2");
  h3.textContent=data.name;
  left.append(h3);
  var email=document.createElement("h2");
  email.textContent=data.email;
  right.append(email);

  var roll=document.createElement("h2");
  roll.textContent=data.roll;
  right.append(roll);
  var mobile=document.createElement("h2");
  mobile.textContent=data.mobile;
  right.append(mobile);



var cr0=document.createElement("h3");
  cr0.textContent="Career DETAILS";
  right.append(cr0);
  var cr=document.createElement("h4");
  cr.textContent=data.career;
  right.append(cr);
  var cr1=document.createElement("h3");
  cr1.textContent="Education Details:";
  right.append(cr1);

  var table=document.createElement("table");
  let row=' ';
  row+="<tr>"+"<th>"+"college"+"</th>"+"<th>"+"branch"
  +"</th>"+"<th>"+"degree"
  +"</th>"+"<th>"+"marks"
  +"</th>"+"</td>"
for (i in data.education) {
    row += "<tr>"+"<td>"+data.education[i].college+"</td>"+
"<td>"+data.education[i].branch+"</td>"
    +"<td>"+data.education[i].degree+"</td>"
     +"<td>"+data.education[i].marks+"</td>" +
    "</tr>";
  }
  table.innerHTML=row;
   right.appendChild(table);



var skills1=document.createElement("h3");
skills1.textContent="skills:";
right.append(skills1);

var skills=document.createElement("h3");
skills.textContent=data.skills;
right.append(skills);
}
