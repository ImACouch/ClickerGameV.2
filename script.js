score = 0;

//mnutipyer upgrade
bace_mutiplyer=1;
Mutiplyer_upgrade_cost = 20;
Mutiplyer_leval = 1;
Mutiplyer_upgrade_reword = 0.1; // +0.1 money per click
Mutiplyer_upgrade_cost_increas = 1.1; // 10% incres cost of next upgrade

Mutiplyer_evolshon_crent_step = 15;
Mutiplyer_evolshon_leval_steps = 15; //evry 15 levlas it evols
Mutiplyer_evolshon_reword=0.1; // the amout of mutiplyer increase per evolshon

//auto clicker
acr_cost = 120
acr_bace = 1
acr_leval = 1
acr_add_about = 1

//achvemnts
ac_bigger_button = false
ac_unlock_helper = false

ac_silver_button = false
ac_gold_button = false
ac_platnum_button = false

ac_100000_milestone = false
ac_1mil_milestone = false
ac_10mil_milestone = false

function click() {
    //runns evry time the main click me button is pressed
    score = score + calculate_income_from_click();
    update();
}
//Click event lisiner
const button = document.getElementById('clicker');
button.addEventListener('click', click);

//mutiplyer upgrade
function buy_mutiplyer() {
    if (score>=Mutiplyer_upgrade_cost) {
        //check for evolshon
        if(Mutiplyer_leval>=Mutiplyer_evolshon_crent_step) {
            Mutiplyer_evolshon_crent_step += Mutiplyer_evolshon_leval_steps;
            Mutiplyer_upgrade_reword += Mutiplyer_evolshon_reword;
        }

        score = score - Mutiplyer_upgrade_cost;
        Mutiplyer_upgrade_cost = Mutiplyer_upgrade_cost * Mutiplyer_upgrade_cost_increas;
        Mutiplyer_leval = Mutiplyer_leval + 1;
        bace_mutiplyer = bace_mutiplyer + Mutiplyer_upgrade_reword;

        
        
    }
    

    update();
    
}
//Click event lisiner
const mutiplyer_upgrade_b = document.getElementById('upgrade');
mutiplyer_upgrade_b.addEventListener('click', buy_mutiplyer);

//auto clicker const
const AutoClicker_b = document.getElementById('HCPS');
const AutoClicker_D = document.getElementById('HCPST');
AutoClicker_b.addEventListener('click', buy_auto_clicker);

function buy_auto_clicker() {
    if (ac_unlock_helper==true) {
        if (score>=acr_cost) {
            score = score - acr_cost;
            acr_leval = acr_leval + 1;
            acr_cost += 120+acr_leval*10 ;
            acr_bace = acr_bace + 1;
        }
    }
    update();
    
}

function auto_clicker_tick() { 
    score = score + calculate_income_from_click()*acr_bace;
    update();
}



//updating stuff ---------------------------------------------------------
function update() {
    check_for_achevemts();
    update_vishuwals();
}

function update_vishuwals() {
    //updates the vishuwals
    document.getElementById("score_display").innerHTML = mround(score);

    //data displays update
    Mutiplyer_display.innerHTML = "Money per click: "+mround(calculate_income_from_click(false));

    //upgrade button vishuwals
    //--------------------------------
    mutiplyer_upgrade_b.innerHTML = "+"+mround(Mutiplyer_upgrade_reword) + " PC - "+mround(Mutiplyer_upgrade_cost)+" Clicks | Level: "+Mutiplyer_leval;
    
    if (score >= Mutiplyer_upgrade_cost) { // reguler upgrade vishuwal
        mutiplyer_upgrade_b.style.backgroundColor = "green";
    } else {
        mutiplyer_upgrade_b.style.backgroundColor = "red";
    }

    if (Mutiplyer_evolshon_crent_step<=Mutiplyer_leval) { //evolshon and its vishuwals
        if (score >= Mutiplyer_upgrade_cost) {
            mutiplyer_upgrade_b.style.backgroundColor = "gold" 
        } else {
            mutiplyer_upgrade_b.style.backgroundColor = "gray" 
        }
        mutiplyer_upgrade_b.innerHTML="Evolve! "+mround(Mutiplyer_upgrade_cost)+" Clicks (+"+mround(Mutiplyer_upgrade_reword+Mutiplyer_evolshon_reword)+" PC)"
    }

    //auto clicker button vishuwals
    if (ac_unlock_helper == true) {
        AutoClicker_D.innerHTML = "Auto Clickers: "+acr_leval+  " | +"+mround(calculate_income_from_click(false)*acr_bace)+" CPS";
        AutoClicker_b.innerHTML = "+1 CPS - "+acr_cost+" Clicks | Lv."+acr_leval;

        if (score >= acr_cost) {
            AutoClicker_b.style.backgroundColor = "green";
        } else {
            AutoClicker_b.style.backgroundColor = "red";
        }
    }
    //--------------------------------
}

function check_for_achevemts() {
    //checks for achevments

    //bigger button
    if (ac_bigger_button==false) {if (score>=100) { ac_bigger_button=true; achevment_window("Achievement unlocked! 100 Big ones - reward bigger button");
            button.style.width = "350px";
            button.style.height = "350px";
            button.style.borderBlockWidth = 20;
    }}

    //unlock auto clicker
    if (ac_unlock_helper==false) {
        //make it locked
        AutoClicker_b.innerHTML = "- - - locked - - -";
        AutoClicker_b.style.backgroundColor = "gray";
        AutoClicker_D.style.visibility = "hidden";
        
        //achevemnt
        if (Mutiplyer_leval>=20) { ac_unlock_helper=true; achevment_window("Achevment unlocked! Need a hand? - reward auto cliker");
        AutoClicker_D.style.visibility = "visible";
        var intervalId = window.setInterval(function(){ auto_clicker_tick() }, 1000);
    }} 

    //silver button
    if (ac_silver_button==false) {if (score>=500) {ac_silver_button=true; achevment_window("Achevment unlocked! A weathey man needs a weathey button - reward silver button with 25% chance to give triple cash");
        button.style.backgroundColor = "silver";
        
    }}
    //gold button
    if (ac_gold_button==false) {if (score>=2500) {ac_gold_button=true; achevment_window("Achevment unlocked! A rich man needs a rich button - reward gold button with 50% chance to give triple cash");
        button.style.backgroundColor = "gold";
        
    }}
    //platnum button
    if (ac_platnum_button==false) {if (score>=5000) {ac_platnum_button=true; achevment_window("Achevment unlocked! The rich ... just get richer - reward platnum button that gives triple cash");
        button.style.backgroundColor = "rgba(176, 176, 176, 1)";
        button_shine(true);
        
    }else {button_shine(false);}}

    //100000 milestone
    if (ac_100000_milestone==false) {if (score>=100000) {ac_100000_milestone=true; achevment_window("... ok you can stop know. Theres no more to do");
    }}

    //1mil milestone
    if (ac_1mil_milestone==false) {if (score>=1000000) {ac_1mil_milestone=true; achevment_window("Ok 1mil this is INSANE go tuch grass ... please!");
    }}

    //10mil milestone
    if (ac_10mil_milestone==false) {if (score>=10000000) {ac_10mil_milestone=true; achevment_window("10mil ok then you win! Thanks for playing my game! Credis: Alex Sylling - proggramer/designer, You - player/tester, Made by AJ. Studios. Thank you for playing my game. now GO OUT SIDE!");
    }}


}

//data display links
const Mutiplyer_display = document.getElementById('PCtext'); // the display show how much money you get per click









//utillity functions
function mround(number) {
    return Math.round(number * 100) / 100
}

//achevemnt popup

const overlay = document.getElementById('overlay');
const textBox = document.getElementById('text-box');

function achevment_window(text) {
    textBox.innerHTML = `<p>${text}</p><button onclick="achevment_window_close()">Continue</button>`;
    overlay.style.display = 'flex';
}

function achevment_window_close() {
    overlay.style.display = 'none';
}

function calculate_income_from_click(random=true) {
    to_return = bace_mutiplyer;

    //button chances
    if (random==true) { //only do this if random is true
    if (ac_platnum_button==true) {if (Math.random() * 100 < 100) {to_return*=3; console.log("platnum");}} else { //platnum button chance
    if (ac_gold_button==true) {if (Math.random() * 100 < 50) {to_return*=3; console.log("gold");}} else { //gold button chance
    if (ac_silver_button==true) {if (Math.random() * 100 < 25) {to_return*=3; console.log("silver");}} //silver button chance
    }}}  else if (ac_platnum_button==true) {    to_return*=3} //still do the planum becus its 100% chance
    
    return to_return;
}

function button_shine(on=true) {
    if (on==true) {
        button.classList.add('shiny');
    } else {
        button.classList.remove('shiny');
    }
}

//Saving and loading from local stroige ---------------------------------------------------------------------------

function save_loop() {
    saveToLocalStorage();
    setTimeout(save_loop, 5000);
}

// Save all variables to local storage
function saveToLocalStorage() {
    const gameState = {
        score,
        bace_mutiplyer,
        Mutiplyer_upgrade_cost,
        Mutiplyer_leval,
        Mutiplyer_upgrade_reword,
        Mutiplyer_upgrade_cost_increas,
        Mutiplyer_evolshon_crent_step,
        Mutiplyer_evolshon_leval_steps,
        Mutiplyer_evolshon_reword,
        acr_cost,
        acr_bace,
        acr_leval,
        acr_add_about,
        ac_bigger_button,
        ac_unlock_helper,
        ac_silver_button,
        ac_gold_button,
        ac_platnum_button,
        ac_100000_milestone,
        ac_1mil_milestone,
        ac_10mil_milestone
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    console.log("Game saved:", gameState);
    
}

// Load all variables from local storage
function loadFromLocalStorage() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        score = gameState.score;
        bace_mutiplyer = gameState.bace_mutiplyer;
        Mutiplyer_upgrade_cost = gameState.Mutiplyer_upgrade_cost;
        Mutiplyer_leval = gameState.Mutiplyer_leval;
        Mutiplyer_upgrade_reword = gameState.Mutiplyer_upgrade_reword;
        Mutiplyer_upgrade_cost_increas = gameState.Mutiplyer_upgrade_cost_increas;
        Mutiplyer_evolshon_crent_step = gameState.Mutiplyer_evolshon_crent_step;
        Mutiplyer_evolshon_leval_steps = gameState.Mutiplyer_evolshon_leval_steps;
        Mutiplyer_evolshon_reword = gameState.Mutiplyer_evolshon_reword;
        acr_cost = gameState.acr_cost;
        acr_bace = gameState.acr_bace;
        acr_leval = gameState.acr_leval;
        acr_add_about = gameState.acr_add_about;
        ac_bigger_button = gameState.ac_bigger_button;
        ac_unlock_helper = gameState.ac_unlock_helper;
        ac_silver_button = gameState.ac_silver_button;
        ac_gold_button = gameState.ac_gold_button;
        ac_platnum_button = gameState.ac_platnum_button;
        ac_100000_milestone = gameState.ac_100000_milestone;
        ac_1mil_milestone = gameState.ac_1mil_milestone;
        ac_10mil_milestone = gameState.ac_10mil_milestone;
    }
}

// Call loadFromLocalStorage when the page loads
window.onload = function() {
    loadFromLocalStorage();
    update(); // Update the UI with the loaded values
    save_loop(); // Start the save loop
}
//---------------------------------------------------------------------------




//updates when page is done loading
update();