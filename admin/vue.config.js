module.exports = {
  publicPath: "/",
  transpileDependencies: ["vue-echarts", "resize-detector"],
  devServer: {
    // Hace el dev https ( Para poder usar la camara)
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080, // CHANGE YOUR PORT HERE!
    https: true,
    hotOnly: false
  },
  productionSourceMap: false, // hide source code
};
