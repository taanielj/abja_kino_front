<template>
    <div class="container">
        <div class="row">
            <div class="col justify-content-lg-start">
                <div class="row mb-2">
                    <h1>Pealkiri</h1>
                </div>
                <div class="row mb-2">
                    <PosterImage/>
                </div>
                <div class="row mb-2">
                    <iframe width="560" height="200" src="https://www.youtube.com/embed/CwXOrWvPBPk"  allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
            <div class="col">
                {{ movieInfo.description}}
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="row mb-4 bg-info">
                    <SeanceCard/>
                </div>

                <div class="row mb-4 bg-info">
                    <SeanceCard/>
                </div>

                <div class="row mb-4 bg-info">
                    <SeanceCard/>
                </div>

                <div class="row mb-4 bg-info">
                    <SeanceCard/>
                </div>



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
            movieId: {
                id: this.$route.params.id
            },
            movieInfo: {
                id: 0,
                title: "Pealkiri",
                genreName: "Action",
                posterImage: "",
                director: "",
                description: "",
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

