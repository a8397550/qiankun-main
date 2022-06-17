(function (global) {
  /**
   * 随机uuid
   */
  var uuid = () => {
    var s = [];
    var hexDigits = '0123456789abcdef';
    for (var i = 0; i < 36; i += 1) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    // @ts-ignore
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // eslint-disable-line
    s[8] = s[13] = s[18] = s[23] = '-'; // eslint-disable-line

    return s.join('');
  };

  debugger;

  /**应用名称*/
  var name = 'pad_show';
  /** 去那里拉取js地址 */
  var url = 'http://127.0.0.1:7001';
  /** global.config 对象名称*/
  var configName = '__pad_show_build_config__';
  /** global.config 对象 */
  var BuildConfig;
  /** App 对象，通过global.mount进行页面渲染 */
  var mainBuildName = '__pad_show_build_library__';

  if (document) {
    /** 加入到body中的脚本id */
    var buildConfigName = `${name}_config`;
    if (!document.getElementById(buildConfigName)) {
      var configScript = document.createElement('script');
      configScript.id = buildConfigName;
      // 下载 config.js 获取配置文件信息，会获取到global.config对象
      configScript.src = `${url}/config.js?uuid=${uuid()}`;
      document.head.appendChild(configScript);

      function mountLoop() {
        // @ts-ignore
        var libraryBuild = global[mainBuildName];
        var containerName = BuildConfig.container || 'container';

        if (!libraryBuild || !document.getElementById(containerName)) {
          setTimeout(() => {
            mountLoop();
          }, 100);
          return;
        }

        if (libraryBuild.mount) {
          libraryBuild.mount({
            container: containerName,
            basename: BuildConfig.basename,
            type: BuildConfig.type || 'browser',
          });
        }
      }

      /**
       * 轮询 查看是否获取到config对象，获取到以后，加载main.js, 并进行mountLoop的轮询
       */
      function loop() {
        // @ts-ignore
        BuildConfig = global[configName];
        if (!BuildConfig) {
          setTimeout(() => {
            loop();
          }, 100);
          return;
        }

        var scriptDom = document.createElement('script');
        scriptDom.id = `${name}_main`;
        scriptDom.src = `${url}/main.${BuildConfig.version}.${BuildConfig.hash}.js`;
        document.head.appendChild(scriptDom);

        mountLoop();
      }

      loop();
    }
  }
})(window);
