const theGuy = document.getElementById('guy');
const leftIris = document.getElementById('left-iris');
const rightIris = document.getElementById('right-iris');
const leftEye = document.getElementById('left-eye');
const rightEye = document.getElementById('right-eye');
let animationSwitch1 = 1; //Initialize animationSwitch1
let animationSwitch2 = 1; //Initialize animationSwitch2
let irisCount = 1; //Initialize irisCount
let eyeCoefficient = 1; //Initialize eyeCoefficient
let t = 0; //Initialize t for bothIrides clearTimeout





(blinking = () => {

    let blinkRate = (Math.random() * 2000) + 200;
    let timeClosed = (Math.random() * 180);
    leftEye.style.visibility = `hidden`;
    rightEye.style.visibility = `hidden`;

    setTimeout(() => {
        leftEye.style.visibility = `visible`;
        rightEye.style.visibility = `visible`;
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
    if (origin === 1) { //If origin is on the left side...
        clearTimeout(t); //...clear the timeout on bothIrides...
        animationSwitch1 = (animationSwitch1 + 1) % 2; //...toggle the animation switch...
        var left = 44; //...set the left to 44px...
        var rotateZ = Math.floor(Math.random() * 91) + 45; //...set Z rotation to random value between 45 and 135 degrees...
        var top = Math.floor(Math.random() * 60) + 15; //...set the top position to a random value between 15 and 75%...
        var overflow = `visible`; //...set overflow to visible so that verticle scroll bar doesn't disappear...
        eyeCoefficient = Math.ceil(((rotateZ / 1.7) - 18.47)); //...set eyeCoefficient as a function of z rotation bewteen 8 and 61.
        theGuy.style.top = `${top}%`; //Set the top position as %.
        theGuy.style.left = `${left}px`; //Set the left position in px.
        theGuy.style.animation = `fromLeft-${animationSwitch1} .1s ease`; //Guy pops up switching between identical keyframe animations to circumvent inability to immediately reuse keyframe animations without resetting.
        irisCount = 0; //Set irisCount to 0 so guy looks at resume instead of you at each animation start.
    }
    if (origin === 2) { //If origin is at the top...
        clearTimeout(t); //...clear the timeout on bothIrides...
        animationSwitch2 = (animationSwitch2 + 1) % 2; //...toggle the animation switch...
        var left = Math.floor(Math.random() * 61) + 20; //...set left position to random value between 20 and 80%...
        var rotateZ = Math.floor(Math.random() * 91) + 135; //...set Z rotation to random value between 135 and 225 degrees...
        var top = -58; //...set top to -58px...
        var overflow = `hidden`; //...set overflow to hidden so that scroll bar doesn't appear when guy moves far right...
        eyeCoefficient = Math.ceil((((rotateZ - 90) / 1.7) - 18.47)); //...set eyeCoefficient as a function of z rotation bewteen 8 and 61.
        theGuy.style.top = `${top}px`; //Set the top position in px.
        theGuy.style.left = `${left}%`; //Set the left position as %.
        theGuy.style.animation = `fromTop-${animationSwitch2} .1s ease`; //Guy pops up switching between identical keyframe animations to circumvent inability to immediately reuse keyframe animations without resetting.
        irisCount = 0; //Set irisCount to 0 so guy looks at resume instead of you at each animation start.
    }
    theGuy.style.overflow = overflow; //Set overflow to hidden.
    theGuy.style.transform = `rotateZ(${rotateZ}deg)`; //Set Z rotation.
    bothIrides();
}


(controller = () => {
    let rate = (Math.random() * 4000) + 2000;
    let origin = Math.ceil(Math.random() * 2);
    guyPosition(origin);
    setTimeout(controller, rate);
})();
