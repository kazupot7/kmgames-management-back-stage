<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    class="pr-10"
    label-width="100px"
  >
    <el-form-item :label="t('账号名称')" prop="name" required>
      <el-input
        :disabled="!!newFormInline.id"
        v-model.trim="newFormInline.name"
        clearable
        :placeholder="t('请输入6-20个英文字母或数字')"
      />
    </el-form-item>

    <el-form-item :label="t('所属部门')" prop="dept">
      <el-select v-model="newFormInline.dept" filterable clearable>
        <el-option
          v-for="item in depList"
          :key="item.key"
          :label="item.val"
          :value="item.key.toString()"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="t('所属角色')" prop="roleId">
      <el-select v-model="newFormInline.roleId" filterable clearable>
        <el-option
          :label="item.name"
          :value="item.id"
          v-for="item in roleList"
          :key="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="t('U盾序列号')" prop="ukeyCode">
      <el-input
        v-model.trim="newFormInline.ukeyCode"
        maxlength="30"
        :placeholder="t('请输入U盾序列号')"
      />
    </el-form-item>

    <el-form-item :label="t('备注')" prop="comment">
      <el-input
        type="textarea"
        v-model="newFormInline.comment"
        maxlength="255"
        show-word-limit
        :placeholder="t('只能输入255个字符的内容')"
      />
    </el-form-item>

    <el-form-item :label="t('账号状态')" prop="status" v-if="!row.id">
      <el-switch
        v-model="newFormInline.status"
        inline-prompt
        class="pure-datatheme"
        :active-text="t('开启')"
        :inactive-text="t('关闭')"
        :style="switchStyle"
      />
    </el-form-item>

    <div class="flex justify-end">
      <el-button @click="closeDialog">{{ t('取消') }}</el-button>
      <el-button type="primary" @click="confirmClick">{{
        t('确定')
      }}</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formRules } from './utils/rule';
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';
import { FormInstance } from 'element-plus/es/components/form';
import { message } from '@/utils/message';
import { depList } from './utils/map';
import { removeEmptyStringKeys } from '@/utils/utilFn';

const { switchStyle } = usePublicHooks();

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
  ruleFormRef.value.validate(async v => {
    const requestAPI = newFormInline.id ? 'updateSysAccount' : 'addSysAccount';
    if (v) {
      const res = await API[requestAPI]({
        ...(removeEmptyStringKeys(
          newFormInline
        ) as UserMangerAPI.addSysAccountRes),
        status: Number(newFormInline.status)
      });
      message(res.msg, { type: res.code ? 'error' : 'success' });
      emits(
        'closeDialog',
        res.code ? '' : 'reloadTable',
        !res.code && !newFormInline.id
      );
    }
  });
};

defineExpose({ newFormInline });
</script>

<style lang="scss"></style>
