<template>
  <v-sheet class="white pb-12">
  <v-row>
    <v-col v-for="brand in brands" :key="brand.id" cols="12" md="3" class="d-flex justify-center align-center">
      <img :src="getImageUrl(brand.image)" class="mx-7" />
    </v-col>
  </v-row>
  </v-sheet>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        loading: true,
        imagesLoaded: false,
      }
    },
    computed: {
      ...mapGetters({
        brands: "brands/getBrands",
      })
    },
    mounted() {
      this.listBrands();
    },
    methods: {
      async listBrands() {
        await this.$store.dispatch('brands/fetchBrands');
        this.loading = false;
        this.loadImagesAsync();
      },
      getImageUrl(imageName) {
        return this.$config.storage + 'brands%2F' + imageName + '?alt=media';
      },
      async loadImagesAsync() {
        const imagePromises = this.brands.map(brand => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = this.getImageUrl(brand.image);
          });
        });
        try {
          await Promise.all(imagePromises);
          this.imagesLoaded = true;
        } catch (error) {
          console.error('Error al cargar imágenes:', error);
        }
      }
    }
  }
  </script>
  