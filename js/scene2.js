window.onload = init();

function init() {
  var cnv = document.getElementById("scene2");
  var ctx = cnv.getContext("2d");
 

  //////////Loading Image Object & image draw function  for 2st seen//////////////////

  var backgroundimage = new Image(); //make image object
  backgroundimage.src = "./Images/Dongen.webp"; // set the image file path

  
  // Coordinates and speed of Hero (Player)
  var hx = 10; // Hero X coordinate
  var hy = 230; // Hero Y coordinate
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
    var heroUp = new Image(); //make image object for Knight
    heroUp.src = "./Images/hero-sword.png"; // set the image file path for Knight
    ctx.drawImage(heroUp, hx, hy, 150, 325); // Image Height and Width for Knight
  }


  function heroFire() {
    var heroFire = new Image(); //make image object for Knight
    heroFire.src = "./Images/hero-torch.png"; // set the image file path for Knight
    ctx.drawImage(heroFire, hx, hy, 150, 325); // Image Height and Width for Knight
  }

  function heroDead() {
    var heroDead = new Image(); //make image object for Knight
    heroDead.src = "./Images/hero-blood.png"; // set the image file path for Knight
    ctx.drawImage(heroDead, hx , hy - 5,150, 325); // Image Height and Width for Knight
  }

  function dungeon() {
    var pirateDead = new Image(); //make image object 
    pirateDead.src = "./Images/cave-door.png"; // set the image file path 
    ctx.drawImage(pirateDead, 900, 150, 700, 400); // Image Height and Width 
  }

  function goAway()
      {
            var pirateDead = new Image(); //make image object for Knight
            pirateDead.src = "./Images/go-away.png"; // set the image file path for Knight
            ctx.drawImage(pirateDead, hx+95, hy+ 95, 200,70); // Image Height and Width for Knight
      }



   /* ===================================================| Bat Movement controls |=================================================== */

   function batmove() {
    var dx = hx - cx; // Calculate the difference in X positions between the hero and the bat
    var dy = hy - cy; // Calculate the difference in Y positions between the hero and the bat
    var distance = Math.sqrt(dx * dx + dy * dy); // Calculate the distance between the bat and the hero using the Pythagorean theorem
  
    var angle = Math. (dy + 50, dx + 5); // Calculate the angle between the bat and the hero using Math.atan2()
  
    var speed = 2; // Set the movement speed of the bat
  
    if (heroStatus == "fire" && distance < 500) {
      // If heroStatus is "fire" and the bat is near the hero
      // Move the bat away from the hero
      speed *= -1; // Reverse the direction of movement
    } else if (distance < 50) {
      // If the bat is near the hero without heroStatus being "fire"
      heroStatus = false; // Set heroStatus to false, indicating that the hero is dead
    }
  
    // Calculate the movement in the X and Y directions
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

    if(hx>1090){ // Loads the seen 2 
      window.open("./index3.html", "_self");
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

    


    if (heroStatus == true) {
      heroUp();
    } else if (heroStatus == false) {
      heroDead();
    } else if (heroStatus == "fire") {
      heroFire();
      goAway();
    }

    bat();

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
