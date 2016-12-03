//We define our character Object
function character(name, img, hPoints, aPower, cAPower, enemy) {
    //We define the attributes of the characters
    //Each character in the game has 3 attributes
    this.cName = name;
    this.image = img;
    this.healthPoints = hPoints;
    this.baseAttackPower = aPower; //initial attack power
    this.attackPower = aPower; //Increase by the base (initial attack power)
    this.counterAttackPower = cAPower; //Counter Attack Power never changes
    this.isEnemy = enemy; 	// True or False, The enemy character 
    						//only has Counter Attack Power.
    //we define functionality to the object

    // Each time the player attacks, their character's Attack 
    //Power increases by its base Attack Power.
	// For example, if the base Attack Power is 6, 
	//each attack will increase the Attack Power by 6 
	//(12, 18, 24, 30 and so on).
    this.attack = function () {
        this.attackPower += this.baseAttackPower;
    },

    this.assignIsEnemy = function (isIt){
    	this.isEnemy = isIt;
    }

    this.damage = function(power) {
    	this.healthPoints -= power;
    }

    this.counterAttack = function (caPower){
    	this.healthPoints -= caPower;
    }

};

function appendImage(charObject, divName){
 return($("<img>").attr("src", charObject.image).addClass(divName).data('info', charObject));
}

var cAmerica = new character("Captain America", "assets/images/captainAmerica.jpg", 150, 8, 10, true);
var cMarvel = new character("Captain Marvel", "assets/images/captainMarvel.jpg", 100, 10, 5, true);
var thor = new character("Thor", "assets/images/thor.jpg", 120, 7	, 2, true);
var blackWidow = new character("Black Widow", "assets/images/blackWidow.jpg", 110, 6, 12, true);
fighters = [
	cAmerica,
	cMarvel,
	thor,
	blackWidow
];
var fighterInfo;
var opponent;

$(document).ready(function(){

	for (var i = 0; i < fighters.length; i++) {
		
		$('#dFighters').append(appendImage(fighters[i], 'charImage'));
		// $('#name').append(fighters[i].cName);
		// $('#health').append(fighters[i].healthPoints);

	};

	// When the game starts, the player will choose a character by 
	//clicking on the fighter's picture. 
	//The player will fight as that character for the rest of the game.
	$(document).on('click', '.charImage', function(){
		fighterInfo = $(this).data("info")
		console.log(fighterInfo);
		$('#dCharacter').html(appendImage(fighterInfo,'charImage'));
		fighterInfo.assignIsEnemy(false);
		// The player must then defeat all of the remaining fighters. 
		//Enemies should be moved to a different area of the screen.
		for (var i = 0; i < fighters.length; i++) {
			if (fighters[i].isEnemy == true) {
				$('#dEnemies').append(appendImage(fighters[i], 'enemies'));
			}
		};
		$('#dFighters').empty();


	});	

	// The player chooses an opponent by clicking on an enemy's picture.
	$(document).on('click', '.enemies', function(){
		opponent = $(this).data("info")
		console.log(opponent);
		$('#dDefenderArea').html(appendImage(opponent,'opponentImage'));
		// $('#dEnemies').remove(opponent);
		// fighterInfo.assignIsEnemy(false);
		// // The player must then defeat all of the remaining fighters. 
		// //Enemies should be moved to a different area of the screen.
		// for (var i = 0; i < fighters.length; i++) {
		// 	if (fighters[i].isEnemy == true) {
		// 		$('#dEnemies').append(appendImage(fighters[i], 'enemies'));
		// 	}
		// };
		// $('#dFighters').empty();
	});
	// Once the player selects an opponent, that enemy is moved to 
	//a defender area.
	$(document).on('click', '#attackButton', function(){
		console.log('before: ' + fighterInfo.attackPower);
		
		fighterInfo.attack();
		opponent.damage(fighterInfo.attackPower);
		$('#dFighters').html(fighterInfo.healthPoints);
		fighterInfo.counterAttack(opponent.counterAttackPower);
		$('#dMessages').html(
			'You attacked ' + fighterInfo.cName + 
			" for " + fighterInfo.attackPower +
			'<br>' + opponent.cName + ' attacked you back with ' +
			opponent.counterAttackPower + ' damage');
		console.log("Opponent Health Points " + opponent.healthPoints);
		if (opponent.healthPoints <= 0){
			// remove the image of the opponent
			$('#dDefenderArea, #dMessages').empty();
		
		}


	});
	// The player will now be able to click the attack button.

	// Whenever the player clicks attack, their character damages 
	//the defender. The opponent will lose HP (health points). 
	//These points are displayed at the bottom of the defender's picture.
	// The opponent character will instantly counter the attack. 
	//When that happens, the player's character will lose some of their HP. 
	//These points are shown at the bottom of the player character's picture.
	// The player will keep hitting the attack button in an effort to defeat 
	//their opponent.

	// When the defender's HP is reduced to zero or below, remove 
	//the enemy from the defender area. The player character can now 
	//choose a new opponent.
	// The player wins the game by defeating all enemy characters. 
	//The player loses the game the game if their character's HP falls to zero or below.

	// Game design notes:

	// Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.

	// Each time the player attacks, their character's Attack Power increases by its base Attack Power.

	// For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
	// The enemy character only has Counter Attack Power.

	// Unlike the player's Attack Points, Counter Attack Power never changes.
	// The Health Points, Attack Power and Counter Attack Power of each character must differ.

	// No characters in the game can heal or recover Health Points.

	// A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.
	// Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
		
});//End Document Ready Function
