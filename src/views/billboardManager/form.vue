<template>
  <div>
    <LanguageGroup />
    <el-card>
      <el-form
        ref="ruleFormRef"
        :model="newFormInline"
        :rules="formRules"
        class="pr-10"
        label-width="100px"
      >
        <el-form-item :label="t('公告标题')" prop="name" required>
          <el-input
            v-model="newFormInline.name"
            clearable
            :placeholder="t('请输入公告标题')"
          />
        </el-form-item>

        <el-form-item :label="t('公告类型')" prop="dept">
          <el-input
            v-model="newFormInline.name"
            clearable
            :placeholder="t('请输入公告类型')"
          />
        </el-form-item>

        <el-form-item :label="t('公告内容')" prop="roleId">
          <el-input
            type="textarea"
            v-model="newFormInline.comment"
            maxLength="855"
            rows="5"
            :placeholder="t('请输入公告内容')"
          />
        </el-form-item>

        <div class="flex justify-end">
          <el-button @click="closeDialog">{{ t('取消') }}</el-button>
          <el-button type="primary" @click="confirmClick">{{
            t('确定')
          }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formRules } from './utils/rule';
import { t } from '@/plugins/i18n';
import { FormInstance } from 'element-plus/es/components/form';
// import { message } from '@/utils/message';
// import { removeEmptyStringKeys } from '@/utils/utilFn';
import LanguageGroup from '@/components/Form/LanguageGroup.vue';
import ConfirmDialog from './component/ConfirmDialog.vue';
import {
  addDialog,
  closeAllDialog,
  closeDialog as closeItemDialog
} from '@/components/ReDialog';

const props = defineProps<{
  row: UserMangerAPI.addSysAccountRes;
}>();

const emits = defineEmits(['closeDialog']);

onMounted(() => {
  getRoleList();
});

const roleList = reactive<RoleAPI.querySysAccountListData[]>([]);
const getRoleList = async () => {
  const res = await API.querySysAccountList({
    pageNum: 1,
    pageSize: 9999
  });
  roleList.length = 0;
  roleList.push(...res.data.list);
};

const ruleFormRef = ref<FormInstance>();
const newFormInline = reactive(props.row);

const closeDialog = () => {
  emits('closeDialog');
};

const confirmClick = () => {
  addDialog({
    title: t('发送确认'),
    width: '40%',
    closeOnClickModal: false,
    hideFooter: true,
    contentRenderer: ({ options, index }) =>
      h(ConfirmDialog, {
        onCloseDialog: (type?: 'closeAll') => {
          type === 'closeAll'
            ? closeAllDialog()
            : closeItemDialog(options, index);
        }
      })
  });
  /* ruleFormRef.value.validate(async v => {
    const requestAPI = newFormInline.id ? 'updateSysAccount' : 'addSysAccount';
    if (v) {
      const res = await API[requestAPI]({
        ...(removeEmptyStringKeys(
          newFormInline
        ) as UserMangerAPI.addSysAccountRes),
        status: Number(newFormInline.status)
      });

      message(res.msg, { type: res.code ? 'error' : 'success' });
      emits('closeDialog', res.code ? '' : 'reloadTable');
    }
  }); */
};
</script>

<style lang="scss"></style>
