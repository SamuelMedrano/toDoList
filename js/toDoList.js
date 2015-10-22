
//D3EFFF 86D4FF 69787F 13597F A8BFCC 
	var toDoItem = [];
	var liArray = [];
	var list  = document.getElementById("demo");
	var index;
	var txt;
	var i;
	var j;

list.addEventListener('click', function (evt) {
	var target = evt.target;
	var targetClass = target.getAttribute('class');
	switch(targetClass){
		case 'editBtn':
		editLi(target);
		break;
		case 'delBtn':
		deleteLi(target);
        break;
        case 'subBtn':
        subLi(target);
        break;
        case 'selectedCln':
        checked(target);
        break;
	}
});

function keyCode(event) {
    var x = event.keyCode;
    if (x == 13) {  
        createItem();
    }
}
function createItem(){
	var x = document.getElementById("newItem").value.trim();
	console.log(x);
	if(x!=""){
	toDoItem.push(x);
	var demo = document.getElementById("demo");
	var itm = document.getElementById("checkboxClone");
	var cln = itm.cloneNode(true);
	var lbl = document.getElementById("labelClone")
	var innrCln = lbl.cloneNode(true);
	var entry = document.createElement('li');
	var input = document.createElement("input");
	var edit = document.createElement("BUTTON");
	var deleteBtn = document.createElement("BUTTON");
	edit.textContent = "Edit";
	edit.setAttribute("class","editBtn");
	deleteBtn.textContent = "Delete";
	deleteBtn.setAttribute("class","delBtn");
	input.type="checkbox";
	input.setAttribute("class", "selectedCln");
	var numberLi = document.querySelectorAll('#demo li').length;
	entry.setAttribute("class", "");
	entry.setAttribute("value",numberLi);
	var t = document.createTextNode(x);
	liArray.push(entry);
	var b = document.querySelector("li"); 
	b.setAttribute("class", "");
	demo.appendChild(entry);
	entry.appendChild(cln);
	cln.appendChild(innrCln);
	cln.appendChild(edit);
	cln.appendChild(deleteBtn);
	innrCln.appendChild(input);
	innrCln.appendChild(t);	
	document.getElementById("newItem").value="";
    index = liArray.length;
    console.log(toDoItem);
	console.log(liArray);
	}else{
		alert("Please input something.");
	}
}
function deleteSelected(){

	 var child = document.getElementsByClassName("Checked");
		while(child[0]){
			child[0].parentNode.removeChild(child[0]);
		}
	for(i = liArray.length -1 ; i>=0; i--){
		if(liArray[i]=== undefined){
			toDoItem.splice(i,1);
			liArray.splice(i,1);
		}
	}
	updateLi();
}
function deleteItems(){
	document.getElementById("demo").innerHTML="";
	liArray = [];
	toDoItem = [];
	updateLi();
}
function checkItems(){
	for (i=0; i<liArray.length; i++){
		var x = document.getElementsByClassName("selectedCln")[i];
		if(x.checked){
			liArray[i].setAttribute("class","Checked");
			delete liArray[i];
		}else{
			liArray[i].setAttribute("class","");
		}
	}
	deleteSelected();
}
function clearThis(target){
	target.value="";
}
function editLi(item){
	var li = item.parentElement.parentElement;
	txt = li.childNodes[0].childNodes[0].textContent;
	var input = li.childNodes[0].childNodes[0].childNodes[0]
	input.setAttribute("disabled", "");
	li.childNodes[0].childNodes[0].childNodes[1].textContent="";
	var textfield = document.createElement("input");
	var label = li.childNodes[0].childNodes[0].childNodes[1];
	var editButton =li.childNodes[0].childNodes[1];
	var delButton = li.childNodes[0].childNodes[2];
	var submitButton = document.createElement("BUTTON");
	submitButton.setAttribute("class", "subBtn");
	submitButton.textContent= "Submit";
	textfield.textContent = txt;
    li.childNodes[0].appendChild(textfield);
    textfield.value= txt;
    li.childNodes[0].appendChild(editButton);
    li.childNodes[0].appendChild(submitButton);
    li.childNodes[0].appendChild(delButton);
	li.childNodes[0].replaceChild(textfield, editButton);

}
function subLi(item){

	var ul = document.getElementById("demo");
	var li = item.parentElement.parentElement;
	var t = li.childNodes[0].childNodes[1].value.trim();
	var label = li.childNodes[0].childNodes[0].childNodes[1];
	var edit = document.createElement("BUTTON");
    var deleteBtn = document.createElement("BUTTON");
    var input = li.childNodes[0].childNodes[0].childNodes[0];
    input.removeAttribute('disabled');
    if(t == ""){
    	t=li.childNodes[0].childNodes[1].textContent;
    }
	edit.textContent = "Edit";
	edit.setAttribute("class","editBtn");
    deleteBtn.textContent = "Delete";
	deleteBtn.setAttribute("class","delBtn");
	label.textContent = t;
	li.childNodes[0].removeChild(li.childNodes[0].childNodes[1]);
	li.childNodes[0].removeChild(li.childNodes[0].childNodes[2]);
	li.childNodes[0].removeChild(li.childNodes[0].childNodes[1]);
	li.childNodes[0].appendChild(edit);
	li.childNodes[0].appendChild(deleteBtn);
	var value = li.getAttribute("value");
	toDoItem.splice(value,1,t);
	console.log(toDoItem);
	updateLi();
}
function deleteLi(item){
	 if (confirm('Do you want to delete this?')) {
	var ul = document.getElementById("demo");
	var value = item.parentElement.parentElement.getAttribute("value");
	ul.removeChild(ul.childNodes[value]);
	liArray.splice(value,1);
	toDoItem.splice(value,1);
	updateLi();
	}
}
function updateLi(){
	for(i=0; i<liArray.length; i++){
		liArray[i].setAttribute("value",i);
	}
}
function checked(item){
	var li = item.parentElement.parentElement.parentElement;
	var editbttn = item.parentElement.parentElement.childNodes[1];
	console.log(editbttn);
	if(item.checked == true){
	 	li.setAttribute("class", "Checked");
	 	editbttn.setAttribute("class", "Hidden");
	}else{
		li.setAttribute("class", "");
		editbttn.setAttribute("class", "");
	 }
}