import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import getTypeColor from "../utils/getTypeColor";

const Type = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { element } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${element}`
        );
        console.log(response.data);
        // console.log(element);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [element]);


  return loading ? (
    <div>Chargement</div>
  ) : (
    <div>
      <h1 className="color-type" style={{ backgroundColor: getTypeColor(data.name), textShadow: "0 0 3px black" }}>ALL the {data.name} Pokemons</h1>
      <div className="main-div">
        {data.pokemon.map((pokemon, index) => {
          const url = pokemon.pokemon.url.split("/")[6];
          return (
            <Link to={`/pokemon/${pokemon.pokemon.name}`} key={index}>
              <div className="link-card">
                <div className="color-type"
                style={
                  {
                  backgroundColor: getTypeColor(data.name),
                  textShadow: "0 0 8px black",
                  color: "white",
                  textDecoration: "none"
                  }}>
                  {pokemon.pokemon.name}
                </div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`}
                  alt=""
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Type;
