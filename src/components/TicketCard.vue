<template>
    <div class="text-black">
        <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header bg-transparent border-success">
                <h2 class="card-title">Pealkiri</h2>
            </div>
            <div class="card-body text-success text-black">
                <p class="card-text">Aeg</p>
                <p class="card-text">Saal</p>
                <p class="card-text">Koht</p>
            </div>
            <div class="card-footer bg-transparent border-success">
                Pileti tüüp
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "TicketCard",
    data() {
        return {
            id: 0,
            ticket: [
                {
                    id: 0,
                    name: ""
                }
            ],

        }
    }
}
</script>

<style scoped>

</style>