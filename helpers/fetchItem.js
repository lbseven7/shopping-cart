const fetchItem = async (id) => {
  try {
    const itemsApi = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(itemsApi);
  return response.json();
  } catch {
    return new Error('You must provide an url'); 
  }
  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
