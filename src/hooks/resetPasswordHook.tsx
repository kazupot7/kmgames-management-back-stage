import { addDialog, closeDialog } from '@/components/ReDialog';
import ResetDialog from '@/components/ResetDialog/index.vue';

export const useResetPasswordHook = () => {
  const resetFormRef = ref();
  const isDisabled = ref(true);
  const confirmLoading = ref(false);

  const openResetDialog = () => {
    addDialog({
      title: t('重置密码'),
      class: 'reset_dialog',
      width: '25%',
      center: true,
      draggable: true,
      closeOnClickModal: false,
      footerButtons: [
        {
          label: '取消',
          type: 'info',
          btnClick: ({ dialog: { options, index } }) => {
            closeDialog(options, index);
          }
        },
        {
          label: '确认',
          loading: confirmLoading.value,
          type: 'primary',
          disabled: isDisabled.value,
          btnClick: ({ dialog: { options, index } }) => {
            closeDialog(options, index);
          }
        }
      ],
      contentRenderer: () =>
        h(ResetDialog, {
          ref: resetFormRef,
          onChangeDisabledStatus: (_: boolean) => (isDisabled.value = _)
        }),
      beforeSure: (done, { options }) => {
        const formRef = resetFormRef.value.getRef();
        formRef.validate(async valid => {
          if (valid) {
          }
        });
      }
    });
  };

  return { openResetDialog };
};
