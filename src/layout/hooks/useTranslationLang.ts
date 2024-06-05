import { useNav } from "./useNav";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { watch, onBeforeMount, type Ref } from "vue";

export function useTranslationLang(ref?: Ref) {
  const { $storage, changeTitle, handleResize } = useNav();
  const { locale } = useI18n();
  const route = useRoute();

  function translationLanguage(type: string) {
    if (locale.value === type) return
    $storage.locale = { locale: type };
    locale.value = type;
    ref && handleResize(ref.value);
    window.location.reload()
  }
  watch(
    () => locale.value,
    () => {
      changeTitle(route.meta);
    }
  );

  onBeforeMount(() => {
    locale.value = $storage.locale?.locale ?? "zh";
  });

  return {
    route,
    locale,
    translationLanguage,
  };
}
