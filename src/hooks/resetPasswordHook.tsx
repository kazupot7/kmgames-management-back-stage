import { addDialog, closeDialog } from '@/components/ReDialog';
import ResetDialog from '@/components/ResetDialog/index.vue';

export const useResetPasswordHook = () => {
  const resetFormRef = ref();

  const openResetDialog = () => {
    addDialog({
      title: t('重置密码'),
      class: 'reset_dialog',
      width: '25%',
      center: true,
      closeOnClickModal: false,
      hideFooter: true,
      contentRenderer: ({ options, index }) =>
        h(ResetDialog, {
          ref: resetFormRef,
          onCloseDialog: (_: boolean) => {
            closeDialog(options, index);
          }
        })
    });
  };

  return { openResetDialog };
};
