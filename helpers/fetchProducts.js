const fetchProducts = async (product) => {
  try {
    const urlMercadoLivre = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const response = await fetch(urlMercadoLivre);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
