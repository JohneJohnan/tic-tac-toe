const Player = (iscomputer, mark) => {
    let score = 0;
    const imgAddress = mark === 'x' ? 'x.svg' : 'o.svg';
    function wins() { score++ }
    return { mark, imgAddress, wins };
};

const DomModule = (() => {
    function getResultMessage() {
        const oldResultMessage = document.getElementById("resultMessage");
        const resultMessage = document.createElement('div');
        resultMessage.setAttribute('id', 'resultMessage');
        oldResultMessage.replaceWith(resultMessage);
        resultMessage.style.display = 'none';
    }
    function getBoardChildren(boardChildren) {
        const oldBoardDom = document.getElementById('board');
        const boardDom = document.createElement('div');
        boardDom.setAttribute('id', 'board');
        oldBoardDom.replaceWith(boardDom);

        for (let i = 0; i < 3; i++) {
            const tempBoardRow = [];
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.dataset.rows = i;
                cell.dataset.columns = j;
                boardDom.appendChild(cell);
                // childrenDom[childCount] = cell;
                // childrenDom[childCount].textContent = '';
                // childrenDom[childCount].removeEventListener('click',clickBoardChild);
                tempBoardRow.push(cell);
            }
            boardChildren.push(tempBoardRow);
        }
    }
    function showMessage (winner, resultMessage) {
        const winMessage = document.createElement('div');
        if (!winner)
            winMessage.textContent = 'Draw!';
        else
            winMessage.textContent = `${winner} wins!`;
        resultMessage.style.display = 'block';
        resultMessage.appendChild(winMessage);   
    }
    return { getResultMessage, getBoardChildren, showMessage }
})();

function round(vsComputer) {
    const boardChildren = [];
    const board = [
        [, , ,],
        [, , ,],
        [, , ,],
    ];
    const X = Player(false, 'x');
    const O = Player(vsComputer, 'o');
    let currentPlayer = X;
    let ValidClicksCount = 0;
    document.getElementById('newRound').addEventListener('click', () => round(false));
    DomModule.getResultMessage();
    DomModule.getBoardChildren(boardChildren);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++)
            boardChildren[i][j].addEventListener('click', clickBoardChild);
    }

    function clickBoardChild(e) {
        //the cell already has a mark
        if (board[e.currentTarget.dataset.rows][e.currentTarget.dataset.columns])
            return;

        //mark the clicked cell
        board[e.target.dataset.rows][e.target.dataset.columns] = currentPlayer.mark;
        const img = document.createElement('img');
        img.src = currentPlayer.imgAddress;
        e.target.appendChild(img);

        if (checkIfWins(currentPlayer))
            DomModule.showMessage(currentPlayer.mark.toUpperCase(), resultMessage);
        //check if the round is over and the game is a draw
        else if (++ValidClicksCount == 9)
            DomModule.showMessage('', resultMessage);
        //next player's turn
        else
            currentPlayer = currentPlayer === X ? O : X;
    }

    function checkIfWins(currentPlayer) {
        for (let i = 0; i < 3; i++) {
            //checks rows
            if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                if (board[i][0] == 'x' || board[i][0] == 'o') {
                    currentPlayer.wins();
                    return true;
                }
            }
            //checks columns
            if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                if (board[0][i] == 'x' || board[0][i] == 'o') {
                    currentPlayer.wins();
                    return true;
                }
            }
        }
        //checks top left to bottom right diagonal
        if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
            if (board[0][0] == 'x' || board[0][0] == 'o') {
                currentPlayer.wins();
                return true;
            }
        }
        //checks bottom left to top right diagonal
        if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
            if (board[0][2] == 'x' || board[0][2] == 'o') {
                currentPlayer.wins();
                return true;
            }
        }
        return false;
    }
}

round(false);
