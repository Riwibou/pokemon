import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import getTypeColor from "../utils/getTypeColor";

const Pokemons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let allData = [];
      let nextUrl = "https://pokeapi.co/api/v2/pokemon";

      while (nextUrl) {
        const response = await axios.get(nextUrl);
        allData = [...allData, ...response.data.results];
        nextUrl = response.data.next;
      }

      setData(allData);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div className="loader">
      <p>So much pokemons and types to load, please wait few seconds ... </p>
      <iframe
        src="https://gifer.com/embed/4vzt"
        width="200"
        height="70"
        style={{
          width: "200px",
          height: "300px",
          transform: "rotate(-90deg)"
        }}
        frameBorder="0"
        allowFullScreen
        title="GIF from Gifer"
      ></iframe>
    </div>
  ) : (
    <div className="pokemons-div">
      <h1 className="pokemons-title" >Pokemons</h1>

      <div className="main-div">
        {data.map((pokemon, index) => {
          const url = pokemon.url.split("/")[6];
          return (
            <Link to={`/pokemon/${pokemon.name}`} key={index} className="card">
              <div className="">

              </div>
              <div className="card-header">{pokemon.name}</div>
              <div className="card-body">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`}
                  alt={pokemon.name}
                />
              </div>
              <div className="card-footer">
                <PokemonTypes url={`https://pokeapi.co/api/v2/pokemon/${url}`} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const PokemonTypes = ({ url }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(url);
        const types = response.data.types.map((type) => type.type.name);
        setTypes(types);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchTypes();
  }, [url]);

  return (
    <>
    <div className={`card-footer ${types.length === 1 ? 'single-type' : ''}`}>
      {types.map((type, index) => (
        <span key={index} style={{ backgroundColor: getTypeColor(type), textShadow: "0 0 3px black" }}>{type} </span>
      ))}
    </div>
    </>
  );
};

export default Pokemons;
