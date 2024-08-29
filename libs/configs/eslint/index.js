/* eslint-disable @typescript-eslint/no-var-requires */

const config_base = require('./libs/configs/base/base.eslint');
const config_infra = require('./libs/configs/nest/infra.eslint');
const config_nest = require('./libs/configs/nest/nest.eslint');
const config_schema = require('./libs/configs/nest/schema.eslint');
const config_next = require('./libs/configs/react/next.eslint');
const config_reactNative = require('./libs/configs/react/react-native.eslint');
const config_react = require('./libs/configs/react/react.eslint');
const config_web = require('./libs/configs/react/storybook.eslint');

module.exports = {
  configs: {
    base: Object.assign({}, config_base),
    storybook: Object.assign({}, config_web),
    ['react-native']: Object.assign({}, config_reactNative),
    next: Object.assign({}, config_next, {
      plugins: [],
    }),
    react: Object.assign({}, config_react),
    nest: Object.assign({}, config_nest),
    infra: Object.assign({}, config_infra),
    schema: Object.assign({}, config_schema),
  },
};
