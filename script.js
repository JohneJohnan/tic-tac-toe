function game(vsComputer) {
    const board = [
        [, , ,],
        [, , ,],
        [, , ,],
    ];
    const Player = (iscomputer) => {
        let score = 0;
        function choose() {
            while (true) {
                let choice = prompt("where? ij").toString();
                if (board[choice[0]][choice[1]] == 'x' || board[choice[0]][choice[1]] == 'o')
                    alert("this cell is already selected!");
                else
                    return choice;
            }
        }
        function checkIfWins() {
            for (let i = 0; i < 3; i++) {
                //checks rows
                if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                    if (board[i][0] == 'x' || board[i][0] == 'o') {
                        score++;
                        return true;
                    }
                }
                //checks columns
                if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                    if (board[0][i] == 'x' || board[0][i] == 'o') {
                        score++;
                        return true;
                    }
                }
            }
            //checks top left to bottom right diagonal
            if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                if (board[0][0] == 'x' || board[0][0] == 'o') {
                    score++;
                    return true;
                }
            }
            //checks bottom left to top right diagonal
            if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
                if (board[0][2] == 'x' || board[0][2] == 'o') {
                    score++;
                    return true;
                }
            }
            return false;
        }
        return {choose, checkIfWins};
    };
    const X = Player(false);
    const O = Player(vsComputer);

    let currentPlayer = X;
    let count = 0;
    let winner = null;
    do {
        const choice = currentPlayer.choose();
        console.log(choice)
        console.log(board[choice[0]][choice[1]])
        board[choice[0]][choice[1]] = currentPlayer === X ? 'x' : 'o';
        console.log(board[choice[0]][choice[1]])
        if (currentPlayer.checkIfWins()) {
            winner = currentPlayer === X ? 'x' : 'o';
            break;
        }
        currentPlayer === X ? currentPlayer = O : currentPlayer = X;
        count++;
    }
    while (count < 9);

    announceWinner(winner);
    game(false);

    function getChoice() {}
    function announceWinner(winner) {
        if (winner === null)
            alert("draw!");
        else
            alert(`${winner} won!`);
    }
}
game(false);
