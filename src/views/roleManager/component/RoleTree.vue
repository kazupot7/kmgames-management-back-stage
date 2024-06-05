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
                {{ t(data.name) }}
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
import { list } from '../utils/test';

const treeRef = ref();
defineOptions({ name: 'menuTree' });
const selectAll = ref(false);
const emits = defineEmits(['closeDialog']);

const dataProps = {
  value: 'id',
  children: 'childResourceList'
};
const closeDialog = () => emits('closeDialog');
const menusData = reactive(list);

//- 保存选中内容
const saveRole = () => {
  console.log(treeRef.value!.getCheckedNodes(false, false));
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
}
</style>
