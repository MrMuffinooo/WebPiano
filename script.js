var number = -1;  // randomised to get a pitch
var note = 0;  // key-code and data-key representation
var score = 0;
var isFlatSharp = -1;

var butts = document.querySelectorAll('.butt'); // buttons with letters
var result = document.getElementById("result"); // where score is displayed
var progress = document.getElementById("progress"); // timer

var whites = document.querySelectorAll(".white");
var blacks = document.querySelectorAll(".black, .spacer");

var sharp = document.querySelector('#sharp');
var flat = document.querySelector('#flat');

var isBass = true; // shows if notes are from bass clef
var cycle = 0;  // shows how many notes are left to play on current clef, randomised on 0 and toggles {isBass}

var wiolin = false;  // shows if wiolin control is pressed
var bass = false;    // bass control

// sets random pitch, different than previous
// notes position
// aligns keyCodes to match corresponding pitches
// draws additional lines if needed

function RandomNote() {
    var top = 1;  // Elevation of note
    var temp;  // Avoids repeating {number}

    if (!cycle) {
        cycle = Math.floor(Math.random() * 5) + 5;
        if (isBass) {
            isBass = false;
        }
        else {
            isBass = true;
        }
    }

    if (!isBass) {
        document.getElementById("key").style.opacity = 1;
        document.getElementById("bass").style.opacity = 0;
    }
    else {
        document.getElementById("key").style.opacity = 0;
        document.getElementById("bass").style.opacity = 1;
    }



    do {
        temp = Math.floor(Math.random() * 15);
    } while (temp == number);
    number = temp;
    top = 20 + 14 * number;
    document.getElementById("note").style.top = top;
    sharp.style.top = top - 5;
    flat.style.top = top - 10;
    FlatSharp();


    // note's rotation
    if (number < 8) {
        document.getElementById("note").style.transform = "rotate(180deg)";
    }
    else {
        document.getElementById("note").style.transform = "rotate(0deg)";
    }

    // select correct note
    if (isBass) {
        document.getElementsByTagName("audio")[number + 12].classList.add("correct");
        switch (number) {

            case 0:
            case 7:
            case 14:
                note = 68;
                break;
            case 1:
            case 8:
                note = 67;
                break;
            case 2:
            case 9:
                note = 72;
                break;
            case 3:
            case 10:
                note = 65;
                break;
            case 4:
            case 11:
                note = 71;
                break;
            case 5:
            case 12:
                note = 70;
                break;
            case 6:
            case 13:
                note = 69;
                break;
        }
    }
    else {
        document.getElementsByTagName("audio")[number].classList.add("correct");
        switch (number) {

            case 0:
            case 7:
            case 14:
                note = 72;
                break;
            case 1:
            case 8:
                note = 65;
                break;
            case 2:
            case 9:
                note = 71;
                break;
            case 3:
            case 10:
                note = 70;
                break;
            case 4:
            case 11:
                note = 69;
                break;
            case 5:
            case 12:
                note = 68;
                break;
            case 6:
            case 13:
                note = 67;
                break;
        }
    }

    // correct key in keyboard

    if (isFlatSharp != 0 && isFlatSharp != 1) {
        if (isBass) {
            whites[15 - number].classList.add("piano-answer");
        }
        else {
            whites[27 - number].classList.add("piano-answer");
        }
    }
    else if (isFlatSharp == 1) { // flat
        if (isBass) {
            switch (number) {
                case 1:
                case 5:
                case 8:
                case 12:
                    whites[14 - number].classList.add("piano-answer");
                    break;
                default:
                    blacks[14 - number].classList.add("piano-answer");
                    break;
            }
        }
        else {
            switch (number) {
                case 3:
                case 6:
                case 10:
                case 13:
                    whites[26 - number].classList.add("piano-answer");
                    break;
                default:
                    blacks[26 - number].classList.add("piano-answer");
                    break;
            }
        }
    }
    else if (isFlatSharp == 0) { // sharp
        if (isBass) {
            switch (number) {
                case 2:
                case 6:
                case 9:
                case 13:
                    whites[16 - number].classList.add("piano-answer");
                    break;
                default:
                    blacks[15 - number].classList.add("piano-answer");
                    break;
            }
        }
        else {
            switch (number) {
                case 0:
                case 4:
                case 7:
                case 11:
                case 14:
                    whites[28 - number].classList.add("piano-answer");
                    break;
                default:
                    blacks[27 - number].classList.add("piano-answer");
                    break;
            }
        }
    }



    // shows additional lines if needed
    var short = document.querySelectorAll('.short');  // short lines above and below
    if (number < 2) {
        short[0].style.opacity = "1";
        short[1].style.opacity = "0";
    } else if (number > 12) {
        short[0].style.opacity = "0";
        short[1].style.opacity = "1";
    }
    else {
        short[0].style.opacity = "0";
        short[1].style.opacity = "0";
    }
}

// # and b
function FlatSharp() {
    isFlatSharp = Math.floor(Math.random() * 2);
    if (isFlatSharp == 0) {
        sharp.style.opacity = 1;
        flat.style.opacity = 0;
    }
    else if (isFlatSharp == 1) {
        sharp.style.opacity = 0;
        flat.style.opacity = 1;
    }
    else {
        sharp.style.opacity = 0;
        flat.style.opacity = 0;
    }
}


// determines wether correct key pressed
// determines wether legitimate key pressed
// handles button anim
window.addEventListener('keydown', playNote);
function playNote(e) {

    if (e.keyCode == note) {
        correctKey();
        RandomNote();
    }
    else if (e.keyCode > 64 && e.keyCode < 73 && e.keyCode != 66) {
        wrongKey();
    }
    var butt = document.querySelector(`.butt[data-key="${e.keyCode}"]`);
    butt.classList.add("playing");

}
// handles clicking
butts.forEach(b => b.addEventListener('click', function (e) {

    if (this.dataset["key"] == note) {
        correctKey();
        RandomNote();
    }
    else {
        wrongKey();
    }

    var butt = document.querySelector(`.butt[data-key="${this.dataset['key']}"]`);
    butt.classList.add("playing");
}));

// keyboard presses
whites.forEach(w => w.addEventListener('click', function (e) {

    this.classList.add("pressed");

    if (this.classList.contains("piano-answer")) {
        correctKey();
        RandomNote();
    }
    else {
        wrongKey();
    }
}));
whites.forEach(w => w.addEventListener('animationend', function (e) {
    this.classList.remove("pressed");
}));

blacks.forEach(b => b.addEventListener('click', function (e) {

    this.classList.add("pressed");

    if (this.classList.contains("piano-answer")) {
        correctKey();
        RandomNote();
    }
    else {
        wrongKey();
    }
}));
blacks.forEach(b => b.addEventListener('animationend', function (e) {
    this.classList.remove("pressed");
}));


// removes anim link on anim end on result butt
result.addEventListener("animationend", function (e) {
    result.classList.remove("animated");
    result.classList.remove("wrong");
});


// removes anim link on anim end on butts
butts.forEach(b => b.addEventListener('transitionend', removeTransition));
function removeTransition(e) {
    if (e.propertyName != 'box-shadow') return;
    this.classList.remove("playing");
    // progress.classList.add("decrease");
}



// timeout
// resets score
// handles result butt w/o animation
progress.addEventListener("animationend", function (e) {
    score = 0;
    //result.innerHTML = `<i class="icon icon-cancel"></i>`;
    result.style.backgroundColor = "red";
})

// adds score
// plays note
// reduces cycle
// handles result butt
function correctKey() {

    cycle--;
    var audio = document.getElementsByClassName("correct")[0];
    audio.play();
    audio.classList.remove("correct");
    document.getElementsByClassName("piano-answer")[0].classList.remove("piano-answer");

    if (!ishelp) {
        score++;
        result.innerHTML = score;
        result.style.backgroundColor = "limegreen";
        result.classList.add("animated");
        progress.classList.remove("decrease");
        setTimeout(() => {
            progress.classList.add("decrease");
        }, 100);
    }
    else {
        result.innerHTML = `<i class="icon icon-cancel"></i>`;
        result.style.backgroundColor = "grey";
    }
}

// plays oof
// resets score
// handles result butt
function wrongKey() {
    score = 0;
    if (!ishelp) {
        document.getElementById("oof").currentTime = 0;
        document.getElementById("oof").play();

        //result.innerHTML = `<i class="icon icon-cancel"></i>`;
        result.style.backgroundColor = "red";
        result.classList.add("wrong");
        progress.classList.remove("decrease");
    }
}

// START
RandomNote();




// Help

var halp = document.getElementById("halp");  // image with notes
var halpbut = document.getElementById("help-but-ask");  // ? to toggle help
var ishelp = false;  // shows if help is being displayed

halpbut.addEventListener("click", function (e) {
    ishelp = !ishelp;
    if (ishelp) {
        halp.style.opacity = 1;
        progress.classList.remove("decrease");
    }
    else {
        halp.style.opacity = 0;
    }
})

// Select specific clef to train

var wiolinControl = document.getElementsByClassName("controls")[0];
var bassControl = document.getElementsByClassName("controls")[1];

wiolinControl.addEventListener("click", function (e) {
    if (wiolin) {
        wiolin = false;
        cycle = 1;

        wiolinControl.classList.remove("control-pressed");
    }
    else {
        bass = false;
        wiolin = true;
        isBass = false;
        cycle = -1;

        wiolinControl.classList.add("control-pressed");
        bassControl.classList.remove("control-pressed");
    }
})

bassControl.addEventListener("click", function (e) {
    if (bass) {
        bass = false;
        cycle = 1;

        bassControl.classList.remove("control-pressed");
    }
    else {
        bass = true;
        wiolin = false;
        isBass = true;
        cycle = -1;

        bassControl.classList.add("control-pressed");
        wiolinControl.classList.remove("control-pressed");
    }
})