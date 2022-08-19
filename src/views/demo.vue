<script lang="ts" setup>
import chartBox from '@/components/Chart/index.vue'
import chartBox1 from '@/components/Chart/bar.vue'
import chartBox2 from '@/components/Chart/bar1.vue'
import chartBox3 from '@/components/Chart/bar2.vue'
import formDemo from '../../dist'
import Vue from 'vue'
Vue.use(formDemo)
</script>
<template>
  <div class="home">
    <formDemo></formDemo>
    <section class="row">
      <div class="w-1/2 pr-3">
        <div class="card">
          <div class="">
            <h3>网站分析</h3>
          <!-- <div class="flex justify-around">
            <div class="flex flex-col">
              <span>用户流量</span>
              <span>用户流量</span>
            </div>
            <div class="flex flex-col">
              <span>访问次数</span>
              <span>访问次数</span>
            </div>
            <div>访问人数</div>
          </div> -->
          </div>
          <chartBox class="h-2/3" :chartOption="{ className: 'ref24' }"></chartBox>
        </div>
      </div>
      <div class="w-1/2 pl-3">
        <div class="flex h-1/2">
          <div class="w-1/2 pb-3 pr-3">
            <div class="card">
              <h3 style="margin-bottom: 10px;">使用率</h3>
              <chartBox2 :chartOption="{ className: 'ref242' }"></chartBox2>
            </div>
          </div>
          <div class="w-1/2 pb-3 pl-3">
            <div class="card">44</div>
          </div>
        </div>

        <div class="flex h-1/2">
          <div class="w-1/2 pt-3 pr-3">
            <div class="card"></div>
          </div>
          <div class="w-1/2 pt-3 pl-3">
            <div class="pb-3 h-1/2">
              <div class="card">333</div>
            </div>
            <div class="pt-3 h-1/2">
              <div class="card">444</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="row">
      <div class="w-1/2 pr-3">
        <div class="card">
          <h3>流量统计</h3>
          <chartBox1 :chartOption="{ className: 'ref1444' }"></chartBox1>
        </div>
      </div>
      <div class="w-1/2 pl-3">
        <div class="card">
          <h3>右边</h3>
          <chartBox3 :chartOption="{ className: 'ref33' }"></chartBox3>
        </div>
      </div>
    </section>

    <section class="row">
      <div class="w-7/12 pr-3">
        <div class="card">
          <h3>右边</h3>
          <chartBox3 :chartOption="{ className: 'ref4422' }"></chartBox3>

        </div>
      </div>
      <div class="w-5/12 pl-3">
        <div class="card">
          <h3>右边</h3>
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