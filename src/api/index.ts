import { user } from "./user";
import { metaData } from "./metadata";
import { saleData } from "./sale";
import { sattleData } from "./sattle";
import { virtualData } from "./virtual";
import { userMangerData } from "./userManger";
import { historyData } from "./history";
import { roleData } from "./role";
import { operationLogData } from "./operationLog";
import { esportsSettlement } from "./esportsSettlement";
import { billboardManagerData } from "./billboardManager";

export const API = {
  ...user,
  ...metaData,
  ...saleData,
  ...sattleData,
  ...virtualData,
  ...userMangerData,
  ...historyData,
  ...operationLogData,
  ...roleData,
  ...esportsSettlement,
  ...billboardManagerData,
}; 3
