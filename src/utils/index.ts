export const fetchProductImage = async () => {
  const response = await fetch("https://foodish-api.com/api/");
  const data = await response.json();
  return data.image;
};
