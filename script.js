window.onload = () => {
  const main = document.querySelector("main");
  const nav = document.querySelector("nav");
  const divs = document.getElementsByClassName("color");
  const btnGenerateColor = document.createElement("button");
  const btnResetColor = document.createElement("button");
  const sectionPixelBoard = document.querySelector("#pixel-board");

  btnResetColor.id = "clear-board";
  btnResetColor.innerHTML = "Limpar";
  nav.appendChild(btnResetColor);
  btnGenerateColor.id = "button-random-color";
  btnGenerateColor.innerHTML = "Cores aleatórias";
  nav.appendChild(btnGenerateColor);

  // função que gera cores aleatórias
  const colorGenerate = () => {
    let random = [];
    for (let index = 0; index < 3; index += 1) {
      random[index] = parseInt(Math.floor(Math.random() * 255));
      if (random[0] + random[1] + random[2] === 0) {
        index = 0;
      } else if (random[0] + random[1] + random[2] === 765) {
        index = 0;
      }
    }
    return `rgb(${random[0]}, ${random[1]}, ${random[2]})`;
  };

  // função que vai 'setar' nossa paleta de cores
  const divColor1 = document.querySelector("#color1");
  divColor1.style.backgroundColor = "black";
  const setDivs = () => {
    for (let index = 0; index < divs.length; index += 1) {
      divs[index].style.backgroundColor = colorGenerate();
      if (index === 0) {
        divs[index].style.backgroundColor = "rgb(0, 0, 0)";
      }
    }
  };
  setDivs();

  // array que vai receber as cores presentes na nossa paleta de cores
  let colorPalette = [];

  // evento de clique no botão "Cores Aleatórias"
  btnGenerateColor.addEventListener("click", (event) => {
    for (let index = 0; index < divs.length; index += 1) {
      divs[index].style.backgroundColor = colorGenerate();
      if (index === 0) {
        divs[index].style.backgroundColor = "rgb(0, 0, 0)";
      }
      colorPalette.push(divs[index].style.backgroundColor);
    }
    localStorage.setItem("colorPalette", JSON.stringify(colorPalette));
  });

  // guardando nossas informações da paleta de cores no localStorage e recuperando
  for (let index = 0; index < divs.length; index += 1) {
    if (localStorage.hasOwnProperty("colorPalette")) {
      colorPalette = JSON.parse(localStorage.getItem("colorPalette"));
      divs[index].style.backgroundColor = colorPalette[index];
    } else {
      localStorage.setItem("colorPalette", JSON.stringify(colorPalette));
    }
  }

  // Requisito 6
  const setPixelBoard = (size) => {
    const sectionPixelBoard = document.querySelector("#pixel-board");
    let resized = JSON.parse(localStorage.getItem("boardSize"));
    if (resized) {
      size = resized;
    }
    sectionPixelBoard.style.setProperty("--size", size);
    for (let index = 0; index < size * size; index += 1) {
      let pixel = document.createElement("div");
      pixel.classList = "pixel";
      pixel.style.backgroundColor = "white";
      sectionPixelBoard.appendChild(pixel);
    }
  };
  setPixelBoard(5);
  // Requisito 8

  const selectedPixel = () => {
    for (let index = 0; index < divs.length; index += 1) {
      divs[0].classList.add("selected");
    }
  };
  selectedPixel();

  // Requisito 9
  const selectingColor = () => {
    for (let index = 0; index < divs.length; index += 1) {
      divs[index].addEventListener("click", () => {
        const selectedDiv = document.querySelector(".selected");
        selectedDiv.classList.remove("selected");
        divs[index].classList.add("selected");
      });
    }
  };
  selectingColor();

  // requisito 10

  let drawing = {};
  const paintingBoard = () => {
    const pixelBoard = document.querySelectorAll(".pixel");
    for (let index = 0; index < pixelBoard.length; index += 1) {
      pixelBoard[index].addEventListener("click", (event) => {
        event.target.style.backgroundColor =
          document.querySelector(".selected").style.backgroundColor;
        drawing[index] = event.target.style.backgroundColor;
        localStorage.setItem("pixelBoard", JSON.stringify(drawing));
      });
    }
  };
  paintingBoard();

  // requisito 11
  const clearBoard = () => {
    const pixelBoard = document.querySelectorAll(".pixel");
    btnResetColor.addEventListener("click", (event) => {
      for (let index = 0; index < pixelBoard.length; index += 1) {
        pixelBoard[index].style.backgroundColor = "white";
        drawing[index] = "white";
      }
      localStorage.setItem("pixelBoard", JSON.stringify(drawing));
    });
  };
  clearBoard();

  // requisito 12

  const getPreviousDrawing = () => {
    const pixelBoard = document.querySelectorAll(".pixel");
    const previousDrawing = JSON.parse(localStorage.getItem("pixelBoard"));
    if (previousDrawing) {
      for (let index = 0; index < pixelBoard.length; index += 1) {
        pixelBoard[index].style.backgroundColor = previousDrawing[index];
      }
    } else {
      localStorage.setItem("pixelBoard", JSON.stringify(drawing));
    }
  };
  getPreviousDrawing();

  // requisito 13, 14 e 15
  const input = document.querySelector("#board-size");
  const btnSizeBoard = document.querySelector("#generate-board");

  const resizedPixelBoard = (pixelBoardSize) => {
    let resized = JSON.parse(localStorage.getItem("boardSize"));
    if (resized) {
      pixelBoardSize = resized;
    } else if (pixelBoardSize < 5) {
      pixelBoardSize = 5;
    } else if (pixelBoardSize > 50) {
      pixelBoardSize = 50;
    } else {
      localStorage.setItem("boardSize", JSON.stringify(input.value));
    }

    sectionPixelBoard.innerHTML = "";
    setPixelBoard(pixelBoardSize);
    paintingBoard();
  };

  btnSizeBoard.addEventListener("click", () => {
    if (input.value === "") {
      alert("Board inválido!");
    } else {
      resizedPixelBoard(input.value);
    }
    localStorage.setItem("boardSize", JSON.stringify(input.value));
  });
};
