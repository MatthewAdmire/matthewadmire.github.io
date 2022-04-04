var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 150},
                { "type": "sawblade", "x": 600, "y": groundY - 150},
                { "type": "sawblade", "x": 1000, "y": groundY - 150},
                   { "type": "enemy", "x": 1300, "y": groundY - 50},
                   { "type": "enemy", "x": 500, "y": groundY - 50},
                { "type": "enemy", "x": 900, "y": groundY - 50},
                { "type": "enemy", "x": 1600, "y": groundY - 50},
                  { "type": "reward", "x": 800, "y": groundY - 150},
                { "type": "reward", "x": 500, "y": groundY - 100},
                { "type": "reward", "x": 1950, "y": groundY - 150},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE


        function createSawBlade(x, y){
            var hitZoneSize = 25; //creates the size of the hitzone
            var damageFromObstacle = 10; //setting how much damage objest will inflict
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the obstical 
            sawBladeHitZone.x = x; //the x value of the hit zone
            sawBladeHitZone.y = y; //y valuse of hit zone
            game.addGameItem(sawBladeHitZone); //adds hit zone to the game
            var obstacleImage = draw.bitmap('img/sawblade.png'); //draws the image and stores it
            sawBladeHitZone.addChild(obstacleImage); //adds image to hitZone so we can see it
            obstacleImage.x = -25;
            obstacleImage.y = -25; 
            sawBladeHitZone.rotationalVelocity = 10; //causes the saw blades to rotate
        };

       

       

        function createEnemy(x, y){
           var enemy = game.createGameItem("enemy",25); //create red square and adds as enemy
            var redSquare = draw.bitmap('img/ghost.png'); // puts in my ghost enemy
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x; // changes the enemy size
            enemy.y = y;
            redSquare.scaleX = 0.50;
            redSquare.scaleY = 0.50;
            game.addGameItem(enemy);
            enemy.velocityX = -1; //moves enemy 1 pixel to the left 
            //enemy.rotationalVelocity = 10; //rotates enemy image
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10)
                console.log('The enemy has hit Halle');
                enemy.fadeOut();
            };   //detects if enemy collides with hallie and executes health decrease
            enemy.onProjectileCollision = function(){
                game.increaseScore(20);
                enemy.fadeOut();
            }; //function detects if enemy hits projectile and increases score and enemy fades out`
        };
          function createSawBlade(x, y){
            var hitZoneSize = 25; //creates the size of the hitzone
            var damageFromObstacle = 10; //setting how much damage objest will inflict
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the obstical 
            sawBladeHitZone.x = x; //the x value of the hit zone
            sawBladeHitZone.y = y; //y valuse of hit zone
            game.addGameItem(sawBladeHitZone); //adds hit zone to the game
            var obstacleImage = draw.bitmap('img/sawblade.png'); //draws the image and stores it
            sawBladeHitZone.addChild(obstacleImage); //adds image to hitZone so we can see it
            obstacleImage.x = -25;
            obstacleImage.y = -25; 
            sawBladeHitZone.rotationalVelocity = 10; //causes the saw blades to rotate
        };

       

       

        function createReward(x, y){
           var reward = game.createGameItem('reward',25); //create red square an adds as enemy
            var blueSquare = draw.bitmap("img/key.png");
            blueSquare.x = -60;
            blueSquare.y = -25;
            blueSquare.scaleX = 0.15;
            blueSquare.scaleY = 0.15;
            reward.addChild(blueSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1; //moves reward 1 pixel to the left 
            //reward.rotationalVelocity = 10; //rotates reward image
            reward.onPlayerCollision = function() {
                game.changeIntegrity(-10)
                console.log('The reward has hit Halle');
                reward.fadeOut();
            };   //detects if reward collides with hallie and executes health decrease
            reward.onPlayerCollision = function(){
                console.log(20);
                game.increaseScore(20);
                reward.fadeOut();
            }; //function detects if reward hits projectile and increases score and reward fades out`
        };
         

         for (var i = 0; i < levelData.gameItems.length; i++){
               var gameItem = levelData.gameItems[i];  
                if(gameItem.type === "sawblade"){
                    createSawBlade(gameItem.x, gameItem.y);
                }
                 if(gameItem.type === "enemy"){
                    createEnemy(gameItem.x, gameItem.y);
                }
                  if(gameItem.type === "reward"){
                    createReward(gameItem.x, gameItem.y);
                }

         }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
