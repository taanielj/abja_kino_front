<template>


    <div v-if="show" class="seance-card">


        <TrailerModal
                ref="trailerModalRef"
                :youtube-link="seanceInfo.movieYoutubeLink"
        />

        <div class="d-flex flex-row ">


            <PosterImage
                    class="custom-image hoverable-link"
                    :image-data-base64="seanceInfo.moviePosterImage"
                    ref="posterImage"
                    @click="goToMovie"
            />


            <div class="d-flex flex-column seance-info align-items-stretch">
                <div>
                    <div @click="goToMovie" class="card-title hoverable-link">
                        {{ seanceInfo.movieTitle }}
                    </div>
                </div>

                <div class="text">{{ formattedGenreName }} | {{ runtimeHours }}h {{ runtimeMinutes }}min</div>
                <div class="text">{{ formatDate(seanceInfo.dateTime) }}| Saal: {{ seanceInfo.roomName }}</div>
                <div class="text">Keel: {{ seanceInfo.language }} | Subtiitrid: {{ seanceInfo.subtitles }} </div>
                <div class="d-flex justify-content-start align-items-start">
                    <button v-if="journey === 'schedule'"
                            type="button"
                            class="btn btn-outline-secondary custom-button"
                            @click="openTrailerModal"
                    >
                        <font-awesome-icon :icon="['fass', 'trailer']"/>
                        Treiler
                    </button>
                    <button v-if="journey === 'schedule' || journey === 'movie'"
                            type="button"
                            class="btn btn-outline-secondary custom-button"
                            @click="goToTickets"
                    >
                        Vali seanss
                    </button>

                </div>
                <div class="text d-flex justify-content-end align-items-center">
                    Vabukohti: {{ seanceInfo.availableSeats }}/ {{ seanceInfo.totalSeats }}
                </div>


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
    props: {
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

        goToMovie() {
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

.card-text {
    font-size: 2.5vh;
}

.card-title {
    font-size: 3.5vh;
    height: 10vh;
}


.seance-card {
    height: 35vh;
    aspect-ratio: 2.2;
    overflow: clip;
    position: relative;
    border-radius: 0.5vh;
    background-color: rgba(255, 240, 225, 0.8);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    margin: 1vh;
}

.custom-image {
    object-fit: contain;
    height: 35vh !important;
}

.seance-info {
    margin-left: 1vh;
    width: 100%;
}

.text{
    /*align-start*/
    text-align: start;
    font-size: 2.2vh;
    margin-bottom: 1vh;
    padding-right: 3vh;
}



</style>


