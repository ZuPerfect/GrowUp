<!--
 * @Author: zhupengfei6623
 * @Date: 2020-10-14 15:27:28
 * @Description: file content
-->
<template>
  <div class="main-page">
    <div id="mapCon"></div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      msg: '欢迎来到你的VUE'
    }
  },
  mounted() {
    var map = L.map('mapCon').setView([39.9, 116.4], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '朱鹏飞的地图'
    }).addTo(map);

    L.marker([39.9, 116.4]).addTo(map).bindPopup('北京啊').openPopup();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-page {
  width: 100%;
  height: 100%;
}
#mapCon {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
</style>
