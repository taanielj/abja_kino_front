<template>
    <div class="purchase-journey">
        <div class="nav nav-pills">
            <span v-if="journey === 'piletid'" class="nav-item">
                <a class="nav-link active">Piletid</a>
            </span>
            <span v-else class="nav-item">
                <a class="nav-link disabled">Piletid</a>
            </span>

            <span v-if="journey === 'kohad'" class="nav-item">
                <a class="nav-link active">Kohad</a>
            </span>
            <span v-else class="nav-item">
                <a class="nav-link disabled">Kohad</a>
            </span>
            <span v-if="journey === 'ostukorv'" class="nav-item">
                <a class="nav-link active">Kinnita</a>
            </span>
            <span v-else class="nav-item">
                <a class="nav-link disabled">Kinnita</a>
            </span>


        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import ScheduleView from "@/views/ScheduleView.vue";
import PosterImage from "@/components/PosterImage.vue";

export default defineComponent({
    name: "PurchaseJourneyCard",
    components: {ScheduleView, PosterImage},
    props: {
        journey: ""
    }


})
</script>

<style>
.purchase-journey {
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.nav-pills {
    background-color: darkgrey;
    color: white;
    border-radius: 5px;
    font-size: 25px;
    font-weight: normal;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

</style>
