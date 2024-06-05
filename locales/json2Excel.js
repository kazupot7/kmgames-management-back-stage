const json2xls = require("json2xls");
const path = require("path");
const fs = require("fs");
const getPathInfo = (p) => path.parse(p);
/**
 * @description // 递归读取文件，类似于webpack的require.context()
 * @param {String} directory 文件目录
 * @param {Boolean} useSubdirectories 是否查询子目录，默认false
 * @param {array} extList 查询文件后缀，默认 ['.js']
 *
 */
function autoLoadFile (directory, useSubdirectories = false, extList = [".ts", ".yaml"]) {
  const filesList = [];
  function readFileList (directory, useSubdirectories, extList) {
    const files = fs.readdirSync(directory);
    files.forEach((item) => {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && useSubdirectories) {
        readFileList(path.join(directory, item), useSubdirectories, extList);
      } else {
        const info = getPathInfo(fullPath);
        extList.includes(info.ext) && filesList.push(fullPath);
      }
    });
  }
  readFileList(directory, useSubdirectories, extList);
  // 生成需要的对象
  const res = filesList.map((item) => ({
    path: item,
    data: require(item),
    ...getPathInfo(item),
  }));

  return res;
}
// 自动获取同目录下的json文件夹下的json文件
const fileList = autoLoadFile(path.join(__dirname, "./json"), true, [".json"]);

const data = [];
fileList.forEach((_, i) => {
  for (const [key, val] of Object.entries(_.data)) {
    if (i === 0) {
      // 首次遍历新建对应键名
      data.push({ 键名: key, [_.name]: val });
    } else {
      // 非首次遍历匹配对应键名新增数据
      data.forEach((e) => {
        if (e["键名"] === key) {
          e[_.name] = val;
        }
      });
    }
  }
});



// 导出excel文件
fs.writeFileSync(
  "./locales/i18n.xlsx",
  json2xls(data),
  "binary"
);
