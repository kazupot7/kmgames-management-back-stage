<template>
  <div class="flex flex-col">
    <div>
      <el-checkbox
        v-model="selectAll"
        :label="t('全部权限')"
        size="large"
        @change="checkAllClick"
      />
    </div>
    <el-tree
      ref="treeRef"
      :data="menusData"
      :props="dataProps"
      default-expand-all
      show-checkbox
      class="role_tree"
      :check-on-click-node="true"
      node-key="id"
      @check-change="handleCheckChange"
      :expand-on-click-node="false"
      :indent="30"
    >
      <template v-slot:default="{ node, data }">
        <el-tree-line :node="node" :showLabelLine="true">
          <template v-slot:node-label>
            <div class="flex items-center">
              <span class="text-sm font-bold">
                {{ data.name }}
              </span>
            </div>
          </template>
        </el-tree-line>
      </template>
    </el-tree>
    <div class="flex justify-end">
      <el-button @click="closeDialog">{{ t('取消') }}</el-button>
      <el-button type="primary" @click="saveRole">{{ t('保存') }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ElTreeLine from '@/components/ReTreeLine';
import { t } from '@/plugins/i18n';
import { message } from '@/utils/message';

defineOptions({ name: 'menuTree' });
const treeRef = ref();
const selectAll = ref(false);
const emits = defineEmits(['closeDialog']);
const defaultKeyList = reactive<number[]>([]);

const dataProps = {
  value: 'id',
  children: 'childResourceList'
};
const menusData = reactive<RoleAPI.ChildResourceList[]>([]);

const props = defineProps<{
  roleId: number;
}>();

onMounted(() => {
  initTreeList();
});

const closeDialog = () => emits('closeDialog');
const initTreeList = async () => {
  const res = await API.allPermissionList({
    roleId: props.roleId
  });
  if (res.code) return message(res.msg, { type: 'error' });
  menusData.length = 0;
  menusData.push(...res.data);
  defaultKeyList.length = 0;
  filterHalfChecked(menusData);
  checkIsInitSelected(menusData);
  nextTick(() => {
    treeRef.value!.setCheckedKeys(defaultKeyList);
  });
};

//- 判断是否为半选中状态
const filterHalfChecked = menusData => {
  menusData.forEach(item => {
    if (item.childResourceList.length) {
      filterHalfChecked(item.childResourceList);
      item.resourceFlag = item.childResourceList.every(_ => _.resourceFlag);
    }
  });
};

//- 判断是否初始化被选中
const checkIsInitSelected = (list: RoleAPI.ChildResourceList[]) => {
  list.forEach(item => {
    if (item.childResourceList.length) {
      checkIsInitSelected(item.childResourceList);
    }
    if (!!item.resourceFlag) defaultKeyList.push(item.id);
  });
};

//- 保存选中内容
const saveRole = async () => {
  const resourceList = treeRef
    .value!.getCheckedNodes(false, true)
    .map(item => item.id);

  const res = await API.updateRoleResource({
    roleId: props.roleId,
    resourceList
  });
  message(res.msg, { type: res.code ? 'error' : 'success' });
  if (!res.code) {
    closeDialog();
  }
};

//- 获取所有的子节点
const getAllNodeKeys = node => {
  let keys = [node.id];
  if (node.childResourceList && node.childResourceList.length > 0) {
    node.childResourceList.forEach(child => {
      keys = keys.concat(getAllNodeKeys(child));
    });
  }
  return keys;
};

//- 全选按钮点击
const checkAllClick = (status: boolean) => {
  const allKeys = [];
  menusData.forEach(node => {
    allKeys.push(...getAllNodeKeys(node));
  });
  treeRef.value!.setCheckedKeys(status ? allKeys : []);
};

const handleCheckChange = () => {
  const keys = treeRef.value!.getCheckedKeys();
  const allKeys = [];
  menusData.forEach(node => {
    allKeys.push(...getAllNodeKeys(node));
  });
  selectAll.value = keys.length === allKeys.length;
};
</script>

<style lang="scss" scoped>
:deep() {
  .el-tree-node__content {
    height: 32px;
  }
  .role_tree {
    max-height: 600px;
    overflow-y: auto;
  }
}
</style>
