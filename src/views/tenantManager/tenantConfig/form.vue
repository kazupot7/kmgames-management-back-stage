<template>
  <div>
    <el-form
      class="relative pl-3 pr-3 member_form"
      ref="ruleFormRef"
      :model="newFormInline"
      :rules="formRules"
      label-width="auto"
      label-position="top"
    >
      <!-- ! 状态开关 -->
      <el-form-item
        class="status"
        :label="`${t('状态开关')}`"
        prop="status"
        required
      >
        <el-switch
          v-model="newFormInline.status"
          inline-prompt
          class="pure-datatheme"
          :active-text="t('开启')"
          :inactive-text="t('关闭')"
          @change="testChange"
          :style="switchStyle"
        />
      </el-form-item>

      <!-- - 商户名称 + 密钥 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="`${t('商户名称')}`" prop="name" required>
            <el-input
              maxlength="30"
              v-model="newFormInline.name"
              :placeholder="t('请输入商户名称')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="`${t('密钥')}`"
            prop="tenantKey"
            required
            class="key_container"
          >
            <el-input
              :disabled="!!newFormInline.id"
              readonly
              v-model="newFormInline.tenantKey"
            />
            <el-button
              v-if="newFormInline.tenantKey"
              round
              size="small"
              type="primary"
              v-copy:click="newFormInline.tenantKey"
              >{{ t('复制') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>

      <!-- - 商户类型 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="t('商户类型')" prop="tenantType" required>
            <el-select
              v-model="newFormInline.tenantType"
              filterable
              clearable
              :placeholder="t('请输入商户类型')"
            >
              <el-option
                :label="item.val"
                :value="item.key"
                v-for="item in TENANT_TYPE"
                :key="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="t('管理员')" prop="adminAccount" required>
            <el-input
              :placeholder="t('6-12个字符（英文数字）')"
              v-model="newFormInline.adminAccount"
              :disabled="!!newFormInline.id"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- - 商户编码 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="`${t('商户编码')}`" prop="tenantCode" required>
            <el-input
              v-model="newFormInline.tenantCode"
              :placeholder="t('请输入商户编码，2-30个英文或数字')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item
                class="password key_container"
                :label="`${t('管理员密码')}:`"
                prop="adminPassword"
                required
              >
                <template v-if="newFormInline.id">
                  <el-input
                    class="no_border"
                    readonly
                    v-model="newFormInline.adminPassword"
                  />
                  <el-button
                    v-if="newFormInline.id"
                    round
                    size="small"
                    type="primary"
                    @click="openResetPasswordDialog"
                    >{{ t('重置') }}</el-button
                  >
                </template>
                <el-input
                  v-else
                  class="no_border"
                  readonly
                  v-model="defaultPasswordTip"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                class="password key_container"
                :label="`${t('谷歌验证码')}:`"
                prop="googleAuth"
                required
              >
                <el-input
                  class="no_border"
                  readonly
                  v-model="newFormInline.googleAuth"
                />
                <el-button
                  round
                  @click="openResetGoogle"
                  type="primary"
                  size="small"
                  v-if="newFormInline.id"
                  >{{ t('重置') }}</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <!-- - 商户标签 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="t('商户标签')" prop="tenantTag" required>
            <el-select
              v-model="newFormInline.tenantTag"
              filterable
              clearable
              :placeholder="t('请输入商户标签')"
            >
              <el-option
                v-for="item in TENANT_TAG"
                :key="item.key"
                :label="item.val"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${t('商户对接人')}:`" prop="contact">
            <el-input
              v-model="newFormInline.contact"
              :placeholder="t('请输入商户对接人')"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- -剩余左半部分 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="`${t('上级')}:`" prop="agentId" required>
            <el-select
              v-model="newFormInline.agentId"
              filterable
              clearable
              :placeholder="t('请输入上级')"
            >
              <el-option
                v-for="item in agentList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item
                class="password"
                :label="`${t('钱包加扣款接口URL')}:`"
                prop="baseUrlType_40"
              >
                <el-input
                  v-model="newFormInline.baseUrlType_40"
                  :placeholder="t('请输入钱包加扣款接口URL')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                class="password"
                :label="`${t('钱包加扣款回调URL')}:`"
                prop="input"
              >
                <el-input
                  v-model="newFormInline.baseUrlType_50"
                  :placeholder="t('请输入钱包加扣款回调URL')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <!--- 剩余右半部分 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="t('商户等级')" prop="tenantLevel" required>
            <el-select
              v-model="newFormInline.tenantLevel"
              filterable
              clearable
              :placeholder="t('请输入商户等级')"
            >
              <el-option
                :label="item.val"
                :value="item.key"
                v-for="item in TENANT_LEVLE"
                :key="item.key"
              />
            </el-select>
          </el-form-item>
          <div class="mb-2 text-xs">{{ t('地址配置') }}</div>

          <el-form-item class="password" :label="t('IV')" prop="iv">
            <el-input v-model="newFormInline.iv" />
          </el-form-item>

          <el-form-item
            class="password"
            :label="`${t('API')}`"
            prop="baseUrlType_10"
          >
            <el-input
              v-model="newFormInline.baseUrlType_10"
              :placeholder="t('请输入API地址')"
            />
          </el-form-item>
          <el-form-item
            class="password"
            :label="t('WEB')"
            prop="baseUrlType_20"
          >
            <el-input
              v-model="newFormInline.baseUrlType_20"
              :placeholder="t('请输入WEB地址')"
            />
          </el-form-item>
          <el-form-item
            class="password"
            :label="`${t('H5')}`"
            prop="baseUrlType_21"
          >
            <el-input
              v-model="newFormInline.baseUrlType_21"
              :placeholder="t('请输入H5地址')"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            class="password key_container"
            :label="`${t('抽成比例')}:`"
            prop="commissionRatio"
          >
            <el-input
              :formatter="v => formatNumber(v, 3)"
              v-model="newFormInline.commissionRatio"
              :placeholder="t('请输入抽成比例')"
            />
            <span class="ml-2">%</span>
          </el-form-item>

          <el-form-item
            class="password"
            :label="`${t('计算模式')}:`"
            prop="commissionRatioType"
            required
          >
            <el-select
              v-model="newFormInline.commissionRatioType"
              filterable
              clearable
            >
              <el-option
                v-for="item in CACLE_TYPE"
                :key="item.key"
                :label="item.val"
                :value="item.key"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            class="password"
            :label="t('缴纳周期')"
            prop="paymentCycle"
            required
          >
            <el-select v-model="newFormInline.paymentCycle" clearable>
              <el-option
                v-for="item in PAYMENT_TYPE"
                :key="item.key"
                :label="item.val"
                :value="item.key"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            class="password"
            :label="`${t('结算币种')}:`"
            prop="currency"
            required
          >
            <el-select v-model="newFormInline.currency" clearable>
              <el-option
                v-for="item in CURRENCY_TYPE"
                :key="item.key"
                :label="item.val"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="t('备注')" prop="comment">
            <el-input type="textarea" v-model="newFormInline.comment" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="flex justify-end pr-3">
      <el-button @click="cancelClick">{{ t('取消') }}</el-button>
      <el-button @click="confirmClick" type="primary">{{
        t('确定')
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { formRules } from './utils/rule';
import { FormProps } from './utils/types';
import GoogleDialog from './component/GoogleDialog.vue';
import { t } from '@/plugins/i18n';
import { usePublicHooks } from '@/hooks';
import { addDialog, closeDialog } from '@/components/ReDialog';
import {
  TENANT_TAG,
  TENANT_TYPE,
  TENANT_LEVLE,
  CACLE_TYPE,
  PAYMENT_TYPE,
  CURRENCY_TYPE
} from './utils/map';
import { formatNumber } from '@/utils/formatNumber';
import { ElMessageBox } from 'element-plus';
import { message } from '@/utils/message';
const { switchStyle } = usePublicHooks();
const props = defineProps<FormProps>();
const defaultPasswordTip = ref('默认初始密码123456');

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const agentList = reactive<TenantAPI.simpleAgentList[]>([]);

const testChange = () => {};

//- 绑定谷歌验证器
const openResetGoogle = () => {
  addDialog({
    width: '35%',
    class: 'google_dialog',
    showClose: false,
    closeOnClickModal: false,
    hideFooter: true,
    contentRenderer: ({ options, index }) =>
      h(GoogleDialog, {
        id: newFormInline.value.id ?? '',
        onCloseDialog(val) {
          if (val) newFormInline.value.googleAuth = val;
          closeDialog(options, index);
        }
      })
  });
};

onMounted(() => {
  getKeyList();
  getSimpleAgents();
});

//-todo 重置密码
const openResetPasswordDialog = async () => {
  ElMessageBox.confirm(
    `${'确定要重置'}${newFormInline.value.name}${t('的密码？')}</br>${t(
      '重置后的密码为:123456'
    )}`,
    t('警告'),
    {
      confirmButtonText: t('提交'),
      cancelButtonText: t('取消'),
      type: 'warning',
      center: true,
      dangerouslyUseHTMLString: true
    }
  ).then(async () => {
    const res = await API.resetAdminPwd({
      id: +newFormInline.value.id
    });
    message(res.msg, { type: res.code ? 'error' : 'success' });
    newFormInline.value.adminPassword = '123456';
  });
};

//- 获取上级列表
const getSimpleAgents = async () => {
  const res = await API.getSimpleAgents();
  if (res.code) return;
  agentList.length = 0;
  agentList.push(...res.data);
};

//- 获取谷歌 + iv密钥
const getKeyList = async () => {
  if (!props.formInline.id) {
    const res = await API.genNewAuths();
    if (res.code) return;
    newFormInline.value.googleAuth = res.data.googleAuth;
    newFormInline.value.iv = res.data.iv;
    newFormInline.value.tenantKey = res.data.tenantKey;
  }
};

const emits = defineEmits(['closeDialog']);
//- 关闭弹窗
const cancelClick = () => {
  emits('closeDialog');
};

//- 新增 + 修改按钮点击
const confirmClick = () => {
  ruleFormRef?.value.validate(async v => {
    if (v) {
      const urlStr = newFormInline.value.id ? 'updateTenants' : 'createTenants';

      const params = JSON.parse(
        JSON.stringify({
          ...newFormInline.value,
          status: +newFormInline.value.status
        })
      );
      if (!newFormInline.value.id) delete params.id;
      const res = await API[urlStr](params);
      message(res.msg, { type: res.code ? 'error' : 'success' });
      emits('closeDialog', 'reload');
    }
  });
};
</script>

<style lang="scss">
.status {
  position: absolute;
  top: -45px;
  left: 100px;
  display: flex !important;
  align-items: center;
  label {
    margin-bottom: 0 !important;
  }
}
.password {
  display: flex !important;
  align-items: center;
  label {
    margin-bottom: 0 !important;
    min-width: 40px;
    text-align: left !important;
  }
}
.key_container {
  .el-form-item__content {
    flex-wrap: nowrap;
    button {
      margin-left: 10px;
    }
  }
}
.member_form {
  label {
    font-size: 12px;
    margin-bottom: 0 !important;
  }
}
.google_dialog {
  .el-dialog__header {
    display: none !important;
  }
}
.no_border {
  color: red;
  .el-input__wrapper {
    border: none;
    box-shadow: none;
  }
}
</style>
