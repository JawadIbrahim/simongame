window.onload = () => {

    // game config
    let lvlPDly = 300;

    let btns = document.querySelectorAll("#btnContn button");
    let startPge = document.getElementById("startPge");
    let resetPge = document.getElementById("resetPge");
    let lvlTg = document.getElementsByClassName("lvlId");
    let colors = ["red", "green", "yellow", "blue"];

    let isGStart = false;
    let rndmNum;
    let rndmBtn;
    let rndp = [];
    let pPtern = [];
    let rndmPL = rndp.length;
    let pCkdT = 0;
    let lvl = 0;
    let wrongClik;


    // start page
    document.getElementById("btnStart").addEventListener("click", (e) => {
        isGStart = true;
        e.target.innerText = "Started";
        startPge.classList.add("strtpgAnim");
        setTimeout(() => {
            startPge.style.display = "none";
            makeP()
        }, 3000);
    });


    // onclick
    for (let x = 0; x < btns.length; x++) {
        btns[x].addEventListener("click", (e) => {
            if (isGStart) {
                onclikAnim(e)
                onclicked(e)
            }
        })
    }

    // main function
    function onclicked(e) {

        if (rndmPL > pCkdT) {

            pPtern.push(e.target.id);

            if (e.target.id == rndp[pCkdT]) {
                // when win
                pCkdT += 1;
                if (rndmPL == pCkdT) {
                    pCkdT = 0;
                    pPtern = [];
                    lvl += 1;
                    lvlTg[0].innerText = lvl;
                    setTimeout(() => { makeP() }, lvlPDly)
                }
            } else {
                // when lose
                wrongClik = e.target.id;
                lvlTg[1].innerText = lvl;
                isGStart = false;
                resetG()
            }

        }

    }


    // make pattern
    function makeP() {
        rndmNum = Math.floor((Math.random() * 4));
        rndmBtn = document.getElementById(colors[rndmNum]);

        setTimeout(() => {
            rndp.push(colors[rndmNum])
            blinkAnima(rndmBtn)
            rndmPL = rndp.length;
        }, lvlPDly)
    }

    // animation choosen
    function blinkAnima(randmBtn) {
        randmBtn.classList.add("blinkAnim");
        setTimeout(() => {
            randmBtn.classList.remove("blinkAnim");
        }, 700);
    }

    function onclikAnim(e) {
        document.getElementById(e.target.id).classList.add("onclik");
        setTimeout(() => {
            document.getElementById(e.target.id).classList.remove("onclik")
        }, 100);
    }

    // reset game
    function resetG() {
        resetPge.style.display = "flex";

        // showing game pattern
        console.log(rndp)
        if (rndp.length > 4) {
            document.getElementById("gPtern").innerText = ".... , " + rndp[rndp.length - 4] + ", " + rndp[rndp.length - 3] + ", " + rndp[rndp.length - 2] + ", " + rndp[rndp.length - 1];
        } else {
            document.getElementById("gPtern").innerText = rndp;
        }

        // showing player pattern
        //console.log(pPtern)
        //if (pPtern.length > 4) {
        //    document.getElementById("pPtern").innerText = ".... , " + pPtern[pPtern.length - 4] + ", " + pPtern[pPtern.length - 3] + ", " + pPtern[pPtern.length - 2] + ", " + pPtern[pPtern.length - 1];
        //} else {
        //    document.getElementById("pPtern").innerText = pPtern;
        //}

        // document.getElementById("wrgclk").innerText = wrongClik;
        // document.getElementById("ioc").innerText = rndp[(rndp.length-1)-(pPtern.length - 1)];


        // reset variable
        rndp = [];
        rndmPL = rndp.length;
        pCkdT = 0;
        lvl = 0;
        lvlTg[0].innerText = lvl;
    }


    // restart Game
    document.getElementById("resetBtn").addEventListener("click", () => {
        setTimeout(() => {
            resetPge.style.display = "none";
            isGStart = true;
            makeP();
        }, 2000);
    });

}

