const theGuy = document.getElementById('guy');
const leftIris = document.getElementById('left-iris');
const rightIris = document.getElementById('right-iris');
const leftEye = document.getElementById('left-eye');
const rightEye = document.getElementById('right-eye');
const leftEyeClosed = document.getElementById('left-eye-closed');
const rightEyeClosed = document.getElementById('right-eye-closed');
const explodeGuy = document.getElementById('explosion');
const leftEyebrow = document.getElementById('left-eyebrow');
const rightEyebrow = document.getElementById('right-eyebrow');
let animationSwitch1 = 1; //Initialize animationSwitch1
let animationSwitch2 = 1; //Initialize animationSwitch2
let irisCount = 1; //Initialize irisCount
let eyeCoefficient = 1; //Initialize eyeCoefficient
let t = 0; //Initialize t for bothIrides clearTimeout
let x = 0; //Initialize x for coord function
let y = 0; //Initialize y for coord function

coord = (e) => { //X and Y coordinates are logged.
    x = e.clientX;
    y = e.clientY;
};

poof = () => { //Guy disappears and is replaced with an explosion.
    theGuy.style.visibility = `hidden`;
    leftEye.classList = ``;
    rightEye.classList = ``;
    leftIris.style.visibility = `hidden`;
    rightIris.style.visibility = `hidden`;
    leftEyeClosed.style.opacity = '0';
    rightEyeClosed.style.opacity = '0';
    explodeGuy.style.left = `${x - 100}px`;
    explodeGuy.style.top = `${y -100}px`;
    explodeGuy.style.animation = `explode .085s linear`;
}

document.addEventListener(`click`, coord); //Clicking (tapping) anywhere in the doc calls the coordinates function, which logs clientX and clientY.
document.addEventListener(`mousemove`, coord); //Moving the mouse anywhere in the doc calls the coordinates function, which logs clientX and clientY.
theGuy.addEventListener(`click`, poof); //Clicking (tapping) on the guy calls the poof function, which replaces him with an explosion.

(eyebrows = () => {
    let eyebrowRate = ((Math.random() * 6000) + 2000); //Eyebrow rate is randomly between 2000ms inclusive and 8000ms exclusive.
    leftEyebrow.classList.toggle('left-eyebrow-up'); //Upon self invoked function calls at a rate of eyebrowRate, eyebrows function toggles between up and down classes for both left and right eyebrows, respectively, transitioning according to values set in stylesheet.
    rightEyebrow.classList.toggle('right-eyebrow-up');
    setTimeout(eyebrows, eyebrowRate);
})();

(blinking = () => {
    let blinkRate = (Math.random() * 2000) + 200; //Blink rate is randomly between 200ms inclusive and 2200ms exclusive.
    let timeClosed = (Math.random() * 120) + 20; //Duration of eyes being closed is randomly between 20ms inclusive and 140ms exclusive.
    leftEye.style.visibility = `hidden`; //Upon self invoked function calls at a rate of blinkRate, blinking function sets both eyes to hidden until the anonymous visiblity function is called by a setTimeout at the rate of timeClosed.
    rightEye.style.visibility = `hidden`;
    leftEyeClosed.style.visibility = `visible`; //Theoretically, hiding eyes should reveal closed eyes, but Safari mobile has a difficult time recognizing the respective z-indices as declared in the stylesheet, they're when eyes are hidden and hidden when eyes are visible as a precautionary measure.
    rightEyeClosed.style.visibility = `visible`;
    setTimeout(() => {
        leftEye.style.visibility = `visible`;
        rightEye.style.visibility = `visible`;
        leftEyeClosed.style.visibility = `hidden`;
        rightEyeClosed.style.visibility = `hidden`;
    }, timeClosed);
    setTimeout(blinking, blinkRate);
})();

bothIrides = () => {
    irisCount += 1; //Increase irisCount...
    let rate = (Math.random() * 500) + 200; //...set rate to random value between 200 inclusive and 700 not exclusive...
    var irisPosition = (eyeCoefficient - 8 + Math.ceil(Math.random() * 8)); //...set irisPosition as a function of Z rotation (eyeCoefficient).
    if ((irisCount !== 1) && (Math.ceil(Math.random() * 4) === 4)) { //If guy is currently popping up, override the probility that irisPosition could be at center (looking at 'camera'), otherwise there's a 25% guy will look at camera at each iteration of bothIrides function.
        irisPosition = 0;
    }
    leftIris.classList = ``; //Clear current leftIris class.
    rightIris.classList = ``; //Clear current rightIris class.
    leftIris.classList = `position-${irisPosition}`; //Set leftIris class.
    rightIris.classList = `position-${irisPosition}`;  //Set rightIris class.
    t = setTimeout(bothIrides, rate); //bothIrides calls itself at rate, is set to t so that guyPosition can clearTimeout.
};

guyPosition = (origin) => {
    clearTimeout(t); //...clear the timeout on bothIrides...
    let animationRate = (Math.random() * .4) + .1;
    if (origin === 1) { //If origin is on the left side...
        animationSwitch1 = (animationSwitch1 + 1) % 2; //...toggle the animation switch...
        var left = 44; //...set the left to 44px...
        var rotateZ = Math.floor(Math.random() * 91) + 45; //...set Z rotation to random value between 45 and 135 degrees...
        var top = Math.floor(Math.random() * 60) + 15; //...set the top position to a random value between 15 and 75%...
        var overflow = `visible`; //...set overflow to visible so that verticle scroll bar doesn't disappear...
        eyeCoefficient = Math.ceil(((rotateZ / 1.7) - 18.47)); //...set eyeCoefficient as a function of z rotation bewteen 8 and 61.
        theGuy.style.top = `${top}%`; //Set the top position as %.
        theGuy.style.left = `${left}px`; //Set the left position in px.
        theGuy.style.animation = `fromLeft-${animationSwitch1} ${animationRate}s ease`; //Guy pops up switching between identical keyframe animations to circumvent inability to immediately reuse keyframe animations without resetting.
        irisCount = 0; //Set irisCount to 0 so guy looks at resume instead of you at each animation start.
    }
    if (origin === 2) { //If origin is at the top...
        animationSwitch2 = (animationSwitch2 + 1) % 2; //...toggle the animation switch...
        var left = Math.floor(Math.random() * 61) + 20; //...set left position to random value between 20 and 80%...
        var rotateZ = Math.floor(Math.random() * 91) + 135; //...set Z rotation to random value between 135 and 225 degrees...
        var top = -58; //...set top to -58px...
        var overflow = `hidden`; //...set overflow to hidden so that scroll bar doesn't appear when guy moves far right...
        eyeCoefficient = Math.ceil((((rotateZ - 90) / 1.7) - 18.47)); //...set eyeCoefficient as a function of z rotation bewteen 8 and 61.
        theGuy.style.top = `${top}px`; //Set the top position in px.
        theGuy.style.left = `${left}%`; //Set the left position as %.
        theGuy.style.animation = `fromTop-${animationSwitch2} ${animationRate}s ease`; //Guy pops up switching between identical keyframe animations to circumvent inability to immediately reuse keyframe animations without resetting.
        irisCount = 0; //Set irisCount to 0 so guy looks at resume instead of you at each animation start.
    }
    theGuy.style.overflow = overflow; //Set overflow to hidden.
    theGuy.style.transform = `rotateZ(${rotateZ}deg)`; //Set Z rotation.
    bothIrides();
}

(controller = () => { //Controller self invokes at controllerRate.
    let controllerRate = (Math.random() * 4000) + 2000; //controllerRate is between 2000ms inclusive and 6000ms exclusive.
    let origin = Math.ceil(Math.random() * 2); //Side of entry for guy is randomly either from the left of the page or from the top of the page.
    guyPosition(origin);
    setTimeout(controller, controllerRate);
})();
