<template>
    <div class="container">
        <div class="row">
            <div class="col justify-content-lg-start">
                <div class="row mb-2">
                    <h1 class="text-lg-start">
                        {{ movieInfo.title}}
                    </h1>
                </div>
                <div class="row mb-2">
                    <PosterImage :image-data-base64="image" ref="posterImage"/>
                </div>
                <div class="row mb-2">
                    {{ movieInfo.genreName }}
                </div>
                <div class="row mb-2">
                    {{ movieInfo.director }}
                </div>
                <div class="row mb-2">
                    {{ runtimeHours }}h {{ runtimeMinutes }}min
                </div>
                <div class="row mb-2">
                    <iframe width="560" height="200" src="{{movieInfo.youtubeLink}}"  allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
            <div class="col">
                {{ movieInfo.description}}
            </div>
        </div>



    </div>
</template>

<script>
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";
import SeanceCard from "@/components/SeanceCard.vue";

export default {
    name: "MovieView",
    components: {SeanceCard, PosterImage},
    data() {
        return {
            movieId: this.$route.params.id,
            movieInfo: {
                id: 0,
                title: "Pealkiri",
                genreName: "Action",
                posterImage: "",
                director: "",
                description: "",
                youtubeLink: "",
                runtime: Number //minutes
            },
            image: "",
            runtimeHours: 0,
            runtimeMinutes: 0
        }
    },
    methods: {
        getMovie() {
            this.$http.get("/movie/" + this.movieId)
                .then(response => {
                    this.movieInfo = response.data;
                    this.image = this.movieInfo.posterImage;
                    this.getGenre();
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },


        getGenre() {
            this.$http.get("/genre/" + this.movieInfo.genreId)
                .then(response => {
                    this.movieInfo.genreName = response.data;
                })
                .catch(() => {
                    router.push({path: "/error"})
                })
        },

        runtimeToHoursMinutes() {
            this.runtimeHours = Math.floor(this.movieInfo.runtime / 60)
            this.runtimeMinutes = this.movieInfo.runtime % 60
        }

    },
    mounted() {
        if (this.movieId !== 0) {
            this.getMovie();

        }
    }
}
</script>

