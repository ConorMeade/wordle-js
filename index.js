function buildRow(rowNum){
    let rowCells = []
    for(let i=0; i<5; i++){
        rowCells.push(new cell())
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
    newDiv.id = '::wordleEntry'
    newDiv.style.cssText = 'font-style: italic;color:blue;border-style: solid;height: 100px;width: 100px;'
    const newContent = document.createTextNode(cell.letter);
    newDiv.appendChild(newContent)

    return newDiv

    // const currentDiv = document.getElementById(`row${rowNum}`);
    // document.body.insertBefore(newDiv, currentDiv);

}

function cell(){
    this.letter = "foo"
    this.isGreen = false
    this.isYellow = false
    this.isGray = false
    this.answered = false
}

function checkWord(guessedWord, actualWord) {
    
}

function addWordToRow(word){

}