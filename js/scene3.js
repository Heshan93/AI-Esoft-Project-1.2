    window.onload = init();

    function init() {
      var cnv = document.getElementById("scene3");
      var ctx = cnv.getContext("2d");
;

      //////////Loading Image Object & image draw function  for 2st seen//////////////////

      var backgroundimage = new Image(); //make image object
      backgroundimage.src = "./Images/mountain-scene.jpg"; // set the image file path

      // Coordinates and speed of Hero (Player)
      var hx = 20; // Hero X coordinate
      var hy = 340; // Hero Y coordinate
      var SPEED = 5;



      // Coordinates and speed of balloon
      var bx = 200;
      var by = 250;
      var bSPEED = 3;


      var heroStatus = true; // Hero doesn't move




      function heroUp() {
        var heroUp = new Image(); //make image object 
        heroUp.src = "./Images/hero-sword.png"; // set the image file path
        ctx.drawImage(heroUp, hx, hy, 90, 190); // Image Height and Width 
      }

      
      function heroOnGasBallon() {
        var heroOnGasBallonImg = new Image(); //make image object
        heroOnGasBallonImg.src = "./Images/balloon-hero.png"; // set the image file path 
        ctx.drawImage(heroOnGasBallonImg, bx, by, 200, 300); // Image Height and Width 
      }



      // Function to draw the balloon image based on the hero's position
function gasBallon() {
  if (hx === 200) {
    heroOnGasBallon(); // Draw the hero on the balloon
  } else {
    var gasBallonImg = new Image();
    gasBallonImg.src = "./Images/balloon-empty.png"; // Set the image source to an empty balloon image
    ctx.drawImage(gasBallonImg, bx, by, 200, 300); // Draw the empty balloon image on the canvas
  }
}



      function dungeon() {
        var pirateDead = new Image(); //make image object 
        pirateDead.src = "./Images/cave-door-out.png"; // set the image file 
        ctx.drawImage(pirateDead, 0, 225, 230, 300); // Image Height and Width 
      }



      



      function enemy() {
        var enemyImg = new Image(); //make image object 
        enemyImg.src = "./Images/enemy.png"; // set the image file path
        ctx.drawImage(enemyImg, 165, 5, 80, 140); // Image Height and Width f
      }

      function bloodBalloon(){
        var enemyImg = new Image(); //make image object 
        enemyImg.src = "./Images/balloon-blood.png"; // set the image file path 
        ctx.drawImage(enemyImg, bx, by, 200, 300); // Image Height and Width 
      }

      function gotKilled(){
        var enemyImg = new Image(); //make image object for got hit
        enemyImg.src = "./Images/got-killed.png"; // set the image file path for got hit
        ctx.drawImage(enemyImg, bx, by, 200, 300); // Image Height and Width for got hit
      }

      var bulletX = 200;
      var bulletY = 20;
      var bulletHit = false;
      
      function bullets() {
        // Function to draw a bullet on the canvas
        // This function is called to draw the bullet in the game scene
      
        // Draw the bullet
        ctx.beginPath();
        ctx.arc(bulletX, bulletY, 7, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
      }
      

      function updateBulletPosition() {
        if (!bulletHit) {
          var directionX = bx;
          var directionY = by ;
      
          var magnitude = Math.sqrt(directionX * directionX + directionY * directionY); // Calculate the magnitude of the direction vector
      
          var normalizedDirectionX = directionX / magnitude; // Normalize the horizontal direction component
          var normalizedDirectionY = directionY / magnitude; // Normalize the vertical direction component
      
          var bulletSpeed = 4; // Set the speed at which the bullet moves
      
          // Update the bullet's position based on the normalized direction and speed
          bulletX += normalizedDirectionX * bulletSpeed;
          bulletY += normalizedDirectionY * bulletSpeed;
        }
      }
      




  // Function to fire the bullet from the fixed position
  function fireBullet() {
    if (!bulletHit && Math.random() < 0.01) {
     
      bulletX = 200; // Fixed X position within the canvas
      bulletY = 40; // Start the bullet from the top of the canvas
      bulletHit = false;
    }
  }

      var keyPress = {}; // initialize the  key presses
      addEventListener(
        "keydown",
        function (e) {
          keyPress[e.keyCode] = true; // If press True


          console.log(e.keyCode);
        },
        false
      );

      addEventListener(
        "keyup",
        function (e) {
          delete keyPress[e.keyCode];

        },
        false
      );

      /* ===================================================| Hero moving controls |=================================================== */
      function heroUpDate() {
        

        if (hx === 200) {
          heroStatus = false;
        }



        if (!heroStatus) {
          return; // // Stop moving if the hero is dead 
        }

        
        if (37 in keyPress) {
          // left arrorw
          if (hx - SPEED >= 0) { // Check if moving left won't exceed left boundary
            hx -= SPEED;
          }
        }

        if (39 in keyPress) {
          // right arrow
          if (hx + SPEED <= cnv.width - 100) { // Check if moving right won't exceed right boundary
            hx += SPEED;
          }
        }
     
      }
      /* ===================================================| / Hero moving controls |=================================================== */






    /* ===================================================| Balloon  moving controls |=================================================== */
    
    function BalloonUpDate() {
      if (heroStatus === false) {
        if (37 in keyPress) {
          // left arrow
          if (bx - bSPEED >= 0) { // Check if moving left won't exceed left boundary
            bx -= bSPEED;
          }
        }

        if (39 in keyPress) {
          // right arrow
          if (bx + bSPEED <= cnv.width - 100) { // Check if moving right won't exceed right boundary
            bx += bSPEED;
          }
        }

        if (38 in keyPress) {
          // Up arrow
          if (by - bSPEED >= 0) { // Check if moving Up won't exceed UP boundary
            by -= bSPEED;
          }
        }

        if (40 in keyPress) {
          // Down arrow
          if (by + bSPEED <= cnv.height - 290) { // Check if moving Down won't exceed Down boundary
            by += bSPEED;
          }
        }

        if(bx>1050){ // Loads the seen 4 
          window.open("./index4.html", "_self");
        }
// Check for collision with bullet
if (
  bulletX >= bx &&
  bulletX <= bx + 200 &&
  bulletY >= by &&
  bulletY <= by + 300
) {
  bulletHit = true;
  // Stop the movement of the balloon
  bSPEED = 0;
  // Show the balloon with blood
  bloodBalloon();
  // Show the hero got killed
  gotKilled();
}

      
      }

    }


    /* ===================================================| / Balloon moving controls |=================================================== */
      function clear() {
        ctx.drawImage(backgroundimage, 0, 0, cnv.width, cnv.height); // Image Height and Width
      
      }

 



      function draw() {
        gasBallon();
        dungeon();
      
        if (!bulletHit) {
          bullets(); // Call the function to draw the bullet
        }
      
        enemy();
      
        if (heroStatus == true) {
          heroUp();
        }else {
            heroOnGasBallon();
          }
        }
   

      function Loop() {
        clear();
        draw();
        fireBullet(); // Call the function to randomly fire bullets

        if (heroStatus) {
          heroUpDate();
        } else {
          BalloonUpDate();
        }

        if (!heroStatus) {
          updateBulletPosition();
        }


        setTimeout(Loop, 20); //call loop every 20 milliseconds
      } //end loop

      Loop();
    }
