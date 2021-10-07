const word_el = document.getElementById('word');
const popupContainer = document.getElementById("popup-container")
const popup = document.querySelector(".popup")
const message_el = document.getElementById("success-message")
const wrongLetters_el = document.getElementById("wrong-letters")
const correctWord = document.getElementById("correct-word")
const items = document.querySelectorAll('.item')
const btn = document.getElementById('play-again')

const correctLetters = [];
const wrongLetters = [];

let selectedWord = getRandomWord(); // değişebilir olmalı

// random kelime bulucu
function getRandomWord(){
    const words = ["javascript", "java", "python", "djengo", "php"]

    return words[Math.floor(Math.random() * words.length)]
}

// random kelimeyi ekranda gösterme
function displayWord(){
    
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter=>
            `<div class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </div>
            `).join(' ')}
    `;
    
    //harfleri yanyana yazıyoruz
    const w = word_el.innerText.replace(/\n/g,"");

    // girilen harflerden girilen kelime oluşuyorsa;        
    if(w === selectedWord){
        popupContainer.style.display="flex";
        popup.style.backgroundColor = "green"
        message_el.innerText = "You Won!"
    }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0 ? `<h3>Wrong Letters</h3>` : ""}
        ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
        `;

        items.forEach((item,index)=>{ //herbir item ve index için
            const errorCount = wrongLetters.length;
            console.log(errorCount,item,index);
            if(index<errorCount){ // errorCount'dan küçük olan her index numarasına sahşp olan eleman için
                item.style.display="block";
            }else{
                item.style.display="none";
            }
        })

        if(wrongLetters.length === items.length){
            popupContainer.style.display= "flex";
            popup.style.backgroundColor = "red";
            message_el.innerText = "You Lost!"
            correctWord.innerText = "Answer was: " + `"${selectedWord}"`;
        }
}


btn.addEventListener("click",function(){
    correctLetters.splice(0) // diziyi boşaltma
    wrongLetters.splice(0)
    selectedWord = getRandomWord();
    displayWord(); // dom'u yeniden hazırladım.
    updateWrongLetters();
    popupContainer.style.display="none";
})

window.addEventListener("keydown", function(e){
    const trKeyCodes = [219,221,186,73,188,190]
    if((e.keyCode >=65 && e.keyCode <=90) || (trKeyCodes.includes(e.keyCode))){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord();
            }else{
                // bu harfi tıkladınız
                alertify.warning('You have chosen this letter before!');
            }
        } else {
                // hatalı harfleri topluyoruz.
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                console.log(wrongLetters);
                alertify.error('You chose the wrong letter!');

                // hatalı harfleri güncelle
                updateWrongLetters();
            }else{
                alertify.warning('You have chosen this letter before!');
            }
        }
    }
})

displayWord();




