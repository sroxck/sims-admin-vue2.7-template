<template>
  <el-aside class="w-64 bg-gray-50">
    <el-menu router class="bg-gray-50" :default-active="route.path">
    <div class="logo h-20">33</div>
      <sideItem v-for="(route,index) in routerList" :key="index" :item="route"></sideItem>
    </el-menu>
  </el-aside>
</template>
<script lang="ts" setup>
import sideItem from './item.vue'
import { useRouter, useRoute } from "@/router";
import { useAppStore, storeToRefs } from "@/store";
import sMenu from "../menu";
import sMenuItem from "../menu/item";
import sSubMenu from "../menu/subMenu";
import { useWindowSize } from "@vueuse/core";
const appStore = useAppStore();
const { isCollapsed, isActive,routerList } = storeToRefs(appStore);

// import { constantRouter } from '@/router/modules/constantRouter'
// import { asyncRoutes } from '@/router/modules/asyncRoutes'
// const routerList = asyncRoutes.concat(constantRouter)
const route = useRoute();
</script>
<style >
.el-menu {
  height: 100%;
}
.logo {

}
.el-sub-menu.is-active .el-sub-menu__title{
    color:  var(--el-menu-active-color);
}
</style>
