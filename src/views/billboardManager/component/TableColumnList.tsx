import { PLAY_MAP } from '@/utils/maps/sports_map';
import { getLan } from '@/utils/utilFn';

const getLangueageRenderData = ([zhContent, enContent]: string[]) => {
  return getLan() === 'zh' ? zhContent : enContent;
};

export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 100
  },
  {
    label: t('公告分类'),
    minWidth: 150,
    formatter: ({ billClassify }): string => {
      return (
        PLAY_MAP.find(item => item.idx === billClassify)?.val[getLan()] ?? '-'
      );
    }
  },
  {
    label: t('公告标题'),
    minWidth: 150,
    formatter: ({ billboardTitleCn, billboardTitleEn }): string => {
      return getLangueageRenderData([billboardTitleCn, billboardTitleEn]);
    }
  },
  {
    label: t('公告类别'),
    minWidth: 150,
    formatter: ({ billboardTypeCn, billboardTypeEn }): string => {
      return getLangueageRenderData([billboardTypeCn, billboardTypeEn]);
    }
  },

  {
    label: t('公告内容'),
    minWidth: 230,
    formatter: ({ billboardContentCn, billboardContentEn }): string => {
      return (
        getLangueageRenderData([billboardContentCn, billboardContentEn]).slice(
          0,
          10
        ) + '...'
      );
    }
  },
  {
    label: t('创建人'),
    minWidth: 150,
    prop: 'createdBy'
  },
  {
    label: t('发送状态'),
    slot: 'status'
  },
  {
    label: t('发送时间'),
    minWidth: 200,
    prop: 'updatedAt'
  },
  {
    label: t('创建时间'),
    minWidth: 200,
    prop: 'createdAt'
  },
  {
    label: t('操作'),
    minWidth: 200,
    slot: 'operation'
  }
];
