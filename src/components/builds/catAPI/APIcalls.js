export const getCatImg = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
