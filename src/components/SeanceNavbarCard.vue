<template>
    <div class="border">
        <div class="nav nav-pills">
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
</template>

<script>
import {defineComponent} from 'vue'
import ScheduleView from "@/views/ScheduleView.vue";
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";

export default defineComponent({
    name: "ChooseTicketView",
    components: {ScheduleView, PosterImage},


})
</script>

<style>
.border{
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
    width: 100%;
    height: 100%;
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
    height: 100%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

</style>