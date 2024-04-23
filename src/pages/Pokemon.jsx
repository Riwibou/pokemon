import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>Chargement</div>
  ) : (
    <div>
      <h1>Pokemon</h1>

      <div className="pokemon">
        <div className="link-card">
          <div>{name}</div>
          <img src={data.sprites.front_default} alt="pokemon image" />
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
