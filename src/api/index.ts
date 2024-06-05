import { user } from "./user";
import { metaData } from "./metadata";
import { saleData } from "./sale";
import { sattleData } from "./sattle";
import { tenantData } from "./tenant";
import { userMangerData } from "./userManger";
import { historyData } from "./history";
import { roleData } from "./role";
import { operationLogData } from "./operationLog";
import { esportsSettlement } from "./esportsSettlement";
import { billboardManagerData } from "./billboardManager";
import { SysTemConfigData } from "./systemConfig";
import { clientManagerData } from "./clientManager";

export const API = {
  ...user,
  ...metaData,
  ...saleData,
  ...sattleData,
  ...tenantData,
  ...userMangerData,
  ...historyData,
  ...operationLogData,
  ...roleData,
  ...esportsSettlement,
  ...billboardManagerData,
  ...SysTemConfigData,
  ...clientManagerData,
}; 3
