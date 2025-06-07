export const state = {
    products: [],
    homeProducts: [],
    searchResults: []
}

export const actions = {
    async getProducts({commit}) {
        let ref = this.$fire.firestore.collection('products').where('deletedAt', '==', null).orderBy("date", "asc")
            ref.get().then(function (querySnapshot) {
                const result = []
                querySnapshot.forEach(function (doc) {
                    let data
                    data = doc.data()
                    data.id = doc.id
                    result.push(data)
                })
                commit('setProducts', result) 
            })
    },
    async searchProducts({ commit }, searchTerm) {
        if(searchTerm){
        const searchTermLower = searchTerm.toLowerCase();
      
        let ref = this.$fire.firestore.collection('products')
          .where('deletedAt', '==', null)
          .where('status', '==', 1)
          .orderBy("date", "asc");
      
        ref.get().then(function (querySnapshot) {
          const result = [];
          querySnapshot.forEach(function (doc) {
            let data = doc.data();
            data.id = doc.id;
      
            const productNameLower = data.name.toLowerCase();
      
            if (productNameLower.includes(searchTermLower)) {
              result.push(data);
            }
          });
      
          commit('setSearchResults', result);
        });}
      },
    async getProductById({}, payload) {
            return new Promise((resolve, reject) => {
                let ref = this.$fire.firestore.collection('products')
                ref.doc(payload).get().then((doc) => {
                    if (doc.exists) {
                        resolve(doc.data())
                    } else {
                        // doc.data() will be undefined in this case
                        console.error("No such document!");
                    }
                }).catch((error) => {
                    console.error("Error getting document:", error);
                })
            })
    },
    async fetchProductsByCategory({commit}, payload) {
        try {
            let ref = this.$fire.firestore.collection('products')
                .where('deletedAt', '==', null)
                .where('status', '==', 1)
                .where('category', '==', payload)
                .orderBy("date", "asc");
            
            const querySnapshot = await ref.get();
            const result = [];
            querySnapshot.forEach(function (doc) {
                let data = doc.data();
                data.id = doc.id;
                result.push(data);
            });
            commit('setProducts', result);
            return result;
        } catch (error) {
            console.error("Error fetching products by category:", error);
            commit('setProducts', []);
            return [];
        }
    },
    async fetchHomeProducts({commit}) {
        let ref = this.$fire.firestore.collection('products').where('onHome', '==', true).where('deletedAt', '==', null).orderBy("date", "asc")
            ref.get().then(function (querySnapshot) {
                const result = []
                querySnapshot.forEach(function (doc) {
                    let data
                    data = doc.data()
                    data.id = doc.id
                    result.push(data)
                })
                commit('setHomeProducts', result) 
            })
    },
    async fetchNonHomeProducts({commit}) {
        let ref = this.$fire.firestore.collection('products').where('onHome', '==', false).where('deletedAt', '==', null).orderBy("date", "asc")
            ref.get().then(function (querySnapshot) {
                const result = []
                querySnapshot.forEach(function (doc) {
                    let data
                    data = doc.data()
                    data.id = doc.id
                    result.push(data)
                })
                commit('setProducts', result) 
            })
    },
    async fetchAllProducts({commit}) {
        let ref = this.$fire.firestore.collection('products')
            .where('deletedAt', '==', null)
            .where('status', '==', 1)
            .orderBy("date", "asc")
            
        ref.get().then(function (querySnapshot) {
            const result = []
            querySnapshot.forEach(function (doc) {
                let data = doc.data()
                data.id = doc.id
                result.push(data)
            })
            commit('setProducts', result) 
        })
    },
}
export const mutations = {
    setProducts(state, payload) {
        state.products = payload
    },
    setHomeProducts(state, payload) {
        state.homeProducts = payload
    },
    setSearchResults(state, results) {
        state.searchResults = results;
      },
}

export const getters = {
    getProducts: (state) => {
        return state.products
    },
    getHomeProducts: (state) => {
        return state.homeProducts
    },
    getSearchResults: (state) => {
        return state.searchResults
    },
}

