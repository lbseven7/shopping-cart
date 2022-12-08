const fetchItem = async (id) => {
  try {
    const itemsApi = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(itemsApi);
    return await response.json();
  } catch (error) {
    return new Error('You must provide an url'); 
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
