import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PokemonDetails = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemonData(response.data);
        const speciesResponse = await axios.get(response.data.species.url);
        setSpeciesData(speciesResponse.data);
        console.log(speciesResponse);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  if (!pokemonData || !speciesData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{speciesData.name} le nom</p>
      <h2>{pokemonData.name}</h2>
      <p>{speciesData.base_happiness} hapiness</p>
      <p>Weight: {pokemonData.weight / 10} kg</p>
      <p>Height: {pokemonData.height / 10} m</p>
      <h3>Abilities:</h3>
      <ul>
        {pokemonData.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h3>Base Stats:</h3>
      <ul>
        {pokemonData.stats.map((stat, index) => (
          <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
      <h3>Learnable Moves:</h3>
      <ul>
        {pokemonData.moves.slice(0, 5).map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Pokemon = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [name]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Pokemon</h1>

      <div className="pokemon">
        <div className="link-card">
          <div>{name}</div>
          <img src={data.sprites.front_default} alt="pokemon image" />
          <PokemonDetails pokemonId={data.id} />
        </div>
        <div className="type-flex">
          {data.types.map((typesTab, index) => {
            return (
              <Link
                key={index}
                className="type-box"
                to={`/type/${typesTab.type.name}`}
              >
                {typesTab.type.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
