<!--
 * @Author: zhupengfei6623
 * @Date: 2020-10-14 15:27:28
 * @Description: file content
-->
<template>
  <div class="hello">
    <header>
      <hgroup>
        <h1>页眉主标题</h1>
        <h1>页眉副标题</h1>
      </hgroup>
    </header>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <footer>
      原创作者;版权信息;联系方式;文档相关链接等...
    </footer>
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
