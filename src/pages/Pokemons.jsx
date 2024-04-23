import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Pokemons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let allData = [];
      let nextUrl = "https://pokeapi.co/api/v2/pokemon";

      // Boucle pour récupérer toutes les pages de résultats
      while (nextUrl) {
        const response = await axios.get(nextUrl);
        allData = [...allData, ...response.data.results];
        nextUrl = response.data.next; // Lien vers la page suivante, ou null si c'est la dernière page
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
    <div>Chargement</div>
  ) : (
    <div>
      <h1 className="pokemons-title" >Pokemons</h1>

      <div className="main-div">
        {data.map((pokemon, index) => {
          const url = pokemon.url.split("/")[6];
          return (
            <Link to={`/pokemon/${pokemon.name}`} key={index} className="card">
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
      {types.map((type, index) => (
        <span key={index}>{type}</span>
      ))}
    </>
  );
};

export default Pokemons;
