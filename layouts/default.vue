<template>
<v-app>
    <CommonLoadSpinner :visible="showHideSpinner" />
    <LayoutHeader :user="user" />
    <confirm-dialog />
    <snackbar />
    <v-container fluid class="container-default py-0 mt-12 pt-12" :class="($vuetify.breakpoint.xs)? 'px-4' : 'px-0'">
        <nuxt />
    </v-container>
   <LayoutFooter />
</v-app>
</template>

<script>
export default {
    data() {
        return {
            showHideSpinner: true,

        }
    },
    beforeCreate() {
        this.showHideSpinner = true;
    },
    computed: {
        user() {
            return this.$store.state.authUser;
        }
    },
    async mounted() {
    // Agregar un retraso de 1 segundo antes de establecer showHideSpinner en false
    setTimeout(() => {
        this.showHideSpinner = false;
    }, 1800);
}
}
</script>

<style>
.floating-encuesta {
    position:fixed; top: 40%; right: 50px; z-index: 1000;
}
.floating-encuesta img{
    width: 380px;
}

@media (max-width: 400px) {
    .floating-encuesta {
    top: auto; right: 10px; bottom: 5%;
}
    .floating-encuesta img {
    width: 250px;
}
}
</style>