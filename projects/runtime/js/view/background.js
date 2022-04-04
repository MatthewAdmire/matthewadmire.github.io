var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'dark blue'); //creates a variable called background fill to store a rectangle that acts as a background.
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('img/redmoon.png');
            moon.x = canvasWidth - 1500; //holds the x value
            moon.y = groundY - 90;
            moon.scaleX = 0.5; //changes the x scale of moon
            moon.scaleY = -0.5; //changes y scale of moon
            background.addChild(moon); //adds moon to background

            for(var i = 0;i <= 100; i++){
                var circle = draw.circle(10,'white','LightGray',2); //creates a variable called circles
                circle.x = canvasWidth*Math.random();//multiplies canvas width
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            // everytime loop runs pushes buildings array to index
            
            for(var i = 0;i < 5; i++) {
                var buildingHeights = [300, 100, 100, 200, 100];
                var building = draw.rect(75,buildingHeights[i],'black','light gray',1); //declares a var called building that will hold all the buildings
                building.x = 300 + 200*i; // adds 200 pixels to the x value
                building.y = groundY-buildingHeights [i]; // sets the buildings y position by subtracting the height of the building from the ground y 
                background.addChild(building); //adds building to background for viewing
                buildings.push(building); //push to buildings array and stor as an index
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/hollowKnight.png');
            tree.x = canvasWidth - 800;
            tree.y = groundY - 150;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1; //Takes current value of tree.x and subtracts one pixel to move the tree to the left
            //If tree is less than -200 pixels than reassign tree
            if(tree.x < -200) {
            tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                buildings[i].x = buildings[i].x - 0.4;
                if(buildings[i].x < -200) {
                    buildings[i].x = canvasWidth;
                    }
                // code to do something with each element
                }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
