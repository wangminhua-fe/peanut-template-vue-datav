<template>
  <div class="datav" ref="datav"></div>
</template>

<script>
export default {
  name: 'DataV',
  data() {
    return {};
  },
  mounted() {
    this.pageResize();

    window.onresize = () => {
      this.pageResize();
    };
  },
  methods: {
    pageResize() {
      let windowWidth = document.body.clientWidth;
      if (windowWidth != 1920) {
        let scaleNum = Number.parseFloat((windowWidth / 1920).toFixed(3));
        if (windowWidth <= 1366) {
          scaleNum += 0.008;
        }
        this.$refs.datav.style = `transform-origin: 0 0 0;transform: scale(${scaleNum});`;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.datav {
  // background-image: url('../assets/images/body_bg.png'); // 更换背景图
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 1920px;
  height: 1080px;
}
</style>
