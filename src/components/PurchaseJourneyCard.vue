<template>
    <div class="purchase-journey ">
        <div class="spaced-buttons">
            <span v-if="journey === 'tickets'" class="journey-button journey-active">
                Piletid
            </span>
            <span v-else class="journey-button journey-inactive">
                Piletid
            </span>
            <span v-if="journey === 'seats'" class="journey-button journey-active">
                Kohad
            </span>
            <span v-else class="journey-button journey-inactive">
                Kohad
            </span>
            <span v-if="journey === 'purchase'" class="journey-button journey-active">
                Kinnita
            </span>
            <span v-else class="journey-button journey-inactive">
                Kinnita
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

<style scoped>
.purchase-journey {
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    width: 100%;
    box-shadow: 0 0 1vh 0 rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 240, 225, 0.8);
    justify-content: center;
}

.journey-button {
    border-radius: 0.5rem;
    margin: 1rem;
    padding: 1rem 2rem;
}

.journey-active {
    background-color: rgba(255, 192, 50, 0.8);
    box-shadow: rgba(255, 192, 0, 0.8) 0 0 1vh 0;
    color: white;
}

.journey-inactive {
    color: rgba(245, 180, 50, 1)
}

.spaced-buttons {
    display: flex;
    justify-content: space-around;
}
</style>
