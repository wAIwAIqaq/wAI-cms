<template>
  <div class="flex h-full flex-row">
    <el-menu
      :default-active="activeMenu"
      :collapse.sync="isCollapse"
      class="el-menu-vertical"
      popper-effect="light"
      popper-class="drop-shadow-popper"
    >
      <el-menu-item
        v-for="(route, index) in routes"
        :key="index"
        @click="toggleMenu(route)"
        :index="route.path"
      >
        <el-icon> <component :is="route.meta.icon" /></el-icon>
        <template #title>
          {{ route.name }}
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRouter, useRoute, RouteLocationNamedRaw } from "vue-router";
import { routes } from "@/router";
import { useStore } from "vuex";

const router = useRouter();

const route = useRoute();

const store = useStore();

const isCollapse = computed(() => store.state.settings.isCollapse);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

watch(route, () => {
  addVisitedView()
})


const toggleMenu = (menuRoute: RouteLocationNamedRaw) => {
  router.push(menuRoute);
};

const moveToCurrentView = () => {
  // nextTick(() => {
       
  // })
}

const addVisitedView = () => {
  const name = {route}
  if(name) {
    store.dispatch('visitedViews/addView', route)
    moveToCurrentView()
  }
  return
}
</script>

<style lang="scss">
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
.el-popper {
  filter: drop-shadow(0px 0px 0.5px var(--el-color-primary)) !important;
}
</style>
