import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import './header.css'

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="right-header">
        <Link to={"/pokemons"}>Pokemons</Link>
        <Link to={"/types"}>Types</Link>
      </div>
    </div>
  );
};

export default Header;
