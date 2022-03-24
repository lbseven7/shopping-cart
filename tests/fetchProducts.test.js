require("../mocks/fetchSimulator");
const { fetchProducts } = require("../helpers/fetchProducts");
const computadorSearch = require("../mocks/search");

describe("1 - Teste a função fecthProducts", () => {
  test("Teste se fetchProducts é uma função", () => {
    expect(typeof fetchProducts).toBe("function");
  });

  test('fetchProducts com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts("computador");
    expect(fetch).toHaveBeenCalled();
  });

  test('ao chamar a função fetchProducts com o argumento "computador", a fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const endPoint =
      "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts("computador");
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const teste = await fetchProducts("computador");
    expect(teste).toEqual(computadorSearch);
  });

  test('função fetchProducts sem argumento, retorna erro: You must provide an url', async () => {
    const semArgumento = await fetchProducts();
    expect(semArgumento).toEqual(new Error('You must provide an url'));
  })
  
});
