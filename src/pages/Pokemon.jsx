import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PokemonDetails = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [pokeEvolStory, setPokeEvolStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemonData(res);
      })
      .then(() => fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`))
      .then((res) => res.json())
      .then((speciesData) => {
        setSpeciesData(speciesData)
        return fetch(speciesData.evolution_chain.url);
      })
      .then((res) => res.json())
      .then((pokeEvolStory) => {
        setPokeEvolStory(pokeEvolStory);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon details:", error);
        setLoading(false);
      });
  }, [pokemonId]);

  const displayEvolutions = (chain) => {
    const evolutions = [];

    const traverseChain = (chain) => {
      if (chain && chain.species) {
        evolutions.push(chain.species.name);
        chain.evolves_to.forEach((evolution) => {
          traverseChain(evolution);
        });
      }
    };

    traverseChain(chain);
    return evolutions.join(" -> ");
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>

          {pokeEvolStory && pokeEvolStory.chain && pokeEvolStory.chain.evolves_to.length > 0 ? (
            <p>Evolutions: {displayEvolutions(pokeEvolStory.chain)}</p>
          ) : (
            <p>There is no evolutions for this Pokemon</p>
          )}

          {pokemonData.game_indices.length > 0 ? (
            <p>
              Appear from the versions: {pokemonData.game_indices[0].version.name}
              {pokemonData.game_indices.length > 1 && (
                <> and {pokemonData.game_indices[1].version.name}</>
              )}
            </p>
          ) : (
            <p>No game version found</p>
          )}

          {speciesData && speciesData.flavor_text_entries && speciesData.flavor_text_entries.length > 0 && (
            <p>
              Story : {speciesData.flavor_text_entries
                .slice(1, 12)
                .reduce((uniqueTexts, story) => {
                  if (!uniqueTexts.includes(story.flavor_text)) {
                    uniqueTexts.push(story.flavor_text);
                  }
                  return uniqueTexts;
                }, [])
                .join(' ')}
            </p>
          )}

          <p>Habitat: {speciesData && speciesData.habitat.name}</p>

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
              <li key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <h3>Learnable Moves:</h3>
          <ul>
            {pokemonData.moves.slice(0, 8).map((move, index) => (
              <li key={index}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      )}
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
        setLoading(false);
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
