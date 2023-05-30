<template>
    <div v-if="show"
         class="bg-light-grey text-black border border-4 align-self-stretch card mb-3">
        <div class="row g-0">
            <div class=" col-md-3 poster-container">
                <PosterImage :image-data-base64="seanceInfo.moviePosterImage" ref="posterImage"/>
            </div>
            <div class="col col-md-8">
                <div class=" card-body text-start">
                    <h1 class="card-title hoverable-link">
                        <a class="text-black bigger-text bold-text mb-10" :href="'/movie/' + seanceInfo.movieId"
                           style="text-decoration: none ">{{ seanceInfo.movieTitle }}</a></h1>
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

                    </p>
                    <p class="custom-text-size gray-text">
                        Keel: {{ seanceInfo.language }} - Subtiitrid: {{ seanceInfo.subtitles }}
                    </p>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-secondary custom-button me-2" @click="">
                        Vaata Treilerit
                    </button>
                    <button type="button" class="btn btn-outline-secondary custom-button" @click="goToTickets">Vali
                        seanss
                    </button>
                </div>
            </div>


        </div>
    </div>
</template>


<script>
import {defineComponent} from 'vue'
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";
import ScheduleView from "@/views/ScheduleView.vue";

export default defineComponent({
    name: "SeanceCardSchedule",
    components: {ScheduleView, PosterImage},
    props: {
        seanceId: {
            type: Number,
            default: 0
        },

    },
    data() {
        return {
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
            this.$http.get("/api/v1/seance/" + this.seanceId)
                .then(response => {
                    this.seanceInfo = response.data;
                    this.runtimeToHoursMinutes();
                    this.show = true;


                })
                .catch(() => {
                    // router.push({path: "/error"})
                })
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
        if (this.seanceId !== 0) {
            this.getSeanceInfo();
        }


    }


})
</script>

<style>
.poster-container img {
    width: 100%;

}

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

.custom-button {
    width: 150px;
    height: 50px;
}


</style>

