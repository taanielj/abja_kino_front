<template>
    <div class="card mb-3 position-relative" v-if="show" :style="{ height: cardHeight }">
        <div class="row no-gutters">
            <div class="col-md-4">
                <poster-image :src="seanceInfo.moviePosterImage" class="card-img overlap-border" alt="Movie Poster"/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ seanceInfo.movieTitle }}</h5>
                    <p class="card-text">{{ seanceInfo.movieGenreName }}</p>
                    <p class="card-text">
                        <small class="text-muted">{{ formatDate(seanceInfo.dateTime) }}</small>
                    </p>
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
    name: "TestCard",
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
.card {
    /* You can adjust this to match the fixed height of your preference */
    --card-height: 400px;
    overflow: hidden; /* This will ensure the image doesn't go outside the card */
}

.card-img.overlap-border {
    object-fit: cover;
    position: relative;
    left: -10px;
    top: -10px;
    width: calc(100% + 10px);
    height: calc(100% + 20px);
    border-radius: 0;
}
</style>
