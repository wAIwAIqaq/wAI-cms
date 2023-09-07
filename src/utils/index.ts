import { ElMessage } from "element-plus";

const copyField = (field: string) => {
  const tempInput = document.createElement("input");
  // 将文本内容赋值给临时输入框的value属性
  tempInput.value = field;
  // 将临时输入框追加到文档中
  document.body.appendChild(tempInput);
  // 选中临时输入框中的文本内容
  tempInput.select();
  // 执行复制命令
  document.execCommand("copy");
  // 从文档中移除临时输入框
  document.body.removeChild(tempInput);
  ElMessage.success('复制成功')
};

export { copyField };
