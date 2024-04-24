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
    <div>Chargement</div>
  ) : (
    <div className="pokemons-div">
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'fighting':
        return '#FF8000'; // Fighting (Red)
      case 'flying':
        return '#81B9EF'; // Flying (Purple)
      case 'poison':
        return '#9141CB'; // Poison (Purple)
      case 'ground':
        return '#915121'; // Ground (Yellow)
      case 'rock':
        return '#AFA981'; // Rock (Brown)
      case 'bug':
        return '#91A119'; // Bug (Green)
      case 'ghost':
        return '#704170'; // Ghost (Indigo)
      case 'steel':
        return '#60A1B8'; // Steel (Silver)
      case 'fire':
        return '#E62829'; // Fire (Orange)
      case 'water':
        return '#6890F0'; // Water (Blue)
      case 'grass':
        return '#78C850'; // Grass (Green)
      case 'electric':
        return '#F8D030'; // Electric (Yellow)
      case 'psychic':
        return '#EF4179'; // Psychic (Pink)
      case 'ice':
        return '#3DCEF3'; // Ice (Cyan)
      case 'dragon':
        return '#5060E1'; // Dragon (Indigo)
      case 'dark':
        return '#624D4E'; // Dark (Brown)
      case 'fairy':
        return '#EF70EF'; // Fairy (Pink)
      case 'unknown':
        return '#68A090'; // Unknown (Gray)
      case 'shadow':
        return 'rgb(50, 50, 50)'; // Shadow (Brown)
      case 'normal':
        return '#9FA19F';
      default:
        return '#535BF2'; // Default color (Blue)
    }
  };


  return (
    <>
    <div className={`card-footer ${types.length === 1 ? 'single-type' : ''}`}>
      {types.map((type, index) => (
        <span key={index} style={{ backgroundColor: getTypeColor(type) }}>{type} </span>
      ))}
    </div>
    </>
  );
};

export default Pokemons;
