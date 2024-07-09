async function getWordleWord() {
    const url = "https://random-word.ryanrk.com/api/en/word/random/?length=5";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        json = await response.json();
        // word = json[0]
        return json[0]
    } catch (error) {
        console.error(error.message);
        return 'brass'
    }
}