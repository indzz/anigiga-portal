const crud = {
    provide: function () {
        return {
            state: this.state,
            apiResource: this.apiResource
        }
    },
    data() {
        return {
            loadingCount: 0,
            submittingCount: 0,
            state: {
                loading: false,
                submitting: false,
            }
        }
    },
    computed: {
        loading: {
            get() {
                return this.loadingCount > 0;
            },
            set(value) {
                if (value) {
                    this.loadingCount++;
                } else {
                    this.loadingCount--;
                }
            }
        },
        submitting: {
            get() {
                return this.submittingCount > 0;
            },
            set(value) {
                if (value) {
                    this.submittingCount++;
                } else {
                    this.submittingCount--;
                }
            }
        },
    },
    watch: {
        loadingCount(nv) {
            this.state.loading = nv > 0;
        },
        submittingCount(nv) {
            this.state.submitting = nv > 0;
        },
    },
    methods: {
        async fetchItems(params) {
            this.loadingCount++;

            try {
                const body = (await this.apiResource().list(params));
                this.items = body.data;
                if (typeof this.options !== 'undefined' && typeof body.options !== 'undefined')
                    this.options = body.options;
            } catch (e) {
                this.alert('error', this.apiErrorsToMessage(e));
            }

            this.loadingCount--;
        },

        async fetchItem(id) {
            this.loadingCount++;

            try {
                this.item = (await this.apiResource().view(id)).data;
            } catch (e) {
                this.alert('error', this.apiErrorsToMessage(e));
            }

            this.loadingCount--;
        },

        async fetchOptions() {
            try {
                this.options = await this.apiResource().getOptions();
            } catch (e) {
                this.alert('error', this.apiErrorsToMessage(e));
            }
        },

        async submit() {
            const observer = this.$refs.observer || this.$refs.baseForm.validationObserver();
            const success = await observer.validate();

            if (success) {
                this.submittingCount++;

                try {
                    const data = await (this.item.id !== null ?
                        this.apiResource().edit(this.item.id, this.item) :
                        this.apiResource().create(this.item));

                    this.submitSuccess(data);
                } catch (e) {
                    this.handleApiFormErrors(observer, e);
                }
                this.submittingCount--;
            }
        },

        async deleteItem(item) {
            if (!window.confirm(this.$t('confirm_delete_with_title', {title: item.name})))
                return;

            try {
                const data = await this.apiResource().destroy(item.id);
                this.alert('success', data.message);

                if (this.$route.name.match(/_edit$/)) {
                    this.$router.back();
                }

                this.fetchItems();
            } catch (e) {
                this.alert('error', this.apiErrorsToMessage(e));
            } finally {
                this.loadingCount--;
            }
        },
    }
};

export default crud;
