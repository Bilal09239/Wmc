// Dom
const board = document.querySelector('main');
// Anzeigen für Minen, Start-Button und Flaggen
const display_mines = document.getElementById('mines');
const display_start = document.getElementById('start');
const display_flags = document.getElementById('flags');



// Emojis 
const code_smile = '&#128522;';
const code_lost  = '&#128557;';
const code_win   = '&#128526;';
const code_bomb  = '&#x1f4a3;';
const code_flag  = '&#9873;';


// Variables 
let height = 15;
let width = 15;
let mine_num = 10; 
let flags = 0;
let mineMap = []; // 2D-Array
let game_over = true;


// Erstellt leere Spielfeld beim Laden 
createView();
// Smiley startet ein neues Spiel 
display_start.addEventListener('click', createView);

function createView() {
    // bei Neustart wird die alte feld entfernt
    board.innerHTML = '';

    display_mines.innerHTML = mine_num;
    display_start.innerHTML = code_smile;

    flags = 0;
    display_flags.innerHTML = flags;


    // Speilfeld kreieren 
    for (let x = 0; x < width; x++){
        // Spalte im Spielfeld
        let col_div = document.createElement('div');
        col_div.setAttribute('class', 'col');
        // felder innerhalb der Spalte
        for (let y = 0; y < height; y++){
            let field = document.createElement('div');
            // Feld noch nicht geöffnet
            field.setAttribute('class', 'field available');
            //Koordinaten von x und y werden in id gespeicher
            field.setAttribute('id', x+'_'+y);
            // wenn man Links klickt öffnet man ein Feld 
            field.addEventListener('click', clickField);
            // mit rechtsklick setzt man Flage 
            field.addEventListener('contextmenu', flagField)
            col_div.append(field);
        }
        board.append(col_div);
    }
}

function createMap(click_x, click_y) {
    //Build MapAttay
    for (let x = 0; x < width; x++){
        mineMap[x] = [];
        for (let y = 0; y < height; y++) {
            mineMap[x][y] = 0;
        }
    }

    // zufällige Minene wird platziert  
    for (let mine = 0; mine < mine_num; mine++){
        let mine_x = click_x;
        let mine_y = click_y;

        // doppelte mine wird verhindert und das beim ersten klick sofort mine ist
        while (mineMap[mine_x][mine_y] == 'M' || (mine_x == click_x && mine_y == click_y)) {
            mine_x = Math.floor(Math.random() * width);
            mine_y = Math.floor(Math.random() * height);
        }
        // mine wird gesetzt 
        mineMap[mine_x][mine_y] = 'M';

        // Die zahl um die Mine wird erhört 
        for (let x = mine_x - 1; x <= mine_x + 1; x++) {
            for (let y = mine_y - 1; y <= mine_y + 1; y++) {
                if (x >= 0 && y >= 0 && x < width && y < height) {
                    if (mineMap[x][y] != 'M') {
                        mineMap[x][y]++;
                    }
                }
            }
        }
    }

    game_over = false;
    showField(click_x, click_y);
}


function clickField(e) {
    // Koordinanten werden von id verwendet 
    let id = e.target.id;
    let x = Number(id.split('_')[0]);
    let y = Number(id.split('_')[1]);
    // wenn man zum ersten mal klickt wird die karte erzeugt 
    if (game_over) {
        createMap(x, y);
    }
    // Feld wird angezeigt
    showField(x, y);

}

function showField(cord_x, cord_y) {
    let field = document.getElementById(cord_x + '_' + cord_y);
    // jene Felder werden geöffnet die noch nicht geöffnet wurden 
    if (field.classList.contains('available')) {
        field.classList.remove('available');
        // wenn man mine anklickt ist das spiel vorbei 
        if (mineMap[cord_x][cord_y] == 'M') {
            field.innerHTML = code_bomb;
            lostGame();
        }

        // keine Nachbarminen 
        else if (mineMap[cord_x][cord_y] == 0) {
            for (let x = cord_x - 1; x <= cord_x +1; x++){
                for (let y = cord_y -1; y <= cord_y +1; y++) {
                    if (x >= 0 && y >= 0 && x < width && y < height){
                        if (!(y == cord_y && x == cord_x)) {
                            showField(x,y) 
                        }
                    }  
                }
            }
        }   
        // Feld wird mit Zahl angezeigt
        else {
            field.innerHTML = mineMap[cord_x][cord_y];
            checkWin();
        }
    }
}

function flagField(e){
    // es ist nicht möglich wie normale weise das wäre mit rechtsklick auf eine Browser
    e.preventDefault();
    let field = e.target;
    // Flaggen können nur auf nicht geöffnete Felder gesetzt werden 
    if (field.classList.contains('available')) {
        // Flage setzen 
        if (!field.classList.contains('flag')) {
            field.classList.add('flag');
            field.innerHTML = code_flag;
            // es ist nicht mehr möglich drauf zu drücken 
            field.removeEventListener('click', clickField);
            flags++;
        }

        // Flagge entfernen 
        else {
            field.classList.remove('flag');
            field.innerHTML = '';
            // nach dem man geklickt hat es wieder aktivieren 
            field.addEventListener('click', clickField);
            flags--;
        }
    }
    display_flags.innerHTML = flags;
}


function lostGame() {
    // Emoji ändert sich 
    display_start.innerHTML = code_lost;
    game_over = true;

    // Kein feld kann mehr angeklickt werden 
    let fields = document.querySelectorAll('.field');
    for (let field of fields) {
        field.removeEventListener('click', clickField);
    }
}


function checkWin() {
    // jene felder die noch nicht offen sind werden gezählt 
    let open_field = document.querySelectorAll('.available');
    // Wenn noch eine Mine übrig sind dann hat man gewonnen 
    if (open_field.length == mine_num) {
        display_start.innerHTML = code_win;
        game_over = true;
    }
}