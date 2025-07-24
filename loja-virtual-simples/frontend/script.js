// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartModal = document.getElementById('cart-modal');
const categories = document.getElementById('categories');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Estado da aplicação
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let allProducts = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  updateCartUI();
  
  // Event Listeners
  document.querySelector('.cart-icon').addEventListener('click', openCart);
  document.getElementById('close-cart').addEventListener('click', closeCart);
  document.getElementById('checkout').addEventListener('click', checkout);
  categories.addEventListener('click', filterByCategory);
  searchBtn.addEventListener('click', searchProducts);
  searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') searchProducts();
  });
});

// Buscar produtos do backend
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3001/api/products');
    allProducts = await response.json();
    displayProducts(allProducts);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    productsContainer.innerHTML = '<p class="error">Erro ao carregar produtos. Tente recarregar a página.</p>';
  }
}

// Exibir produtos
function displayProducts(products) {
  productsContainer.innerHTML = '';
  
  if (products.length === 0) {
    productsContainer.innerHTML = '<p class="empty">Nenhum produto encontrado</p>';
    return;
  }
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <div class="product-image">
        <img src="https://via.placeholder.com/200?text=${product.name.replace(' ', '+')}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <span class="category">${product.category}</span>
        <p class="description">${product.description}</p>
        <p class="price">R$ ${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
      </div>
    `;
    productsContainer.appendChild(productCard);
  });
  
  // Adicionar eventos aos botões
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Gerenciamento do Carrinho
function addToCart(e) {
  const productId = parseInt(e.target.dataset.id);
  const product = allProducts.find(p => p.id === productId);
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  updateCartUI();
  showNotification(`${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  // Salvar no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Atualizar contador
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Atualizar itens do carrinho
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    cartTotalPrice.textContent = '0.00';
    return;
  }
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
      </div>
      <div>
        <p>R$ ${itemTotal.toFixed(2)}</p>
        <button class="remove-item" data-id="${item.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    cartItems.appendChild(li);
  });
  
  cartTotalPrice.textContent = total.toFixed(2);
  
  // Adicionar eventos de remoção
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', e => {
      const id = parseInt(e.target.closest('button').dataset.id);
      removeFromCart(id);
    });
  });
}

// Filtros e Busca
function filterByCategory(e) {
  if (e.target.tagName === 'LI') {
    // Ativar categoria selecionada
    document.querySelectorAll('#categories li').forEach(li => {
      li.classList.remove('active');
    });
    e.target.classList.add('active');
    
    const category = e.target.dataset.category;
    
    if (category === 'all') {
      displayProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category === category);
      displayProducts(filtered);
    }
  }
}

function searchProducts() {
  const term = searchInput.value.trim();
  
  if (term) {
    fetch(`http://localhost:3001/api/search?q=${term}`)
      .then(res => res.json())
      .then(displayProducts)
      .catch(console.error);
  } else {
    displayProducts(allProducts);
  }
}

// Funções do Carrinho
function openCart() {
  cartModal.style.display = 'flex';
}

function closeCart() {
  cartModal.style.display = 'none';
}

function checkout() {
  if (cart.length === 0) return;
  
  alert('Compra finalizada com sucesso! Obrigado pela preferência.');
  cart = [];
  updateCartUI();
  closeCart();
}

// Utilitários
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}