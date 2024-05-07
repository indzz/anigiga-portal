<template>
    <div>
        <v-card :loading="loading">
            <v-card-text v-if="loading && items.length === 0">
                {{$t('loading')}}
            </v-card-text>
            <slot name="list">
                <component :is="draggable ? 'draggable' : 'v-list'" v-model="items" class="py-0"
                           handle=".drag-handle"
                           @update="saveSortList">
                    <div v-for="(item, index) in items" :key="item.id">
                        <slot name="list.item" :item="item">
                            <v-list-item :dense="dense">
                                <slot name="list.item.prepend" :item="item">
                                    <v-list-item-action v-if="draggable">
                                        <v-btn class="drag-handle" icon>
                                            <v-icon>mdi-reorder-horizontal</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </slot>
                                <slot name="list.item.content" :item="item">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{item[titleKey || 'name']}}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </slot>
                                <slot name="list.item.actions" :item="item">
                                    <slot name="list.item.actions.edit" :item="item">
                                        <v-list-item-action v-if="checkCanEdit(item)">
                                            <v-btn icon :to="{name: editRouteName, params: {id: item.id}}" small>
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </slot>
                                    <slot name="list.item.actions.delete" :item="item">
                                        <v-list-item-action v-if="checkCanDelete(item)">
                                            <v-btn icon @click.stop="deleteItem(item)" small>
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </slot>
                                </slot>
                            </v-list-item>
                            <v-divider v-if="!draggable" />
                        </slot>
                    </div>
                </component>
            </slot>
        </v-card>

        <v-btn block color="secondary" :to="{name: createRouteName}" class="mt-3" v-if="checkCanCreate()">
            <v-icon>mdi-plus</v-icon>
            {{$t(createLabel)}}
        </v-btn>
    </div>
</template>

<script>
import crud from "../crud"
import draggable from "vuedraggable";
import {VList} from "vuetify/lib";

export default {
        name: "SimpleList",
        mixins: [crud],
        components: {draggable, VList},
        props: {
            prefix: {
                type: String,
                required: true
            },
            canCreate: {
                type: Boolean,
                default: undefined
            },
            canEdit: {
                type: [Function, Boolean],
                default: undefined
            },
            canDelete: {
                type: [Function, Boolean],
                default: undefined
            },
            dense: {
                type: Boolean,
                default: false
            },
            titleKey: {
                type: String,
                default: undefined
            },
            draggable: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            createRouteName() { return this.prefix + '_create' },
            editRouteName() { return this.prefix + '_edit' },
            createLabel() { return this.prefix + '_create' },
            createPermissionKey() { return this.prefix + '_manage' },
            editPermissionKey() { return this.prefix + '_manage' },
            deletePermissionKey() { return this.prefix + '_delete' },
        },
        mounted() {
            this.fetchItems();
        },
        data() {
            return {
                items: [],
            }
        },
        inject: {
            apiResource: {},
        },
        methods: {
            checkCanCreate() {
                return this.canCreate !== undefined ? this.canCreate : this.can(this.createPermissionKey);
            },
            checkCanEdit(item) {
                if (typeof this.canEdit === 'function') {
                    return this.canEdit(item);
                } else if (typeof this.canEdit === 'boolean') {
                    return this.canEdit;
                }
                return this.can(this.editPermissionKey);
            },
            checkCanDelete(item) {
                if (typeof this.canDelete === 'function') {
                    return this.canDelete(item);
                } else if (typeof this.canDelete === 'boolean') {
                    return this.canDelete;
                }
                return this.can(this.deletePermissionKey);
            },
            async saveSortList() {
                this.loadingCount++;
                const data = await this.apiResource().sort(this.items.map(i => i.id));
                this.alert('success', data.message);
                this.loadingCount--;
            }
        }
    }
</script>

<style>
.drag-handle {
    cursor: move;
}
</style>
