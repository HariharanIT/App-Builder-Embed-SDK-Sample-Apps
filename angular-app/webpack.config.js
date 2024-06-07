const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  resolve: {
    mainFields: ["es2015", "browser", "module", "main"],
  },
  optimization: {
    runtimeChunk: "single",
    chunkIds: "deterministic",
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    moduleIds: "deterministic",
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    sideEffects: true,
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
