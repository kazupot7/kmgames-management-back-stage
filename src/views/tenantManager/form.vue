<template>
  <el-form
    class="relative pl-3 pr-3 member_form"
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="auto"
    label-position="top"
  >
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
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="`${t('商户名称')}`" prop="input" required>
          <el-input
            v-model="newFormInline.input"
            :placeholder="t('请输入商户名称')"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          :label="`${t('密钥')}`"
          prop="input"
          required
          class="key_container"
        >
          <el-input disabled v-model="newFormInline.input" />
          <el-button type="primary" v-copy="'asdf'">{{ t('复制') }}</el-button>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="t('商户类型')" prop="type" required>
          <el-select
            v-model="newFormInline.type"
            filterable
            clearable
            :placeholder="t('请输入商户类型')"
          >
            <el-option label="普通商户" :value="1" />
            <el-option label="普通商户1" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="t('管理员')" prop="type" required>
          <el-input readonly v-model="newFormInline.input" disabled />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="`${t('商户编码')}`" prop="input" required>
          <el-input
            v-model="newFormInline.input"
            :placeholder="t('请输入商户编码')"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <el-form-item
              class="password key_container"
              :label="`${t('管理员密码')}:`"
              prop="input"
              required
            >
              <el-input readonly v-model="newFormInline.input" />
              <el-button round type="primary">{{ t('重置') }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              class="password key_container"
              :label="`${t('谷歌验证码')}:`"
              prop="input"
              required
            >
              <el-input readonly v-model="newFormInline.input" />
              <el-button round @click="openResetGoogle" type="primary">{{
                t('重置')
              }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="t('商户标签')" prop="type" required>
          <el-select
            v-model="newFormInline.type"
            filterable
            clearable
            :placeholder="t('请输入商户标签')"
          >
            <el-option label="内部" :value="1" />
            <el-option label="外部" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="`${t('商户对接人')}:`" prop="input">
          <el-input
            readonly
            v-model="newFormInline.input"
            :placeholder="t('请输入商户对接人')"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="`${t('上级')}:`" prop="input" required>
          <el-input
            v-model="newFormInline.input"
            :placeholder="t('请输入上级')"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <el-form-item
              class="password"
              :label="t('钱包加扣款接口URL')"
              prop="type"
            >
              <el-input
                readonly
                v-model="newFormInline.input"
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
                readonly
                v-model="newFormInline.input"
                :placeholder="t('请输入钱包加扣款回调URL')"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="t('商户等级')" prop="type" required>
          <el-select
            v-model="newFormInline.type"
            filterable
            clearable
            :placeholder="t('请输入商户标签')"
          >
            <el-option label="A" :value="1" />
            <el-option label="B" :value="2" />
            <el-option label="C" :value="3" />
            <el-option label="D" :value="4" />
            <el-option label="E" :value="5" />
          </el-select>
        </el-form-item>
        <div class="mb-2 text-xs">{{ t('地址配置') }}</div>
        <el-form-item class="password" :label="t('IV')" prop="type">
          <el-input v-model="newFormInline.input" />
        </el-form-item>
        <el-form-item class="password" :label="`${t('API')}`" prop="input">
          <el-input
            v-model="newFormInline.input"
            :placeholder="t('请输入API地址')"
          />
        </el-form-item>
        <el-form-item class="password" :label="t('WEB')" prop="type">
          <el-input
            readonly
            v-model="newFormInline.input"
            :placeholder="t('请输入WEB地址')"
          />
        </el-form-item>
        <el-form-item class="password" :label="`${t('H5')}`" prop="input">
          <el-input
            readonly
            v-model="newFormInline.input"
            :placeholder="t('请输入H5地址')"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          class="password key_container"
          :label="t('抽成比例')"
          prop="type"
          required
        >
          <el-input
            readonly
            v-model="newFormInline.input"
            :placeholder="t('请输入抽成比例')"
          />
          <span class="ml-2">%</span>
        </el-form-item>
        <el-form-item
          class="password"
          :label="`${t('计算模式')}:`"
          prop="input"
          required
        >
          <el-select v-model="newFormInline.type" filterable clearable>
            <el-option label="负盈利" :value="1" />
            <el-option label="流水" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item
          class="password"
          :label="t('缴纳周期')"
          prop="type"
          required
        >
          <el-select v-model="newFormInline.type" filterable clearable>
            <el-option label="负盈利" :value="1" />
            <el-option label="流水" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item
          class="password"
          :label="`${t('结算币种')}:`"
          prop="input"
          required
        >
          <el-select v-model="newFormInline.type" filterable clearable>
            <el-option label="人民币" :value="1" />
            <el-option label="USDT" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('备注')">
          <el-input type="textarea" v-model="newFormInline.input" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { formRules } from './utils/rule';
import { FormProps } from './utils/types';
import GoogleDialog from './component/GoogleDialog.vue';
// import type { UploadProps } from 'element-plus';
// import { Plus } from '@element-plus/icons-vue';
import { t } from '@/plugins/i18n';
// import { SPORT_ID_MAP } from '@/utils/maps/sports_map';
// import { useMatchStore } from '@/store/match';
// import { inputRestrictions } from '@/utils/formatNumber';
import { usePublicHooks } from '@/hooks';
import { addDialog } from '@/components/ReDialog';
// import CustomInput from '@/components/Form/CustomInput.vue';

// const matchStore = useMatchStore();
const { switchStyle } = usePublicHooks();
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    status: false,
    input: '',
    type: ''
  })
});

const emits = defineEmits(['reloadTable']);

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

const testChange = () => {};

//- 绑定谷歌验证器
const openResetGoogle = () => {
  addDialog({
    width: '35%',
    draggable: false,
    class: 'google_dialog',
    showClose: false,
    closeOnClickModal: false,
    props: {
      formData: {
        code: ''
      }
    },
    contentRenderer: () => h(GoogleDialog),
    beforeSure: (_done, { options }) => {
      console.log('form.vue文件 315==============行打印=', options);
      // const FormRef = googleRef.value.getRef();
      // const curData = options.props.code;
      // FormRef.validate(async valid => {});
    }
  });
};

function getRef() {
  return ruleFormRef.value;
}
defineExpose({ getRef });
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
</style>
