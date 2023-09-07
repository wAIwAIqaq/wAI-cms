<template>
  <div class="flex h-screen">
    <el-config-provider :locale="zhCN">
      <LeftMenu :is-collapse="isCollapse" />
      <div class="flex flex-auto flex-col overflow-hidden">
        <Header :is-collapse="isCollapse" @switch-menu="switchMenu" />
        <VisitedViews />
        <el-scrollbar class="custom-scrollbar bg-slate-50">
          <div class="p-4">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </el-scrollbar>
      </div>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import Header from "./components/header.vue";
import LeftMenu from "./components/leftMenu.vue";
import VisitedViews from "./components/visitedViews/visitedViews.vue";
import { ref, defineComponent } from "vue";
import 'dayjs/locale/zh-cn';//中文
import zhCN from "element-plus/dist/locale/zh-cn.js";

defineComponent({
  Header,
  LeftMenu,
  VisitedViews,
});

const isCollapse = ref(false);

const switchMenu = (bool: boolean) => {
  console.log("bool", bool);
  isCollapse.value = bool;
};
</script>

<style lang="scss">
.el-scrollbar__bar {
  background-color: var(--el-color-primary-light-9);
  width: 10px;
}
.el-scrollbar__thumb {
  background-color: var(--el-color-primary);
  &:hover {
    background-color: var(--el-color-primary-dark-2);
  }
  &:active {
    background-color: var(--el-color-primary-dark-2);
    opacity: 0.8;
  }
}
</style>
