<template>
  <el-dropdown trigger="click">
    <globalization
      class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300"
    />
    <template #dropdown>
      <el-dropdown-menu class="translation">
        <el-dropdown-item
          :style="getDropdownItemStyle(locale, item.code)"
          :class="['dark:!text-white', getDropdownItemClass(locale, item.code)]"
          @click="item.fn"
          v-for="item in langNavList"
          :key="item.code"
        >
          <IconifyIconOffline
            :class="`check-${item.code}`"
            v-show="locale === item.code"
            :icon="Check"
          />
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useNav } from '@/layout/hooks/useNav';

import Check from '@iconify-icons/ep/check';
import globalization from '@/assets/svg/globalization.svg?component';
import { useTranslationLang } from '@/layout/hooks/useTranslationLang';

const { getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationLanguage } = useTranslationLang();
const langNavList = reactive<{ code: string; label: string; fn: Function }[]>([
  { code: 'zh', fn: () => translationLanguage('zh'), label: '简体中文' },
  { code: 'en', fn: () => translationLanguage('en'), label: 'English' },
  { code: 'fr', fn: () => translationLanguage('fr'), label: 'French' }
]);
</script>

<style scoped lang="scss">
.translation {
  :deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }
  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
