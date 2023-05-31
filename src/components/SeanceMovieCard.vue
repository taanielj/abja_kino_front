<template>

    <div v-if="show">


        <TrailerModal
                ref="trailerModalRef"
                :youtube-link="seanceInfo.movieYoutubeLink"
        />

        <div class="d-flex flex-row custom-card">
            <div class="col col-4">
                <PosterImage
                        class="custom-image-card hoverable-link"
                        :image-data-base64="seanceInfo.moviePosterImage"
                        ref="posterImage"
                        @click="goToMovie"/>
            </div>
            <div class="col col-6">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h1 @click="goToMovie" class="card-title hoverable-link">{{ seanceInfo.movieTitle }}</h1>
                        </div>
                    </div>

                    <p class="card-text"><small class="text-muted">{{ formattedGenreName }} |
                        {{ runtimeHours }}h {{ runtimeMinutes }}min</small></p>
                    <p class="card-text">{{ formatDate(seanceInfo.dateTime) }}| Saal: {{ seanceInfo.roomName }}</p>
                    <p class="card-text">Keel: {{ seanceInfo.language }} | Subtiitrid:
                        {{ seanceInfo.subtitles }} </p>
                </div>
                <div  class="d-flex">
                    <button v-if="journey === 'schedule'"
                            type="button"
                            class="btn btn-outline-secondary custom-button me-2"
                            @click="openTrailerModal"
                    >
                        <font-awesome-icon :icon="['fass', 'trailer']" /> Treiler
                    </button>
                    <button v-if="journey === 'schedule' || journey === 'movie'"
                            type="button"
                            class="btn btn-outline-secondary custom-button"
                            @click="goToTickets"
                    >
                        Vali
                        seanss
                    </button>
                </div>
            </div>
            <div class="free-seats col col-2">
                Vabu kohti: {{ seanceInfo.availableSeats }}/{{ seanceInfo.totalSeats }}
            </div>
        </div>

    </div>



</template>

<script>

import ScheduleView from "@/views/ScheduleView.vue";
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";
import TrailerModal from "@/components/modal/TrailerModal.vue";

export default {
    name: "SeanceMovieCard",
    components: {TrailerModal, ScheduleView, PosterImage},
    props:{
        seanceId: 0,
        journey: ""
    },

    data() {
        return {
            errorMessage: "",
            show: false,
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
                movieYoutubeLink: "",
                availableSeats: 0,
                totalSeats: 0,

            },
            runtimeHours: 0,
            runtimeMinutes: 0,
        }
    },
    computed: {
        formattedGenreName() {
            return this.seanceInfo.movieGenreName.charAt(0).toUpperCase() + this.seanceInfo.movieGenreName.slice(1);
        }
    },

    methods: {
        openTrailerModal() {
            this.$refs.trailerModalRef.openModal();
        },

        goToMovie(){
            router.push({path: `/movie/${this.seanceInfo.movieId}`});
        },


        getSeanceInfo() {
            this.$http.get("/api/v1/seance/" + this.seanceId)
                .then(response => {
                    this.seanceInfo = response.data;
                    this.runtimeToHoursMinutes();
                    this.show = true;
                    this.$emit('event-seance-loaded', this.seanceId);
                    this.$emit('event-available-seats', this.seanceInfo.availableSeats);
                })
                .catch(() => {
                    this.errorMessage = "Seansi andmed puuduvad";
                    this.$emit('event-seance-error', this.errorMessage);
                })
        },
        formatDate(dateTime) {
            const date = new Date(dateTime);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;
            return `${formattedTime} ${formattedDate} `;
        },

        runtimeToHoursMinutes() {
            this.runtimeHours = Math.floor(this.seanceInfo.movieRuntime / 60)
            this.runtimeMinutes = this.seanceInfo.movieRuntime % 60
        },


        goToTickets() {
            if (localStorage.getItem("userId") === null) {
                router.push({path: '/login'})
                return;
            }

            router.push({path: '/choose-ticket/' + this.seanceId})
        }

    },
    mounted() {
        this.$nextTick().then(() => {
            if (this.seanceId !== 0) {
                this.getSeanceInfo();
            }
        });


    }
}
</script>

<style scoped>
.free-seats {
    margin-top: 1vh;
}

.card-title{
    height: 10vh;
}

</style>


