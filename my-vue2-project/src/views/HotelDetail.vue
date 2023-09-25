<template>
  <v-container class="mt-5">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="5000" top>
      {{ snackbarText }}
    </v-snackbar>
    <v-card v-if="hotel.id" class="mb-3" elevation="2">
      <v-card-title class="bg-primary white--text d-flex justify-space-between align-center">
        <h2>{{ hotel.name }}</h2>
        <v-btn icon @click="toggleWishlist" v-tooltip="{ 'content': isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist' }">
          <v-icon :color="isWishlisted ? 'yellow' : 'white'">{{ isWishlisted ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="6">
            <div><strong>Address:</strong> {{ hotel.address }}</div>
            <div><strong>Contact:</strong> {{ hotel.contact }}</div>
            <div><strong>Admin ID:</strong> {{ hotel.adminId }}</div>
            <div><strong>Representative:</strong> {{ hotel.representative }}</div>
            <div><strong>Business Name:</strong> {{ hotel.businessName }}</div>
            <div><strong>Rating Score:</strong> {{ hotel.ratingScore }}</div>
          </v-col>
          <v-col md="6">
            <v-img :src="hotel.imageUrl" alt="Hotel Image" class="rounded" aspect-ratio="1.7"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div v-if="rooms.length > 0" class="mb-5">
      <h3 class="mb-3">Rooms</h3>
      <v-row>
        <v-col md="4" v-for="room in rooms" :key="room.id" class="mb-4">
          <v-card class="h-100 elevation-1">
            <v-card-title>{{ room.roomType }}</v-card-title>
            <v-card-text>
              <div><strong>Description:</strong> {{ room.description }}</div>
              <div><strong>Occupancy:</strong> {{ room.occupancy }}</div>
              <div><strong>Has Bed:</strong> {{ room.hasBed ? 'Yes' : 'No' }}</div>
              <div><strong>Has Amenities:</strong> {{ room.hasAmenities ? 'Yes' : 'No' }}</div>
              <div><strong>Smoking Available:</strong> {{ room.smokingAvailable ? 'Yes' : 'No' }}</div>
              <div><strong>Room Number:</strong> {{ room.roomNumber }}</div>
              <div><strong>Point:</strong> {{ room.point }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text :to="`/places/hotel/${hotel.id}/room/${room.id}`" color="primary">View Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="reviews-section">
      <h3>Hotel Reviews</h3>
      <v-list v-if="reviews.length > 0" class="mb-3">
        <v-list-item v-for="review in reviews" :key="review.id" class="elevation-1 mb-2">
          <v-list-item-content>
            <p class="mb-1 font-weight-bold">Rating: {{ review.rating }}</p>
            <p>{{ review.content }}</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-alert v-else type="info">No reviews available for this hotel.</v-alert>
    </div>
  </v-container>
</template>

<script>
import axiosInstance from '@/axiosInstance';

export default {
  data() {
    return {
      hotel: {},
      rooms: [],
      isWishlisted: false,
      reviews: [],
      loading: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'error',
    };
  },
  methods: {
    async toggleWishlist() {
      try {
        if (this.isWishlisted) {
          await axiosInstance.delete(`/wishlist/${this.hotel.id}`);
        } else {
          await axiosInstance.put('/wishlist', null, { params: { hotelId: this.hotel.id } });
        }
        this.isWishlisted = !this.isWishlisted;
      } catch (error) {
        this.snackbarText = '위시리스트 처리에 실패했습니다. 다시 시도해주세요.';
        this.snackbarColor = 'error';
        this.snackbar = true;
      }
    },
  },
  async created() {
    this.loading = true;
    try {
      const hotelId = this.$route.params.hotelId;
      const hotelResponse = await axiosInstance.get(`/places/${hotelId}`);
      this.hotel = hotelResponse.data;
      const roomsResponse = await axiosInstance.get(`/places/${hotelId}/rooms`);
      this.rooms = roomsResponse.data.roomResponses.content;
      const response = await axiosInstance.get(`/wishlist/me`, { params: { hotelId: this.hotel.id } });
      this.isWishlisted = response.data.wishlistResponses.some(wishlist => wishlist.placeId === this.hotel.id);
    } catch (error) {
      this.snackbarText = '호텔 상세 정보를 가져오는 중 오류가 발생했습니다.';
      this.snackbarColor = 'error';
      this.snackbar = true;
    } finally {
      this.loading = false;
    }
    try {
      const hotelId = this.$route.params.hotelId;
      const response = await axiosInstance.get(`/reviews?hotelId=${hotelId}`);
      this.reviews = response.data.reviewResponses;
    } catch (error) {
      this.snackbarText = '리뷰를 불러오는 중 오류가 발생했습니다.';
      this.snackbarColor = 'error';
      this.snackbar = true;
    }
  }
}
</script>

<style scoped>
.v-icon {
  cursor: pointer;
  transition: color 0.3s ease;
}

.v-icon:hover {
  color: #e0ac05;
}

.reviews-section {
  margin-top: 20px;
}
</style>
