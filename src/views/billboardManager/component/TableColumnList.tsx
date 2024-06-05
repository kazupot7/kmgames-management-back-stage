import { storageLocal } from '@pureadmin/utils';

interface ILocaleType {
  locale: 'zh' | 'en' | 'fr';
}

const getLangueageRenderData = ([zhContent, enContent]: string[]) => {
  const lan =
    (storageLocal().getItem('responsive-locale') as ILocaleType)?.locale ??
    'zh';
  return lan === 'zh' ? zhContent : enContent;
};

export const columns: TableColumnList = [
  {
    label: t('序号'),
    type: 'index',
    minWidth: 100
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
      return getLangueageRenderData([billboardContentCn, billboardContentEn]);
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
