<template>
    <div>
        <v-card flat tile v-if="!$vuetify.breakpoint.xs">
            <v-carousel v-if="banners.length > 1" hide-delimiters :height="carouselHeight" cycle :interval="5000"
                continuous @change="handleCarouselChange">
                <v-carousel-item v-for="banner in banners" :key="banner.name">
                    <img :src="getImageSrc(banner)" style="max-width: 100%" @load="setCarouselHeight" />
                    <v-sheet v-if="imageLoading" class="d-flex justify-center align-center" :height="carouselHeight">
                        <v-progress-circular v-if="imageLoading" indeterminate color="primary" size="64"></v-progress-circular>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <v-img :src="getImageSrc(banners[0])" v-else cover contain></v-img>
        </v-card>
        <v-card flat tile v-if="$vuetify.breakpoint.xs">
            <v-carousel hide-delimiters :height="carouselHeight" cycle :interval="5000" v-if="banners.length > 1"
                continuous>
                <v-carousel-item v-for="banner in banners" :key="banner.name">
                    <img :src="getImageMobileSrc(banner)" style="max-width: 100%" @load="setCarouselHeight" />
                    <v-sheet v-if="imageLoading" class="d-flex justify-center align-center" :height="carouselHeight">
                        <v-progress-circular v-if="imageLoading" indeterminate color="primary" size="64"></v-progress-circular>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <v-img :src="getImageMobileSrc(banners[0])" v-else cover contain></v-img>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        position: {
            type: String,
            default: 'principal'
        },
    },
    data() {
        return {
            banners: [],
            carouselHeight: null,
            imageLoading: true
        }
    },
    mounted() {
        this.listBanners()
    },
    methods: {
        async listBanners() {
            this.loading = true;
            let payload = this.position;
            this.$store.dispatch('banners/getBannerByCategory', payload)
                .then(result => {
                    this.loading = false;
                    if (result.length > 0) {
                        this.banners = result;
                    }
                })
        },
        handleCarouselChange() {
            this.imageLoading = true;
        },
        setCarouselHeight(event) {
            this.imageLoading = false;
            if (!this.carouselHeight) {
                const img = event.target;
                this.carouselHeight = img.clientHeight + 'px';
            }
        },
        getImageSrc(banner) {
            return `${this.$config.storage}banners%2F${banner?.image}?alt=media`
        },
        getImageMobileSrc(banner) {
            return `${this.$config.storage}banners%2F${banner?.imageMobile}?alt=media`
        }
    }
}
</script>
