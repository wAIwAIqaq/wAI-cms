<template>
  <div class="shadow-sm h-[60px] flex p-4 justify-between items-center">
    <div class="text-14">
      <el-button type="primary" @click="menuSwitcher" link>
        <el-icon size="16">
          <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </el-button>
      {{ route.name }}
    </div>
    <div class="flex gap-2">
      <el-color-picker
        v-model="storage.themeColor"
        @change="themeColorChange"
        :predefine="predefineColors"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage, useCssVar } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { updateThemeColorVar } from "@/utils/theme";
import { predefineColors } from "@/utils/config";

const store = useStore();

const route = useRoute();

const isCollapse = computed(() => store.state.settings.isCollapse);

const defaultTheme = { themeColor: "#409EFF" };

if (
  localStorage.getItem("settings") === "undefined" ||
  !localStorage.getItem("settings")
) {
  localStorage.removeItem("settings");
}

const storage = useStorage("settings", defaultTheme, localStorage, {
  mergeDefaults: (storageValue, defaults) => {
    return {
      ...defaults,
      ...storageValue,
    };
  },
});

watch(storage.value, (val, oldVal) => {
  console.log(val, oldVal)
  if(!val.themeColor) {
    storage.value.themeColor = predefineColors[0]
    themeColorChange(storage.value.themeColor)
  }
})

const menuSwitcher = () => {
  store.commit("settings/SWITCH_MENU");
};

const el = ref(null);
const themeColorVar = useCssVar("--el-color-primary", el, {
  initialValue: storage.value.themeColor,
});
const themeColorChange = (color: string) => {
  // if (!color) return;
  themeColorVar.value = color;
  updateThemeColorVar({ colors: { primary: color } });
};

themeColorChange(storage.value.themeColor);
</script>

<style scoped></style>
