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

function updateBoard(newCells, currentRow, word){
    let parentDiv = document.getElementById('row' + currentRow);
    let greenCount = 0;
    while (parentDiv.firstChild) {
        parentDiv.firstChild.remove();
    }
    let divCells = []
    newCells.forEach((c) => {
        divCells.push(makeDivCell(c));
    })


    for(let i=0; i < newCells.length; i++){
        if(newCells[i].colorCode == 1){
            greenCount++
        }

        parentDiv.appendChild(divCells[i])
    }
}

function countGreenCells(newCells){
    let greenCount = 0
    for(let i=0; i < newCells.length; i++){
        if(newCells[i].colorCode == 1){
            greenCount++
        }
    }

    return greenCount
}

function initRows(){
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
    let letterBoardCells = []
    letterBoardRowLetters.forEach((letter) => {
        letterBoardCells.push(new Cell(letter, 4))
    })

    let letterBoardDivCells = []
    letterBoardCells.forEach((c) => {
        letterBoardDivCells.push(makeDivCell(c))
    })

    let currentDiv = document.getElementById(firstLetter + 'Row')
    letterBoardDivCells.forEach(element => {
        currentDiv.appendChild(element);
    });
}

function getCellsForGuess(guessedWord, actualWord){
    let newRow = [];
    for (let i = 0; i < actualWord.length; i++) {
        let curLetter = guessedWord.charAt(i);
        let actualWordNoCurLetter = actualWord.replace(actualWord.charAt(i), "");
        if(actualWord.charAt(i) == curLetter){
            newRow.push(new Cell(curLetter.toUpperCase(), 1));
        } else if (actualWord.charAt(i) != guessedWord.charAt(i) && actualWordNoCurLetter.indexOf(curLetter) > -1){
            newRow.push(new Cell(curLetter.toUpperCase(), 2));
        } else {
            newRow.push(new Cell(curLetter.toUpperCase(), 3));
        }
    }
    return newRow
}

function makeDivCell(cell) {
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
            newDiv.className = 'whiteCell';
            break;
        case 4:
            newDiv.style.cssText = 'color: black;border-style: solid;height: 55px;width: 55px;';
            newDiv.className = "letterBoardCell"
            newDiv.id = `letter-${cell.letter}`
            break;
        default:
            console.log('reached an invalid colorCode');
        
    }
    const newContent = document.createTextNode(cell.letter);
    newDiv.appendChild(newContent)
    return newDiv;
}

async function checkValidWord(guessedWord) {
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
        alert(`The word '${guessedWord}' is not a valid word. Please try again!`);
        // if we 404, then a valid word was not entered
        return false;
    }
    return true;
}


function clearBoard(){
    for(let i=0; i<6;i++){
        let parentDiv = document.getElementById('row' + i);
        while (parentDiv.firstChild) {
            parentDiv.firstChild.remove();
        }
    }

    for (let i = 0; i < 6; ++i){
        let currentDiv = document.getElementById('row' + i);
        let letterCells = initRows(i);

        letterCells.forEach(element => {
            currentDiv.appendChild(element);
        });
    }
    
}
