<!--
 * @Author: zhupengfei6623
 * @Date: 2021-04-25 14:22:22
 * @Description: file content
-->

## 依赖：
[tiff.js](https://github.com/seikichi/tiff.js/tree/master)
## 思路：
1、使用 scoped-slot 去设置缩略图模版。

2、在缩略图自定义插槽中，试用tiff.js将图片转换显示。
## 问题：
由于tiff.js转换tif/tiff格式的图片的时候是异步的，所以自定义一个支持异步加载图片的组件
## 代码：
定义一个可以异步加载图片的组件（thumbnail.vue）
``` html
<template>
  <div>
    <img class="el-upload-list__item-thumbnail" :src="src" alt="">
  </div>
</template>

<script>
import Tiff from 'tiff.js';
export default {
  name: "thumbnail",
  props: {
    file: { type: Object, required: true }
  },
  data() {
    return {
      src: ''
    };
  },
  created() {
    // 判断是不是tif数据格式，如果是，则试用tif.js处理
    let isTif = ['image/tiff', 'image/tif'].includes(this.file.raw.type);
    if (isTif) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'arraybuffer';
      xhr.open('GET', this.file.url);
      xhr.onload = (e) => {
        var tiff = new Tiff({ buffer: xhr.response });
        var canvas = tiff.toCanvas();
        this.src = canvas.toDataURL();
      };
      xhr.send();
    } else {
      this.src = this.file.url;
    }
  }
};
</script>
```

在需要的地方试用thumbnail.vue
``` html
<el-upload action="#" list-type="picture-card" :auto-upload="false">
  <i slot="default" class="el-icon-plus"></i>
  <div slot="file" slot-scope="{file}">
      <!-- 支持异步加载图片的组件 -->
      <thumbnail :file="file"></thumbnail>
  </div>
</el-upload>
```