
  window.onload = init();

  function init()
  {
    
      var cnv = document.getElementById("scene1"); 
      var ctx = cnv.getContext("2d"); 
     
      

      //////////Loading Image Object & image draw function  for 1st seen//////////////////

      var backgroundimage = new Image(); //make image object
      backgroundimage.src = "./Images/scene1-background.png"; // set the image file path

    
      // Coordinates and speed of Hero (Player)
      var hx = 10;  // Hero X coordinate 
      var hy = 350; // Hero Y coordinate 
      var SPEED = 5;

      // Coordinates of Cyclope (Monster)
      var cx = 280; // Cyclop X coordinate 
      var cy = 160;// Cyclop y coordinate 

      // Coordinates of the Rock
      rx = 350;
      ry = 325;


      var heroStatus = true; // Hero doesn't move

      var cyclopStatus = false;// Cyclop sleep

      // initialize visibility duration count
      var count = 0;

      


      function CyclopSleep()
      {
            var CyclopImageSleep = new Image(); //make image object for Cyclop
            CyclopImageSleep.src = "./Images/monster-sleeping.png"; // set the image file path for Cyclop
            ctx.drawImage(CyclopImageSleep, cx, cy, 400,208); // Image Height and Width for Cyclop
      }

      function CyclopWake()
      {
            var CyclopImagWake = new Image(); //make image object for Cyclop left
            CyclopImagWake.src = "./Images/monster-awaken.png"; // set the image file path for Cyclop left
            ctx.drawImage(CyclopImagWake, cx, cy, 400,208); // Image Height and Width for Cyclop left 
      }

      function CyclopCommand()
      {
            var CyclopImgCommand = new Image(); //make image object
            CyclopImgCommand.src = "./Images/monster-stop.png"; // set the image file 
            ctx.drawImage(CyclopImgCommand, cx, cy, 400,208); // Image Height and Width 
      }

      function rock()
      {
            var rockImage = new Image(); //make image object
            rockImage.src = "./Images/rock.png"; // set the image file path 
            ctx.drawImage(rockImage, rx, ry, 250, 200); // Image Height and Width 
      }

      function heroUp()
      {
            var heroUp = new Image(); //make image object 
            heroUp.src = "./Images/hero-scene1.png"; // set the image file 
            ctx.drawImage(heroUp, hx, hy, 100,200); // Image Height and Width 
      }
           
      function heroDead()
      {
            var heroDead = new Image(); //make image object
            heroDead.src = "./Images/hero-dead-scene1.png"; // set the image file path 
            ctx.drawImage(heroDead, hx-47, hy-5, 170,220); // Image Height and Width
      }

      function cantSee()
      {
            var pirateDead = new Image(); //make image object 
            pirateDead.src = "./Images/cant-see.png"; // set the image file path 
            ctx.drawImage(pirateDead, hx+100, hy, 200,70); // Image Height and Width 
      }

      function dungeon()
      {
            var pirateDead = new Image(); //make image object
            pirateDead.src = "./Images/dungeon.png"; // set the image file path 
            ctx.drawImage(pirateDead, 900, 270, 500,300); // Image Height and Width
            
      }



// Function to draw a line representing the hero shooting towards a target
function shootHero() {
  ctx.lineWidth = 5; // Set the width of the line
  ctx.strokeStyle = 'red'; // Set the color of the line to red
  ctx.moveTo(505, 210); // Set the starting point of the line
  ctx.lineTo(hx + 35, hy + 100); // Draw a line to the target coordinates
  ctx.stroke(); // Actually draw the line
}
    


    /* ===================| Visibility | =================== */

    function checkVisibility() {
      if ((hx < 350 || hx > 530) && (hx < 950 || hx > 1200)) {
        EnemyCanSee = true;
      } else {
        EnemyCanSee = false;
        cantSee();
      }
    }
    
  

  /* ===================================================| Handle Keyboard controls |=================================================== */
// Handle keyboard controls
var keyPress = {}; // Object to store the state of key presses

// Event listener for keydown event
addEventListener("keydown", function (e) {
    keyPress[e.keyCode] = true; // Set the property of the pressed key to true
}, false);

// Event listener for keyup event
addEventListener("keyup", function (e) {
    delete keyPress[e.keyCode]; // Delete the property of the released key
}, false);




  /* ===================================================| Hero moving controls |=================================================== */
  function heroMove()
  {
    
    if (!heroStatus) {
      return;  // Stop moving if the hero is dead 
    }

      checkVisibility(); // every time hero move it will check the if he is visible 


      if (37 in keyPress) { // left arrow
        if (hx - SPEED >= 0) { // Check if moving left won't exceed left boundary
          hx -= SPEED;
        }
      }
    
      if (39 in keyPress) { // right arrow
        if (hx + SPEED <= cnv.width - 100) { // Check if moving right won't exceed right boundary
          hx += SPEED;
        }
      }


// Handle hero visibility and trigger actions based on visibility duration
if (EnemyCanSee == true && cyclopStatus == true) {
  // The enemy can see the hero and the cyclop is awake
  count = count + 1; // Increment the visibility duration count
} else {
  // The enemy cannot see the hero or the cyclop is sleeping
  count = 0; // Reset the visibility duration count
}

if (count > 40) {
  // The player has been visible to the enemy for 40 increments (3 seconds)
  CyclopCommand(); // Give a command or stop actions
  // shootHero();
}

if (count > 80) {
  // The player has been visible to the enemy for 80 increments (6 seconds)
  shootHero(); // Shoot the hero
  heroStatus = false; // Set the hero status to false (likely dead)
}




      if(hx>1090){ // Loads the seen 2 
        window.open("./index2.html", "_self");
      }
  }
  /* ===================================================| / Hero moving controls |=================================================== */




  function clear()
  {
    ctx.drawImage(backgroundimage, 0, 0, cnv.width, cnv.height); // Image Height and Width
   
    
  }


// Update the cyclop status of Sleep & wake every 3 seconds
setInterval(function() {
  if (Math.random() < 0.5) {
    cyclopStatus = true; // Set cyclop status to true (awake/active) with a 50% chance
  } else {
    cyclopStatus = false; // Set cyclop status to false (sleeping/inactive) with a 50% chance
  }
}, 3000); //3 seconds


  function draw()
  {
    dungeon();
   
      if(cyclopStatus == true)
      {
        CyclopWake();
      }
      else
      {
        CyclopSleep();
      }

      
      rock();
      
      if(heroStatus == true)
        {
          heroUp();
        }
        else if(heroStatus == false)
        {
          heroDead();
        }

      
  }



  function Loop() {
    clear();
    draw();
    heroMove();
    
   
    
    setTimeout(Loop, 30);  //call loop every 20 mili sec 

  } //end loop





  Loop()

  }