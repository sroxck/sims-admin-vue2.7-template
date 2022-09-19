<script lang="tsx" setup>
import chartBox from "@/components/Chart/index.vue";
import chartBox1 from "@/components/Chart/bar.vue";
import chartBox2 from "@/components/Chart/bar1.vue";
import chartBox3 from "@/components/Chart/bar2.vue";
import chartBox4 from "@/components/Chart/char.vue";
// import formDemo from '../../dist'

// named exports referencing variable declaration: ok
</script>
<template>
  <div class="home">
    <section class="row">
      <div class="w-1/2 pr-3">
        <div class="card">
          <h3>流量统计</h3>
          <chartBox
            class="h-2/3"
            :chartOption="{ className: 'ref24' }"
          ></chartBox>
        </div>
      </div>
      <div class="w-1/2 pl-3">
        <div class="card">
          <h3>竞价监控</h3>
          <chartBox3 :chartOption="{ className: 'ref33' }"></chartBox3>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="w-7/12 pr-3">
        <div class="card">
          <h3>内存占用</h3>
          <chartBox4 :chartOption="{ className: 'ref4422' }"></chartBox4>
        </div>
      </div>
      <div class="w-5/12 pl-3">
        <div class="card">
          <h3>消耗统计</h3>
          <chartBox1 :chartOption="{ className: 'ref1' }"></chartBox1>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="css" scoped>
.home {
  height: 400px;
}

.row {
  @apply flex flex-wrap rounded-lg  h-full p-3;
}
.card {
  @apply bg-white  p-3 h-full  rounded-lg;
}
.card-box {
  @apply bg-white  p-3  rounded-lg;
}
h3 {
  @apply mb-6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
  color: #718096;
  font-weight: 600;
  white-space: nowrap;
}
</style>
