import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import HomeFilled from "@iconify-icons/ep/home-filled";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";
import Crown from "@iconify-icons/ri/vip-crown-2-line";
import StoreFill from "@iconify-icons/ri/store-2-fill";
import FolderFill from "@iconify-icons/ri/folder-2-fill";
import LockUnlockFill from "@iconify-icons/ri/lock-unlock-line";
import LockFill from "@iconify-icons/ri/lock-fill";
import Monitor from "@iconify-icons/ep/monitor";
import Files from "@iconify-icons/ep/files";
import History from "@iconify-icons/ri/history-line";
import OperationLog from "@iconify-icons/icon-park-outline/log";
import icon_circle_fill from '@iconify-icons/ri/add-circle-fill';
import uploadIcon from '@iconify-icons/ri/upload-2-fill';
import cancelIcon from '@iconify-icons/ri/close-circle-fill';
import icon_money from '@iconify-icons/ri/money-cny-box-fill';
import saveIcon from '@iconify-icons/ri/save-3-fill';
import MoneyDollarCircleFill from '@iconify-icons/ri/money-cny-circle-line';
import listUnordered from '@iconify-icons/ri/list-unordered';
import addIcons from '@iconify-icons/ri/add-fill';
import AddFill from '@iconify-icons/ri/add-circle-line';
import deleteBin_5Line from '@iconify-icons/ri/delete-bin-5-line';
import EditPen from '@iconify-icons/ep/edit-pen';
import Delete from '@iconify-icons/ep/delete';
/** //-菜单icon */
import userManager from "@iconify-icons/ri/account-pin-circle-line";
import billboardManager from "@iconify-icons/ri/store-2-fill";
import roleManager from '@iconify-icons/ri/money-cny-circle-line';
import role from "@iconify-icons/ep/monitor";
import virtual from "@iconify-icons/ep/files";
import systemConfig from '@iconify-icons/ri/list-unordered';
import whiteManager from '@iconify-icons/ri/settings-3-line';

// addIcon("billboardManager", billboardManager);
// addIcon("userManager", userManager);
addIcon("tenantManager", role);
// addIcon("roleManager", virtual);
addIcon("virtual", roleManager);
addIcon("history", History);
addIcon("operationLog", OperationLog);
addIcon("systemConfig", systemConfig);
// addIcon("whiteManager", whiteManager);
// addIcon("sysSwitch", whiteManager);
/* 菜单icon结束 */

addIcon("configCenter", whiteManager);
addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);
addIcon("crown", Crown);
addIcon("storeFill", StoreFill);
addIcon("folderFill", FolderFill);
addIcon("monitor", Monitor);
addIcon("files", Files);
addIcon("unlock", LockUnlockFill);
addIcon("lock", LockFill);
addIcon("icon_circle_fill", icon_circle_fill);
addIcon("icon_money", icon_money);
addIcon("uploadIcon", uploadIcon);
addIcon("cancelIcon", cancelIcon);
addIcon("saveIcon", saveIcon);
addIcon("moneyDollarCircleFill", MoneyDollarCircleFill);
addIcon("listUnordered", listUnordered);
addIcon("addIcon", addIcons);
addIcon("addFill", AddFill);
addIcon("editPen", EditPen);
addIcon("deleteBin_5Line", deleteBin_5Line);
addIcon("Delete", Delete);
