<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="{ active: isActive(view) }"
        v-for="(view, index) in visitedViews"
        :key="index"
        :to="view.path"
      >
        {{ view.title }}
        <span
          v-show="!isAffix(view) && !isLastView"
          @click.prevent.stop="closeSelectedView(view)"
          class="close-icon"
        >
          <el-icon :size="12">
            <close />
          </el-icon>
        </span>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { routes } from "@/router";

import tab from "./tab";

const store = useStore();

const route = useRoute();

const router = useRouter();

const visitedViews = computed(() => store.state.visitedViews.visitedViews);

const isLastView = computed(() => visitedViews.value.length === 1)

const isActive = (view: RouteItem) => {
  return view.path === route.path;
};

const isAffix = (view: { meta: { affix: boolean } }) => {
  return view.meta?.affix;
};

const closeSelectedView = (view: RouteItem) => {
  tab.closePage(view).then(() => {
    if (isActive(view)) {
      toLastView(view);
    }
  });
};

const toLastView = (view: RouteItem) => {
  const latestView = visitedViews.value.slice(-1)[0]; 
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === "Dashboard") {
      // to reload home page
      router.replace({ path: "/redirect" + view.fullPath });
    } else {
      router.push("/");
    }
  }
};
// const filterAffixViews = (
//   routes: Array<RouteLocationNamedRaw>,
//   base = "/"
// ) => {
//   let views = [];
//   routes.forEach((route) => {
//     if (route.meta && route.meta.affix) {
//       const viewPath = resolve(base, route.path);
//       views.push({
//         fullPath: viewPath,
//         path: viewPath,
//         name: route.name,
//         meta: { ...route.meta }
//       });
//     }
//     if (route.children) {
//       const tempViews = filterAffixViews(route.children, route.path);
//       if (tempViews.length >= 1) {
//         views = [...views, ...tempViews];
//       }
//     }
//   });
//   return views;
// };

const initViews = () => {
  store.dispatch("visitedViews/addView", routes[0]);
};

initViews();
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      border-radius: 2px;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &:hover{
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
      }
      &.active {
        background-color: var(--el-color-primary);
        color: #fff;
        border-color: var(--el-color-primary);
        &:hover {
          background-color: var(--el-color-primary-light-3);
          border-color: var(--el-color-primary-light-3);
        }
        &:active {
          background-color: var(--el-color-primary-dark-2);
          border-color: var(--el-color-primary-dark-2);
        }
      }
      .close-icon{
        display: inline-flex;
        &:hover{
          // background: #fff;
          border-radius: 50%;
          background: var(--el-color-primary-light-9);
          color: var(--el-color-primary-dark-2);
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
