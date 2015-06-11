//Space Corp - An incremental space game made in javascript
//GPL v2.0 license https://www.gnu.org/licenses/gpl-2.0.txt
//Author: Stephen Hanson 2015-05-21

//0: money 1: science 2-n: Materials 
var resources = [0,0,0,0,0,0];
var log = ["","","","","","","","","",""];
var tick = 0;
//determines the current navmenu so only existing html elements will be updated
//0:ship 1:crew 2:mission 3:science 4:shop 5:help 10:nothing default
var currentMenu = 10; 

var flavor = {
	crewNames:["Harry Canyon","Anita Glascock","Buck Naked","Ben Dover","Tessa Tickle","Justine Beaver","Rufus Leaking","Kelly Lingus","Anita Softwood","Amanda B. Reckonwith","Peter Guzzinia","Eileen Dover","Pete Moss","Melanie Letters","Fanny Shining","Hilda Climb","Ruth Less","Phil Chambers","Ophelia Marbles","Johnson Long","Dick Mountenjoy","Mel Function","Godiva Headache","Denise Shaking","Jack Offerman","Ethel L. Cahall","Phil Lattio","Connie Lingus","Neal Down","Ben D. Fender","Lance Boyle","Bruce Easley","Juan Morefore DeRhode","Olga Fokyrcelf","Ava Jyna","Harry P. Ness","Janet Uppissass","Dick Smith","Marcus Absent","Annabelle Rang","Marco DeStinkshun","Anita Hanjob","Mason Jarr","Bill Overdew","Elmer Sklue","Kay Mart","Polly Dent","Claire Voyance","Lafayette S. Cadrille","Hugh G. Rection","Arch N. Emmy","Pat Fanny","Sally Mander","Rhoda Mule","Rhea Pollster","Heather N. Yonn","Helen Highwater","Frieda Slaves","Al B. Tross","Teddy Bear","Etta Booger","Robin Droppings","Pepe C. Cola","Agatha L. Outtathere","Forrest Ranger","Bertha D. Blues","Carmen Ghia","Rex Karrs","Anne Teake","Stella Constellation","Phil N. Underwear","Olin DeMotor","Lulu Anna Bitcrazy","Art Exhibit","Eli Ondefloor","Homer Sexual","Ricky T. Ladder","Rod N. Tootheecore","Hammond Eggs","Shirley U. Jest","Anna Septic","Cass Trate","George Washington Sleptier","Hope Ferterbest","Tanya Hyde","Pat Pending","Frank Furter","Frank N. Beans","Dinah Might","Mandy Lifeboats","Allen Rench","Sharon Sharalike","Lotta Zits","Rob A. Bank","Morgan U. Canhandle","Hedda A. Borshun","Joy Anna DeLight","Pat McGroin","Jimmy DeLocke","Laura Norder","Kurt Remarque","May K. Fist","Darryl Likt","Taylor Maid","Perry Mecium","Roger Overandout","Frank N. Sense","Will U. Shuddup","Buddy System","Milton Yermouth"],
	playerShips:["\n\n\n\n \\____\n~=|__o)\n /",
				 "\n\n __\n | \\_\n=[_|_)--._____\n=[,--,-------' \n[|_/\"'  ",
				 "\n[=====>\n[  (    _____\n \\__\\,-'//   `--._\n  [_/ ||,-----._  \\\\___\n  [_) |||  ()()   ~[___>\n  [_\\_||`-----'   //\n /  /'-.\\\\___,--'===(-\n[  (\n[=====>",
				 "\n\n _..._________________          ,\n(\ [ ===----====--|__|) ___..--\"_`--.._____\n `&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;| |\"\"` [_\"\"_-___________\"_/\n                | |   /..../`'-._.-'`\n            ____| |__/::..'_\n            |\ \".`\"` '_____\/\/\\\n            `\"'-.   \"\"\"\"\"  \\/\n                 &#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;&#175;",
				 "              /---------\\\n             |.---------,|\n|-^~--,      |'---------'|      _-'----',--#\n=~~--. |---/=|___________|=\\-~-|~~~~~~~~~|\n=____||| |[| |@@@+-+|@-@@| |-|#|==- ._--,|]-\n=~~~~||| |[| |@@@+-+|@-@@| |-|#|    '~=='|]-\n=__--' |---\\=|~~~~~~~~~~~|=/-~-|_________|\n|__,--'      |,---------,|    -=\\       /\n              \\_________/        \\_____/==:=--"],
				//Space
	enemyShips:["*         \n*                                            * \n\n*                         \n\n\n*   \n*                                  \n\n*                                                *     ",
				//explosion small
				"\n\n.-.       \n.(      )/   \n( ,  .  .  \\  \n( ;  (.   \   ) \n/:  _ .      . \n(  .   )  )\\  \n.._  . -   ",
				//Enemy small fighter
				"\n\n\n__  \n/_|  \n.'----().__]=\n',----,-.__]=\n\\_|  ",
				//Flying Saucer
				"\n\n|         \n.-\"^\"-.      \n/_....._\     \n.-\"`         `\"-. \n(  ooo  ooo  ooo  )\n'-.,_________,.-' ",
				"*  \n*                                          \n    .-''-'-.      \n  ,':::<_,-.`.    \n*             /):::,--,_>\\_\\   \n|::::(      \\_:|  \n|:::::`-.    /:|  \n \\`-.:::;  /::/   \n*                                `.(::::\\/:,'    \n    `-....-'      ",
				"Ship 4"],
	ranks:["Ensign", "LT", "CDR", "LCDR", "LTJG"]
};

//controls the current gamestate, 0:travel 1:combat 2:exploration 3:science 4:results
var gameState = 4;
//general purpose toggle that swaps every tick
var toggle = true;


var mission = {
	distance: 0,
	enemySheilds: 0,
	explorationDistance: 0,
	scienceReamining: 0,
	missionLevel: 3,
	missionType: 1
};

var playerShip = {
	weapons: 0,
	maxWeapons: 3,
	shields: 0,
	maxShields: 3,
	engines: 0,
	maxEngines: 3,
	sensors: 0,
	maxSensors: 3,
	sensorStrength: 0,
	currentBoost: 0,
	boostBonus: 1,
	maxCrew: 3,
	topSpeed: 0,
	currentCrew: 1,
	currentShields: 20,
	maxCurrentShields: 20,
	weaponDelay: 5,
	weaponStrength: 0,
	weaponTimer: 0
};

var enemyShip = {
	weaponStrength: 0,
	shield: 0,
	weaponDelay: 0,
}

function testClick(number){ //test function please ignore
	money += number;
	document.getElementById("money").innerHTML = money;
};

function writeLog() { //Outputs the current text log to the screen
	var fullLog = "";
	for (i = 0;i <= 9;i++) {
		if(i == 0){
			fullLog += "<strong><b>";
		}
		if(i == 1) {
			fullLog += "</strong></b>";
		}
		fullLog += log[i];
		if (log[i] != "") {fullLog += "<p>";}
	}
	document.getElementById("log").innerHTML = fullLog;
}

function toLog(newLog) { //adds a new log entry and moves all older log entries down
	for(i = 9;i >= 1;i--){
		log[i] = log [i-1];
	}
	log[0] = newLog;
	writeLog();
}

function combatLog(newLog, number) {
	if(number == 0) {
		document.getElementById("playerLog").innerHTML = newLog;
		document.getElementById("playerLog").className = "combatBar visible";
	}
	
	if(number == 1) {
		document.getElementById("enemyLog").innerHTML = newLog;
		document.getElementById("enemyLog").className = "combatBar visible";
	}
	
}



function saveClick() { //menubar save button
	toLog("Saved!");
}

function loadClick() { //Menubar load button
	toLog("Loaded");
}

function resetClick() { //Menubar reset button
	for(i= 0;i<resources.length;i++){
		resources[i] = 0;
	}
	farms = 0;
	farmcost = 10;
	log = ["","","","","","","","","",""];
	currentLog = 0;
	gameState = 4;
	toLog("Reset");
}

function returnBar(current, max) { //returns an ascii visualization between two numbers [||||----]
	var output = "[";
	for(i = 0;i < max;i++) {
		if(i < current) {
			output += "||";
		} else {
			output += "-";
		}
	}
	output+="]";
	return output;
}

function shipClick() { //Navbar ship button
	navSelect(0);
	var htmlOutput = "<span class=\"shipSystem\" onClick=\"systemSelect(0)\" id=\"selectWeapons\">Weapons</span>&nbsp<span id=\"barWeapons\"></span><br><br> \
					  <span class=\"shipSystem\" onClick=\"systemSelect(1)\" id=\"selectShields\">Shields</span>&nbsp<span id=\"barShields\"></span><br><br> \
					  <span class=\"shipSystem\" onClick=\"systemSelect(2)\" id=\"selectEngines\">Engines</span>&nbsp<span id=\"barEngines\"></span><br><br> \
					  <span class=\"shipSystem\" onClick=\"systemSelect(3)\" id=\"selectSensors\">Sensors</span>&nbsp<span id=\"barSensors\"></span><p> \
					  Weapon Power:<span id=\"statsWeaponPower\"></span><br> \
					  Weapon Delay:<span id=\"statsWeaponDelay\"></span><br> \
					  Current Shields:<span id=\"statsCurrentShield\"></span><br> \
					  Max Shields:<span id=\"statsMaxShield\"></span><br> \
					  Top Speed:<span id=\"statsSpeed\"></span><br> \
					  Sensor Strength:<span id=\"statsSensors\"></span><br> \
					  " ;
	
	document.getElementById("mainPanel").innerHTML = htmlOutput;
	systemSelect(playerShip.currentBoost, 1);
	document.getElementById("barWeapons").innerHTML = returnBar(playerShip.weapons, playerShip.maxWeapons);
	document.getElementById("barShields").innerHTML = returnBar(playerShip.shields, playerShip.maxShields);
	document.getElementById("barEngines").innerHTML = returnBar(playerShip.engines, playerShip.maxEngines);
	document.getElementById("barSensors").innerHTML = returnBar(playerShip.sensors, playerShip.maxSensors);
}

function crewClick() { //Navbar crew button
	navSelect(1);
	var htmlOutput = "<h3>Crew menu!</h3>";
	
	document.getElementById("mainPanel").innerHTML = htmlOutput;
}

function missionClick() { //Navbar mission button
	navSelect(2);
	var htmlOutput = "<h3>Mission menu!</h3>";
	
	document.getElementById("mainPanel").innerHTML = htmlOutput;
}

function scienceClick() { //Navbar science button
	navSelect(3);
	var htmlOutput = "Science Menu";
	document.getElementById("mainPanel").innerHTML = htmlOutput;
}

function cargoClick() { //Navbar shop button
	navSelect(4);
	var htmlOutput = "<h3>Shop menu!</h3>";
	
	document.getElementById("mainPanel").innerHTML = htmlOutput;
}

function helpClick() { //Navbar help button
	navSelect(5);
	var htmlOutput = "<h3>Welcome to Star Corp!</h3><p>Here I'll explain the basic controls of Star Corp and how to play the game, what science is, everything<p>maybe some pictures, it'll be great";
	
	document.getElementById("mainPanel").innerHTML = htmlOutput;
}

function navSelect(number) {
	currentMenu = number;
	
	document.getElementById("shipButton").style.backgroundColor = "";
	document.getElementById("crewButton").style.backgroundColor = "";
	document.getElementById("missionButton").style.backgroundColor = "";
	document.getElementById("scienceButton").style.backgroundColor = "";
	document.getElementById("cargoButton").style.backgroundColor = "";
	document.getElementById("helpButton").style.backgroundColor = "";

	
	switch (number) {
		case 0:
			document.getElementById("shipButton").style.backgroundColor = "#C0FFFF";
			break;
		case 1:
			document.getElementById("crewButton").style.backgroundColor = "#FFC0FF";
			break;
		case 2:
			document.getElementById("missionButton").style.backgroundColor = "#FFFFC0";
			break;
		case 3:
			document.getElementById("scienceButton").style.backgroundColor = "#C0FFC0";
			break;
		case 4:
			document.getElementById("cargoButton").style.backgroundColor = "#C0C0FF";
			break;
		case 5:
			document.getElementById("helpButton").style.backgroundColor = "#C0C0C0";
			break;
		default:
			toLog("navSelect broke or DevMenu");
	}
}

function addResource(resource, number){
	resources[resource] += number;
}

function devClick() {
	currentMenu = 6;
	var htmlOutput = "<h3>Dev Menu!</h3>";
	htmlOutput += 	"<p>Draw Ships</p> \
					 <span class=\"menuButton\" onClick=\"drawEnemy(0)\">EnemyShip0</span> \
					 <span class=\"menuButton\" onClick=\"drawEnemy(1)\">1</span> \
					 <span class=\"menuButton\" onClick=\"drawEnemy(2)\">2</span> \
					 <span class=\"menuButton\" onClick=\"drawEnemy(3)\">3</span> \
					 <span class=\"menuButton\" onClick=\"drawEnemy(4)\">4</span> \
					 <span class=\"menuButton\" onClick=\"drawEnemy(500)\">Undefined</span><br><br> \
					 <span class=\"menuButton\" onClick=\"drawPlayer(0)\">PlayerShip0</span> \
					 <span class=\"menuButton\" onClick=\"drawPlayer(1)\">1</span> \
					 <span class=\"menuButton\" onClick=\"drawPlayer(2)\">2</span> \
					 <span class=\"menuButton\" onClick=\"drawPlayer(3)\">3</span> \
					 <span class=\"menuButton\" onClick=\"drawPlayer(4)\">4</span> \
					 <span class=\"menuButton\" onClick=\"drawPlayer(500)\">undefined</span> \
					 <p>Add Money</p> \
					 <span class=\"menuButton\" onClick=\"addResource(0, 1000)\">$1000</span> \
					 <span class=\"menuButton\" onClick=\"addResource(1, 100)\">&#937;100</span> \
					 <p>Add Crew</p> \
					 <span class=\"menuButton\" onClick=\"addCrew(0)\">Pilot</span> \
					 <span class=\"menuButton\" onClick=\"addCrew(1)\">Science</span> \
					 <span class=\"menuButton\" onClick=\"addCrew(2)\">Security</span> \
					 <span class=\"menuButton\" onClick=\"addCrew(3)\">Navigator</span> \
					 <span class=\"menuButton\" onClick=\"addCrew(4)\">Engineer</span><p> \
					 <span class=\"menuButton\" onClick=\"combatLog('You deal 10 damage',0)\">Player 10 Damage</span> \
					 <span class=\"menuButton\" onClick=\"combatLog('Enemy deals 5 damage',1)\">Enemy 5 Damage</span>";
					 
	document.getElementById("mainPanel").innerHTML = htmlOutput;
}

function addCrew(number) {
	
	var returnString = "";
		
	switch(number) {
		case 0:
			returnString += "Pilot " 
			break;
		case 1:
			returnString += "Science " 
			break;
		case 2:
			returnString += "Security " 
			break;
		case 3:
			returnString += "Navigator " 
			break;
		case 4:
			returnString += "Engineer " 
			break;
		default:
			returnString += "NOT FOUND";
	}
	
	returnString += flavor.ranks[Math.floor(Math.random()*flavor.ranks.length)] + " ";
	returnString += flavor.crewNames[Math.floor(Math.random()*flavor.crewNames.length)];
	toLog(returnString);
}

function systemSelect(choice, quiet) { //determines which system is boosted, second variable should be 1 if you don't want it sent to log
	var logger = "";
	
	//sets the systems to the CSS
	if(currentMenu == 0) {
		document.getElementById("selectWeapons").className = "shipSystem";
		document.getElementById("selectShields").className = "shipSystem";
		document.getElementById("selectEngines").className = "shipSystem";
		document.getElementById("selectSensors").className = "shipSystem";
	};
	
	if(choice == 0) {
		document.getElementById("selectWeapons").className = "selectedSystem";
		playerShip.currentBoost = 0;
		logger = "More power to the Weapons!";
	} else if (choice == 1) {
		document.getElementById("selectShields").className = "selectedSystem";
		playerShip.currentBoost = 1;
		logger = "Divert power to the Shields! Hurry!";
	} else if (choice == 2) {
		document.getElementById("selectEngines").className = "selectedSystem";
		playerShip.currentBoost = 2;
		logger = "All power to the Engines";
	} else {
		document.getElementById("selectSensors").className = "selectedSystem";
		playerShip.currentBoost = 3;
		logger = "Sensors boosted";
	};
	if (quiet != 1) {
		toLog(logger);
	}
		

}

function statUpdate() { //recalculates the live stats of the ship
	playerShip.shields = 0; //TODO CREW BONUS
	playerShip.engines = 0;
	playerShip.sensors = 0;
	playerShip.weapons = 0;
	
	document.getElementById("money").innerHTML = resources[0];
	document.getElementById("science").innerHTML = resources[1];
	
	switch(playerShip.currentBoost) {
		
		case 0: //weapons boost
			if(playerShip.weapons + playerShip.boostBonus <= playerShip.maxWeapons) {
				playerShip.weapons = playerShip.boostBonus;
			} else {
				playerShip.weapons = playerShip.maxWeapons;
			};
			
			break;
		case 1: //shields boost
			if(playerShip.shields + playerShip.boostBonus <= playerShip.maxShields) {
				playerShip.shields = playerShip.boostBonus;
			} else {
				playerShip.shields = playerShip.maxShields;
			};
			break;
		case 2: //engines boost
			if(playerShip.engines + playerShip.boostBonus <= playerShip.maxEngines) {
				playerShip.engines = playerShip.boostBonus;
			} else {
				playerShip.engines = playerShip.maxEngines;
			};
			break;
		case 3: //sensors boost
			if(playerShip.sensors + playerShip.boostBonus <= playerShip.maxSensors) {
				playerShip.sensors = playerShip.boostBonus;
			} else {
				playerShip.sensors = playerShip.maxSensors;
			};
			break;
		default:
			toLog("problem with switch/case");
	}
	
	playerShip.weaponStrength = Math.pow(playerShip.weapons, 3);
	playerShip.weaponDelay = Math.round(Math.pow(.9,playerShip.weapons)*5);
	playerShip.maxCurrentShields = Math.pow(playerShip.shields * 10, 2);
	playerShip.topSpeed = Math.round(Math.pow(playerShip.engines * 3,3));
	playerShip.sensorStrength = Math.pow(playerShip.sensors, 3);
	
	document.getElementById("playerLog").className = "combatBar hidden shiftup";
	document.getElementById("enemyLog").className = "combatBar hidden shiftup";
	
	if(currentMenu == 0) {
		document.getElementById("barWeapons").innerHTML = returnBar(playerShip.weapons, playerShip.maxWeapons);
		document.getElementById("barShields").innerHTML = returnBar(playerShip.shields, playerShip.maxShields);
		document.getElementById("barEngines").innerHTML = returnBar(playerShip.engines, playerShip.maxEngines);
		document.getElementById("barSensors").innerHTML = returnBar(playerShip.sensors, playerShip.maxSensors);
		document.getElementById("statsWeaponPower").innerHTML = playerShip.weaponStrength;
		document.getElementById("statsWeaponDelay").innerHTML = playerShip.weaponDelay;
		document.getElementById("statsCurrentShield").innerHTML = playerShip.currentShields;
		document.getElementById("statsMaxShield").innerHTML = playerShip.maxCurrentShields;
		document.getElementById("statsSpeed").innerHTML = playerShip.topSpeed;
		document.getElementById("statsSensors").innerHTML = playerShip.sensorStrength;
		
	}
}

function drawEnemy(number) {
	output = "<pre id=\"shipPic\">";
	if(flavor.enemyShips[number] != undefined){
		output += flavor.enemyShips[number];
	} else {
		output += flavor.enemyShips[0];
	}
	output += "</pre>";
	document.getElementById("enemyShip").innerHTML = output;
}

function drawPlayer(number) {
	output = "<pre id=\"shipPic\">";
	if(flavor.playerShips[number] != undefined){
		output += flavor.playerShips[number];
	} else {
		output += flavor.playerShips[0];
	}
	output += "</pre>";
	document.getElementById("playerShip").innerHTML = output;
}

function missionControl() {
	if (gameState == 0 ) { //Travel
		
		mission.distance = mission.distance - playerShip.topSpeed;
		
		if(mission.distance < 0) {
			mission.distance = 0;
		}
		
		document.getElementById("missionDistance").innerHTML = mission.distance;
	} else if (gameState == 1 ) { //combat
		
	} else if (gameState == 2 ) { //exploration
		
	} else if (gameState == 3 ) { //science  
		
	} 
	
	if (gameState == 4 ) { //results decides next mission and resets travel timer
		toLog("New Mission");
		mission.missionType = Math.round(Math.random() * 2)+1;
		mission.distance = Math.floor((Math.round(((Math.random() * 3) + 2)*10)/10) * (Math.pow(mission.missionLevel * 5, 2)));  
		gameState = 0;
	}
}

function loadup(){
	devClick();
	drawEnemy(0);
	drawPlayer(0);
}

window.onload = loadup;

window.setInterval(function(){ //Game Loop - Tick set on .5 seconds
	statUpdate();
	missionControl();
	tick++;
}, 500);
