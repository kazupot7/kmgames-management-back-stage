<template>
  <div
    v-loading="usePermissionStoreHook().wholeMenus.length === 0"
    class="horizontal-header"
  >
    <div class="horizontal-header-left" @click="backTopMenu">
      <img src="/logo.svg" alt="logo" />
      <span>{{ title }}</span>
    </div>
    <el-menu
      router
      ref="menuRef"
      mode="horizontal"
      class="horizontal-header-menu"
      :default-active="defaultActive"
    >
      <sidebar-item
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <div class="horizontal-header-right">
      <!-- 菜单搜索 -->
      <!-- <Search /> -->
      <!-- 通知 -->
      <!-- <Notice id="header-notice" /> -->
      <!-- 国际化 -->

      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link navbar-bg-hover">
          <img :src="userAvatar" />
          <p v-if="userStore.userInfo.name" class="dark:text-white ml-1">
            {{ userStore.userInfo.name }}
          </p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="openResetDialog">
              <IconifyIconOffline icon="configCenter" style="margin: 5px" />
              {{ t('重置密码') }}
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <IconifyIconOffline
                :icon="LogoutCircleRLine"
                style="margin: 5px"
              />
              {{ t('退出系统') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <LanguageNav />

      <span
        class="set-icon navbar-bg-hover"
        @click="onPanel"
        :title="t('打开项目配置')"
      >
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarItem from './sidebarItem.vue';
import { isAllEmpty } from '@pureadmin/utils';
import { ref, nextTick, computed } from 'vue';
import { useNav } from '@/layout/hooks/useNav';
import { useTranslationLang } from '../../hooks/useTranslationLang';
import { usePermissionStoreHook } from '@/store/permission';
import LogoutCircleRLine from '@iconify-icons/ri/logout-circle-r-line';
import Setting from '@iconify-icons/ri/settings-3-line';
import LanguageNav from '@/components/LanguageNav/index.vue';
import { t } from '@/plugins/i18n';
import { useResetPasswordHook } from '@/hooks/resetPasswordHook';
import { useUserStore } from '@/store/user';

const menuRef = ref();

const { route } = useTranslationLang(menuRef);
const { title, logout, backTopMenu, onPanel, userAvatar } = useNav();

const defaultActive = computed(() =>
  !isAllEmpty(route.meta?.activePath) ? route.meta.activePath : route.path
);
const { openResetDialog } = useResetPasswordHook();
const userStore = useUserStore();

nextTick(() => {
  menuRef.value?.handleResize();
});
</script>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
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

.logout {
  max-width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
