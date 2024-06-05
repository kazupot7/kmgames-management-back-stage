import { useEventListener } from "@vueuse/core";
import type { Directive, DirectiveBinding } from "vue";


/** 文本复制指令（默认双击复制） */
export const enter: Directive = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    useEventListener(el, 'keyup', (e) => {
      if (e.key === 'Enter') binding.value();
    });
  },
};

// const MAX_INPUT_NUMBER_LENGTH = 15;
// export const number: Directive = {
//   mounted(el: HTMLInputElement, binding: DirectiveBinding, vnode) {
//     const maxLen = binding.value ?? MAX_INPUT_NUMBER_LENGTH;
//     useEventListener(el, 'input', (e) => {
//       console.log('index.ts文件 17==============行打印=', binding);
//       if (+(e.target as HTMLInputElement).value == 0) return;
//       (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '').replace(/^0{1,}/g, '').slice(0, maxLen);

//     });
//   },
// };
