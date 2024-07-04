
function Cell(letter, colorStr){
    this.letter = letter
    this.color = colorStr
    // this.isGreen = false
    // this.isYellow = false
    // this.isGray = false
    // this.answered = false
}
function buildRow(rowNum){
    let rowCells = []
    for(let i=0; i<5; i++){
        rowCells.push(new Cell())
        // console.log(rowCells[i])
    }

    let divCells = []
    rowCells.forEach((c) => {
        divCells.push(makeCell(c))
        // document.write("<div id='wordleEntry'>")
        // document.write(item.letter)
        // document.write(`</div>`)
    })

    return divCells
}

function makeCell(cell) {
    const newDiv = document.createElement('div')
    // newDiv.id = '::wordleEntry'
    newDiv.className = 'wordleEntry'
    newDiv.style.cssText = 'font-style: italic;color:blue;border-style: solid;height: 100px;width: 100px;'
    const newContent = document.createTextNode(cell.letter);
    newDiv.appendChild(newContent)
    return newDiv

    // const currentDiv = document.getElementById(`row${rowNum}`);
    // document.body.insertBefore(newDiv, currentDiv);
}

function setRowWord(newCells, currentRow){
    console.log(currentRow)

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
        let actualWordSubstring = actualWord.replace(actualWord.charAt(i), "")
        console.log(actualWordSubstring)
        if(actualWord.charAt(i) === curLetter){
            newRow.push(new Cell(curLetter.toUpperCase(), 'Green'))
        } else if (actualWord.charAt(i) != guessedWord.charAt(i) && actualWordSubstring.indexOf(curLetter) > -1){
            newRow.push(new Cell(curLetter.toUpperCase(), 'Yellow'))
        } else {
            newRow.push(new Cell(curLetter.toUpperCase(), 'Gray'))
        }

    }

    return newRow

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

function addWordToRow(word){

}