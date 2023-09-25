<template>
    <v-container class="mt-5">
      <v-card class="elevation-12">
        <v-card-title class="justify-center">
          <h1>{{ placeName }} - {{ roomName }}</h1>
        </v-card-title>
        <v-card-text class="text-center">
          <div>Stay Cost: {{ stayCost }}</div>
          <div>Check In: {{ checkIn }}</div>
          <div>Check Out: {{ checkOut }}</div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn 
            :loading="processingOrder" 
            :disabled="processingOrder" 
            color="primary" 
            @click="processOrder"
          >
            Process Order
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="showSuccessSnackbar" color="success">
        Order Successfully Processed!
        <v-btn text @click="showSuccessSnackbar = false">Close</v-btn>
      </v-snackbar>
      <v-snackbar v-model="showErrorSnackbar" color="error">
        Order Processing Failed!
        <v-btn text @click="showErrorSnackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </template>
  
<script>
import axiosInstance from '@/axiosInstance';

export default {
    data() {
        return {
            placeName: '',
            roomName: '',
            stayCost: 0,
            checkIn: this.$route.query.checkIn, // 쿼리 파라미터로부터 값 받기
            checkOut: this.$route.query.checkOut, // 쿼리 파라미터로부터 값 받기
            roomId: this.$route.query.roomId, // 쿼리 파라미터로부터 값 받기
            hotelId: this.$route.params.hotelId,
            processingOrder: false,
            showSuccessToast: false,
            showErrorToast: false,
        };
    },
    methods: {
        async processOrder() {
            this.processingOrder = true;
            try {
                const orderData = {
                    placeId: this.$route.query.hotelId,
                    roomId: this.roomId,
                    checkIn: this.checkIn,
                    checkOut: this.checkOut
                };
                const response = await axiosInstance.post('/orders', orderData);
                console.log('Order Created:', response.data);
                this.$router.push({
                    name: 'OrderComplete',
                    params: {
                        orderId: response.data.orderId,
                        hotelName: this.placeName, // hotelName으로 넘겨주기
                        roomType: this.roomName // roomType으로 넘겨주기
                    }
                });
                this.showSuccessToast = true;
            } catch (error) {
                console.error('Order processing failed', error);
                this.showErrorToast = true;
            } finally {
                this.processingOrder = false;
            }
        }
    },
    async created() {
        try {
            const response = await axiosInstance.get('/orders', {
                params: {
                    roomId: this.roomId,
                    checkIn: this.checkIn,
                    checkOut: this.checkOut
                }
            });
            const data = response.data;
            console.log(response.data);
            this.placeName = data.placeName;
            this.roomName = data.roomName;
            this.stayCost = data.stayCost;
        } catch (error) {
            console.error('Order page data fetching failed', error);
        }
    }
}
</script>
