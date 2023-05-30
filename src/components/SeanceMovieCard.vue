<template>
    <div v-if="show">
        <div class="d-flex flex-row custom-card">
            <div>
                <PosterImage class="custom-image-card" :image-data-base64="seanceInfo.moviePosterImage" ref="posterImage"/>
            </div>
            <div>
                <div class="card-body">
                    <h1 class="card-title">{{ seanceInfo.movieTitle }}</h1>
                    <p class="card-text"><small class="text-muted">{{ formattedGenreName }} |
                        {{ runtimeHours }}h {{ runtimeMinutes }}min</small></p>
                    <p class="card-text">{{ formatDate(seanceInfo.dateTime) }}| Saal: {{ seanceInfo.roomName }}</p>
                    <p class="card-text">Keel: {{ seanceInfo.language }} | Subtiitrid:
                        {{ seanceInfo.subtitles }} </p>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import {defineComponent} from 'vue'
import ScheduleView from "@/views/ScheduleView.vue";
import PosterImage from "@/components/PosterImage.vue";

export default defineComponent({
    name: "SeanceMovieCard",
    components: {ScheduleView, PosterImage},
    props:{
        seanceId: 0,
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
        getSeanceInfo() {
            this.$http.get("/api/v1/seance/" + this.seanceId)
                .then(response => {
                    this.seanceInfo = response.data;
                    this.runtimeToHoursMinutes();
                    this.show = true;
                    this.$emit('event-seance-loaded', this.seanceId);
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
    },
    mounted() {
        this.$nextTick().then(() => {
            if (this.seanceId !== 0) {
                this.getSeanceInfo();
            }
        });


    }
})
</script>

<style scoped>


.custom-card {
    height: 30vh;
    overflow: clip;
    position: relative;
    border-radius: 5px;
    width: 100%;
    background-color: rgba(173, 216, 230, 0.7);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.custom-image-card{
    padding-right: 20px;
    object-fit: contain;
    height: 30vh !important;
}

</style>


