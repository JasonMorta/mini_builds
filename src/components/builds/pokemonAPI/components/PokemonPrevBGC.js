function generateBGC(nature){
    const valuesArray = [
        { name: "normal", color: "#A8A878" },
        { name: "fighting", color: "#C03028" },
        { name: "flying", color: "#A890F0" },
        { name: "poison", color: "#A040A0" },
        { name: "ground", color: "#E0C068" },
        { name: "rock", color: "#B8A038" },
        { name: "bug", color: "#A8B820" },
        { name: "ghost", color: "#705898" },
        { name: "steel", color: "#B8B8D0" },
        { name: "fire", color: "#F08030" },
        { name: "water", color: "#6890F0" },
        { name: "grass", color: "#78C850" },
        { name: "electric", color: "#F8D030" },
        { name: "psychic", color: "#F85888" },
        { name: "ice", color: "#98D8D8" },
        { name: "dragon", color: "#7038F8" },
        { name: "dark", color: "#705848" },
        { name: "fairy", color: "#EE99AC" },
        { name: "unknown", color: "#68A090" },
        { name: "shadow", color: "#5A5266" },
      ];
      
  
      
      // Array of objects representing the nature values
      //const nature = [{ name: "steel" },{ name: "poison" } ];
      
      // Array to store the gradient colors
      let gradientColors = [];
      
 if (nature !== undefined) {
       // Iterate over the nature array
       for (let i = 0; i < nature.length; i++) {
        const name = nature[i].type.name;
      
        // Check if the name exists in the valuesArray
        const matchingColor = valuesArray.find((value) => value.name === name);
      
        // If a matching color is found, add it to the gradientColors array
        if (matchingColor) {
          gradientColors.push(matchingColor.color);
          
        }
      }
      gradientColors.reverse();

    
      // Check if there are any gradient colors
      if (gradientColors.length > 0) {
        // Set the background image color using linear gradient with the gradient colors
        return `linear-gradient(to top, #f0ffff,${gradientColors.join(", ")} )`;
      }
 }

}

export default generateBGC;