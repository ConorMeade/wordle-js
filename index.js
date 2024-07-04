
function Cell(letter, colorCode){
    // 
    /*
        colorCodes
        0 -> White (unanswerd)
        1 -> Green
        2 -> Yellow
        3 -> Gray
    */
    this.letter = letter
    this.colorCode = colorCode
    // this.isGreen = false
    // this.isYellow = false
    // this.isGray = false
    // this.answered = false
}

function initRows(){
    let rowCells = []
    for(let i=0; i<5; i++){
        rowCells.push(new Cell(" ", 0))
    }

    let divCells = []
    rowCells.forEach((c) => {
        divCells.push(makeDivCell(c))
    })

    return divCells
}

function checkWord(guessedWord, actualWord) {
    console.log("guessed word " + guessedWord)
    console.log("actual word " + actualWord)
    if(!checkValidWord(guessedWord)){
        return
    }

    let newRow = []
    for (let i = 0; i < actualWord.length; i++) {
        let curLetter = guessedWord.charAt(i)
        console.log(curLetter)
        let actualWordSubstring = actualWord.replace(actualWord.charAt(i), "")
        // console.log(actualWordSubstring)
        if(actualWord.charAt(i) == curLetter){
            newRow.push(new Cell(curLetter.toUpperCase(), 1))
        } else if (actualWord.charAt(i) != guessedWord.charAt(i) && actualWordSubstring.indexOf(curLetter) > -1){
            newRow.push(new Cell(curLetter.toUpperCase(), 2))
        } else {
            newRow.push(new Cell(curLetter.toUpperCase(), 3))
        }

    }
    return newRow
}

function makeDivCell(cell) {
    const newDiv = document.createElement('div')
    // newDiv.id = '::wordleEntry'
    newDiv.style.cssText = 'color: blue;border-style: solid;height: 100px;width: 100px;'
    console.log(cell.colorCode)
    if(cell.colorCode == 0){
        newDiv.className = 'whiteCell'
    }
    if(cell.colorCode == 1){
        newDiv.className = 'greenCell'
    }
    if(cell.colorCode == 2){
        newDiv.className = 'yellowCell'
    }
    if(cell.colorCode == 3){
        newDiv.className = 'grayCell'
    } else {
        newDiv.className = 'whiteCell'
    }
    // newDiv.className = 'wordleEntry'
    newDiv.style.cssText = 'border-style: solid;height: 100px;width: 100px;'
    const newContent = document.createTextNode(cell.letter);
    newDiv.appendChild(newContent)
    console.log(newDiv)
    return newDiv
}

function setRowWord(newCells, currentRow){
    let parentDiv = document.getElementById('row' + currentRow)
    // instead get children divs, update color code based on newCells
    console.log('before removal')
    console.log(parentDiv)
    while (parentDiv.firstChild) {
        parentDiv.firstChild.remove()
    }

    console.log('after removal')
    console.log(parentDiv)
    let divCells = []
    newCells.forEach((c) => {
        divCells.push(makeDivCell(c))
    })
    
    divCells.forEach((d) => {
        parentDiv.appendChild(d)
    })
}


async function checkValidWord(guessedWord) {
    // check word has a length of 5
    if(guessedWord.length != 5){
        alert("Words have to be 5 letter in length. Please try again!")
        return false
    }

    // check word is actually a word
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${guessedWord}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
        alert(`The word '${guessedWord}' is not a valid word. Please Try again!`)
        return false
    }
    return true
}
