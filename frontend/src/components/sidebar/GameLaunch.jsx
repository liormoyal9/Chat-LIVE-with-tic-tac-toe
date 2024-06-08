import { BiSolidRocket } from "react-icons/bi";
import { generateRandomNumber } from "../../utils/generateGameCode";

const GameLaunch = ({ onCode }) => {
  // const { loading, logout } = useLogout();
  const handleClick = () => {
    window.open("http://localhost:3000/game");
    const code = generateRandomNumber();
    onCode(code);
  };
  return (
    <div className="mt-auto">
      <BiSolidRocket
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};
export default GameLaunch;
