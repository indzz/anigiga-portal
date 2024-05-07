<template>
    <v-dialog v-model="dialog" max-width="640">
        <validation-observer v-slot="{ invalid }" ref="observer" slim>
            <v-form @submit.prevent="submit">
                <v-card>
                    <slot name="title">
                        <v-card-title v-if="!hideHeader">
                            {{title}}
                            <v-spacer/>
                            <v-btn icon @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                    </slot>
                    <v-skeleton-loader type="list-item-two-line@3, actions" v-if="state.loading"/>
                    <v-card-text>
                        <slot :invalid="invalid" v-if="!state.loading || showBodyWhenLoading"/>
                    </v-card-text>
                    <slot name="actions">
                        <v-divider />
                        <v-card-actions>
                            <v-spacer/>
                            <!-- Submit Button -->
                            <v-btn color="accent" depressed type="submit" :loading="state.submitting"
                                   :disabled="invalid">
                                <v-icon>mdi-check</v-icon>
                                {{$t('submit')}}
                            </v-btn>
                        </v-card-actions>
                    </slot>
                </v-card>
            </v-form>
        </validation-observer>
    </v-dialog>
</template>

<script>
import BaseForm from "./BaseForm"

export default {
        name: "DialogBaseForm",
        extends: BaseForm,
        mounted() {
            this.dialog = true;
        },
        data() {
            return {
                dialog: false,
            }
        },
        watch: {
            dialog(v) {
                if (!v) {
                    this.$router.back()
                }
            }
        }
    }
</script>
