<template>
    <div class="card" style="width: 100%; background-color: lightgrey">
        <div class="row g-5">
            <div class="col-md-3 poster-container">
                <PosterImage :image-data-base64="seanceInfo.moviePosterImage" ref="posterImage"/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ seanceInfo.movieTitle }}</h5>
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
    name: "ChooseTicketView",
    components: {ScheduleView, PosterImage},

    data() {
        return {
            showSeanceInfo: false,
            seanceId: this.$route.params.id,
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
                    this.showSeanceInfo = true;
                })
                .catch(() => {
                    // router.push({path: "/error"});
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
        if (this.seanceId !== 0) {
            this.getSeanceInfo();
        }

    }
})
</script>

<style>
.card{
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
}
.poster-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.card-title {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
}

.card-text {
    font-size: 20px;
    font-weight: normal;
    text-align: left;
}

</style>
