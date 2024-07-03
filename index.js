
function Cell(){
    this.letter = "foo"
    this.isGreen = false
    this.isYellow = false
    this.isGray = false
    this.answered = false
}
function buildRow(rowNum){
    let rowCells = []
    for(let i=0; i<5; i++){
        rowCells.push(new Cell())
        console.log(rowCells[i])
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

function setRowWord(gameBoard, currentRow){

}

function checkWord(guessedWord, actualWord) {
    console.log("guessed word" + guessedWord)
    console.log("actual word" + actualWord)
    
}

function addWordToRow(word){

}