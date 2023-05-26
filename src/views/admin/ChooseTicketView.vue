<template>

    <div class="card section">
        <div class="card-body justify-content-center movie-template "  style="width: 900px; background-color: darkgrey">
            <div class="nav nav-pills card-header-pills justify-content-center" style="">
                <li class="nav-item">
                    <a class="nav-link active">Piletid</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Tehing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Kinnitus</a>
                </li>
            </div>
        </div>
        <div class="card-body justify-content-center movie-template">
            <div class="card " style="width: 100%; background-color: lightgrey">
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
            <div class=" list-group list-group-flush mb-5" style="width: 900px">
                <li class="list-group-item mt-5 text-body">Vali piletid</li>
                <div v-for="ticketType in ticketTypes" class="row">
                    <div class="col-9">
                       <span class="text-start" > {{ ticketType.name }}</span>
                    </div>
                    <div class="col">
                        {{ ticketType.price }}
                    </div>
                    <div class="col">
                        {{ ticketType.amount }}
                    </div>
                </div>
            </div>
            <button href="#" class="btn btn-primary">Kinnita piletid</button>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import ScheduleView from "@/views/ScheduleView.vue";
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";

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

            ticketTypes: [
                {
                    name: "",
                    price: 0,
                    amount: 0,
                }
            ]


        }

    },
    computed:{
        formattedGenreName(){
            return this.seanceInfo.movieGenreName.charAt(0).toUpperCase()+ this.seanceInfo.movieGenreName.slice(1);
        }
    },

    methods: {
        getSeanceInfo() {
            this.$http.get("/seance/" + this.seanceId)
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

        setAmountToZero() {
            this.ticketTypes.forEach(ticketType => {
                ticketType.amount = 0;
            })
        },
        getTicketTypes() {
            this.$http.get("/ticket/types")
                .then(response => {
                    this.ticketTypes = response.data;
                    this.setAmountToZero();
                })
                .catch(() => {
                    // router.push({path: "/error"});
                })
        }
    },
    mounted() {
        if (this.seanceId !== 0) {
            this.getSeanceInfo();
            this.getTicketTypes();
        }

    }
})
</script>

<style>
.movie-template {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}


.section {
    display: flow;
    align-items: center;
    width: 100%;
    background-color: lightgrey;
}

.poster-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.text-body {
    font-size: 50px;
    font-weight: bold;
}

.list-group-item {
    font-size: 20px;
    font-weight: normal;
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