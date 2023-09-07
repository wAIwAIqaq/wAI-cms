interface RouteItem {
  name: string,
  path: string,
  fullPath?: string,
  component?: DefineComponent 
  query: Record<string, any>
}

declare module 'element-plus/dist/locale/zh-cn.js'