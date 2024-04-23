import image1 from "../assets/chien.png";
import image2 from "../assets/dracofeu.png";
import image3 from "../assets/fighter.png";
import image4 from "../assets/godzilla.png";
import image5 from "../assets/meca.png";
import image6 from "../assets/mythic.png";
import image7 from "../assets/pikachu.png";

const Home = () => {
  return (
    <>
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
      </div>
      <h1>Salut à toi jeune dresseur</h1>
    </>
  );
};

export default Home;
