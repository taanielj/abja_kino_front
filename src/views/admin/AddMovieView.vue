<template>
    <div class="container">
        <div class="row justify-content-center">
            <h1>Lisa film</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col col-4">
                <div class="row mb-2">
                    <PosterImage/>
                </div>
                <div class="row justify-content-lg-center">
                    <ImageInput ref="imageInputRef" @event-emit-base64="emitBase64"/>
                </div>
            </div>
            <div class="col col-4">
                <MovieDetailsInput/>
            </div>
        </div>
        <div class="row justify-content-center">

        </div>
    </div>


</template>

<script>
import PosterImage from "@/components/PosterImage.vue";
import MovieDetailsInput from "@/components/admin/MovieDetailsInput.vue";
import ImageInput from "@/components/admin/ImageInput.vue";

export default {
    name: "AddMovieView",
    components: {ImageInput, MovieDetailsInput, PosterImage},
    data() {
        return {
            movieInfo: {

            }
        }
    }
    methods: {
        emitBase64(pictureDataBase64) {
            this.$emit('event-emit-base64', pictureDataBase64)
        }
    }
}
</script>

<style scoped>

</style>