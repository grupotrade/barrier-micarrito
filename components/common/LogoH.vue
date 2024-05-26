<template>
    <img alt="SIM" :src="$vuetify.theme.dark || dark ? '/img/SIM_logo_dark.svg' : '/img/SIM_logo.svg'" :width="width" />
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
            default: '150'
        },
    }
}
</script>