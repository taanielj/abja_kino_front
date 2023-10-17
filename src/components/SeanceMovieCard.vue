<template>
    <div class="d-flex flex-row seance-card">
        <TrailerModal
                ref="trailerModalRef"
                :youtube-link="seanceInfo.movieYoutubeLink"
        />

            <PosterImage
                    class="custom-image"
                    :class="{'hoverable-link': linkActive}"
                    :image-data-base64="seanceInfo.moviePosterImage"
                    ref="posterImage"
                    @click="goToMovie"
            />
            <div class="d-flex flex-column seance-info align-items-stretch">
                <div>
                    <div @click="goToMovie"
                         class="card-title"
                         :class="{'hoverable-link': linkActive}"
                    >
                        {{ seanceInfo.movieTitle }}
                    </div>
                </div>
                <div class="text">{{ formattedGenreName }} | {{ runtimeHours }}h {{ runtimeMinutes }}min</div>
                <div class="text">{{ formatDate(seanceInfo.dateTime) }}| Saal: {{ seanceInfo.roomName }}</div>
                <div class="text">Keel: {{ seanceInfo.language }} | Subtiitrid: {{ seanceInfo.subtitles }}</div>
                <div class="d-flex justify-content-start align-items-start">
                    <button v-if="journey === 'schedule'"
                            type="button"
                            class="custom-button"
                            @click="openTrailerModal"
                    >
                        <font-awesome-icon :icon="['fass', 'trailer']"/>
                        Treiler
                    </button>
                    <button v-if="(journey === 'schedule' || journey === 'movie') && seanceInfo.availableSeats > 0"
                            type="button"
                            class="custom-button"
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
        journey: "",
        seanceInfo: {
            seanceId: 0,
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
    },

    data() {
        return {
            linkActive: false,
            errorMessage: "",
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

            router.push({path: '/choose-ticket/' + this.seanceInfo.seanceId})
        }
    },

    mounted() {

        this.runtimeToHoursMinutes();

        if (this.journey === 'tickets' || this.journey === 'schedule') {
            this.linkActive = true;
        }
    }
}
</script>

<style scoped>
.card-title {
    font-size: 3rem;
    height: 10rem;
}

.seance-card {
    height: 500px;
    width: 900px;
    margin: 1rem;
    overflow: clip;
    position: relative;
    border-radius: 1rem;
    background-color: rgba(255, 240, 225, 0.8);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.custom-image {
    object-fit: contain;
    height: 500px;

}


.seance-info {
    margin-left: 1rem;
    width: 50rem;
}

.text {
    /*align-start*/
    text-align: start;
    font-size: 2rem;
    margin-bottom: 0.8rem;
    padding-right: 3rem;
}

.custom-button {
    font-size: 1.5rem;
}
</style>


