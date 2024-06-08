import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./GameResultModal.css";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "50%",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const GameResultModal = ({ showModal, setShowModal, gameResult }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (gameResult === "win") {
      setMessage("Congratulations! You won!");
    } else if (gameResult === "lose") {
      setMessage("You lost! Better luck next time.");
    } else if (gameResult === "draw") {
      setMessage("It's a draw! Try again.");
    }
  }, [gameResult]);

  const closeModal = () => {
    setShowModal(false);
    window.close();
  };

  return (
    <>
      {showModal && (
        <motion.div
          className="game-result-modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="game-result-modal-content"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevents propagation to the backdrop
          >
            <motion.h2 variants={messageVariants}>{message}</motion.h2>
            <motion.button onClick={closeModal}>Close</motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default GameResultModal;
