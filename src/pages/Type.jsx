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
        return 'red'; // Default color (Blue)
    }
  };

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
