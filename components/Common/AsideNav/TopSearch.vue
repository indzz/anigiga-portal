<template>
    <div class="top-search">
        <v-autocomplete :items="items" :loading="loading" :label="$t('search')"
                        autocomplete="off"
                        prepend-inner-icon="mdi-magnify" append-icon=""
                        filled rounded single-line dense hide-details></v-autocomplete>
    </div>
</template>

<script>
import QuickSearch from "../QuickSearch"

export default {
        name: "TopSearch",
        extends: QuickSearch
    }
</script>
