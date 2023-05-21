
  window.onload = init();

  function init()
  {
    
      var cnv = document.getElementById("scene2"); 
      var ctx = cnv.getContext("2d"); 
      ctx.fillStyle = "white";   // set background to white
      ctx.rect(0,0,1200,749);
      ctx.fill();

      //////////Loading Image Object & image draw function  for 1st seen//////////////////

      var backgroundimage = new Image(); //make image object
      backgroundimage.src = "./Images/Dongen.webp"; // set the image file path

    
      // Coordinates and speed of Hero (Player)
      var hx = 10;  // Hero X coordinate
      var hy = 350; // Hero Y coordinate
      var SPEED = 5;

      // Coordinates of Cyclope (Monster)
      var cx = 850; // Cyclop X coordinate 
      var cy = 0;// Cyclop y coordinate 

      // Coordinates of the Rock
      rx = 350;
      ry = 325;


      var heroStatus = false; // Hero doesn't move

 
      hourcount = 0;


      function bat()
      {
            var batFly = new Image(); //make image object for Cyclop
            batFly.src = "./Images/bat.png"; // set the image file path for Cyclop
            ctx.drawImage(batFly, cx, cy, 200,100); // Image Height and Width for Cyclop
      }




    

      function heroDown()
      {
            var heroDown = new Image(); //make image object for pirateUp
            heroDown.src = "./Images/hero-scene1.png"; // set the image file path for pirateUp
            ctx.drawImage(heroDown, hx, hy,100,200); // Image Height and Width for pirateUp
          
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
    heroStatus = true;   // to change pirate image 
  }, false);

  addEventListener("keyup",   function (e)  
  {
    delete keyPress[e.keyCode];
      heroStatus = false; // to change pirate image 
  }, false);




  /* ===================================================| Hero moving controls |=================================================== */
  function upDate()
  {
    

      checkVisibility();

      if(37 in keyPress){ // left arrorw
        hx =  hx - SPEED;
      }
    
      if (39 in keyPress){  // right arrow
        hx = hx + SPEED;
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
   

     bat();
    
  

      
     
      
      if(heroStatus == true)
        {
          heroUp();
        }
        else if(heroStatus == "dead")
        {
          heroDead();
      } else{
        heroDown();
      }

        


  }



  function Loop() {
    clear();
    draw();
    upDate();
    

    
    setTimeout(Loop, 20);  //call loop every 20 mili sec 

  } //end loop





  Loop()

  }