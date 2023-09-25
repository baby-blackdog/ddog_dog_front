<template>
    <v-container class="mt-5">
        <v-card class="elevation-12">
            <v-card-title class="bg-primary white--text">
                <h1>{{ room.roomType }} - {{ room.hotelName }}</h1>
            </v-card-title>
            <v-card-text>
                <p>{{ room.description }}</p>
            </v-card-text>
            <v-overlay :value="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-overlay>
            <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="5000" top>
                {{ snackbarText }}
            </v-snackbar>
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dates"
                transition="scale-transition" offset-y min-width="290px" max-width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dateRangeText" label="Select range" prepend-icon="mdi-calendar" readonly
                        v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker range v-model="dates" no-title scrollable :min="minDate">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                </v-date-picker>
            </v-menu>
            <v-card-actions>
                <v-btn @click="goToOrderPage" color="success" block class="mt-3" large>Go to Order Page</v-btn>
            </v-card-actions>
            <v-list two-line class="mt-3">
                <v-list-item-group>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Occupancy</v-list-item-title>
                            <v-list-item-subtitle><b>{{ room.occupancy }}</b></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Has Bed</v-list-item-title>
                            <v-list-item-subtitle><b>{{ room.hasBed ? 'Yes' : 'No' }}</b></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Has Amenities</v-list-item-title>
                            <v-list-item-subtitle><b>{{ room.hasAmenities ? 'Yes' : 'No' }}</b></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Smoking Available</v-list-item-title>
                            <v-list-item-subtitle><b>{{ room.smokingAvailable ? 'Yes' : 'No' }}</b></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Room Number</v-list-item-title>
                            <v-list-item-subtitle><b>{{ room.roomNumber }}</b></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Point</v-list-item-title>
                            <v-list-item-subtitle><b>{{ room.point }}</b></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import axiosInstance from '@/axiosInstance';

export default {
    data() {
        return {
            room: {},
            menu: false,
            dates: [],
            minDate: this.getToday(),
            loading: false,
            snackbar: false,
            snackbarText: '',
            snackbarColor: 'error',
        };
    },
    computed: {
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
    },
    methods: {
        getToday() {
            return new Date().toISOString().split('T')[0];
        },
        onDateSelected() {
            if (this.dates.length === 2 && new Date(this.dates[0]) > new Date(this.dates[1])) {
                this.dates.reverse();
            }
        },
        goToOrderPage() {
            if (!this.dates[0] || !this.dates[1]) {
                this.snackbarText = 'Please select the dates.';
                this.snackbarColor = 'error';
                this.snackbar = true;
                return;
            }
            if (!this.dates[0] || !this.dates[1]) {
                alert('Please select the dates.');
                return;
            }
            let checkIn = new Date(this.dates[0]);
            let checkOut = new Date(this.dates[1]);

            this.$router.push({
                name: 'OrderPage',
                query: {
                    roomId: this.$route.params.roomId,
                    hotelId: this.$route.params.hotelId,
                    hotelName: this.room.hotelName,
                    roomType: this.room.roomType,
                    checkIn: checkIn.toISOString().split('T')[0],
                    checkOut: checkOut.toISOString().split('T')[0]
                }
            });
        }
    },
    watch: {
        dates: {
            handler: 'onDateSelected',
            deep: true,
        },
    },
    async created() {
        this.loading = true;
        try {
            const hotelId = this.$route.params.hotelId;
            const roomId = this.$route.params.roomId;

            const response = await axiosInstance.get(`/places/${hotelId}/${roomId}`);
            this.room = response.data;
        } catch (error) {
            this.snackbarText = '객실 상세 정보를 가져오는 중 오류가 발생했습니다.';
            this.snackbarColor = 'error';
            this.snackbar = true;
        } finally {
            this.loading = false;
        }
    }
}
</script>