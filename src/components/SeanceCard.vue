<template>
    <div class="container">
        <div class="row m-2">
            <div class="col">
                Kellaaeg
            </div>
            <div class="col">
                Päev/Kuupäev
            </div>
            <div class="col">

                <button>Osta pilet</button>
            </div>
        </div>
        <div class="row m-2">
            <div class="col">
                Vabukohti: 10
            </div>
            <div class="col">
                Keel: Inglise
            </div>
            <div class="col">
                Subtiitrid: Eesti/Vene
            </div>
        </div>

    </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "SeanceCard",
    data() {
        return {
            seanceInfo: {
                id: this.$route.params.id,
                title: "Pealkiri",
                poster: "",
                timeStamp: "Kellaaeg",
                language: "Keel",
                subtitles: "Subtiitrid",
                freeSeats: 10,
                totalSeats: 10
            },
            movieInfo: {
                title: "Pealkiri",
                poster: "",
                timeStamp: "Kellaaeg"
            }
        }
    },
})
</script>



<style scoped>

</style>
