import { useMatchStore } from "@/store/match";
import { useI18n } from "vue-i18n";

// 解析当前比分
export const parseMatchScore = (s: string) => {
  const match = s.match(/H(\d+)A(\d+)/);
  if (match) {
    const result = {
      H: parseInt(match[1], 10),
      A: parseInt(match[2], 10)
    };
    return result.H + ' : ' + result.A;
  } else {
    return '-';
  }
}

// 国家显示
export const parseCountry = (countryId: number) => {
  const matchStore = useMatchStore();
  const { locale } = useI18n();
  const country = matchStore.countryList.find(_ => _.countryId === countryId);
  if (!country) return '-';
  return (locale.value === 'zh' ? country?.countryNameCn : country?.countryNameEn)
}

/* 
formatter: ({ countryId }) => parseCountry(countryId)
 */