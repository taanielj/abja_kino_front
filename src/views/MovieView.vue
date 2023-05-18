<template>
    <div class="container">
        <div class="row">
            <div class="col justify-content-lg-start">
                <div class="row mb-2">
                    <h1>Pealkiri</h1>
                </div>
                <div class="row mb-2">
                    <PosterImage/>
                </div>
                <div class="row mb-2">
                    <iframe width="560" height="200" src="https://www.youtube.com/embed/CwXOrWvPBPk"  allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
            <div class="col">
                {{ movieInfo.description}}
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="row mb-4 bg-info">
                    <SeanceCard/>
                </div>

                <div class="row mb-4 bg-info">
                    <SeanceCard/>
                </div>

                <div class="row mb-4 bg-info">
                    <SeanceCard/>
                </div>

                <div class="row mb-4 bg-info">
                    <SeanceCard/>
                </div>



            </div>
        </div>


    </div>
</template>

<script>
import PosterImage from "@/components/PosterImage.vue";
import router from "@/router";
import SeanceCard from "@/components/SeanceCard.vue";

export default {
    name: "MovieView",
    components: {SeanceCard, PosterImage},
    data() {
        return {
            movieId: {
                id: this.$route.params.id
            },
            movieInfo: {
                id: 1,
                title: "Pealkiri",
                poster: "",
                timeStamp: "Kellaaeg",
                description: `In the thrilling action-adventure film "Shadow's Edge," directed by James Anderson, a former elite assassin, Alex Sullivan, is forced out of hiding when his estranged sister is kidnapped by a ruthless criminal syndicate. With time running out, Alex embarks on a high-stakes mission across exotic locations and dangerous landscapes to rescue his sister and bring down the syndicate. Faced with relentless enemies and his own dark past, Alex must confront his inner demons and tap into his lethal skills to ensure his sister's survival. "Shadow's Edge" delivers heart-pounding suspense, intense fight sequences, and a gripping narrative that will leave audiences on the edge of their seats.`
            }
        }
    },
}
</script>

