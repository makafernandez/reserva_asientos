/* Declarar un arreglo que representa la disponibilidad de asientos
   disponible === false    ocupado === true */

var airlineSeats = [
	false, 
	false, 
	false, 
	false, 
	false, 
	false, 
	false, 
	false, 
	false, 
	false
];

//Contador que ayudará a rastrear la cantidad de asientos ocupados

var busySeats = 0;

var paintSeats = function(array) {
	var containerSeats = document.getElementById('seats');
  
  	for (var i = 0; i < array.length; i++) {
 		var seat = document.createElement('div');
		seat.className = 'seats';
		
		//del 1er a 4to elemento en el arreglo, serán primera clase, que sería del index 0 al 3.
		if (i < 4) {
			seat.style.background = 'darkturquoise';
		} else {
			seat.style.background = 'palevioletred';
		}
		containerSeats.appendChild(seat);
	}
};

var reserve = function() {
	var btn = document.getElementById('btn');
	btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
	var choice = prompt(
		'¿En qué zona prefieres reservar? \n 1. Primera Clase \n 2. Calse Económica \n \n Por favor ingresa el número correspondiente'
	);
	if (choice == 1) {
		checkFirstClassZone();
	}
	else if (choice == 2) {
		checkEconomicZone();
	} else {
		alert('Por favor ingresa un número válido');
	}
};

var checkFirstClassZone = function() {
	var zone = 'Primera Clase';
	//recorre del elemento 0 al 3 y verifica cuales están disponibles:
	for (var index = 0; index < 4; index++) {
		if(airlineSeats[index] === false) {
			airlineSeats[index] = true;
			reserveSeat(index);
			printTicket(index, zone);
			//al reservar un asiento no necesitamos seguir recorriendo el array, rompemos el for con break
			break;
		} else if (index === 3 && airlineSeats[index] === true) {
			reasignEconomicZone(zone);
		}
	}
};

var checkEconomicZone = function() {
	var zone = 'Economic';
	//recorre del elemento 4 al 9 y verifica cuales están disponibles:
	for (var index = 4; index < 10; index++) {
		if (airlineSeats[index] === false) {
			airlineSeats[index] = true;
			reserveSeat(index);
			printTicket(index, zone);
			//al reservar un asiento no necesitamos seguir recorriendo el array, rompemos el for con break
			break;
		} else if (index === 9 && airlineSeats[index] === true) {
			reasignFirstClassZone(zone);
		}
	}
};

var reserveSeat = function(indexToPaint) {
	var seat = document.getElementsByClassName('seats');
	seat[indexToPaint].textContent = 'Ocupado';
};


var reasignEconomicZone = function(zone) {
	var reasign = confirm (
	'Ya no quedan asientos disponibles en '+ zone +' :( \n ¿Quieres reservar en clase Económica?'
	);
	
	if (reasign === true) {
		checkEconomicZone();
	} else {
		nextFlight();
	}
};

var reasignFirstClassZone = function(zone) {
	var reasign = confirm (
	'Ya no quedan asientos disponibles en '+ zone +' :( \n ¿Quieres reservar en Primera Clase?'
	);
	
	if (reasign === true) {
		checkFirstClassZone();
	} else {
		nextFlight();
	}
};

var printTicket = function(index, zone) {
	var containerTickets = document.getElementById('ticket');
	var ticket = document.createElement('div');
	ticket.className = 'board';
	var title = document.createElement('p');
	var reservedSeat = document.createElement('p');
	var zoneClass = document.createElement('p');
	title.textContent = 'Tarjeta de Embarque';
	reservedSeat.textContent = 'Asiento: #'+ (index + 1);
	zoneClass.textContent = zone;
	ticket.appendChild(title);
	ticket.appendChild(reservedSeat);
	ticket.appendChild(zoneClass);
	containerTickets.appendChild(ticket);
};

var nextFlight = function() {
	alert('Nuestro próximo vuelo sale en 3 horas');
};

paintSeats(airlineSeats);
reserve();