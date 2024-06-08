import DarkMode from "../../../assets/Svgs/DarkMode";
import LinkSvg from "../../../assets/Svgs/Link";
import "./Footer.css";

const Footer = ({ setShowModal }) => {
  return (
    <footer>
      <LinkSvg setShowModal={setShowModal} />
      <DarkMode />
    </footer>
  );
};

export default Footer;
