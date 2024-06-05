import { user } from "./user";
import { metaData } from "./metadata";
import { saleData } from "./sale";
import { sattleData } from "./sattle";
import { virtualData } from "./virtual";
import { esportData } from "./esports";
import { historyData } from "./history";
import { operationLogData } from "./operationLog";
import { esportsSettlement } from "./esportsSettlement";

export const API = {
  ...user,
  ...metaData,
  ...saleData,
  ...sattleData,
  ...virtualData,
  ...esportData,
  ...historyData,
  ...operationLogData,
  ...esportsSettlement
};3
