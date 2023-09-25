<template>
  <v-container>
    <v-text-field v-model.trim="province" label="지역명 입력" class="mb-2"></v-text-field>
    <v-btn @click="searchHotels" :disabled="!province" color="primary" class="mb-2">검색</v-btn>
    <v-btn @click="resetSearch" color="error" class="mb-2">초기화</v-btn>
    <v-progress-linear v-if="loading" indeterminate color="blue"></v-progress-linear>
    <v-list v-if="hotels.length > 0">
      <v-list-item v-for="hotel in hotels" :key="hotel.id" @click="$router.push({ name: 'HotelDetail', params: { hotelId: hotel.id } })" class="clickable">
        <v-list-item-avatar>
          <v-img :src="hotel.imageUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ hotel.name }} - 평점: {{ hotel.ratingScore.toFixed(2) }}</v-list-item-title>
          <v-list-item-subtitle>{{ hotel.address }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-alert v-else-if="!loading" type="info">검색 결과가 없습니다.</v-alert>
    <v-pagination v-if="hotels.length > 0" v-model="page" :length="totalPages" @input="searchHotels"></v-pagination>
  </v-container>
</template>

<script>
import axiosInstance from '@/axiosInstance';

export default {
  data() {
    return {
      province: '',
      hotels: [],
      page: 1,
      loading: false,
      totalPages: 1
    };
  },
  methods: {
    async searchHotels() {
      if (!this.province) return;
      this.loading = true;
      try {
        const response = await axiosInstance.get(`/places?province=${this.province}&page=${this.page}`);
        this.hotels = response.data.hotelResponses.content;
        this.totalPages = response.data.hotelResponses.totalPages;
      } catch (error) {
        console.error('호텔 검색 중 오류가 발생했습니다.', error);
        this.$alert('호텔 검색 중 오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        this.loading = false;
      }
    },
    resetSearch() {
      this.province = '';
      this.hotels = [];
      this.page = 1;
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clickable:hover {
  background-color: #f0f0f0;
}
</style>
