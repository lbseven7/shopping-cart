const products = document.querySelector('.items'); // 
const ol = document.querySelector('.cart__items'); // 

// remove o item clicado por vez
function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// trata imagem
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Obtive ajuda de Arlisson (eu)
async function addCart(id) {
  const add = await fetchItem(id); // item vindo da API
  const createCart = createCartItemElement(add); // criando o cart
  ol.appendChild(createCart);
}

// customização dos elementos/items
function createCustomElement(element, className, innerText, id) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  // evento no button (eu)
  if (element === 'button') {
    e.addEventListener('click', async () => {
    addCart(id);
    });
  }
  return e;
}

// cria info dos items
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));
  return section;
}

// Requisito 7 loading enquanto faz a requisição API
async function loading() {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const header = document.querySelector('.container');
  document.body.appendChild(div);
  document.body.insertBefore(div, header);
  div.appendChild(label);
  label.classList.add('loading');
  label.innerText = 'carregando...';
}

function removeLoading() {
  const remove = document.querySelector('label');
  remove.remove();
}

// eu
const calledFetchProducts = async () => {
  loading();
  const response = await fetchProducts('computador'); 
  removeLoading();
  const array = response.results;
  array.forEach((element) => {
    const { id, title, thumbnail } = element; // destructuring
    const objectItems = { sku: id, name: title, image: thumbnail };
    products.appendChild(createProductItemElement(objectItems));
  });
};

// Requisito 6 - remover todos os itens do carrinho
function removeAllItemsCart() {
  ol.innerHTML = '';
}
const btnEmptyCart = document.querySelector('.empty-cart');
btnEmptyCart.addEventListener('click', removeAllItemsCart); 

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = async () => {
  await calledFetchProducts();
  await removeAllItemsCart();
  await getSkuFromProductItem();
};
