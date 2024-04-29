

const CardPokemon = ({ name, image, habitat, weight, height, abilities, stats, moves }) => {
  return (
    <div className="pokemon-card">
      <h2>{name}</h2>
      <div className="pokemon-image">
        <img src={image} alt={`${name} image`} />
      </div>
      <div className="pokemon-details">
        <p>Habitat: {habitat}</p>
        <p>Weight: {weight / 10} kg</p>
        <p>Height: {height / 10} m</p>
        <h3>Abilities:</h3>
        <ul>
          {abilities.map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>
        <h3>Base Stats:</h3>
        <ul>
          {stats.map((stat, index) => (
            <li key={index}>
              {stat.name}: {stat.value}
            </li>
          ))}
        </ul>
        <h3>Learnable Moves:</h3>
        <ul>
          {moves.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardPokemon;
