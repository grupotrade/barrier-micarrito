<template>
    <div>
        <v-btn 
            block 
            :outlined="selectedBrand !== null"
            :depressed="selectedBrand === null"
            color="primary" 
            class="rounded-md btn-brand mb-2"
            @click="handleBrandClick(null)"
        >
            Todas las marcas
        </v-btn>
        <div v-for="brand in brands" :key="brand.id">
            <v-btn 
                block 
                :outlined="selectedBrand !== brand.id"
                :depressed="selectedBrand === brand.id"
                color="primary" 
                class="rounded-md btn-brand"
                @click="handleBrandClick(brand)"
            >
                {{ brand.name }}
            </v-btn>
        </div>
    </div>
</template>

<script> 
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            selectedBrand: null
        }
    },
    computed: {
        ...mapGetters({
            brands: "brands/getBrands"
        })
    },
    mounted() {
        this.$store.dispatch('brands/fetchBrands')
    },
    methods: {
        handleBrandClick(brand) {
            this.selectedBrand = brand ? brand.id : null;
            this.$emit('brandSelected', brand);
        }
    }   
}
</script>

<style>
.btn-brand {
    margin-bottom: 8px;
}
.btn-brand .v-btn__content {
    justify-content: flex-start !important;
    text-transform: none !important;
    font-size: 12px !important;
}
</style> 