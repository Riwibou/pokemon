import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getTypeColor from "../utils/getTypeColor";
import axios from "axios";

const PokemonDetails = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [pokeEvolStory, setPokeEvolStory] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemonData(res);
      })
      .then(() =>fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`))
      .then((res) => res.json())
      .then((speciesData) => {
        setSpeciesData(speciesData);
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
    <div className="pokemon-infos-container">
      {pokemonData && (
        <div>
          <h2 className="poke-name">{pokemonData.name}</h2>
          <img className="poke-img" src={pokemonData.sprites.front_default} alt="pokemon image" />

          <div className="type-flex">
          {pokemonData.types.map((typesTab, index) => {
            return (
              <Link
                key={index}
                className=""
                style={{
                  backgroundColor: getTypeColor(typesTab.type.name),
                  color: "white",
                  textShadow: "0 0 3px black"
                  }}
                to={`/type/${typesTab.type.name}`}
              >
                {typesTab.type.name}
              </Link>
            );
          })}
        </div>

          {pokeEvolStory &&
          pokeEvolStory.chain &&
          pokeEvolStory.chain.evolves_to.length > 0 ? (
            <p className="poke-evolution" >
              <span >Evolutions:</span> {displayEvolutions(pokeEvolStory.chain)}
            </p>
          ) : (
            <p className="poke-evolution">
              There is no evolutions for this Pokemon
            </p>
          )}

          {pokemonData.game_indices.length > 0 ? (
            <p className="poke-version">
              Appear from the versions:{" "}
              {pokemonData.game_indices[0].version.name}
              {pokemonData.game_indices.length > 1 && (
                <> and {pokemonData.game_indices[1].version.name}</>
              )}
            </p>
          ) : (
            <p className="poke-version">No game version found</p>
          )}

          {speciesData &&
            speciesData.flavor_text_entries &&
            speciesData.flavor_text_entries.length > 0 && (
              <p className="poke-story">
                Story :{" "}
                {speciesData.flavor_text_entries
                  .slice(1, 6)
                  .reduce((uniqueTexts, story) => {
                    if (!uniqueTexts.includes(story.flavor_text)) {
                      uniqueTexts.push(story.flavor_text);
                    }
                    return uniqueTexts;
                  }, [])
                  .join(" ")}
              </p>
            )}

          <div className="poke-charac">
            <p>Habitat: {speciesData && speciesData.habitat.name}</p>
            <p>Weight: {pokemonData.weight / 10} kg</p>
            <p>Height: {pokemonData.height / 10} m</p>
          </div>

          <div className="poke-numbers">
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
          <PokemonDetails pokemonId={data.id} />
    </div>
  );
};

export default Pokemon;
