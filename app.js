

data = [{
	check : [],
	uncheck : [],
	naziv : '',
}];

var brojac = 0;
var disable = 0;

var add = 0;
var finish = 0;
var itemBr = 0;
var privremeno = -1;
var string = '';

if(JSON.parse(localStorage.getItem('checkLista')) != null){
	data = JSON.parse(localStorage.getItem('checkLista'));
	// console.log(data);
}

// console.log(data);

 function dataUpdate(){
	localStorage.setItem('checkLista', JSON.stringify(data));
	data = JSON.parse(localStorage.getItem('checkLista'));
	// console.log(data);
}


function load(){
	var page = document.getElementById('page');
	let i = 0;

	while(data[i]){

		var div = document.createElement('div');
		div.setAttribute('class', 'item');
		div.innerText = data[i].naziv;

		var btn = document.createElement('button');
		btn.setAttribute('id', 'delete-item');

		var tac = document.createElement('div');
		tac.setAttribute('id', 'touch');

		var div2 = document.createElement('div');
		div2.setAttribute('class', 'progres');

		div.appendChild(tac);
		div.appendChild(btn);
		div.appendChild(div2);

		page.append(div);
		// console.log(div);

		btn.addEventListener("click", removeDiv);
		tac.addEventListener("click", openDiv);

		i++;
	}
}

load();

function showtime(k){
	if(k<10){
		k = "0"+k;
		return k;
	}
	else{
		return k;
	}
}

function updateTime(){
	var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds();
    // console.log(date);

   	h = showtime(h);
   	m = showtime(m);
   	s = showtime(s); 

    document.getElementById('vreme').innerText = h+ ":"+ m+ ":"+s;

    setTimeout(function(){updateTime();},1000);
}

function whichWeek(k){
	if(k == 0){
		return 'sunday';
	}
	else if(k == 1){
		return 'monday';
	}
	else if(k == 2){
		return 'tuesday';
	}
	else if(k == 3){
		return 'wednesday';
	}
	else if(k == 4){
		return 'thursday';
	}
	else if(k == 5){
		return 'friday';
	}
	else if(k == 6){
		return 'saturday';
	}
}

function updateDay(){
	var date = new Date();
	// console.log(date);
	var week = date.getDay();
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();

	day = showtime(day);
	month = showtime(month+1);

	week = whichWeek(week);
	// console.log(week);

	// console.log(day);
	// console.log(month);
	// console.log(year);

	document.getElementById('datum').innerText = day+ "." +month+ "." +year;
	document.getElementById('dan').innerText = week;



	setTimeout(function(){updateDay()},60000);
}

function addDiv(k){
	if(k == 'flex'){
		disable = 1;		
	}

	var div = document.getElementById('all');

	div.style.display = k;
}

function checkItem(){
	var item = this.style.backgroundColor;
	// console.log(this.style.backgroundColor);
	if(item === 'white'){
		this.style.backgroundColor = 'black';
	}
	else{
		this.style.backgroundColor = 'white';
	}
}

function removeDiv(){
	// console.log(this.parentNode.innerText);
	let i = 0;
	while(data[i]){
		if(data[i].naziv == this.parentNode.innerText){
			data.splice(i,1);
			break;
		}
		i++;
	}
	dataUpdate();
	// console.log(data);
	this.parentNode.remove();
	// console.log('111111');
}

function openDiv(){												// Opening front div
	if(disable){
		return;
	}
	itemBr = 1;

	let br = 0;
	// console.log(data[br]);
	while(data[br].naziv != this.parentNode.innerText){
		// console.log(data[br]);
		br++;
	}
	privremeno = br;
	this.parentNode.remove();
	document.getElementById('text-add').value = data[br].naziv;

	let i = 0;
	if(data[br].check[0] == '') i = 1;
	while(data[br].check[i]){
		addNewTask();
		document.getElementById('text-item').value = data[br].check[i];
		document.getElementById('check').style.backgroundColor = 'black';
		i++;
	}

	let j = 0;
	if(data[br].uncheck[0] == '') j = 1;
	while(data[br].uncheck[j]){
		addNewTask();
		document.getElementById('text-item').value = data[br].uncheck[j];
		j++;
	}

	addDiv('flex');
}

function proveraCancle(){
	disable = 0;
	if(itemBr == 0){
		addDiv('none');
	}
	else{
		let k = 'text-add';
		var page = document.getElementById('page');

	var value = document.getElementById(k).value;
	var empty = isEmpty(value);
	if(empty){
		finish = 1;

		addDiv('none');
		// console.log(value);
		var div = document.createElement('div');
		div.setAttribute('class', 'item');
		div.innerText = value;

		var btn = document.createElement('button');
		btn.setAttribute('id', 'delete-item');

		var tac = document.createElement('div');
		tac.setAttribute('id', 'touch');

		var div2 = document.createElement('div');
		div2.setAttribute('class', 'progres');

		div.appendChild(tac);
		div.appendChild(btn);
		div.appendChild(div2);

		page.append(div);
		// console.log(div);

		btn.addEventListener("click", removeDiv);
		tac.addEventListener("click", openDiv);
		document.getElementById(k).classList.remove('error');
		document.getElementById(k).placeholder = 'Add';

		
		var divText = document.getElementById('text-add').value;
		document.getElementById(k).value = '';
		dataUpdate();
	}
	else{
		document.getElementById(k).placeholder = 'This is emtpy!'; 
		document.getElementById(k).classList.add('error'); 
	}



		data[privremeno] = {check : [],
			uncheck : [],
			naziv : '',};
			data[privremeno].naziv = divText;
			
		addToData(privremeno);
		while(document.getElementById('check-text')){
			var item = document.getElementById('check-text');
			item.remove();
		}
		addDiv('none');
	}
	dataUpdate();
}

function proveraItema(){
	disable = 0;
	if(itemBr == 0){

		addItemToFront('text-add');	
		dataUpdate();
	}
	else{
		let k = 'text-add';
		var page = document.getElementById('page');

	var value = document.getElementById(k).value;
	var empty = isEmpty(value);
	if(empty){
		finish = 1;

		addDiv('none');
		// console.log(value);
		var div = document.createElement('div');
		div.setAttribute('class', 'item');
		div.innerText = value;

		var btn = document.createElement('button');
		btn.setAttribute('id', 'delete-item');

		var tac = document.createElement('div');
		tac.setAttribute('id', 'touch');

		var div2 = document.createElement('div');
		div2.setAttribute('class', 'progres');

		div.appendChild(tac);
		div.appendChild(btn);
		div.appendChild(div2);

		page.append(div);
		// console.log(div);

		btn.addEventListener("click", removeDiv);
		tac.addEventListener("click", openDiv);
		document.getElementById(k).classList.remove('error');
		document.getElementById(k).placeholder = 'Add';

		// console.log(privremeno);
		var divText = document.getElementById('text-add').value;
		// console.log(data);

		document.getElementById(k).value = '';
	}
	else{
		document.getElementById(k).placeholder = 'This is emtpy!'; 
		document.getElementById(k).classList.add('error');
		dataUpdate(); 
	}



		data[privremeno] = {check : [],
			uncheck : [],
			naziv : '',};
			data[privremeno].naziv = divText;
			
		addToData(privremeno);
		while(document.getElementById('check-text')){
			var item = document.getElementById('check-text');
			item.remove();
		}
		addDiv('none');
	}
	dataUpdate();
	// console.log(data);
}

function addNewTask(){
	var cont = document.getElementById('cont');

	var div = document.createElement('div');
	div.setAttribute('class', 'check-text');
	div.setAttribute('id', 'check-text');

	var check = document.createElement('div');
	check.setAttribute('class', 'check');
	check.setAttribute('id', 'check');
	check.style.backgroundColor = 'white';

	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('class', 'text-item');
	input.setAttribute('id', 'text-item');
	input.setAttribute('placeholder', 'text');

	var del = document.createElement('div');
	del.setAttribute('class', 'delete');

	div.appendChild(check);
	div.appendChild(input);
	div.appendChild(del);

	// console.log(cont);

	cont.prepend(div);	

	document.getElementById('text-item').addEventListener("keyup", function(event) {
  	if (event.keyCode === 13) {
  	var p = isEmpty(this.value);
  	if(p)
    addNewTask();
  	}
	});

	document.getElementById('text-item').focus();
	document.getElementById('text-item').select();

	var check = document.getElementById('check');
	check.addEventListener("click", checkItem);

	del.addEventListener("click", removeDiv);
}

function isEmpty(v){
	let br = 0;
	for(let i=0; i<v.length; i++){
		if(v[i] == ' ') br++;
	}
	if(br == v.length){
		return false;
	}
	else return true;
}

function addPro(){
	add = 1;
	itemBr = 0;
}

function addToData(n){
	while(document.getElementById('check-text')){
		var item = document.getElementById('check-text');
		var text = document.getElementById('text-item').value;
		// console.log(text.value);
		if(item.firstChild.style.backgroundColor == 'white'){
			data[n].uncheck.push(text);
		}
		else if(item.firstChild.style.backgroundColor == 'black'){
			data[n].check.push(text);
		}
		item.remove();
	}
}

function addItemToFront(k){
	var page = document.getElementById('page');

	var value = document.getElementById(k).value;

	var empty = isEmpty(value);
	if(empty){
		finish = 1;
		if(add == 1){
			let i = 0;
			while(data[i]){
				i++;
			}
			data[i] = {check : [],
			uncheck : [],
			naziv : '',};
			data[i].naziv = value;

			addToData(i);
			// console.log(data);

			finish = 0;
			add = 0;
			// console.log(brojac);
		}
		addDiv('none');
		// console.log(value);
		var div = document.createElement('div');
		div.setAttribute('class', 'item');
		div.innerText = value;

		var btn = document.createElement('button');
		btn.setAttribute('id', 'delete-item');

		var tac = document.createElement('div');
		tac.setAttribute('id', 'touch');

		var div2 = document.createElement('div');
		div2.setAttribute('class', 'progres');

		div.appendChild(tac);
		div.appendChild(btn);
		div.appendChild(div2);

		page.append(div);
		// console.log(div);

		btn.addEventListener("click", removeDiv);
		tac.addEventListener("click", openDiv);
		document.getElementById(k).classList.remove('error');
		document.getElementById(k).placeholder = 'Add';

		

		document.getElementById(k).value = '';
	}
	else{
		document.getElementById(k).placeholder = 'This is emtpy!'; 
		document.getElementById(k).classList.add('error'); 
	}
	dataUpdate();
	// console.log(data);
}



updateTime();

updateDay();