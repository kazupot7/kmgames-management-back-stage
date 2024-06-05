
interface FormProps {
  formInline: TenantAPI.createTenantsParamsType;
}
interface WhiteProps {
  formInline: {
    [key: string]: any;
  };
}

export type SearchFormType = {
  name: string;
  tenantCode: string;
  tenantType: string;
  contact: string;
  createdAtStart: string | number;
  createdAtEnd: string | number;
}

export type { FormProps, WhiteProps };
