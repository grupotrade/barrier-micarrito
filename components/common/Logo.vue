<template>
<img alt="SIM" :src="$vuetify.theme.dark || dark ? '/img/SIM_icon_dark.svg' : '/img/SIM_icon.svg'" :width="width" />
</template>

<script>
export default {
    name: 'logo-coa',
    props: {
        dark: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '80'
        },
    }
}
</script>

