<template>
    <div class="container">
        <div class="row justify-content-center">
            <h1>Lisa film</h1>
        </div>
        <div class="row justify-content-center">
            <div class="col col-4">
                <div class="row">
                    <PosterImage/>
                </div>
                <div class="row">
                    selectimage.vue

                </div>
            </div>
            <div class="col col-4">
                <MovieDetailsInput/>
            </div>
        </div>
        <div class="row justify-content-center">
            nuppud
        </div>
    </div>


</template>

<script>
import PosterImage from "@/components/PosterImage.vue";
import MovieDetailsInput from "@/components/admin/MovieDetailsInput.vue";

export default {
    name: "AddMovieView",
    components: {MovieDetailsInput, PosterImage}
}
</script>

<style scoped>

</style>