export function useMenuTree() {
  const form = reactive({
    leagueId: '',
    type: '',
    isShow: false,
    txtData: {
      zh: '',
      en: ''
    }
  });

  onMounted(() => {});
  return {
    form
  };
}
