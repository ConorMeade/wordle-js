function Cell(letter, colorCode){
    /*
        colorCodes
        0 -> White (unanswerd)
        1 -> Green
        2 -> Yellow
        3 -> Gray
    */
    this.letter = letter
    this.colorCode = colorCode
}

function updateBoard(newCells, currentRow){
    // function used to update the regular game board and the letter board.
    let parentDiv = document.getElementById('row' + currentRow);
    while (parentDiv.firstChild) {
        parentDiv.firstChild.remove();
    }
    let divCells = [];
    let usedLetters = '';
    newCells.forEach((c) => {
        divCells.push(makeDivCell(c));

        // updating letter board
        let letterBoardCellDiv = document.getElementById(`letterBoard-${c.letter.toUpperCase()}`)
        if(letterBoardCellDiv != null) {
            switch(c.colorCode) {
                case 1:
                    letterBoardCellDiv.className = 'letterBoardCellGreen';
                    
                    usedLetters += c.letter
                    // mark id as answered so we do not overwrite
                    letterBoardCellDiv.id = `letterBoardAnswered-${c.letter.toUpperCase()}`;
                    break;
                case 2:
                    letterBoardCellDiv.className = 'letterBoardCellYellow';
                    usedLetters += c.letter
                    break;
                case 3:
                    /*
                        When we have a double yellow letter, we do not want to overwrite the second 
                        instance of the letter as gray when that letter is present in the word


                        i.e. if the word is 'brass' and the guess is 'canal' (two a's)

                        'a' is a gold letter, so it should be marked as such on the letter board.
                        We keep track of usedLetters so the second a in canal (which is not in brass)
                        is a miss. However, that second 'a' should not overwrite the yellow letter on the letter board.

                    */
                    if (!usedLetters.includes(c.letter)) {
                        letterBoardCellDiv.className = 'letterBoardCellGray';
                    }
                    usedLetters += c.letter
                    break;
                default:
                    letterBoardCellDiv.className = "letterBoardCellUnanswered"
                    console.log('reached an invalid colorCode (letter board)');
                
            }
        }
    })
    for(let i=0; i < divCells.length; i++){
        parentDiv.appendChild(divCells[i]);
    }
}

function countGreenCells(newCells){
    // keep track of how many green letters on a given guess. 5 greens is a correct guess
    let greenCount = 0;
    for(let i=0; i < newCells.length; i++){
        if(newCells[i].colorCode == 1){
            greenCount++;
        }
    }
    return greenCount;
}

function initRows(){
    // init game board with Cell objects/divs
    let rowCells = [];
    for(let i=0; i<5; i++){
        rowCells.push(new Cell(" ", 0));
    }

    let divCells = [];
    rowCells.forEach((c) => {
        divCells.push(makeDivCell(c));
    })

    return divCells;
}

function initLetterBoard(letterBoardRowLetters, firstLetter){
    // init letterboard, cells are gray at first
    let letterBoardCells = []
    letterBoardRowLetters.forEach((letter) => {
        letterBoardCells.push(new Cell(letter, 4));
    })

    let letterBoardDivCells = []
    letterBoardCells.forEach((c) => {
        letterBoardDivCells.push(makeDivCell(c));
    })

    let currentDiv = document.getElementById(firstLetter + 'Row')
    letterBoardDivCells.forEach(element => {
        currentDiv.appendChild(element);
    });
}

function getCellsForGuess(guessedWord, actualWord){
    // take guessed word and compare with actual word, create new cells for current row with proper colors
    // console.log(guessedWord, actualWord)
    let guessedWordLower = guessedWord.toLowerCase();
    let actualWordLower = actualWord.toLowerCase();
    let newRow = [];
    let usedLetters = '';
    for (let i = 0; i < actualWord.length; i++) {
        let curLetter = guessedWordLower.charAt(i);
        let actualWordNoCurLetter = actualWordLower.replace(actualWordLower.charAt(i), "");
        if(actualWordLower.charAt(i) == curLetter){
            newRow.push(new Cell(curLetter.toUpperCase(), 1));
            usedLetters += curLetter;
        } else if (actualWordLower.charAt(i) != guessedWordLower.charAt(i) && actualWordNoCurLetter.indexOf(curLetter) > -1 && !usedLetters.includes(curLetter)){
            newRow.push(new Cell(curLetter.toUpperCase(), 2));
            usedLetters += curLetter;
        } else {
            newRow.push(new Cell(curLetter.toUpperCase(), 3));
            usedLetters += curLetter;
        }
    }
    return newRow
}

function makeDivCell(cell) {
    // parse Cell object to make a div, add new div as child to that guess's row
    const newDiv = document.createElement('div');
    newDiv.style.cssText = 'color: black;border-style: solid;height: 90px;width: 90px;';

    switch(cell.colorCode) {
        case 0:
            newDiv.className = 'whiteCell';
            break;
        case 1:
            newDiv.className = 'greenCell';
            break;
        case 2:
            newDiv.className = 'yellowCell';
            break;
        case 3:
            newDiv.className = 'grayCell';
            break;
        case 4:
            newDiv.style.cssText = 'color: black;border-style: solid;height: 55px;width: 55px;';
            newDiv.className = 'letterBoardCellUnanswered';
            newDiv.id = `letterBoard-${cell.letter.toUpperCase()}`;
            break;
        default:
            console.log('reached an invalid colorCode');
        
    }
    const newContent = document.createTextNode(cell.letter);
    newDiv.appendChild(newContent);
    return newDiv;
}

async function checkValidWord(guessedWord, alertOn) {
    // check word has a length of 5
    if(guessedWord.length != 5){
        alert("Words have to be 5 letter in length. Please try again!")
        return false;
    }

    // check word is actually a word
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedWord}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        if(alertOn){
            alert(`The word '${guessedWord}' is not a valid word. Please try again!`);
        } else {
            console.log(`${guessedWord} was fetched from the API, but that is an invalid word here.`)
        }
            
        // if we 404, then a valid word was not entered
        return false;
    }
    return true;
}


function clearBoard(){
    if (document.getElementById('guessVal')!= null){
        document.getElementById('guessVal').value = '';
    }
    // reset button function, remove all divs and re-init board
    for(let i=0; i<6; i++){
        let parentDiv = document.getElementById('row' + i);
        if (parentDiv != null){
            while (parentDiv.firstChild) {
                parentDiv.firstChild.remove();
            }
        }
    }

    for (let i = 0; i < 6; ++i){
        let parentDiv = document.getElementById('row' + i);
        if (parentDiv != null){
            let letterCells = initRows(i);

            letterCells.forEach(element => {
                parentDiv.appendChild(element);
            });
        }
    }
    
    // clear letter board
    const alphabet = [
        "A", "B", "C", "D", "E", "F", 
        "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X",
        "Y", "Z", 
    ];

    alphabet.forEach((letter) => {
        let letterBoardCellDiv = document.getElementById(`letterBoard-${letter}`);
        if (letterBoardCellDiv == null) {
            letterBoardCellDiv = document.getElementById(`letterBoardAnswered-${letter.toUpperCase()}`);
            // console.log(letterBoardCellDiv)
            if (letterBoardCellDiv != null) {
                letterBoardCellDiv.className = 'letterBoardCellUnanswered';
            }
        } else {
            letterBoardCellDiv.className = 'letterBoardCellUnanswered';
        }
    })
}
