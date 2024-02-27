// Definindo variáveis globais
const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''

// 1 - Inicialização do jogo
function initializeGame() {
    //Inicializa as variáveis globais
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    //Ajusta o título da página 
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    //Limpa o tabuleiro e adiciona os eventos de clique
    boardRegions.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick)
    })
}

//Adiciona o evento no botão que ínicia o jogo
document.getElementById('start').addEventListener('click', initializeGame)

//Função para atualizar o titulo com o nome do jogador da vez
function updateTitle() {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

// 2 - Manipulação dos clicks no tabuleiro
function handleBoardClick(ev) {
    //Obtém os índices da região clicada
    const span = ev.currentTarget
    const region = span.dataset.region
    const rowColumnPair = region.split('.') //Serve para dividir uma string e transformar em um array
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    //Verifica se o jogo já terminou
    const gameOver = document.querySelector('h2').innerText.includes('venceu') || document.querySelector('h2').innerText.includes('Empate');
    if (gameOver) {
        return
    }
    //Marca a região clicada com o símbolo do jogador
    if (turnPlayer === 'player1') {
        span.innerText = 'X'
        vBoard[row][column] = 'X'
    } else {
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }
    //Limpa o console e exibe nosso tabuleiro virtual
    console.clear()
    console.table(vBoard)
    //Desabilita a região clicada
    disabledRegion(span)
    //Verifica se alguém venceu
    const winRegions = getWinRegions()
    if (winRegions.length > 0) {
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')) {
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}

// 3 - Verificação da vitória
//Verifica se existem três regiões iguais em sequência e devolve as regiões
function getWinRegions() {
    const winRegions = []
    //Verificação em linha
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    //Verificação em coluna
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    //Verificação em diagonal
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

// 4 - Tratamento da vitória
//Pinta as regiões onde o jogador venceu e mostra o seu nome na tela
function handleWin(regions) {
    regions.forEach(function (region) {
        document.querySelector('[data-region= "' + region + '"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + ' venceu!'
}

// 5 - Desabilitar regiões clicaveis após vitória
//Desabilita uma região do tabuleiro para que não seja mais clicável
function disabledRegion(element) {
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', handleBoardClick)
}
