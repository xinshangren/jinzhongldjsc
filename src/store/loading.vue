<template>
  <div style="text-align: center;z-index: 3;position: fixed;left: 31%;top: 85%;color:#ffffff;font-size:13px;text-align: center;line-height: 30px; vertical-align: middle; background: rgba(0,0,0,0.5);border-radius: 10px;width: 150px;height: 30px;">
    加载中...
      <!-- <div class="wrapper" @click.stop>
        <van-loading type="spinner" color="#ffffff" size="24px" vertical>加载中...</van-loading>
      </div> -->
    
  </div>
</template>
 
<script>
export default {
  name: "LOADING",
  data() {
    return {};
  }
};
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.van-loading__text {
  color: #ffffff;
}
</style>