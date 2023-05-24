    window.onload = init();

    function init() {
      var cnv = document.getElementById("scene3");
      var ctx = cnv.getContext("2d");
      ctx.fillStyle = "white"; // set background to white
      ctx.rect(0, 400, 1200, 749);
      //ctx.fill();

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
        var heroUp = new Image(); //make image object for pirateUp
        heroUp.src = "./Images/hero-sword.png"; // set the image file path for pirateUp
        ctx.drawImage(heroUp, hx, hy, 90, 190); // Image Height and Width for pirateUp
      }

      
      function heroOnGasBallon() {
        var heroOnGasBallonImg = new Image(); //make image object for pirateUp
        heroOnGasBallonImg.src = "./Images/balloon-hero.png"; // set the image file path for pirateUp
        ctx.drawImage(heroOnGasBallonImg, bx, by, 200, 300); // Image Height and Width for pirateUp
      }

      function gasBallon() {
        if (hx === 200) {
          heroOnGasBallon();
        } else {
          var gasBallonImg = new Image();
          gasBallonImg.src = "./Images/balloon-empty.png";
          ctx.drawImage(gasBallonImg, bx, by, 200, 300);
        }
      }





      function heroDead() {
        
        var heroDead = new Image(); //make image object for pirateUp
        heroDead.src = "./Images/hero-dead-scene1.png"; // set the image file path for pirateUp
        ctx.drawImage(heroDead, bx, by , 200, 300); // Image Height and Width for pirateUp
      }



      function dungeon() {
        var pirateDead = new Image(); //make image object for pirateUp
        pirateDead.src = "./Images/cave-door-out.png"; // set the image file path for pirateUp
        ctx.drawImage(pirateDead, 0, 225, 230, 300); // Image Height and Width for pirateUp
      }



      function firePit() {
        var firePitImg = new Image(); //make image object for pirateUp
        firePitImg.src = "./Images/fire pit.png"; // set the image file path for pirateUp
        ctx.drawImage(firePitImg, 350, 450, 550, 150); // Image Height and Width for pirateUp
      }



      function enemy() {
        var enemyImg = new Image(); //make image object for pirateUp
        enemyImg.src = "./Images/enemy.jpg"; // set the image file path for pirateUp
        ctx.drawImage(enemyImg, 200, 20, 40, 70); // Image Height and Width for pirateUp


    
  }






  var bulletX = 200;
  var bulletY = 20;
  var bulletHit = false;

  function bulltes(){
    // Draw the bullet
    ctx.beginPath();
    ctx.arc(bulletX, bulletY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }





  function updateBulletPosition() {
    if (!bulletHit) {
      var directionX = bx - 0; // Calculate the direction towards the balloon's X position
      var directionY = by - 1; // Calculate the direction towards the balloon's Y position

      var magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
      var normalizedDirectionX = directionX / magnitude;
      var normalizedDirectionY = directionY / magnitude;

      var bulletSpeed = 5; // Adjust the speed as needed

      bulletX += normalizedDirectionX * bulletSpeed;
      bulletY += normalizedDirectionY * bulletSpeed;
/*
      // Check for collision with balloon
      if (
        bulletX >= bx &&
        bulletX <= bx + 200 &&
        bulletY >= by &&
        bulletY <= by + 300
      ) {
        bulletHit = true;
        // Stop the movement of the balloon
        bSPEED = 0;
        // Call heroDead() function
        //heroDead();.
        
      }*/
    }
  }




  // Function to fire the bullet from the fixed position
  function fireBullet() {
    if (!bulletHit && Math.random() < 0.01) {
      // Adjust the probability (0.01) as needed
      bulletX = 200; // Fixed X position within the canvas
      bulletY = 20; // Start the bullet from the top of the canvas
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
    // Call heroDead() function
    heroDead();
  }

      
      }

    }


    /* ===================================================| / Balloon moving controls |=================================================== */






      function clear() {
        ctx.drawImage(backgroundimage, 0, 0, cnv.width, cnv.height); // Image Height and Width
      
      }

      // Call set BatStatus  every 3 seconds
      setInterval(function () {
        if (Math.random() < 0.5) {
          BatStatus = true;
        } else {
          BatStatus = false;
        }
      }, 3000);




      function draw() {
        gasBallon();
        dungeon();
        firePit();
      
        if (!bulletHit) {
          bulltes(); // Call the function to draw the bullet
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
