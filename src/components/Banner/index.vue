<template>
  <div class="banner">
    <a-carousel autoplay>
      <div v-for="(item, index) in banners" :key="index">
        <div class="w100" :style="'height:' + height + 'px; background-image: url(' + item.url + ')'" />
      </div>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
defineProps({
  height: {
    type: Number,
    default: 300
  },
  banners: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 100%;
}
</style>
