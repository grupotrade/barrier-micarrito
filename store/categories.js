export const state = {
    productCategories: [],
    productMainCategories: [],
}

export const actions = {
    async fetchAllProductCategories({ commit }) {
        let ref = this.$fire.firestore.collection('product_categories').where('deletedAt', '==', null).orderBy("order", "asc")
        ref.get().then(function (querySnapshot) {
            const result = []
            querySnapshot.forEach(function (doc) {
                let data
                data = doc.data()
                data.id = doc.id
                result.push(data)
            })
            commit('setProductCategories', result)
        })
    },
    async fetchProductMainCategories({ commit }) {
        try {
            const ref = this.$fire.firestore.collection('product_categories')
                .where('deletedAt', '==', null)
                .where('active', '==', true)
                .where('isMain', '==', true)
                .orderBy("order", "asc")
            ref.get().then(function (querySnapshot) {
                const result = []
                querySnapshot.forEach(function (doc) {
                    let data
                    data = doc.data()
                    data.id = doc.id
                    result.push(data)
                })
                commit('setProductMainCategories', result)
            })

        } catch (error) {
            console.error("Error fetching main categories:", error);
        }
    },
    async fetchProductCategoriesByMain({ commit }, payload) {
        let ref = this.$fire.firestore.collection('product_categories').where('category.id', '==', payload).orderBy("order", "asc")
        ref.get().then(function (querySnapshot) {
            const result = []
            querySnapshot.forEach(function (doc) {
                let data
                data = doc.data()
                data.id = doc.id
                result.push(data)
            })
            commit('setProductCategories', result)
        })
    }
}
export const mutations = {
    setProductCategories(state, payload) {
        state.productCategories = payload
    },
    setProductMainCategories(state, mainCategories) {
        state.productMainCategories = mainCategories;
    },
}

export const getters = {
    getProductCategories: (state) => {
        return state.productCategories
    },
    getProductMainCategories: (state) => {
        return state.productMainCategories
    },
}

