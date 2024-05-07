<template>
    <v-snackbar :color="message.type" :timeout="message.timeout" :value="true">
        {{message.message}}
    </v-snackbar>
</template>

<script>
    export default {
        name: "AlertMessage",
        props: {
            message: Object,
        }
    }
</script>
