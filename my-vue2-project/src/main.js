import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'

// FontAwesome 관련 import
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons'; // Solid Star
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'; // Regular Star
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vuetify from './plugins/vuetify'

// 사용할 아이콘을 library에 추가
library.add(fasFaStar, farFaStar);

// FontAwesomeIcon 컴포넌트를 전역 컴포넌트로 등록
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
  router,
  vuetify,
}).$mount('#app');