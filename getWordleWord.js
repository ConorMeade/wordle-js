// aysnc function getWordleWord() {
//     const url = "https://random-word-api.herokuapp.com/word?length=5"
//     try {
//         const response = await fetch(url)
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json()
//         console.log(json)
//     }catch(error) {
//             console.error(error.message)
//         }
//     }


async function getWordleWord() {
    const url = "https://random-word-api.herokuapp.com/word?length=5";
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}