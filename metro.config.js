const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      ...defaultResolver,
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...defaultResolver.sourceExts, "svg","cjs"]
    }
  };
})();