import { Store } from 'vuex'
// declare module '@vue/runtime-core' {
//   // 声明自己的 store state
//   interface State {
//   }

//   // 为 `this.$store` 提供类型声明
//   interface ComponentCustomProperties {
//     $store: Store<State>
//   }
// }

interface RootState {
	[x: string]: any
	name: string
}

interface RootWithModule {
	user: UserState
	app: AppState
	type: TaskState
}

type StoreType = RootState & RootWithModule

interface SettingsModule {
  isCollapse: boolean
}

interface VisitedViewsModule {
  visitedViews: Array<any>
  cachedViews: Array<any>
}