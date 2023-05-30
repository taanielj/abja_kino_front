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
                <div  class="d-flex">
                    <button v-if="journey === 'schedule'"
                            type="button"
                            class="btn btn-outline-secondary custom-button me-2"
                            @click=""
                    >
                        Vaata Treilerit
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
        </div>
    </div>

</template>

<script>
import {defineComponent} from 'vue'
import ScheduleView from "@/views/ScheduleView.vue";
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";

export default defineComponent({
    name: "SeanceMovieCard",
    components: {ScheduleView, PosterImage},
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
})
</script>


