<template>
  <el-container ref="container" class="contentBox">
    <el-header  ref="header" :height="headerHeight">
      <slot name="header" />
    </el-header>
    <el-main  ref="main" :style="{height:mainHeight+'px'}">
      <slot name="main" />
    </el-main>
    <el-footer ref="footer" :height="footerHeight" style="padding-top: 20px;">
      <slot name="footer" />
    </el-footer>
    <slot />
  </el-container>
</template>

<script >
export default {
name: 'Container',
data() {
    return {
      containerHeight: '',
      mainHeight: ''
    }
  },
mounted() {
    this.init()
    console.log(333);
    console.log(this.size,'$sl2ots');
    // window.onresize = this.init
  },
methods: {
    init() {
      const header = this.$refs.header.$el.offsetHeight
      const container = this.$refs.container.$el.offsetHeight
      const footer = this.$refs.footer.$el.offsetHeight
      console.log('footer',footer)
      console.log('container',container)
      console.log('header',header)
      const mainHeight = container - header - footer - 200
      this.$set(this, 'mainHeight', mainHeight)
      this.$emit('update:size', mainHeight)
    }

  },
};
</script>

<script setup>
defineProps({
    size: {
      type: null,
      default: 0
    },
    headerHeight: {
      type: String,
      default: 'auto'
    },
    footerHeight: {
      type: String,
      default: '80px'
    }
  });
</script>

<style lang="scss" scoped>

</style>
