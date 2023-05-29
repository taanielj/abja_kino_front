<template>

    <div class="col col-6 justify-content-center">
        <div class="col">
            <div class="col">
                <SeanceNavbarCard :seanceId="seanceId"></SeanceNavbarCard>
            </div>
            <div class="col ">
                <SeanceMovieCard :seanceId="seanceId"></SeanceMovieCard>
            </div>
            <div class="col mt-md-5">
                <SeanceTicketCard :seanceId="seanceId"></SeanceTicketCard>
            </div>
            <div>
                <button href="#" class="btn btn-secondary btn-lg">Kinnita piletid</button>

            </div>
        </div>
    </div>
</template>

<script>


import SeanceNavbarCard from "@/components/SeanceNavbarCard.vue";
import SeanceMovieCard from "@/components/SeanceMovieCard.vue";
import SeanceTicketCard from "@/components/SeanceTicketCard.vue";

export default {
    components: { SeanceNavbarCard, SeanceMovieCard, SeanceTicketCard },
}

</script>

<style>
.col-6 {
    width: 50%;
    margin: 0 auto;
    border-bottom: none;
    border-top: none;
    border-left: none;
}
.btn-lg{
    font-size: 20px;
    padding: 10px 20px;
}
</style>