
  window.onload = init();

  function init()
  {
    
      var cnv = document.getElementById("scene1"); 
      var ctx = cnv.getContext("2d"); 
      ctx.fillStyle = "white";   // set background to white
      ctx.rect(0,0,1200,749);
      ctx.fill();

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

      hourcount = 0;


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
            var CyclopImgCommand = new Image(); //make image object for Cyclop left
            CyclopImgCommand.src = "./Images/monster-stop.png"; // set the image file path for Cyclop left
            ctx.drawImage(CyclopImgCommand, cx, cy, 400,208); // Image Height and Width for Cyclop left 
      }

      function rock()
      {
            var rockImage = new Image(); //make image object for Cyclop left
            rockImage.src = "./Images/rock.png"; // set the image file path for Cyclop left
            ctx.drawImage(rockImage, rx, ry, 250, 200); // Image Height and Width for Cyclop left 
      }

      function heroUp()
      {
            var heroUp = new Image(); //make image object for pirateUp
            heroUp.src = "./Images/hero-scene1.png"; // set the image file path for pirateUp
            ctx.drawImage(heroUp, hx, hy, 100,200); // Image Height and Width for pirateUp
      }
           
      function heroDead()
      {
            var heroDead = new Image(); //make image object for pirateUp
            heroDead.src = "./Images/hero-dead-scene1.png"; // set the image file path for pirateUp
            ctx.drawImage(heroDead, hx-47, hy-5, 170,220); // Image Height and Width for pirateUp
      }

      function cantSee()
      {
            var pirateDead = new Image(); //make image object for pirateUp
            pirateDead.src = "./Images/cant-see.png"; // set the image file path for pirateUp
            ctx.drawImage(pirateDead, hx+100, hy, 200,70); // Image Height and Width for pirateUp
      }

      function dungeon()
      {
            var pirateDead = new Image(); //make image object for pirateUp
            pirateDead.src = "./Images/dungeon.png"; // set the image file path for pirateUp
            ctx.drawImage(pirateDead, 900, 270, 500,300); // Image Height and Width for pirateUp
      }

      function shootHero()
      {
          ctx.lineWidth = 8;
          ctx.strokeStyle = 'red';
          ctx.moveTo(505,210);
          ctx.lineTo(hx+35,hy+100);
          ctx.stroke();
          var demoImage = new Image();   // make image object
          demoImage.src = "./Images/blood.png";  // set image path
          ctx.drawImage(demoImage, hx-25, hy+10, 150, 150);  
      }

    /* ===================| Loading Image Object & image draw function for 1st seen | =================== */


    /* ===================| Visibility | =================== */
    function checkVisibility()
    {
      if ((hx < 350) || (hx > 530)){
        EnemyCanSee = true;
      }else{
        EnemyCanSee = false;
        cantSee();
      } 
    }


  /* ===================================================| Handle Keyboard controls |=================================================== */

  var keyPress = {} ;   // initialize the  key presses
  addEventListener("keydown",  function (e) 
  {
    keyPress[e.keyCode] = true; // If press True
   
  }, false);

  addEventListener("keyup",   function (e)  
  {
    delete keyPress[e.keyCode];
    
  }, false);




  /* ===================================================| Hero moving controls |=================================================== */
  function heroMove()
  {
    

      checkVisibility();

      if(37 in keyPress){ // left arrorw
        hx =  hx - SPEED;
      }
    
      if (39 in keyPress){  // right arrow
        hx = hx + SPEED;
      }

      if (EnemyCanSee == true && cyclopStatus == true){
        //enemyCOLOR = "red";
        count = count + 1; 
      } else {
        count = 0;
      }

      if (count > 40) {  //player was visible for 3 seconds
        CyclopCommand();
        //shootHero(); 
      }
      if (count > 80) {  //player was visible for 3 seconds
        //CyclopCommand();
        shootHero(); 
        heroStatus = false;
      }

      if(hx>1100){ // Loads the seen 2 
        window.open("./index2.html", "_self");
      }
  }
  /* ===================================================| / Hero moving controls |=================================================== */




  function clear()
  {
    ctx.drawImage(backgroundimage, 0, 0, cnv.width, cnv.height); // Image Height and Width
    //ctx.drawImage(shootRemove, 0, 0, cnv.width, cnv.height); // Image Height and Width
    
  }



      // Call set cyclopStatus  every 3 seconds
      setInterval(function() {
        if (Math.random() < 0.5) {
          cyclopStatus = true;
        } else {
          cyclopStatus = false;
        }
      }, 3000);
    

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
    
   
    
    setTimeout(Loop, 20);  //call loop every 20 mili sec 

  } //end loop





  Loop()

  }