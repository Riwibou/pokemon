

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

export default getTypeColor
