import { BiMeteor } from "react-icons/bi";
const OpenGame = ({ onCode }) => {
  // const { loading, logout } = useLogout();
  const handleClick = () => {
    window.open("http://localhost:3000/game");
  };
  return (
    <div className="mt-auto">
      <BiMeteor
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};
export default OpenGame;
