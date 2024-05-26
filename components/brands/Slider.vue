<template>
    <div>
        <img :src="getImageUrl(brand.image)" v-for="brand in brands" :key="brand.id" height="150" class="mx-7" />
    </div>
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
  