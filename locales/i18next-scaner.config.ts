const fs = require('fs');
const crc32 = require('crc_32_ts').CRC32;

module.exports = {
  input: ['src/**/*.{js,ts,tsx,vue}', '!**/node_modules/**'],
  output: './',
  options: {
    debug: true,
    func: false,
    trans: false,
    lngs: ['zh-CN', 'en', 'fr'],
    defaultLng: 'ZH-CN',
    resource: {
      loadPath: './locales/json/{{lng}}.json',
      savePath: './locales/json/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    removeUnusedKeys: true,
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    parser.parseFuncFromString(content, { list: ['t', 't'] }, (key, options) => {
      options.defaultValue = key;
      // let hashKey = `k${crc32(key).toString(16)}`;
      let hashKey = `k${crc32.str(key).toString(16)}`;
      parser.set(hashKey, options);
    });
    done();
  },
};
