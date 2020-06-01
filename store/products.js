import Vue from 'vue'

export const namespaced = true

export const state = () => ({
  products: [],
  product: {}
})

export const getters = {
  productSearch: (state) => {
    return state.products.map((product) => {
      return {
        _id: product._id,
        record: product.code + product.description
      }
    })
  },
  getById: (state) => (id) => {
    return (
      state.products &&
      state.products.filter((product) => {
        return product._id === id
      })[0]
    )
  }
}

export const mutations = {
  SAVE_PRODUCT(state, product) {
    state.products.push(product)
  },
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
  UPDATE_PRODUCT(state, product) {
    const idx = state.products.findIndex((prod) => prod._id === product._id)
    Vue.set(state.products, idx, { ...product })
  }
}

export const actions = {
  fetchProducts({ state, commit }) {
    return this.$axios
      .get('/products')
      .then((response) => {
        commit('SET_PRODUCTS', response.data)
      })
      .catch((e) => {
        console.log('fetchProducts', e)
      })
  },
  fetchProduct({ commit, state }, id) {
    return this.$axios.get('/products/' + id).then((response) => {
      commit('SET_PRODUCT', response.data)
    })
  },
  saveProduct({ commit }, product) {
    if (product._id) {
      return this.$axios
        .put('/products/' + product._id, product)
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data)
        })
    } else {
      return this.$axios.post('/products', product).then((response) => {
        commit('SAVE_PRODUCT', response.data)
      })
    }
  }
}
