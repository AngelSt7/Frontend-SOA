const app = new Vue({
    el: "#buscar",
    data: {
        properties: [],
        locations: [],
        meta: null,
        locationSearch: '',
        filteredLocations: [],
        showLocationDropdown: false,
        selectedLocation: null
    },
    mounted() {
        this.initPopovers();
        this.fetchProperties();
        this.fetchLocations();

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.position-relative')) {
                this.showLocationDropdown = false;
            }
        });
    },
    methods: {
        fetchProperties() {
            const url = new URL(window.location);
            const params = Object.fromEntries(url.searchParams);
            if (typeof api !== 'undefined') {
                api.getRequest("/property", params)
                    .then(res => {
                        this.properties = res.data?.data || [];
                        this.meta = res.data?.meta || null;
                    })
                    .catch(err => {
                        console.error("Error fetching properties", err);
                        this.properties = [];
                        this.meta = null;
                    });
            } else {
                console.error("El objeto 'api' no está definido.");
            }
        },
        fetchLocations() {
            if (typeof api !== 'undefined') {
                api.getRequest("/location/DISTRICT")
                    .then(res => {
                        this.locations = res.data || [];
                        this.filteredLocations = res.data || [];
                    })
                    .catch(err => {
                        console.error("Error fetching locations", err);
                        this.locations = [];
                        this.filteredLocations = [];
                    });
            } else {
                console.error("El objeto 'api' no está definido.");
            }
        },
        filterLocations() {
            const search = this.locationSearch.toLowerCase().trim();
            if (search === '') {
                this.filteredLocations = this.locations;
            } else {
                this.filteredLocations = this.locations.filter(location =>
                    location.name.toLowerCase().includes(search)
                );
            }
            this.showLocationDropdown = true;
        },
        selectLocation(location) {
            this.selectedLocation = location;
            this.locationSearch = location.name;
            this.showLocationDropdown = false;
            this.setQueryParam('locationId', location.id);
        },
        clearLocation() {
            this.selectedLocation = null;
            this.locationSearch = '';
            this.filteredLocations = this.locations;
            this.setQueryParam('locationId', '');
        },
        setQueryParam(key, value) {
            const url = new URL(window.location);
            if (!value) url.searchParams.delete(key);
            else url.searchParams.set(key, value);
            window.history.pushState({}, "", url);
            this.fetchProperties();
        },
        formatPrice(price) {
            return new Intl.NumberFormat('es-PE').format(price);
        },
        changePage(page) {
            if (page < 1 || (this.meta && page > this.meta.totalPages)) return;
            this.setQueryParam('page', page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        applyFilter(popoverId, keyMin, keyMax, inputMin, inputMax) {
            const min = document.getElementById(inputMin).value;
            const max = document.getElementById(inputMax).value;
            this.setQueryParam(keyMin, min);
            this.setQueryParam(keyMax, max);
            const popoverEl = document.getElementById(popoverId);
            const popoverInstance = bootstrap.Popover.getInstance(popoverEl);
            if (popoverInstance) popoverInstance.hide();
        },
        initPopovers() {
            const popovers = [
                {
                    id: "pricePopover", fields: ["minPriceInput", "maxPriceInput"], keys: ["minPrice", "maxPrice"], labelMin: "Mínimo Precio", labelMax: "Máximo Precio", placeholders: [
                        "Precio mínimo",
                        "Precio máximo"
                ] },
                {
                    id: "bedroomsPopover", fields: ["minBedroomsInput", "maxBedroomsInput"], keys: ["minBedrooms", "maxBedrooms"], labelMin: "Mínimo Dormitorios", labelMax: "Máximo Dormitorios",
                    placeholders: [
                        "Dormitorios minimos",
                        "Dormitorios maximos"
                    ]
                },
                {
                    id: "bathroomsPopover", fields: ["minBathroomsInput", "maxBathroomsInput"], keys: ["minBathrooms", "maxBathrooms"], labelMin: "Mínimo Baños", labelMax: "Máximo Baños", placeholders: [
                        "Baños minimos",
                    "Baños máximos"
                    ]
                },
                {
                    id: "areaPopover", fields: ["minAreaInput", "maxAreaInput"], keys: ["minArea", "maxArea"], labelMin: "Mínima Área", labelMax: "Máxima Área", placeholders: [
                        "área mínima",
                    "área máxima"
                ] }
            ];
            popovers.forEach(p => {
                const el = document.getElementById(p.id);
                if (el) {
                    new bootstrap.Popover(el, {
                        html: true,
                        sanitize: false,
                        trigger: "click",
                        placement: "bottom",
                        content: `
                            <div style="min-width: 250px;">
                                <div class="mb-2">
                                    <label class="form-label">${p.labelMin}</label>
                                    <input type="number" placeholder="${p.placeholders[0]}" class="form-control" id="${p.fields[0]}" />
                                </div>
                                <div class="mb-2">
                                    <label class="form-label">${p.labelMax}</label>
                                    <input type="number" placeholder="${p.placeholders[1]}" class="form-control" id="${p.fields[1]}" />
                                </div>
                                <button class="btn btn-primary btn-sm w-100" 
                                    onclick="window.app.applyFilter('${p.id}', '${p.keys[0]}', '${p.keys[1]}', '${p.fields[0]}','${p.fields[1]}')">
                                    Filtrar
                                </button>
                            </div>
                        `
                    });
                }
            });
        }
    }
});
window.app = app;
window.setQueryParam = (key, value) => app.setQueryParam(key, value);