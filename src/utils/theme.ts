import { genMixColor } from "./gen-color";

export type Theme = {
  // 这里留出可拓展空间（如banner图，背景图，文案，标题等），将主题色嵌套在对象内
  colors: {
      primary?: string;
      info?: string;
      warning?: string;
      success?: string;
      danger?: string;
  };
};

// 更新主题色到css变量
function updateThemeColorVar({ colors }: Theme) {
  // 遍历当前主题色，生成混合色，并更新到css变量（tailwind + elementPlus）
  for (const brand in colors) {
      updateBrandExtendColorsVar(
          colors[brand as keyof Theme['colors']] as string,
          brand
      );
  }
  function updateBrandExtendColorsVar(color: string, name: string) {
      // TODO:生成混合色
      const { DEFAULT, dark, light } = genMixColor(color);
      // 每种主题色由浅到深分为五个阶梯以供开发者使用。
      setStyleProperty(`--${name}-lighter-color`, light[5]);
      setStyleProperty(`--${name}-light-color`, light[3]);
      setStyleProperty(`--${name}-color`, DEFAULT);
      setStyleProperty(`--${name}-deep-color`, dark[2]);
      setStyleProperty(`--${name}-deeper-color`, dark[4]);

      // elementPlus主题色更新
      setStyleProperty(`--el-color-${name}`, DEFAULT);
      setStyleProperty(`--el-color-${name}-dark-2`, dark[2]);
      setStyleProperty(`--el-color-${name}-light-3`, light[3]);
      setStyleProperty(`--el-color-${name}-light-5`, light[5]);
      setStyleProperty(`--el-color-${name}-light-7`, light[7]);
      setStyleProperty(`--el-color-${name}-light-8`, light[8]);
      setStyleProperty(`--el-color-${name}-light-9`, light[9]);
  }
}

function setStyleProperty(propName: string, value: string) {
  document.documentElement.style.setProperty(propName, value);
}

export {
  updateThemeColorVar,
  setStyleProperty
}