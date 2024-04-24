import image1 from "../../assets/chien.png";
import image2 from "../../assets/dracofeu.png";
import image3 from "../../assets/fighter.png";
import image4 from "../../assets/godzilla.png";
import image5 from "../../assets/meca.png";
import image6 from "../../assets/mythic.png";
import image7 from "../../assets/pikachu.png";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import './home.css'


const Home = () => {
  return (
    <>
      <div id="home-content">
          <div className="home-container">
            <div className="wrapper">
              <div className="item"><img style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }} src={image1} alt="" /></div>

              <div className="item"><img style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }} src={image2} alt="" /></div>

              <div className="item"><img style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }} src={image3} alt="" /></div>

              <div className="item"><img style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }} src={image4} alt="" /></div>

              <div className="item"><img style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }} src={image5} alt="" /></div>

              <div className="item"><img style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }} src={image6} alt="" /></div>

              <div className="item"><img style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }} src={image7} alt="" /></div>
            </div>
            <Link to={"/"}>
              <img className="logo-home" src={logo} alt="" />
            </Link>
            <div className="home-middle ">
              <Link className="cta-link" to={"/pokemons"}>Pokemons</Link>
              <Link className="cta-link" to={"/types"}>Types</Link>
            <h1>Welcome To You</h1>
            <h1>Young Trainer!</h1>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;