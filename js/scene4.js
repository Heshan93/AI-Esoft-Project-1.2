window.onload = init();

function init() {
  var cnv = document.getElementById("scene4");
  var ctx = cnv.getContext("2d");
  ctx.fillStyle = "white"; // set background to white
  ctx.rect(0, 0, 1200, 749);
  ctx.fill();


  
 function youWin() {
  var youWinImg = new Image();
  youWinImg.onload = function() {
    ctx.drawImage(youWinImg, 300, 0, 500, 390);
  };
  youWinImg.src = "./Images/you win.jpg";
}
function youWinCup() {
  var youWinCupImg = new Image();
  youWinCupImg.onload = function() {
    ctx.drawImage(youWinCupImg, 450, 350, 200, 200);
  };
  youWinCupImg.src = "./Images/You Win.gif";
}

youWin();
 youWinCup();

}

