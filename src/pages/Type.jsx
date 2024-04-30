import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import getTypeColor from "../utils/getTypeColor";

const Type = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("pokedex");
  const { element } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${element}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [element]);

  const toggleSort = () => {
    setSortBy(sortBy === "alphabetical" ? "pokedex" : "alphabetical");
  };

  const sortedPokemon = data?.pokemon?.slice().sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.pokemon.name.localeCompare(b.pokemon.name);
    } else {
      return parseInt(a.pokemon.url.split("/")[6]) - parseInt(b.pokemon.url.split("/")[6]);
    }
  });

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1
        className="color-type"
        style={{
          backgroundColor: getTypeColor(data.name),
          textShadow: "0 0 3px black"
        }}
      >
        ALL the {data.name} Pokemons
      </h1>
      <button onClick={toggleSort}>
        {sortBy === "alphabetical" ? "Sorted Alphabetically" : "Sorted by Pokedex order"}
      </button>
      <div className="main-div">
        {sortedPokemon.map((pokemon, index) => (
          <Link to={`/pokemon/${pokemon.pokemon.name}`} key={index}>
            <div className="link-card">
              <div
                className="color-type"
                style={{
                  backgroundColor: getTypeColor(data.name),
                  textShadow: "0 0 8px black",
                  color: "white",
                  textDecoration: "none"
                }}
              >
                {pokemon.pokemon.name}
              </div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split("/")[6]}.png`}
                alt=""
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Type;
