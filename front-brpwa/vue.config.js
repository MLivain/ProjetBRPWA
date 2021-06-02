module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxPluginMode: "InjectManifest",
    workbox: {
      swSrc: "dist/service-worker.js"
    }
  }
};
