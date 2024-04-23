import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
        // console.log(response.data);
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
      <h1>Type : {data.name}</h1>
      <div className="main-div">
        {data.pokemon.map((pokemon, index) => {
          const url = pokemon.pokemon.url.split("/")[6];
          return (
            <Link to={`/pokemon/${pokemon.pokemon.name}`} key={index}>
              <div className="link-card">
                <div> {pokemon.pokemon.name}</div>
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
