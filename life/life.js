class Life {
  constructor(rows, columns, boardElement, evilCheckbox) {
    this.boardElement = boardElement;
    this.evilCheckbox = evilCheckbox;
    this.rows = rows;
    this.columns = columns;
    this.cells = [];
    this.isSimulating = false;

    this.birthOn = [3];
    this.surviveOn = [2,3];
    this.evilCondition = 2;

    this.initCells();
  }

  initCells() {
    for (var i = 0; i < this.rows; i++) {
      var row = [];

      for(var j = 0; j < this.columns; j++) {
        row.push(new Cell());
      }

      this.cells.push(row);
    }
  }

  constructHTML() {
    var _this = this;
    var table = document.createElement("table");

    this.boardElement.innerHTML = "";

    this.cells.forEach(function(row, rowNumber) {
      var tr = document.createElement("tr");

      row.forEach(function(cell, columnNumber) {
        var td = document.createElement("td");

        td.className = cell.alive ? "alive" + (cell.isEvil ? " evil" : "") : "dead";

        td.setAttribute("cell_row", rowNumber);
        td.setAttribute("cell_column", columnNumber);

        td.addEventListener("click", function(cellElement) {
          var row = cellElement.target.getAttribute("cell_row");
          var column = cellElement.target.getAttribute("cell_column");
          console.log(row + "," + column);
          _this.cells[row][column].alive = !_this.cells[row][column].alive;
          _this.cells[row][column].isEvil = _this.evilCheckbox.checked;
          _this.constructHTML();
        });

        tr.appendChild(td);
      });

      table.appendChild(tr);
    });

    this.boardElement.appendChild(table);
  }

  getCellNeighbours(row, column) {
    var neighbours = [];

    for (var i = row-1; i <= row+1; i++) {
      for (var j = column-1; j <= column+1; j++) {
        if (!(i == row && j == column)) {
          var processedRow = i < 0 ? this.rows+i : i%(this.rows);
          var processedColumn = j < 0 ? this.rows+j : j%(this.columns);
          neighbours.push(this.cells[processedRow][processedColumn]);
        }
      }
    }
    
    return neighbours;
  }

  countLiveNeighbours(row, column) {
    var neighbours = this.getCellNeighbours(row, column);
    var count = 0;

    neighbours.forEach(function(neighbour){
      count += neighbour.alive ? 1 : 0;
    });

    return count;
  }

  getLiveNeighbours(row, column) {
    var neighbours = this.getCellNeighbours(row, column);
    var liveNeighbours = [];

    neighbours.forEach(function(neighbour){
      if (neighbour.alive) {
        liveNeighbours.push(neighbour);
      }
    });

    return liveNeighbours;
  }

  countEvil(cells) {
    var count = 0;

    cells.forEach(function(cell){
      count += cell.isEvil ? 1 : 0;
    });

    return count;
  }

  determineLife(row, column) {
    var liveNeighbours = this.getLiveNeighbours(row, column);

    if(this.cells[row][column].alive) {
      this.cells[row][column].nextState = this.numberIsInSet(liveNeighbours.length, this.surviveOn);
      this.cells[row][column].nextEvilState = this.cells[row][column].isEvil;
    } else {
      var birthImminent = this.numberIsInSet(liveNeighbours.length, this.birthOn);

      if (birthImminent) {
        this.cells[row][column].nextState = birthImminent;
        this.cells[row][column].nextEvilState = this.countEvil(liveNeighbours) >= this.evilCondition;
      }
    }
  }

  tick() {
    for (var i = 0; i < this.rows; i++) {
      for(var j = 0; j < this.columns; j++) {
        this.determineLife(i,j);
      }
    }

    for (var i = 0; i < this.rows; i++) {
      for(var j = 0; j < this.columns; j++) {
        this.cells[i][j].alive = this.cells[i][j].nextState;
        this.cells[i][j].isEvil = this.cells[i][j].nextEvilState;
      }
    }

    this.constructHTML();
  }

  numberIsInSet(number, set) {
    var result = false;

    set.forEach(function(setNumber){
      result = result ? true : number == setNumber;
    });

    return result;
  }

  clear() {
    for (var i = 0; i < this.rows; i++) {
      for(var j = 0; j < this.columns; j++) {
        this.cells[i][j].alive = false;
        this.cells[i][j].nextState = false;
      }
    }
    
    this.constructHTML();
  }
}

class Cell {
  constructor(isEvil) {
    this.alive = false;
    this.nextState = false;

    this.isEvil = false;
    this.nextEvilState = false;
  }
}
