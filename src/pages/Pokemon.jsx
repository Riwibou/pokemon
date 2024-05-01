import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getTypeColor from "../utils/getTypeColor";
import axios from "axios";

const PokemonDetails = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [pokeEvolStory, setPokeEvolStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evolutions, setEvolutions] = useState([]);
  const [evolutionsDetails, setEvolutionsDetails] = useState([]); 
  const [evolutionsImages, setEvolutionsImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => res.json())
      .then((res) => {
        setPokemonData(res);
      })
      .then(() => fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`))
      .then((res) => res.json())
      .then((speciesData) => {
        setSpeciesData(speciesData);
        return fetch(speciesData.evolution_chain.url);
      })
      .then((res) => res.json())
      .then((pokeEvolStory) => {
        const evolutions = createEvolutions(pokeEvolStory.chain);
        setEvolutions(evolutions);
        const evolutionDetailsPromises = evolutions.map(evolution =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${evolution}`).then(res =>
            res.json()
          )
        );
        return Promise.all(evolutionDetailsPromises);
      })
      .then((evolutionDetails) => {
        setEvolutionsDetails(evolutionDetails);
        const images = evolutionDetails.map(data => data.sprites.front_default);
        setEvolutionsImages(images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon details:", error);
        setLoading(false);
      });
  }, [pokemonId]);

  const createEvolutions = (chain) => {
    const newEvolutions = [];

    const traverseChain = (currentChain) => {
      if (currentChain.species) {
        newEvolutions.push(currentChain.species.name);
      }
      if (currentChain.evolves_to) {
        currentChain.evolves_to.forEach((evolution) => {
          traverseChain(evolution);
        });
      }
    };

    traverseChain(chain);
    return newEvolutions;
  };

  const displayEvolutions = (evolutions) => {
    return evolutions.join(" -> ");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-infos-container">
      {pokemonData && (
        <div>
          <h2 className="poke-name">{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
          <img className="poke-img" src={pokemonData.sprites.front_default} alt="pokemon image" />

          <div className="type-flex">
            {pokemonData.types.map((typesTab, index) => {
              return (
                <Link
                  key={index}
                  className="btn-types"
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

          <div className="poke-evol-card">
            {evolutions.length > 0 ? (
              <p className="poke-evolution">
                <h3>Evolutions:</h3>
              </p>
            ) : (
              <p className="poke-evolution">
                There are no evolutions for this Pokemon
              </p>
            )}

            {evolutionsImages.length > 0 && (
              <div className="evolution-images">
                {evolutionsDetails.map((detail, index) => (
                  <Link key={index} to={`/pokemon/${evolutions[index]}`}>
                    <div className="evolution-card">
                      <h3>{detail.name}</h3>
                      <img src={evolutionsImages[index]} alt={`Evolution ${index + 1}`} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {pokemonData.game_indices.length > 0 ? (
            <p className="poke-version">
              Appear from the versions:{" "}
              <br /> {pokemonData.game_indices[0].version.name}
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
                Story : <br /> {" "}
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

          {speciesData ? (
            <div>
              <p>Habitat: {speciesData.habitat ? speciesData.habitat.name : "Unknown"}</p>
            </div>
            ) : (
            <div>
              <p>Habitat: Unknown</p>
            </div>
          )}



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
        // console.log("Fetched Pokemon Details Response:", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        // console.log("Error fetching Pokemon details:", error.response);
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
