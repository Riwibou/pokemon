import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        <img src={logo} alt="Logo" />
      </Link>
      <div className="right-header">
        <Link className="nav-link" to={"/pokemons"}>
          Pokemons
        </Link>
        <Link className="nav-link" to={"/types"}>
          Types
        </Link>
      </div>
    </div>
  );
};

export default Header;
