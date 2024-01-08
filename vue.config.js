module.exports = {
    // Delete the prefetch plugin
    // chainWebpack: config => {
    //   config.plugins.delete('prefetch')
    // }
    publicPath: process.env.PUBLIC_URL || "/", // <-- this is correct now (and default)
    transpileDependencies: ["vuetify"],
  }
