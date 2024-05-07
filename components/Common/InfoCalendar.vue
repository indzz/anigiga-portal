<template>
    <v-card class="ma-3">
        <v-row no-gutters class="grey lighten-4">
            <v-col align-self="center" class="px-3">
                <h4 class="subtitle-1">{{monthName}}</h4>
            </v-col>
            <v-col cols="auto">
                <v-btn icon @click="prevMonth">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn icon @click="nextMonth">
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-divider />
        <div class="info-calendar-wrapper">
            <v-calendar type="month" ref="calendar" :show-month-on-first="false" v-model="day"></v-calendar>
        </div>
    </v-card>
</template>

<script>
import {format, parseISO} from 'date-fns';

export default {
        name: "InfoCalendar",
        data() {
            return {
                day: format(new Date(), 'yyyy-MM-dd'),
            }
        },
        computed: {
            monthName() {
                return format(parseISO(this.day), 'MMMM yyyy');
            }
        },
        methods: {
            prevMonth() {
                this.$refs.calendar.prev();
            },
            nextMonth() {
                this.$refs.calendar.next();
            }
        }
    }
</script>

<style>
.info-calendar-wrapper {
    height: 280px;
}
</style>
