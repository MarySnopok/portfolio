// Inspired by Dribble.
// Created following this tutorial : https://tympanus.net/codrops/2018/12/06/interactive-repulsion-effect-with-three-js/
// *** Paired programming project under mentorship of Corey Maler (https://github.com/Corey-Maler) ***
//  comments are provided for the purpose of code review simplification

//space between any 2 dots
const DOT_SPACING = 50;

const DOT_SIZE = 20;
// focus distance
const ATTACK_DISTANCE = 100;

const canvas = document.getElementById("dots");

const dots = [];

const dotsPositions = [];

//width and height of the canvas
let w = canvas.offsetWidth;
let h = canvas.offsetHeight;

//variables for mouse/cursor position on x and y axes
let mx = 0;
let my = 0;

let alreadyListening = false;

//calculation of background
const calculateBG = () => {
  dots.forEach((dot, dotIndex) => {
    //getting every dots array of coordinates by index from the assigned array
    const dotPosition = dotsPositions[dotIndex];
    //getting every dot x and y coordinates
    const dotX = dotPosition[0];
    const dotY = dotPosition[1];
    //distanse from each dot to the cursor
    const dx = dotX - mx;
    const dy = dotY - my;
    //calculating distance between mouse cursor and every dot
    const dist = Math.sqrt(dx * dx + dy * dy);
    //scaling distnace to the
    const scaleFactor = dist / 5000;
    // if dot is withing assigned mouse focus radius color it in pink
    // otherwise remove pink color
    if (dist < ATTACK_DISTANCE) {
      dot.classList.add("color");
    } else {
      dot.classList.remove("color");
    }
    //?
    dot.style.boxShadow = `${dx * scaleFactor * -1}px ${dy * scaleFactor * -1}px 4px 0 rgba(0, 0, 0, .1) inset`;
  });
};

//creation of the dot
const createDot = (x, y) => {
  const dot = document.createElement("div");
  dot.className = "dot";
  //placing of the dot on exact space
  dot.style.left = x + "px";
  dot.style.top = y + "px";

  //adding created dot and its coordinates to the preasigned arrays
  dots.push(dot);
  // adding center coorditanes of dot to the array
  dotsPositions.push([x + DOT_SIZE / 2, y + DOT_SIZE / 2]);
  //rendering dot on canvas element
  canvas.appendChild(dot);
};

//function to understand the coorditates of mouse movement
// evt.clientX - distance between mouse and view port left border
// rect.left - distance between canvas border and view port left border
const onMouseMove = (evt) => {
  const rect = canvas.getBoundingClientRect();
  mx = evt.clientX - rect.left;
  my = evt.clientY - rect.top;

  calculateBG();
};

// generic function to initiate the grid layout and call the dot drawing function , listen to mouse move
const init = () => {
  w = canvas.offsetWidth;
  h = canvas.offsetHeight;
  for (let x = DOT_SPACING; x < w; x += DOT_SPACING + DOT_SIZE) {
    for (let y = DOT_SPACING; y < h; y += DOT_SPACING + DOT_SIZE) {
      createDot(x, y);
    }
  }

  if (!alreadyListening) {
    canvas.addEventListener("mousemove", onMouseMove);
    alreadyListening = true;
  }
  calculateBG();
};

init();

window.addEventListener("resize", () => {
  console.log("resize");
  canvas.innerHTML = "";
  dots.length = 0;
  dotsPositions.length = 0;
  init();
});
