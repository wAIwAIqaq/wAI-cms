<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    width="800px"
    :before-close="handleClose"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="closeDialog">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: "",
  },
});

const visible = ref(false);

watch(props, () => {
  visible.value = props.dialogVisible;
});

const emits = defineEmits(["close-dialog"]);

const handleClose = () => {
  emits("close-dialog");
};

const closeDialog = () => {
  emits("close-dialog");
};
</script>

<style scoped></style>
