document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    if (board) {
        board.innerHTML = ''; // Clear board just in case
        const columns = 'abcdefgh';
        for (let row = 1; row <= 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cellId = columns[col] + row;
                const cell = document.createElement('div');
                cell.id = cellId;

                if ((row + col + 1) % 2 === 0) {
                    cell.classList.add('white');
                } else {
                    cell.classList.add('black');
                }

                board.appendChild(cell);
            }
        }
    }
});
