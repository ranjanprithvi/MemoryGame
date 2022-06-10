class GameBoard {
  counter = null;
  previousTile = null;
  count = 0;
  container = null;
  clickHandler = null;

  constructor() {
    this.shuffle();
    this.assign();
    this.addEventListeners();
    this.counter = document.getElementById("counter");
    this.container = document.getElementById("container");
  }
  images = [
    "images/alien.jpg",
    "images/boy.jpg",
    "images/bulb.jpg",
    "images/R.jpg",
    "images/dice.jpg",
    "images/rock.jpg",
    "images/paper.jpg",
    "images/scissors.jpg",
    "images/alien.jpg",
    "images/boy.jpg",
    "images/bulb.jpg",
    "images/R.jpg",
    "images/dice.jpg",
    "images/rock.jpg",
    "images/paper.jpg",
    "images/scissors.jpg",
  ];

  shuffle() {
    let currentIndex = this.images.length,
      randomIndex;

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * this.images.length);
      currentIndex--;

      [this.images[currentIndex], this.images[randomIndex]] = [
        this.images[randomIndex],
        this.images[currentIndex],
      ];
    }
  }

  assign() {
    const tileImages = document.getElementsByClassName("tileImage");
    for (let i in this.images) {
      tileImages.item(i).src = this.images[i];
    }
  }

  addEventListeners() {
    let tiles = document.getElementsByClassName("tile");
    Array.from(tiles).forEach((e) =>
      e.addEventListener("click", () => this.rotateTile(e))
    );
  }

  rotateTile(clickedTile) {
    if (clickedTile === this.previousTile) return;

    clickedTile.children[0].style.transform =
      "perspective(500px) rotateY(180deg)";
    clickedTile.children[1].style.transform =
      "perspective(500px) rotateY(0deg)";

    if (!this.previousTile) {
      this.previousTile = clickedTile;
      return;
    }

    if (this.previousTile.children[1].src != clickedTile.children[1].src) {
      setTimeout(this.restoreTiles, 2000, this.previousTile, clickedTile);
      this.container.style = "pointer-events:none";
    } else {
      this.previousTile.style = "pointer-events:none";
      clickedTile.style = "pointer-events:none";
      //   this.previousTile.removeEventListener("click", this.rotateTile);
      //   clickedTile.removeEventListener("click", this.rotateTile);
    }
    this.previousTile = null;
    this.count++;

    this.counter.textContent = "Tries: " + this.count;
  }

  restoreTiles(previousTile, currentTile) {
    previousTile.children[0].style.transform =
      "perspective(500px) rotateY(0deg)";
    previousTile.children[1].style.transform =
      "perspective(500px) rotateY(180deg)";

    currentTile.children[0].style.transform =
      "perspective(500px) rotateY(0deg)";
    currentTile.children[1].style.transform =
      "perspective(500px) rotateY(180deg)";

    this.container.style = "pointer-events:all";
  }
}

const board = new GameBoard();
