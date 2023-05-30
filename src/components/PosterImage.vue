<template>
    <img v-if="imageDataBase64 !== '' && imageDataBase64 !== null" :src="imageDataBase64" alt="Poster">
    <img v-else src="../assets/poster_placeholder.jpg" alt="default poster image">
</template>

<script>
export default {
    name: "PosterImage",
    props: {
        imageDataBase64: {
            type: String,
            default: null
        },
        movieId: 0,
    }
}
</script>
