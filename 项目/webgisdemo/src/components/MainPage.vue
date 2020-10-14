<!--
 * @Author: zhupengfei6623
 * @Date: 2020-10-14 15:27:28
 * @Description: file content
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>朱鹏飞</h2>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      msg: '欢迎来到你的VUE'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
