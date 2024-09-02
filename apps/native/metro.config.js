/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const path = require('path');

const { makeMetroConfig, exclusionList } = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const { FileStore } = require('metro-cache');
const { getMetroAndroidAssetsResolutionFix } = require('react-native-monorepo-tools');

const projectRoot = __dirname;

const getConfig = () => {
  const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

  const config = {
    cacheStores: [
      new FileStore({ root: path.resolve(projectRoot, 'node_modules', '.cache', 'metro') }),
    ],
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: true,
          inlineRequires: false,
        },
      }),
      publicPath: androidAssetsResolutionFix.publicPath,
    },
    resolver: {
      resolveRequest: MetroSymlinksResolver(),
      blockList: exclusionList([
        // 뭔가 안 돌아갈 때 여기 확인 해보기
        /\/apps\/(schema|infra|functions|scripts)\/.*/,
      ]),
    },
    server: {
      enhanceMiddleware: (middleware) => {
        return androidAssetsResolutionFix.applyMiddleware(middleware);
      },
    },
  };
  return config;
};

module.exports = makeMetroConfig(getConfig());
