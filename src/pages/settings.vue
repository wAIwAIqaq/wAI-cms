<template>
  <div>
    <el-popover
      placement="bottom"
      title="Title"
      :width="200"
      trigger="click"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <el-button class="m-2">Click to activate</el-button>
      </template>
    </el-popover>
    <el-switch v-model="value1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
</script>

<style scoped></style>
