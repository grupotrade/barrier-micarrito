<template>
    <img alt="Barrier" :src="$vuetify.theme.dark || dark ? '/img/logo_dark.png' : '/img/logo.png'" :width="width" />
</template>

<script>
export default {
    name: 'logo-sim',
    props: {
        dark: {
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number],
            default: '200'
        },
    }
}
</script>