<template>
<v-card @click="navigatePost(post)" flat :width="width">
    <v-img :src="$config.storage + 'posts%2F' + post.img + '?alt=media'" cover :height="imgHeight" class="rounded-lg"  v-if="post.img && post.img != ''">
        <!-- <v-chip color="secondary" small class="ma-2" v-if="$moment().diff(post.createdAt,'days') <= 7">NUEVO</v-chip> -->
    </v-img>
    <v-img src="/img/imagen_generica.jpg" cover :height="imgHeight"  v-if="post.video == '' && post.img == ''">
        <!-- <v-chip color="secondary" small class="ma-2" v-if="$moment().diff(post.createdAt,'days') <= 7">NUEVO</v-chip> -->
    </v-img>
    <v-img :src="'https://i.ytimg.com/vi/'+getIdYoutube(post.video)+'/sddefault.jpg'" cover :height="imgHeight" v-if="post.video != '' && post.videoProvider == 'youtube'">
        <!-- <v-chip color="secondary" small class="ma-2" v-if="$moment().diff(post.createdAt,'days') <= 7">NUEVO</v-chip> -->
    </v-img>
    <v-img :src="'https://vumbnail.com/'+getIdVimeo(post.video)+'.jpg'" cover :height="imgHeight" v-if="post.video != '' && post.videoProvider == 'vimeo'">
        <!-- <v-chip color="secondary" small class="ma-2" v-if="$moment().diff(post.createdAt,'days') <= 7">NUEVO</v-chip> -->
    </v-img>
   <v-card-text>
<!--        <h6 class="secondary&#45;&#45;text" v-if="!related"> <span  v-if="post.date">{{ $moment(post.date).format('DD/MM/AAAA') }} |</span> {{ post.celula.name }}</h6>-->
<p class="secondary_text--text mb-0" v-if="showCategory">{{ post.type.name }}</p>
        
<h4 class="primary--text my-2">{{ post.title }}</h4>
        <p v-html="post.resume"></p>
        <div class="text-center">
            <v-btn class="primary" depressed rounded>Más info</v-btn>

        </div>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props: {
        post: {
            type: Object
        },
        related:  {
            type: Boolean,
            default: false
        },
        imgHeight : {
            type: String,
            default: '220'
        },
        width: {
            type: String,
            default: '100%'
        },
        showCategory:  {
            type: Boolean,
            default: false
        },
    },
    methods: {
        navigatePost() {
            this.$emit('navigate')
        },
        getIdYoutube(url) {
            return this.$youtube.getIdFromURL(url)
        },
        getIdVimeo(url) {
            return url.split("/").pop();
        },
    }
}
</script>
