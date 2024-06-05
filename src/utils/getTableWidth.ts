import { useNav } from "@/layout/hooks/useNav";
import { TableColumnRenderer } from "@pureadmin/table";

export const handleTableWidth = (d: TableColumnRenderer, label: string, type?: 'auto', isOperation?: boolean) => {
  const { $storage } = useNav();
  if ((type && $storage.locale.locale === 'zh') || d.column.width) return label;
  d.column.width = isOperation ? 50 + getColumnWidth(d.column.label) : getColumnWidth(d.column.label);
}

export const getColumnWidth = (strs: string) => {
  const { $storage } = useNav();
  if ($storage.locale.locale === 'zh') {
    return strs.length * 30;
  } else {
    return strs.length * 15;
  }
}