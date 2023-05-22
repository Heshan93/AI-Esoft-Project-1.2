window.onload = init();

function init() {
  var cnv = document.getElementById("scene3");
  var ctx = cnv.getContext("2d");
  ctx.fillStyle = "white"; // set background to white
  ctx.rect(0, 400, 1200, 749);
  ctx.fill();

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
    heroDead.src = "./Images/images.jpeg"; // set the image file path for pirateUp
    ctx.drawImage(heroDead, hx - 47, hy - 5, 170, 220); // Image Height and Width for pirateUp
  }



  function dungeon() {
    var pirateDead = new Image(); //make image object for pirateUp
    pirateDead.src = "./Images/cave-door-out.png"; // set the image file path for pirateUp
    ctx.drawImage(pirateDead, 0, 225, 230, 300); // Image Height and Width for pirateUp
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

    if(bx>1090){ // Loads the seen 4 
      window.open("./index4.html", "_self");
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
    
    gasBallon()
   
    dungeon();

    if (heroStatus == true) {
      heroUp();
    } else {
      heroOnGasBallon();
      
    }

    

  }

  function Loop() {
    clear();
    draw();

    if (heroStatus) {
      heroUpDate();
    } else {
      BalloonUpDate();
    }

    setTimeout(Loop, 20); //call loop every 20 milliseconds
  } //end loop

  Loop();
}
