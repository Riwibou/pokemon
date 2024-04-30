import logo from "../../assets/logo.png";
import image1 from "../../assets/chien.png";
import image2 from "../../assets/dracofeu.png";
import image3 from "../../assets/fighter.png";
import image4 from "../../assets/godzilla.png";
import image5 from "../../assets/meca.png";
import image6 from "../../assets/mythic.png";
import image7 from "../../assets/pikachu.png";
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {
  return (
    <div id="home-content">
      <div className="home-container">
        <div className="wrapper">
          <div className="item"><img src={image1} alt="florizard" /></div>
          <div className="item"><img src={image2} alt="dracofeu" /></div>
          <div className="item"><img src={image3} alt="arcadin" /></div>
          <div className="item"><img src={image4} alt="godzilla" /></div>
          <div className="item"><img src={image5} alt="mewtwo" /></div>
          <div className="item"><img src={image6} alt="tortank" /></div>
          <div className="item"><img src={image7} alt="pikachu" /></div>
        </div>
        <Link to={"/"}>
          <img className="logo-home" src={logo} alt="" />
        </Link>
        <div className="home-links">
          <Link className="cta-link" to={"/pokemons"}>Pokemons</Link>
          <Link className="cta-link" to={"/types"}>Types</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
