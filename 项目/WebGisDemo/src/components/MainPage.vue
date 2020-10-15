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
    }
  },
  mounted() {
    var map = L.map('mapCon').setView([39.971495, 116.25144], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    // L.marker([39.91036, 116.403704]).addTo(map).bindPopup('北京啊').openPopup();
    var polygonLayer = L.geoJSON(null, {
      style: feature => ({ color: '#f00' })
    }).addTo(map);
    var polygonData = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [116.2535, 40.009898], [116.25144, 39.971495], [116.324225, 39.990436],
          [116.296072, 40.032509], [116.2950, 39.95798], [116.2535, 40.009898]
        ]]
      }
    };
    polygonLayer.addData(polygonData);



    /*核心：利用turf里面的kinks方法，计算出所有自相交的点，然后渲染出来*/
    var kinks = turf.kinks(turf.polygon(polygonData.geometry.coordinates));
    kinks.features.forEach(kink => {
      L.marker(kink.geometry.coordinates.reverse()).addTo(map);
    });
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
