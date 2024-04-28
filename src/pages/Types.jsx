import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import getTypeColor from "../utils/getTypeColor";

const Types = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      // console.log(response.data);
      setData(response.data.results);
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
      <h1>Types</h1>
      <div className="all-type">
        {data.map((types, index) => {
          return (
            <Link
            className="type-box"
            to={`/type/${types.name}`}
            key={index}
            style={{
              backgroundColor: getTypeColor(types.name),
              color: "white",
              textShadow: "0 0 3px black"
              }}>

              {types.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Types;
