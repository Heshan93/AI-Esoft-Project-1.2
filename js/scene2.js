window.onload = init();

function init() {
  var cnv = document.getElementById("scene2");
  var ctx = cnv.getContext("2d");
  ctx.fillStyle = "white"; // set background to white
  ctx.rect(0, 0, 1200, 749);
  ctx.fill();

  //////////Loading Image Object & image draw function  for 2st seen//////////////////

  var backgroundimage = new Image(); //make image object
  backgroundimage.src = "./Images/Dongen.webp"; // set the image file path

  // Coordinates and speed of Hero (Player)
  var hx = 10; // Hero X coordinate
  var hy = 350; // Hero Y coordinate
  var SPEED = 5;

  // Coordinates of Bat (Monster)
  var cx = 850; // Bat X coordinate
  var cy = 0; // Bat y coordinate



  var heroStatus = true; // Hero doesn't move

  function bat() {
    var batFly = new Image(); //make image object for Bat
    batFly.src = "./Images/bat.png"; // set the image file path for Bat
    ctx.drawImage(batFly, cx, cy, 200, 100); // Image Height and Width for Bat
  }


  function heroUp() {
    var heroUp = new Image(); //make image object for pirateUp
    heroUp.src = "./Images/hero-scene1.png"; // set the image file path for pirateUp
    ctx.drawImage(heroUp, hx, hy, 100, 200); // Image Height and Width for pirateUp
  }


  function hetoFire() {
    var hetoFire = new Image(); //make image object for pirateUp
    hetoFire.src = "./Images/hero with fire.png"; // set the image file path for pirateUp
    ctx.drawImage(hetoFire, hx, hy, 100, 200); // Image Height and Width for pirateUp
  }

  function heroDead() {
    var heroDead = new Image(); //make image object for pirateUp
    heroDead.src = "./Images/images.jpeg"; // set the image file path for pirateUp
    ctx.drawImage(heroDead, hx - 47, hy - 5, 170, 220); // Image Height and Width for pirateUp
  }



  function dungeon() {
    var pirateDead = new Image(); //make image object for pirateUp
    pirateDead.src = "./Images/dungeon.png"; // set the image file path for pirateUp
    ctx.drawImage(pirateDead, 900, 270, 500, 300); // Image Height and Width for pirateUp
  }




   /* ===================================================| Bat Movement controls |=================================================== */


  function batmove() {

    
    var dx = hx - cx; // Calculate the difference in X positions
    var dy = hy - cy; // Calculate the difference in Y positions
    var distance = Math.sqrt(dx * dx + dy * dy); // Calculate the distance between the bat and the hero
  
    var angle = Math.atan2(dy, dx);
  
    // Calculate the movement speed of the bat
    var speed = 2;
  
    if (heroStatus == "fire" && distance < 500) {
      // If heroStatus is "fire" and bat is near the hero
      // Move the bat away from the hero
      speed *= -1; // Reverse the direction of movement
    }else if (distance < 100) {
      // If bat is near the hero without heroStatus being "fire"
      // Set heroStatus to false
    heroStatus = false;
    }
  
    // Calculate the movement in X and Y directions
    var moveX = speed * Math.cos(angle);
    var moveY = speed * Math.sin(angle);
  
    // Update the bat's position
    cx += moveX;
    cy += moveY;
  }




  /* ===================================================| Handle Keyboard controls |=================================================== */

  var keyPress = {}; // initialize the  key presses
  addEventListener(
    "keydown",
    function (e) {
      keyPress[e.keyCode] = true; // If press True
     
      if (e.keyCode === 32 && heroStatus !== false) {
        // If the space bar is pressed
        heroStatus = "fire"; // Set heroStatus to "fire"
      }


      console.log(e.keyCode);
    },
    false
  );

  addEventListener(
    "keyup",
    function (e) {
      delete keyPress[e.keyCode];
     
      if (e.keyCode === 32) {
        // If the space bar is released
        heroStatus = true; // Set heroStatus back to true
      }

    },
    false
  );

  /* ===================================================| Hero moving controls |=================================================== */
  function upDate() {
    

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
    dungeon();

    bat();


    if (heroStatus == true) {
      heroUp();
    } else if (heroStatus == false) {
      heroDead();
    } else if (heroStatus == "fire") {
      hetoFire();
    }

  }

  function Loop() {
    clear();
    draw();
    upDate();
    batmove();

    setTimeout(Loop, 20); //call loop every 20 mili sec
  } //end loop

  Loop();
}
