<template>
    <v-container class="mt-5">
        <v-card class="elevation-12 pa-5">
            <v-card-title class="headline justify-center">
                Order Complete!
            </v-card-title>
            <v-card-text class="text-center">
                <p>Thank you for your order. Your order ID is 
                    <router-link 
                        :to="{ name: 'OrderInformation', params: { orderId: orderId, hotelName: hotelName, roomType: roomType } }"
                        class="text-decoration-none"
                    >
                        <span class="font-weight-bold">{{ orderId }}</span>
                    </router-link>.
                </p>
                <v-list dense>
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
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: ['orderId', 'hotelName', 'roomType'],
    created() {
        console.log('hotelName:', this.hotelName); // 콘솔에서 hotelName 확인
        console.log('roomType:', this.roomType); // 콘솔에서 roomType 확인
    }
}
</script>

<style scoped>
.text-decoration-none {
    text-decoration: none;
}
</style>
