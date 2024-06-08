import { useEffect, useState } from "react";
import Cell from "../Cell/Cell.jsx";
import "./Main.css";
import GameResultModal from "../GameResultModal/GameResultModal.jsx";
import { WINNING_COMBINATIONS } from "../../../utils/WinningPatterns.jsx";

const Main = ({ socket, roomCode }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPlay, setCanPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    socket.on("updateGame", (id) => {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[id] = "O";
        return newBoard;
      });
      setCanPlay(true);
    });

    return () => socket.off("updateGame");
  }, [socket]);

  useEffect(() => {
    const checkGameStatus = () => {
      for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setGameResult(board[a] === "X" ? "win" : "lose");
          setShowModal(true);
          return;
        }
      }
      if (board.every((cell) => cell !== "")) {
        setGameResult("draw");
        setShowModal(true);
      }
    };

    checkGameStatus();
  }, [board]);

  const handleCellClick = (e) => {
    const id = e.currentTarget.id;
    if (canPlay && board[id] === "") {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[id] = "X";
        return newBoard;
      });
      socket.emit("play", { id, roomCode });
      setCanPlay(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setGameResult(null);
  };

  return (
    <main>
      <section className="main-section">
        {board.map((cell, index) => (
          <Cell
            key={index}
            handleCellClick={handleCellClick}
            id={index.toString()}
            text={cell}
          />
        ))}
      </section>
      <GameResultModal
        showModal={showModal}
        setShowModal={setShowModal}
        gameResult={gameResult}
        closeModal={closeModal}
      />
    </main>
  );
};

export default Main;
