<template>
  <div class="banner-box">
    <Banner :banners="banners" :height="500" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import banmer1 from '@/assets/imgs/banner/banner01.jpg'
import banmer2 from '@/assets/imgs/banner/banner02.jpg'
import banmer3 from '@/assets/imgs/banner/banner03.jpg'
import Banner from '@/components/Banner/index.vue'
const banners = ref<{ name: string; url: string }[]>([
  {
    name: '1',
    url: banmer1
  },
  {
    name: '2',
    url: banmer2
  },
  {
    name: '3',
    url: banmer3
  }
])
</script>

<style lang="scss" scoped>
.banner-box {
  width: 100%;
  height: 500px;
}
</style>
