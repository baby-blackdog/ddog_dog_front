<template>
  <v-app>
    <v-app-bar app color="#ffe0e6" elevation="2" dense> <!-- AppBar의 배경색을 연한 핑크색으로 변경 -->
      <v-toolbar-title>
        <v-img :src="logo" class="mr-2" contain height="45" alt="Logo"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :href="githubUrl" target="_blank" v-tooltip="'Visit our GitHub'">
        <v-icon x-large>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      logo: require('@/assets/ddog_dog.png'),
      githubUrl: 'https://github.com/baby-blackdog'
    };
  },
};
</script>

<style scoped>
.v-toolbar-title {
  display: flex;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #000000;
}

.v-img {
  margin-right: 15px;
}

.v-tooltip {
  font-size: 14px;
  background-color: #ffe0e6;
  color: #000000;
}
</style>
