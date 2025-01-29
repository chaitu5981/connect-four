import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const arr = Array.from({ length: 6 }, () => Array(7).fill(0));
const App = () => {
  const [turn, setTurn] = useState(1);
  const [grid, setGrid] = useState(arr);
  const [new1, setNew1] = useState([-1, -1]);
  const [finished, setFinished] = useState(false);
  const [translateYVal, setTranslateYVal] = useState(0);
  const [winner, setWinner] = useState(0);
  const handleDrop = (j, width) => {
    if (finished) {
      setFinished(false);
      setWinner(0);
      setGrid(arr);
      setTurn(1);
      setNew1([-1, -1]);
      return;
    }
    let grid1 = JSON.parse(JSON.stringify(grid));
    for (let i = grid1.length - 1; i >= 0; i--) {
      if (grid1[i][j] === 0) {
        if (turn == 1) grid1[i][j] = 1;
        else grid1[i][j] = 2;
        setGrid(grid1);
        width < 640 ? setTranslateYVal(-i * 3) : setTranslateYVal(-i * 4.4);
        setNew1([i, j]);
        turn === 1 ? setTurn(2) : setTurn(1);

        return;
      }
    }
  };
  const check = () => {
    console.log(new1);
    let i = new1[0],
      j = new1[1];

    if (i === -1 || j === -1) return false;
    let col = grid[i][j],
      flag;
    console.log(col);
    console.log(grid);
    if (j <= 3) {
      flag = true;
      for (let k = 0; k < 4; k++) {
        if (grid[i][j + k] !== col) {
          flag = false;
          break;
        }
      }
      if (flag) return true;
    }
    if (i <= 2) {
      flag = true;
      for (let k = 0; k < 4; k++) {
        if (grid[i + k][j] !== col) {
          flag = false;
          break;
        }
      }
      if (flag) return true;
    }
    if (j >= 3) {
      flag = true;
      for (let k = 0; k < 4; k++) {
        if (grid[i][j - k] !== col) {
          flag = false;
          break;
        }
      }
      if (flag) return true;
    }
    if (i <= 2 && j <= 3) {
      console.log("Hi");
      flag = true;
      for (let k = 0; k < 4; k++) {
        console.log("Hello");
        if (grid[i + k][j + k] !== col) {
          flag = false;
          break;
        }
      }
      if (flag) return true;
    }
    if (i >= 3 && j <= 3) {
      flag = true;
      for (let k = 0; k < 4; k++) {
        if (grid[i - k][j + k] !== col) {
          flag = false;
          break;
        }
      }
      if (flag) return true;
    }
    if (i >= 3 && j >= 3) {
      flag = true;
      for (let k = 0; k < 4; k++) {
        if (grid[i - k][j - k] !== col) {
          flag = false;
          break;
        }
      }
      if (flag) return true;
    }
    if (i <= 2 && j >= 3) {
      flag = true;
      for (let k = 0; k < 4; k++) {
        if (grid[i + k][j - k] !== col) {
          flag = false;
          break;
        }
      }
      if (flag) return true;
    }
    return false;
  };
  useEffect(() => {
    if (check()) {
      setFinished(true);
      // let i=new1[0],j=new1[1]
      setWinner(grid[new1[0]][new1[1]]);
    }
  }, [grid, new1]);
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `@keyframes move{
    from {
      transform : translateY(${translateYVal}rem)
    }
      to {
      transform : translateY(0)
      }
    }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, [translateYVal]);
  return (
    <div className="flex min-h-screen justify-center bg-amber-200 items-center p-4">
      <div className="flex flex-col gap-3.5 w-[21rem] sm:w-[31rem]">
        <p className="text-2xl text-center">
          Make 4 of your coins in a row horizontally,vertically or diagonally
        </p>
        <p className="text-2xl text-center">
          {finished
            ? winner == 1
              ? "Red won"
              : "Green won"
            : `${turn == 1 ? "Red" : "Green"}'s turn`}
        </p>
        <div className="flex flex-col">
          <div className="flex justify-between">
            {Array(7)
              .fill(null)
              .map((_, j) => (
                <button
                  key={j}
                  onClick={() => handleDrop(j, window.innerWidth)}
                  className="w-[2.6rem] sm:w-[4rem]  border-2 border-black my-2"
                >
                  {finished ? "Play Again" : "Drop"}
                </button>
              ))}
          </div>
          {grid.map((r, i) => (
            <div key={i} className="flex">
              {r.map((c, j) => (
                <div
                  key={j}
                  className="border-2 border-black w-[3rem] h-[3rem] sm:w-[4.4rem] sm:h-[4.4rem] p-[2px] flex justify-center items-center"
                >
                  {grid[i][j] == 0 ? (
                    ""
                  ) : grid[i][j] === 1 ? (
                    <div
                      className=" w-[2.6rem] h-[2.6rem] sm:w-[4rem] sm:h-[4rem] rounded-full bg-red-500"
                      style={{ animation: "move 1s ease-out forwards" }}
                    ></div>
                  ) : (
                    <div
                      className="w-[2.6rem] h-[2.6rem] sm:w-[4rem] sm:h-[4rem] rounded-full bg-green-500"
                      style={{ animation: "move 1s ease-out forwards" }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
