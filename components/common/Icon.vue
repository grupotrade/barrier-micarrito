<template>
<img class="icon" alt="Hemami" :src="$vuetify.theme.dark || dark ? '/img/icon.png' : '/img/icon.png'">
</template>

<script>
export default {
    name: 'icon',
    props: {
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.icon {
    width: 100px;
}
</style>
