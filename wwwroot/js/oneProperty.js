const app = new Vue({
    el: "#oneProperty",
    data: {
        property: null,
        loading: true
    },
    mounted() {
        this.fetchProperty();
    },
    methods: {
        fetchProperty() {
            const url = window.location.pathname;
            const parts = url.split('-');
            const id = parts[parts.length - 1];

            if (typeof api !== 'undefined') {
                api.getRequest(`/property/${id}`)
                    .then(res => {
                        this.property = res.data || null;
                        this.loading = false;
                    })
                    .catch(err => {
                        console.error("Error fetching property", err);
                        this.property = null;
                        this.loading = false;
                    });
            } else {
                console.error("El objeto 'api' no está definido.");
                this.loading = false;
            }
        },
        formatPrice(price) {
            return new Intl.NumberFormat('es-PE').format(price);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-PE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
});
