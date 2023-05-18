<template>
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <label for="title" class="form-label">Pealkiri*</label>
                <label for="length" class="form-label">Pikkus*</label>
                <label for="author" class="form-label">Režissöör*</label>
                <label for="youtube" class="form-label">Youtube*</label>

            </div>
            <div class="col">
                <input v-model="title" type="text" class="form-control" id="title">
                <input v-model="length" type="text" class="form-control" id="title">
                <input v-model="author" type="text" class="form-control" id="author">
                <input v-model="youtube" type="text" class="form-control" id="youtube">

            </div>


        </div>
        <div class="row mb-3">
            <label for="length" class="form-label">Pikkus*</label>
            <input v-model="length" type="text" class="form-control" id="title">
        </div>
        <div class="mb-3">


        </div>
        <div class="mb-3">


        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Sisesta filmi kirjeldus</label>
            <input v-model="description" type="text" class="form-control" id="description">
        </div>
        <div>
            <GenreDropdown/>
        </div>
    </div>


</template>

<script>
import GenreDropdown from "@/components/admin/GenreDropdown.vue";

export default {
    name: "MovieDetailsInput",
    components: {GenreDropdown},
    data() {
        return {
            movieInfo: {
                title: "",
                length: "",
                author: "",
                youtube: "",
                description: "",
            }
        }
    }
}
</script>

<style scoped>

</style>