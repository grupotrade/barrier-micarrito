export const state = () => ({
  cartItems: [],
});

export const getters = {
  getCart: (state) => {
    return state.cartItems
  }
}

export const mutations = {
  addToCart(state, product) {
    state.cartItems.push(product);
  },
  increaseQuantity(state, index) {
    // Aumenta la cantidad del producto en el índice dado
    state.cartItems[index].quantity += 1;
  },
  decreaseQuantity(state, index) {
    // Disminuye la cantidad del producto en el índice dado
    if (state.cartItems[index].quantity > 1) {
      state.cartItems[index].quantity -= 1;
    } else {
      // Si la cantidad es 1, podrías optar por eliminar el producto del carrito
      state.cartItems.splice(index, 1);
    }
  },
  emptyCart(state) {
    state.cartItems = [];
  },
};

export const actions = {
  addToCart({ commit, state }, product) {
    const existingProductIndex = state.cartItems.findIndex(item => item.product.id === product.product.id);
    if (existingProductIndex !== -1) {
      for (let i = 0; i < product.quantity; i++) {
        commit('increaseQuantity', existingProductIndex);
      }
    } else {
      // Si el producto no está en el carrito, agrégalo
      commit('addToCart', product);
    }
  },
};