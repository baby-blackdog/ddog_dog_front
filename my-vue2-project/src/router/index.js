import Vue from 'vue';
import Router from 'vue-router';
import HotelSearch from '../views/HotelSearch.vue';
import HotelDetail from '../views/HotelDetail.vue';
import RoomDetail from '../views/RoomDetail.vue';
import OrderPage from '../views/OrderPage.vue';
import OrderComplete from '../views/OrderComplete.vue'
import OrderInformation from '../views/OrderInformation.vue'

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'HotelSearch',
        component: HotelSearch,
    },
    {
        path: '/places/:hotelId',
        name: 'HotelDetail',
        component: HotelDetail,
    },
    {
        path: '/places/hotel/:hotelId/room/:roomId',
        name: 'RoomDetail',
        component: RoomDetail,
        props: true
    },
    {
        path: '/order-page', // URL 경로 수정
        name: 'OrderPage',
        component: OrderPage,
        props: true
    },
    {
        path: '/orders/complete/:orderId', // URL 경로 수정
        name: 'OrderComplete',
        component: OrderComplete,
        props: true
    },
    {
        path: '/order-information/:orderId',
        name: 'OrderInformation',
        component: OrderInformation,
        props: true
    }
];

export default new Router({
    mode: 'history',
    routes,
});