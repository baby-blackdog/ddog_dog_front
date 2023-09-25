<template>
    <v-container class="mt-5">
        <v-card class="elevation-12 pa-5">
            <v-card-title class="headline justify-center">
                Order Information
            </v-card-title>
            <v-card-text class="text-center">
                <v-list dense>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Order ID</v-list-item-title>
                            <v-list-item-subtitle>{{ orderId }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Hotel Name</v-list-item-title>
                            <v-list-item-subtitle>{{ hotelName }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Room Type</v-list-item-title>
                            <v-list-item-subtitle>{{ roomType }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Used Point</v-list-item-title>
                            <v-list-item-subtitle>{{ usedPoint }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Check In</v-list-item-title>
                            <v-list-item-subtitle>{{ checkIn }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Check Out</v-list-item-title>
                            <v-list-item-subtitle>{{ checkOut }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Order Status</v-list-item-title>
                            <v-list-item-subtitle>{{ orderStatus }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn color="error" @click="cancelOrder" v-if="orderStatus !== 'Canceled'">Cancel Order</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="5000" top>
            {{ snackbarText }}
        </v-snackbar>
    </v-container>
</template>

<script>
import axiosInstance from '@/axiosInstance';

export default {
    props: ['orderId', 'hotelName', 'roomType'],
    data() {
        return {
            usedPoint: 0,
            checkIn: '',
            checkOut: '',
            orderStatus: '',
            snackbar: false,
            snackbarText: '',
            snackbarColor: 'error',
        };
    },
    methods: {
        async cancelOrder() {
            try {
                const response = await axiosInstance.patch(`/orders/cancel/${this.orderId}`);
                const data = response.data;
                this.usedPoint = data.canceledPoint;
                this.checkIn = data.checkIn;
                this.checkOut = data.checkOut;
                this.orderStatus = 'Canceled';
                this.snackbarText = 'Order has been canceled successfully!';
                this.snackbarColor = 'success';
                this.snackbar = true;
            } catch (error) {
                this.snackbarText = 'Order cancellation failed';
                this.snackbarColor = 'error';
                this.snackbar = true;
            }
        }
    },
    async created() {
        try {
            const response = await axiosInstance.get(`/orders/${this.orderId}`);
            const data = response.data;
            this.usedPoint = data.usedPoint;
            this.checkIn = data.checkIn;
            this.checkOut = data.checkOut;
            this.orderStatus = data.orderStatus;
        } catch (error) {
            console.error('Order information fetching failed', error);
        }
    }
}
</script>
