<template>
    <div class="quick-search">
        <v-autocomplete :items="items" :loading="loading" :label="$t('quick_search')" autocomplete="off"
                        single-line solo flat hide-details></v-autocomplete>
    </div>
</template>

<script>
    export default {
        name: "QuickSearch",
        data() {
            return {
                items: [],
                loading: false,
            }
        }
    }
</script>
<style>
.quick-search {
    border-bottom: 1px solid #cccccc;
}
</style>