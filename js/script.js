
const submit = document.getElementById('submit');

submit.addEventListener('click', function(){
    const select = document.querySelector('select');
    const container = document.querySelector('.container');
    console.log(select.value);
    // pulisco il container e aggiungio i quadrati
    container.innerHTML = '';
    addSquare(select.value,container);
    // aggiungo le bombe
    const squares = document.getElementsByClassName('square');
    addBomb(squares);
    // aggiungo la funzione che mi permette di giocare
    game(squares,submit);
});

function addSquare(type,where){
    let x;
    switch (type){
        case 'easy': 
            x = 100;
            break;
        case 'hard':
            x = 81;
            break;
        case 'crazy':
            x = 49;
    }
    for (let i = 0; i < x; i++){
        let square = document.createElement('div');
        square.innerText = i + 1;
        square.className = `square ${type}`;
        where.append(square);
    }
}

function addBomb(where){
    for (let i = 0; i < 16; i++){
        let y = Math.floor(Math.random() * where.length) + 1;
        console.log(i , y);
        while (where[y - 1].classList.contains('bomb')){
            y = Math.floor(Math.random() * where.length) + 1;
            console.log('già bomba');
        }
        where[y - 1].classList.add('bomb');
    }
}

function game(where,button){
    let tentativi = 0;
    let sentinella = false;
    
    for (let i = 0; i < where.length; i++){

        where[i].addEventListener('click', function(){
            if (sentinella == false){
                if (this.classList.contains('bomb')){
                    alert('Hai perso!');
                    const punteggio = document.querySelector('.punteggio');
                    punteggio.innerHTML = 'Complimenti! il tuo punteggio è: ' + tentativi;
                    const bombs = document.getElementsByClassName('bomb');
                    for (let j = 0; j < bombs.length; j++){
                        bombs[j].classList.add('red');
                    }
                    button.innerHTML = 'Riprova';
                    sentinella = true;
                    console.log(sentinella);
                } else if (this.classList.contains('blue')){
                    alert('ATTENZIONE! seleziona una casella diversa')
                } else {
                    this.classList.add('blue');
                    tentativi++;
                }
            }
        });
    }
}