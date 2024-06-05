<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          {{ t('菜单地图') }}
        </span>
        <span class="text-xs ml-2 text-red-500"
          >(可手动进行拖拽调整位置，拖拽规则为同级进行拖拽)</span
        >
      </div>
    </template>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-[20px]">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <el-button type="primary" @click="addBaseNode">{{
                t('新增根节点')
              }}</el-button>
            </div>
          </template>
          <div class="max-h-[580px] overflow-y-auto">
            <el-tree
              :data="menusData"
              :props="dataProps"
              default-expand-all
              ref="testRef"
              node-key="uniqueId"
              :draggable="true"
              :expand-on-click-node="false"
              :indent="30"
              :allow-drop="allowDrop"
              @node-drag-end="handleDragEnd"
              ><template v-slot:default="{ node, data }">
                <el-tree-line :node="node" :showLabelLine="true">
                  <template v-slot:node-label>
                    <div class="flex items-center">
                      <span class="text-sm font-bold">
                        {{ node.data.meta.title }}
                      </span>
                      <span class="ml-1 text-red-400 text-xs">
                        {{ node.data.path }}</span
                      >
                      <!-- <span class="ml-2 mr-1 text-xs">{{ t('类别') }}:</span>
                      <span class="ml-1 text-blue-400 text-xs">{{
                        t('菜单')
                      }}</span> -->
                    </div>
                  </template>
                </el-tree-line>
                <div class="btn_group">
                  <el-button
                    :icon="useRenderIcon('addFill')"
                    size="small"
                    type="primary"
                    @click="addClick(data)"
                    >{{ t('新增子菜单') }}</el-button
                  >
                  <el-button
                    size="small"
                    :icon="useRenderIcon('editPen')"
                    type="info"
                    >{{ t('修改') }}</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    :icon="useRenderIcon('deleteBin_5Line')"
                    >{{ t('删除') }}</el-button
                  >
                </div>
              </template>
            </el-tree>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span class="font-medium">
                {{ FORM_TITLE_MAP[formTypeNumber] }}
              </span>
            </div>
          </template>
          <div class="max-h-[585px] min-h-[585px] overflow-y-auto">
            <!-- :parentData="data" -->
            <FormCom v-if="formTypeNumber > 0" :form-inline="form" />
            <el-empty v-else :description="t('请先选择节点的编辑类型')" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { clone, isNumber } from '@pureadmin/utils';
import ElTreeLine from '@/components/ReTreeLine';
import { deleteChildren } from '@/utils/tree';
import { usePermissionStoreHook } from '@/store/permission';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { t } from '@/plugins/i18n';
import FormCom from './component/FormCom.vue';
import { useMenuTree } from './util/hook';

import {
  AllowDropType,
  NodeDropType
} from 'element-plus/es/components/tree/src/tree.type';
import { ElMessageBox } from 'element-plus';

const testRef = ref();

defineOptions({ name: 'menuTree' });

const FORM_TITLE_MAP = {
  0: t('请选择操作类型'),
  1: t('新增节点'),
  2: t('修改节点')
};

const dataProps = {
  value: 'uniqueId',
  children: 'children'
};

//- 拖拽开始规则
const allowDrop = (sourceNode, targetNode, type: AllowDropType) => {
  const soucePath = sourceNode.data.path.slice(
    0,
    sourceNode.data.path.lastIndexOf('/')
  );
  const targetPath = targetNode.data.path.slice(
    0,
    targetNode.data.path.lastIndexOf('/')
  );
  const first_condition =
    sourceNode.level === 1 && targetNode.sourceNode === 1 && type !== 'inner';
  const second_conditaion =
    sourceNode.level === targetNode.level &&
    type !== 'inner' &&
    soucePath === targetPath;
  //- 越级禁止拖拽
  return first_condition || second_conditaion;
};

//- 拖拽结束
const handleDragEnd = (draggingNode, dropNode, dropType: NodeDropType) => {
  if (!dropNode) return;

  ElMessageBox.confirm(t('确定要调整菜单显示顺序么'), t('警告'), {
    confirmButtonText: t('确认'),
    cancelButtonText: t('取消'),
    center: true
  })
    .then(async () => {
      console.log('tree drag end:', draggingNode, dropNode, dropType);
    })
    .catch(_e => {
      const firIdx = isNumber(draggingNode.key)
        ? draggingNode.key
        : draggingNode.key.split('-')[1];
      const secIdx = isNumber(dropNode.key)
        ? dropNode.key
        : dropNode.key.split('-')[1];
      if (dropNode.parent) {
        let arr = dropNode.parent.childNodes;
        [arr[firIdx], arr[secIdx]] = [arr[secIdx], arr[firIdx]];
      }
    });
};

const formTypeNumber = ref<0 | 1 | 2>(0);

const addBaseNode = () => {
  formTypeNumber.value = 1;
};

const menusTree = reactive(clone(usePermissionStoreHook().wholeMenus, true));
const menusData = computed(() => {
  console.log(
    'index.vue文件 186==============行打印=',
    deleteChildren(menusTree)
  );
  return deleteChildren(menusTree);
});

const addClick = _data => {
  formTypeNumber.value = 1;
};

const { form } = useMenuTree();
</script>

<style lang="scss" scoped>
:deep() {
  .el-tree-node__content {
    height: 32px;
    .btn_group {
      display: none;
    }
    &:hover {
      .btn_group {
        display: block;
      }
    }
  }
}
</style>
