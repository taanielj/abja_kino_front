<template>
    <div v-if="seanceInfo.movieId !==0"
         class="bg-light-grey text-black border border-4 align-self-stretch card mb-3"
         style="max-width: 1500px; max-height: 300px">
        <div class="row g-0">
            <div class="col col-md-4">
                <div class="poster-container">
                    <PosterImage :image-data-base64="seanceInfo.moviePosterImage" ref="posterImage"/>
                </div>

            </div>
            <div class="col col-md-8">
                <div class=" card-body text-start">
                    <h5 class="card-title">
                        <a class="text-black bigger-text bold-text mb-10" :href="'/movie/' + seanceInfo.movieId"
                           style="text-decoration: none ">{{ seanceInfo.movieTitle }}</a></h5>
                    <p class="card-text custom-text-size">
                        {{ formattedGenreName }}
                    </p>
                    <p class="card-text mb-1 gray-text custom-text-size">
                        Saal: {{ seanceInfo.roomName }}
                    </p>
                    <p class="card-text mb-1">
                        {{ formatDate(seanceInfo.dateTime) }}
                    </p>
                    <p class="card-text mb-1 d-flex align-items-center custom-text-size">
                        <span class="me-auto">{{ runtimeHours }}h {{ runtimeMinutes }}min </span>
                        <button type="button" class="btn btn-outline-secondary custom-button">Vali
                            seanss
                        </button>
                    </p>
                    <p class="custom-text-size gray-text">
                        Keel: {{ seanceInfo.language }} - Subtiitrid: {{ seanceInfo.subtitles }}
                    </p>
                </div>
            </div>

        </div>
    </div>
    <div v-else>
        <p></p>
    </div>
</template>


<script>
import {defineComponent} from 'vue'
import MovieCard from "@/components/MovieCard.vue";
import PosterImage from "@/components/PosterImage.vue";
import SeanceCard from "@/components/SeanceCard.vue";
import router from "@/router";

export default defineComponent({
    name: "SeanceCardSchedule",
    components: {PosterImage, MovieCard, SeanceCard},
    props: {
        seanceId: {
            type: Number,
            default: 0
        },

    },
    data() {
        return {
            seanceInfo: {
                movieId: 0,
                movieTitle: "",
                movieRuntime: 0,
                moviePosterImage: "",
                movieGenreName: "",
                dateTime: "",
                subtitles: "",
                language: "",
                roomName: "",

            },
            runtimeHours: 0,
            runtimeMinutes: 0,

        }

    },
    computed: {
        formattedGenreName() {
            return this.seanceInfo.movieGenreName.charAt(0).toUpperCase() + this.seanceInfo.movieGenreName.slice(1);
        },
    },
    methods: {
        formatDate(dateTime) {
            const date = new Date(dateTime);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;
            return `${formattedTime} ${formattedDate} `;
        },
        getSeanceInfo() {
            this.$http.get("/seance/" + this.seanceId)
                .then(response => {
                    this.seanceInfo = response.data;
                    this.runtimeToHoursMinutes();


                })
                .catch(() => {
                    // router.push({path: "/error"})
                })
        },
        runtimeToHoursMinutes() {
            this.runtimeHours = Math.floor(this.seanceInfo.movieRuntime / 60)
            this.runtimeMinutes = this.seanceInfo.movieRuntime % 60
        },
        navigateToChooseSeance() {
            router.push({path: "/movie/" + this.seanceId})
        }


    },
    mounted() {
        if (this.seanceId !== 0) {
            this.getSeanceInfo();
        }


    }


})
</script>

<style>
.bigger-text {
    font-size: 50px;
}

.bold-text {
    font-weight: bold;
}

.custom-text-size {
    font-size: 18px;
}

.gray-text {
    color: gray;
}

.bg-light-grey {
    background-color: #f2f2f2;
}

.poster-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.poster-container img {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.custom-button {

    width: 150px;
    height: 50px;
}


</style>

