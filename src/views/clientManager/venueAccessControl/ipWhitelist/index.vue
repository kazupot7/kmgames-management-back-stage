<template>
  <div class="ip_wihte_list">
    <div class="mb-2">
      {{
        t(
          ' 一行输入一个IP地址，地址后面加英文逗号，如：129.29.29.29,   录入的IP地址可以访问客户端'
        )
      }}
    </div>
    <div class="wangeditor">
      <Editor
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        style="height: 500px; font-size: 14px; overflow-y: hidden"
        @onCreated="handleCreated"
      />
    </div>
    <div class="mt-2">
      <el-button
        :loading="btnLoading"
        auto-insert-space
        class="min-w-32"
        type="primary"
        @click="saveIPClick"
        >{{ t('保存') }}</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { Editor } from '@wangeditor/editor-for-vue';
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { t } from '@/plugins/i18n';
import { message } from '@/utils/message';
import { ElMessageBox } from 'element-plus';

defineOptions({
  name: 'CLIENTMANAGER_VENUEACCESSCONTROL_IPWHITELIST'
});

const list = reactive<ClientManagerAPI.searchIpData[]>([]);
const btnLoading = ref(false);

const mode = 'simple';
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');

onMounted(() => {
  initWhiteList();
});

const initWhiteList = async () => {
  const res = await API.searchIp();
  list.push(...res.data);
  list.forEach(item => {
    valueHtml.value += `<p>${item.addr},</p>`;
  });
};

const editorConfig = { placeholder: t('请输入内容...') };

const handleCreated = editor => {
  editorRef.value = editor;
};

const saveIPClick = () => {
  const text = editorRef.value.getText();
  ElMessageBox.confirm(t('确定要保存当前修改内容么'), t('警告'), {
    center: true,
    type: 'warning'
  }).then(async () => {
    btnLoading.value = true;
    const res = await API.updateIp({ addr: text });
    btnLoading.value = false;
    message(res.msg, { type: res.code ? 'error' : 'success' });
  });
};

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style lang="scss">
.ip_wihte_list {
  p {
    margin: 5px 0 !important;
    line-height: 1.2;
  }
}
</style>
