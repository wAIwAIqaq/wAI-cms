import store from "@/store";
import { router } from "@/router";

export default {
  // 刷新当前页签
  refreshPage(obj: RouteItem) {
    const { path, query, matched } = router.currentRoute.value;
    if (obj === undefined) {
      matched.forEach((m) => {
        if (m.components && m.components.default && m.components.default.name) {
          if (!["Layout", "ParentView"].includes(m.components.default.name)) {
            obj = { name: m.components.default.name, path: path, query: query };
          }
        }
      });
    }
    return store.dispatch("visitedViews/delCachedView", obj).then(() => {
      const { path, query } = obj;
      router.replace({
        path: "/redirect" + path,
        query: query,
      });
    });
  },
  // 关闭当前tab页签，打开新页签
  closeOpenPage(obj: RouteItem) {
    store.dispatch("visitedViews/delView", router.currentRoute);
    if (obj !== undefined) {
      return router.push(obj);
    }
  },
  // 关闭指定tab页签
  closePage(obj: RouteItem) {
    if (obj === undefined) {
      return store
        .dispatch("visitedViews/delView", router.currentRoute)
        .then(({ lastPath }) => {
          return router.push(lastPath || "/");
        });
    }
    return store.dispatch("visitedViews/delView", obj);
  },
  // 关闭所有tab页签
  closeAllPage() {
    return store.dispatch("visitedViews/delAllViews");
  },
  // 关闭左侧tab页签
  closeLeftPage(obj: RouteItem) {
    return store.dispatch(
      "visitedViews/delLeftTags",
      obj || router.currentRoute
    );
  },
  // 关闭右侧tab页签
  closeRightPage(obj: RouteItem) {
    return store.dispatch(
      "visitedViews/delRightTags",
      obj || router.currentRoute
    );
  },
  // 关闭其他tab页签
  closeOtherPage(obj: RouteItem) {
    return store.dispatch(
      "visitedViews/delOthersViews",
      obj || router.currentRoute
    );
  },
  // 添加tab页签
  openPage(title: string, url: string, params: Record<string, any>) {
    var obj = { path: url, meta: { title: title } };
    store.dispatch("visitedViews/addView", obj);
    return router.push({ path: url, query: params });
  },
  // 修改tab页签
  updatePage(obj: RouteItem) {
    return store.dispatch("visitedViews/updateVisitedView", obj);
  },
};
