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

acr_delay = 5000; //5 secounds

//achvemnts
ac_bigger_button = false
ac_unlock_helper = false

ac_silver_button = false //lv.2
ac_gold_button = false //lv.3
ac_platnum_button = false //lv.4
ac_rubie_button = false //lv.5
ac_sapphire_button = false //lv.6
ac_emerald_button = false //lv.7
ac_diamond_button = false //lv.8

ac_button_leval = 1;

ac_100000_milestone = false
ac_1mil_milestone = false
ac_10mil_milestone = false

//debug settings:
Dont_Load_data = false; //if true it wount load your safe data (esenchiley restarting your game)
inf_money = false; //if true you will have inf money
unlock_all_achevemnts = false; //if enabold unlock all achevments

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
    
    setTimeout(auto_clicker_tick, acr_delay);
}



//updating stuff ---------------------------------------------------------
function update(skip_achvemnt,force_run_achevments=false) { //rforce means if achevment is set as true run it
    check_for_achevemts(skip_achvemnt,force_run_achevments);
    update_vishuwals();

    if (inf_money==true) {score=9007199254740991;}
    
}

function update_vishuwals() {
    //updates the vishuwals
    document.getElementById("score_display").innerHTML = mround(score);

    //data displays update
    Mutiplyer_display.innerHTML = "Money per click: "+mround(calculate_income_from_click(false));

    //upgrade button vishuwals
    //--------------------------------
    mutiplyer_upgrade_b.innerHTML = "+"+mround(Mutiplyer_upgrade_reword*calclate_mutiplyer()) + " PC - "+mround(Mutiplyer_upgrade_cost)+" Clicks | Level: "+Mutiplyer_leval;
    
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
        AutoClicker_D.innerHTML = "Auto Clickers: "+acr_leval+  " | +"+mround(calculate_income_from_click(false)*acr_bace)+" | Every "+mround(acr_delay/1000)+"s";
        AutoClicker_b.innerHTML = "+1 CPS - "+acr_cost+" Clicks | Lv."+acr_leval;

        if (score >= acr_cost) {
            AutoClicker_b.style.backgroundColor = "green";
        } else {
            AutoClicker_b.style.backgroundColor = "red";
        }
    }
    //--------------------------------
    //updates the porggres bar for buttons
    updatebuttonproggresBar_fromArray();
}

function check_for_achevemts(skip_achvemnt,force_run_achevments) {


    function force_chevment_check(variable, func) {
        //when ofrce_run_achevemnt is active (when loading save data) if a achevemnt is saved as true run it (Skiping check for reqirements)
        if (force_run_achevments == true && window[variable] == true) {
            func();
            window[variable] = true;
        }
    }

    //checks for achevments

    //bigger button --- --- ---
    force_chevment_check('ac_bigger_button', biggger_button);
    //funshon when its unlocked
    function biggger_button() {
        button.style.width = "350px";
        button.style.height = "350px";
        button.style.borderBlockWidth = 20;
    }
    //unlock check
    if (ac_bigger_button==false) {if (score>=100) { ac_bigger_button=true; achevment_window("Achievement unlocked! 100 Big ones - reward bigger button",skip_achvemnt);
            biggger_button();//unlocks achevemnt after checks
    }}

    //unlock auto clicker --- --- ---
    force_chevment_check('ac_unlock_helper', auto_clicker_unlock);
    function auto_clicker_unlock() {
        AutoClicker_D.style.visibility = "visible";
        auto_clicker_tick(); //starts auto clicker loop
    }

    if (ac_unlock_helper==false) {
        //make it locked
        if (ac_unlock_helper==false) {
        AutoClicker_b.innerHTML = "- - - locked - - -";
        AutoClicker_b.style.backgroundColor = "gray";
        AutoClicker_D.style.visibility = "hidden";
        } 
        
        //achevemnt
        if (Mutiplyer_leval>=20) { ac_unlock_helper=true; achevment_window("Achevment unlocked! Need a hand? - reward auto cliker",skip_achvemnt);
        auto_clicker_unlock();
    }} 

    //Buttons  --- --- ---

    //silver button
    force_chevment_check('ac_silver_button', uc_silver_button);
    function uc_silver_button() {
        button.style.backgroundColor = "silver";
        ac_button_leval+=1;
    }
    if (ac_silver_button==false) {if (score>=750) {ac_silver_button=true; achevment_window("Achevment unlocked! A weathey man needs a weathey button - reward silver button with 25% chance to give triple cash",skip_achvemnt);
        uc_silver_button();
    }}
    //gold button
    force_chevment_check('ac_gold_button', uc_gold_button);
    function uc_gold_button() {
        button.style.backgroundColor = "gold";
        ac_button_leval+=1;
    }
    if (ac_gold_button==false) {if (score>=2500) {ac_gold_button=true; achevment_window("Achevment unlocked! A rich man needs a rich button - reward gold button with 50% chance to give triple cash",skip_achvemnt);
        uc_gold_button();
    }}
    //platnum button
    force_chevment_check('ac_platnum_button', uc_platnum_button);
    function uc_platnum_button() {
        button.style.backgroundColor = "rgba(176, 176, 176, 1)";
        ac_button_leval+=1;
    }
    if (ac_platnum_button==false) {if (score>=5000) {ac_platnum_button=true; achevment_window("Achevment unlocked! The rich ... just get richer - reward platnum button that gives triple cash",skip_achvemnt);
        uc_platnum_button();
    }}

    //rubie button
    force_chevment_check('ac_rubie_button', uc_rubie_button);
    function uc_rubie_button() {
        button.style.backgroundColor = "rgb(240, 27, 27)";
        ac_button_leval+=1;
        acr_delay=4000; //change auto clicker speed
    }
    if (ac_rubie_button==false) {if (score>=25000) {ac_rubie_button=true; achevment_window("Achevment unlocked! Money is not a object.  - reward ruby button + decres delay for auto clickers by 1s",skip_achvemnt);
        uc_rubie_button();
    }}

    //Sapphire button
    force_chevment_check('ac_sapphire_button', uc_sapphire_button);
    function uc_sapphire_button() {
        button.style.backgroundColor = "rgb(13, 51, 218)";
        ac_button_leval+=1;
        acr_delay=3000; //change auto clicker speed
    }
    if (ac_sapphire_button==false) {if (score>=50000) {ac_sapphire_button=true; achevment_window("Achevment unlocked! I hear you like shiney things.  - reward Sapphire button + decrease delay for auto clickers by 1s",skip_achvemnt);
        uc_sapphire_button();
    }}

    //Emerald button
    force_chevment_check('ac_emerald_button', uc_emerald_button);
    function uc_emerald_button() {
        button.style.backgroundColor = "rgb(58, 165, 93)";
        ac_button_leval+=1;
        acr_delay=2000; //change auto clicker speed
    }
    if (ac_emerald_button==false) {if (score>=75000) {ac_emerald_button=true; achevment_window("Achevment unlocked! Minecraft anyone?.  - reward Emerald button + decrease delay for auto clickers by 1s",skip_achvemnt);
        uc_emerald_button();
    }}

    //Diamond button
    force_chevment_check('ac_diamond_button', uc_diamond_button);
    function uc_diamond_button() {
        button.style.backgroundColor = "rgb(185, 242, 255)";
        ac_button_leval+=1;
        acr_delay=1000; //change auto clicker speed
    }
    if (ac_diamond_button==false) {if (score>=1000000) {ac_diamond_button=true; achevment_window("Achevment unlocked! 1MIL! For your hard work I give you the pinnacle of buttons - reward diamond button + decrease delay for auto clickers by 1s + 5x Clicks!",skip_achvemnt);
        uc_diamond_button();
    }}
    

    //shine (platum and up)
    if (ac_button_leval>=4) {
        button_shine(true);
    } else {button_shine(false);}

    //milestones --- --- ---

    //100000 milestone
    if (ac_100000_milestone==false) {if (score>=2000000) {ac_100000_milestone=true; achevment_window("... ok you can stop know. Theres no more to do",skip_achvemnt);
    }}

    //1mil milestone
    if (ac_1mil_milestone==false) {if (score>=10000000) {ac_1mil_milestone=true; achevment_window("Ok 10mil this is INSANE go tuch grass ... please!",skip_achvemnt);
    }}

    //10mil milestone
    if (ac_10mil_milestone==false) {if (score>=100000000) {ac_10mil_milestone=true; achevment_window("100mil ok then you win! Thanks for playing my game! Credis: Alex Sylling - proggramer/designer, You - player/tester, Made by AJ. Studios. Thank you for playing my game. now GO OUT SIDE!",skip_achvemnt);
    }}


    


}

//data display links
const Mutiplyer_display = document.getElementById('PCtext'); // the display show how much money you get per click









//utillity functions --------------------------------------------
function mround(number) {
    return Math.round(number * 100) / 100
}

//achevemnt popup

const overlay = document.getElementById('overlay');
const textBox = document.getElementById('text-box');

function achevment_window(text,skip=false) {
    if (skip==false) {
    textBox.innerHTML = `<p>${text}</p><button onclick="achevment_window_close()">Continue</button>`;
    overlay.style.display = 'flex';
    }
}

function achevment_window_close() {
    overlay.style.display = 'none';
    updatebuttonproggresBar_fromArray(); //update button proggress bar
}

function calculate_income_from_click(random=true) { //reutrn a number for click after calcualshons
    to_return = bace_mutiplyer;

    //button chances
    if (random==true && ac_button_leval <=3) {  //only do this if random is true
    if (ac_button_leval==4) {if (Math.random() * 100 < 100) {to_return*=3;}}  //platnum button chance
    if (ac_button_leval==3) {if (Math.random() * 100 < 50) {to_return*=3;}} //gold button chance
    if (ac_button_leval==2) {if (Math.random() * 100 < 25) {to_return*=3;}} //silver button chance
    }
    //perminent gane checks
    if (ac_button_leval>=4 && ac_button_leval <8) {to_return*=3;} //plat thru emrald x3
    if (ac_button_leval>=8) {to_return*=5;} //dimond x5

    
    return to_return;
}

function calclate_mutiplyer() {
    //the mutipyer of the number
    to_return = 1;
    if (ac_button_leval>=4 && ac_button_leval <8) {to_return=3;}
    if (ac_button_leval>=8) {to_return=5;}
    return to_return;
}

function button_shine(on=true) {
    if (on==true) {
        button.classList.add('shiny');
    } else {
        button.classList.remove('shiny');
    }
}

//achevemnt proggress  bar
let score_achevemnts = [];

function add_button_to_bar(target_score,commpleated,name="bronze") {
    // Adding element (commpleted, target_score)
    score_achevemnts.push([commpleated, target_score,name]);

    //score_achevemnts.splice(score_achevemnts.indexOf(3), 1); // Removes the element 3
}
function updatebuttonproggresBar_fromArray() {
    if (score_achevemnts.length > 0) {
        // Initialize c_item to a high target score and empty name
        let c_item = [false, Infinity, ""];

        // Looking for the lowest goal
        for (let item of score_achevemnts) {
            if (item[0] === false && item[1] < c_item[1]) {
                c_item = item;
            }
        }

        // Update the progress bar with the current target goal
        updateProgressBar(score, c_item[1], c_item[2]);
        
        // Check if the current item is completed
        if (score >= c_item[1]) {
            c_item[0] = true; // Update the commpleated value to true
        }

    } else {
        // If there are no achievements in queue
        updateProgressBar(100, 100, "none", "green", true);
    }
}

function updateProgressBar(currentValue, totalValue, name, barcolor = "green", end = false) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const percentage = (currentValue / totalValue) * 100;
    progressBar.style.width = percentage + '%';
    progressBar.style.backgroundColor = barcolor;
    progressText.innerHTML = mround(totalValue - currentValue) + ' Clicks until ' + name;
    if (end == true || totalValue>=Infinity) {
        // If no more achievements
        progressText.innerHTML = 'No More Buttons to unlock!';
    }
}

//Saving and loading from local stroige -------------------------------------------------- -------------------------

function save_loop() {
    saveToLocalStorage();
    setTimeout(save_loop, 5000);
}

function saveVar(varName) {
    const savedState = localStorage.getItem('gameState');
    let gameState = savedState ? JSON.parse(savedState) : {};
    gameState[varName] = window[varName];
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Helper function to load a single variable
function loadVar(varName) {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        if (gameState.hasOwnProperty(varName)) {
            window[varName] = gameState[varName];
        }
    }
}


function load_button_proggress_bar() {
    add_button_to_bar(100,ac_bigger_button,"Large Button");
    add_button_to_bar(750,ac_silver_button,"Silver Buttton");
    add_button_to_bar(2500,ac_gold_button,"Gold Buttton");
    add_button_to_bar(5000,ac_platnum_button,"Platnum Buttton");
    add_button_to_bar(25000,ac_rubie_button,"Rubie Buttton");
    add_button_to_bar(50000,ac_sapphire_button,"Sapphire Buttton");
    add_button_to_bar(75000,ac_emerald_button,"Emerald Buttton");
    add_button_to_bar(1000000,ac_diamond_button,"Diamond Buttton");
}


// Save all variables to local storage
function saveToLocalStorage() {
    saveVar('score');
    saveVar('bace_mutiplyer');
    saveVar('Mutiplyer_upgrade_cost');
    saveVar('Mutiplyer_leval');
    saveVar('Mutiplyer_upgrade_reword');
    saveVar('Mutiplyer_upgrade_cost_increas');
    saveVar('Mutiplyer_evolshon_crent_step');
    saveVar('Mutiplyer_evolshon_leval_steps');
    saveVar('Mutiplyer_evolshon_reword');
    saveVar('acr_cost');
    saveVar('acr_bace');
    saveVar('acr_leval');
    saveVar('acr_add_about');
    saveVar('ac_bigger_button');
    saveVar('ac_unlock_helper');

    saveVar('ac_silver_button');
    saveVar('ac_gold_button');
    saveVar('ac_platnum_button');
    saveVar('ac_rubie_button')
    saveVar('ac_sapphire_button')
    saveVar('ac_emerald_button')
    saveVar('ac_diamond_button')

    saveVar('ac_100000_milestone');
    saveVar('ac_1mil_milestone');
    saveVar('ac_10mil_milestone');
    console.log("Game saved");
    
}

// Load all variables from local storage
function loadFromLocalStorage() {
    loadVar('score');
    loadVar('bace_mutiplyer');
    loadVar('Mutiplyer_upgrade_cost');
    loadVar('Mutiplyer_leval');
    loadVar('Mutiplyer_upgrade_reword');
    loadVar('Mutiplyer_upgrade_cost_increas');
    loadVar('Mutiplyer_evolshon_crent_step');
    loadVar('Mutiplyer_evolshon_leval_steps');
    loadVar('Mutiplyer_evolshon_reword');
    loadVar('acr_cost');
    loadVar('acr_bace');
    loadVar('acr_leval');
    loadVar('acr_add_about');
    loadVar('ac_bigger_button');
    loadVar('ac_unlock_helper');

    loadVar('ac_silver_button');
    loadVar('ac_gold_button');
    loadVar('ac_platnum_button');
    loadVar('ac_rubie_button');
    loadVar('ac_sapphire_button')
    loadVar('ac_emerald_button')
    loadVar('ac_diamond_button')

    loadVar('ac_100000_milestone');
    loadVar('ac_1mil_milestone');
    loadVar('ac_10mil_milestone');
}

// Call loadFromLocalStorage when the page loads
window.onload = function() {
    if (Dont_Load_data==false) {
    loadFromLocalStorage(); }
    update(true,true); // Update the UI with the loaded values and load achevemnts that were saved
    save_loop(); // Start the save loop

    start_up_ceacks();
}
//---------------------------------------------------------------------------

//Runns the ferst time the game loads

//unlocks all achevemnts
function start_up_ceacks() {
if (unlock_all_achevemnts==true) {ac_bigger_button = true;ac_unlock_helper = true;ac_silver_button = true;ac_gold_button = true ;ac_platnum_button = true ;ac_rubie_button = true ;ac_sapphire_button = true ;ac_emerald_button = true ;ac_diamond_button = true ;ac_100000_milestone = true;ac_1mil_milestone = true;ac_10mil_milestone = true;}

load_button_proggress_bar() // losd button proggress bar
update();
}

