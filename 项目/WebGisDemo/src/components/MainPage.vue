<!--
 * @Author: zhupengfei6623
 * @Date: 2020-10-14 15:27:28
 * @Description: 多边形自相交交点定位
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
    }
  },
  mounted() {
    // 创建一个地图容器
    var map = L.map('mapCon').setView([39.971495, 116.25144], 12);
    // 创建一个瓦片图层并添加到地图容器中
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);
    // 创建一个多边形矢量图层
    var polygonLayer = L.geoJSON(null, {
      style: feature => ({ color: '#f00' })
    }).addTo(map);
    // 创建一个多边形geoJSON
    var polygonData = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [116.2535, 40.009898], [116.25144, 39.971495], [116.324225, 39.990436],
          [116.296072, 40.032509], [116.2950, 39.94798], [116.2535, 40.009898]
        ]]
      }
    };
    // 将geoJSON添加到图层中
    polygonLayer.addData(polygonData);

    /*核心：利用turf里面的kinks方法，计算出所有自相交的点，然后渲染出来*/
    var kinks = turf.kinks(turf.polygon(polygonData.geometry.coordinates));
    kinks.features.forEach(kink => {
      L.marker(kink.geometry.coordinates.reverse()).addTo(map).bindPopup('这是一个交点');
    });
  }
}
</script>

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
