<template>
  <div class="flex flex-col gap-4">
    <el-form
      ref="formRef"
      :model="formData"
      class="grid justify-around gap-3"
      label-width="160px"
      label-suffix=":"
    >
      <el-form-item label="日期" prop="date" class="col-span-2">
        <el-date-picker
          v-model="formData.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="formData.address" />
      </el-form-item>
    </el-form>
    <div class="flex flex-row-reverse gap-3">
      <el-button
        type="primary"
        size="small"
        icon="search"
        :disabled="loading"
        @click="searchHandler"
      >
        搜索
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="RefreshRight"
        plain
        @click="resetFormHandler(formRef)"
      >
        重置
      </el-button>
    </div>
    <div class="flex gap-3">
      <el-button type="primary" size="small" icon="upload">导入</el-button>
      <el-button type="primary" size="small" icon="download">导出</el-button>
      <el-button type="danger" size="small" icon="delete">批量删除</el-button>
    </div>
    <el-table :data="tableData" stripe border v-loading="loading">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="名字" width="180" />
      <el-table-column prop="address" label="地址">
        <template #default="scope">
          {{ scope.row.address }}
          <el-button type="primary" link @click="copyField(scope.row.address)">
            <el-icon>
              <CopyDocument />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="Operate" width="200" fixed="right">
        <template #default="scope">
          <div class="flex justify-center">
            <el-button
              type="primary"
              icon="Edit"
              link
              @click="editHandler(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              placement="top"
              trigger="click"
              confirm-button-text="删除"
              cancel-button-text="取消"
              title="确定删除?"
              :icon="WarningFilled"
              @confirm="confirmDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger" icon="delete" link>删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      small
      layout="sizes, prev, pager, next, total"
      :page-sizes="pageSizes"
      v-model:page-size="pageSize"
      :page-count="pageData.count"
      :total="pageData.total"
      v-model:current-page="pageData.currentPage"
    />
  </div>
  <CustomDialog
    :dialog-visible="dialogVisible"
    :title="dialogTitle"
    @close-dialog="closeDialogHandler"
  >
    <el-form
      :model="dialogData"
      class="inline-flex flex-col gap-4"
      label-suffix=":"
      :label-width="80"
      inline
    >
      <el-form-item label="日期">
        <el-date-picker v-model="dialogData.date" disabled />
      </el-form-item>
      <el-form-item label="名字">
        <el-input v-model="dialogData.name" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input
          type="textarea"
          v-model="dialogData.address"
          :autosize="{ minRows: 2, maxRows: 4 }"
        />
      </el-form-item>
    </el-form>
  </CustomDialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent } from "vue";
import type { FormInstance } from "element-plus";
import CustomDialog from "@/components/customDialog.vue";
import { WarningFilled } from "@element-plus/icons-vue";
import { copyField } from "@/utils";

defineComponent({
  CustomDialog,
});

const formRef = ref<FormInstance>();
const formData = reactive({
  date: ["", ""],
  name: "",
  address: "",
});

const dialogVisible = ref(false);
const dialogTitle = "编辑";

interface TableDataItem {
  date: string;
  name: string;
  address: string;
}

let dialogData: TableDataItem = reactive({ date: "", name: "", address: "" });

let tableData: TableDataItem[] = [];

let pageData = reactive({ total: 1, count: 1, currentPage: 1 });

const pageSizes = [10, 20, 50];

const pageSize = ref(10);

const loading = ref(false);

const searchHandler = () => {
  getTableData();
};

const resetFormHandler = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const tableDataRes = {
  list: [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ],
  page: {
    total: 4,
    size: 10,
    count: 1,
    currentPage: 1,
  },
};

const getTableData = async () => {
  loading.value = true;
  const { list, page } = await new Promise<typeof tableDataRes>((resolve) => {
    setTimeout(() => {
      resolve(tableDataRes);
    }, 1500);
  });
  tableData = list;
  pageData = page;
  loading.value = false;
};

const editHandler = (row: TableDataItem) => {
  dialogVisible.value = true;
  dialogData = reactive({ ...row });
};

const closeDialogHandler = () => {
  dialogVisible.value = false;
};

const confirmDelete = (row: TableDataItem) => {
  console.log("confirm delete", row);
  getTableData();
};

getTableData();
</script>

<style lang="scss" scoped>
:deep(.el-table) {
  --el-table-border-color: var(--el-color-primary-light-9) !important;
  thead {
    .el-table__cell {
      background-color: var(--el-color-primary-light-3) !important;
      color: #fff !important;
    }
  }
}
.el-form {
  grid-template-columns: repeat(5, minmax(0, 1fr));
  @media screen and (min-width: 2000px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
.flex,
.grid {
  & > .el-button + .el-button {
    margin-left: 0 !important;
  }
}
</style>
