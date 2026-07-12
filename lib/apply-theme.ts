import { ThemeMode, ThemeStyles } from "@/types/theme";

function applyStyleToElement(element: HTMLElement, key: string, value: string) {
  const currentStyle = element.getAttribute("style") || "";
  // 移除已存在的同名变量定义
  const cleanedStyle = currentStyle.replace(
    new RegExp(`--${key}:\\s*[^;]+;?`, "g"), 
    ""
  ).trim();
  
  element.setAttribute(
    "style",
    cleanedStyle + (cleanedStyle ? " " : "") + `--${key}: ${value};`
  );
}

// function applyFontsToElement(element: HTMLElement, font: string) {

//   const currentClass = element.getAttribute("class") || "";

//   // 去除之前的字体class
//   const cleanedClass = currentClass.replace(/fonts-start.*?fonts-end/g, '').replace(/\s+/g, ' ').trim();
  
//   // 加入字体class
//   const newClass = cleanedClass + (cleanedClass ? " " : "") + (font ? `fonts-start ${font} fonts-end` : "");

//   element.setAttribute("class", newClass);
// }

export function applyThemeToElement(themeStyles: ThemeStyles, mode: ThemeMode) {
  const root = document.documentElement;
  
  Object.entries(themeStyles[mode])
    .forEach(([key, value]) => {
      applyStyleToElement(root, key, value);
    });

  // applyFontsToElement(root, themeStyles.font);
}
