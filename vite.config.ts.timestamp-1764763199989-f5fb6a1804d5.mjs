// vite.config.ts
import path4 from "node:path";
import process4 from "node:process";
import Uni from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/@uni-helper+plugin-uni@0.1.0_@dcloudio+vite-plugin-uni@3.0.0-4070620250821001_postcss@8_a5da5ce589b3baa190af3f29755e9dba/node_modules/@uni-helper/plugin-uni/src/index.js";
import Components from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/@uni-helper+vite-plugin-uni-components@0.2.3_rollup@4.50.0/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import UniLayouts from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/@uni-helper+vite-plugin-uni-layouts@0.1.11_rollup@4.50.0/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniManifest from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/@uni-helper+vite-plugin-uni-manifest@0.2.8_vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1_/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniPages from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/@uni-helper+vite-plugin-uni-pages@0.3.19_vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1_/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import UniPlatform from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/@uni-helper+vite-plugin-uni-platform@0.0.5/node_modules/@uni-helper/vite-plugin-uni-platform/dist/index.mjs";
import Optimization from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/@uni-ku+bundle-optimizer@1.3.15-beta.2_postcss@8.5.6_rollup@4.50.0_vite@5.2.8_@types+no_53b0973a91f876a19b3a499e43ca5442/node_modules/@uni-ku/bundle-optimizer/dist/index.mjs";
import UniKuRoot from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/@uni-ku+root@1.4.1_vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1_/node_modules/@uni-ku/root/dist/index.mjs";
import dayjs from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import { visualizer } from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/rollup-plugin-visualizer@6.0.3_rollup@4.50.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import UnoCSS from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/unocss@66.0.0_postcss@8.5.6_vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1__vue@3.4.21_typescript@5.8.3_/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/unplugin-auto-import@20.1.0/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1/node_modules/vite/dist/node/index.js";
import { createHtmlPlugin } from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1_/node_modules/vite-plugin-html/dist/index.mjs";
import ViteRestart from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/vite-plugin-restart@1.0.0_vite@5.2.8_@types+node@20.19.11_sass@1.77.8_terser@5.43.1_/node_modules/vite-plugin-restart/dist/index.js";

// scripts/open-dev-tools.js
import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
function _openDevTools() {
  const platform = process.platform;
  const { UNI_PLATFORM } = process.env;
  const uniPlatformText = UNI_PLATFORM === "mp-weixin" ? "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F" : UNI_PLATFORM === "mp-alipay" ? "\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F" : "\u5C0F\u7A0B\u5E8F";
  const projectPath = path.resolve(process.cwd(), `dist/dev/${UNI_PLATFORM}`);
  if (!fs.existsSync(projectPath)) {
    console.log(`\u274C ${uniPlatformText}\u6784\u5EFA\u76EE\u5F55\u4E0D\u5B58\u5728:`, projectPath);
    return;
  }
  console.log(`\u{1F680} \u6B63\u5728\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177...`);
  let command = "";
  if (platform === "darwin") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `/Applications/wechatwebdevtools.app/Contents/MacOS/cli -o "${projectPath}"`;
    } else if (UNI_PLATFORM === "mp-alipay") {
      command = `/Applications/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177.app/Contents/MacOS/\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u8005\u5DE5\u5177 --p "${projectPath}"`;
    }
  } else if (platform === "win32" || platform === "win64") {
    if (UNI_PLATFORM === "mp-weixin") {
      command = `"C:\\Program Files (x86)\\Tencent\\\u5FAE\u4FE1web\u5F00\u53D1\u8005\u5DE5\u5177\\cli.bat" -o "${projectPath}"`;
    }
  } else {
    console.log("\u274C \u5F53\u524D\u7CFB\u7EDF\u4E0D\u652F\u6301\u81EA\u52A8\u6253\u5F00\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177");
    return;
  }
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`\u274C \u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5931\u8D25:`, error.message);
      console.log(`\u{1F4A1} \u8BF7\u786E\u4FDD${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u670D\u52A1\u7AEF\u53E3\u5DF2\u542F\u7528`);
      console.log(`\u{1F4A1} \u53EF\u4EE5\u624B\u52A8\u6253\u5F00${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5E76\u5BFC\u5165\u9879\u76EE:`, projectPath);
      return;
    }
    if (stderr) {
      console.log("\u26A0\uFE0F \u8B66\u544A:", stderr);
    }
    console.log(`\u2705 ${uniPlatformText}\u5F00\u53D1\u8005\u5DE5\u5177\u5DF2\u6253\u5F00`);
    if (stdout) {
      console.log(stdout);
    }
  });
}
function openDevTools() {
  let isFirstBuild = true;
  return {
    name: "uni-devtools",
    writeBundle() {
      if (isFirstBuild && process.env.UNI_PLATFORM?.includes("mp")) {
        isFirstBuild = false;
        _openDevTools();
      }
    }
  };
}

// vite-plugins/copy-native-resources.ts
import path2 from "node:path";
import process2 from "node:process";
import fs2 from "file:///Users/xiezhiqi/Documents/web3/ai_project/node_modules/.pnpm/fs-extra@10.1.0/node_modules/fs-extra/lib/index.js";
var DEFAULT_OPTIONS = {
  enable: true,
  sourceDir: "nativeplugins",
  targetDirName: "nativeplugins",
  verbose: true,
  logPrefix: "[copy-native-resources]"
};
function copyNativeResources(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  if (!config.enable) {
    return {
      name: "copy-native-resources-disabled",
      apply: "build",
      writeBundle() {
      }
    };
  }
  return {
    name: "copy-native-resources",
    apply: "build",
    // 只在构建时应用
    enforce: "post",
    // 在其他插件执行完毕后执行
    async writeBundle() {
      const { sourceDir, targetDirName, verbose, logPrefix } = config;
      try {
        const projectRoot = process2.cwd();
        const sourcePath = path2.resolve(projectRoot, sourceDir);
        const buildMode = process2.env.NODE_ENV === "production" ? "build" : "dev";
        const platform = process2.env.UNI_PLATFORM || "app";
        const targetPath = path2.resolve(
          projectRoot,
          "dist",
          buildMode,
          platform,
          targetDirName
        );
        const sourceExists = await fs2.pathExists(sourcePath);
        if (!sourceExists) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u5982\u9700\u4F7F\u7528\u672C\u5730\u539F\u751F\u63D2\u4EF6\uFF0C\u8BF7\u5728\u9879\u76EE\u6839\u76EE\u5F55\u521B\u5EFA nativeplugins \u76EE\u5F55`);
            console.warn(`${logPrefix} \u5E76\u6309\u7167\u5B98\u65B9\u6587\u6863\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
            console.warn(`${logPrefix} \u53C2\u8003: https://uniapp.dcloud.net.cn/plugin/native-plugin.html`);
          }
          return;
        }
        const sourceFiles = await fs2.readdir(sourcePath);
        if (sourceFiles.length === 0) {
          if (verbose) {
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u590D\u5236\u64CD\u4F5C`);
            console.warn(`${logPrefix} \u6E90\u76EE\u5F55\u8DEF\u5F84: ${sourcePath}`);
            console.warn(`${logPrefix} \u8BF7\u5728 nativeplugins \u76EE\u5F55\u4E2D\u653E\u5165\u539F\u751F\u63D2\u4EF6\u6587\u4EF6`);
          }
          return;
        }
        await fs2.ensureDir(targetPath);
        if (verbose) {
          console.log(`${logPrefix} \u5F00\u59CB\u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6...`);
          console.log(`${logPrefix} \u6E90\u76EE\u5F55: ${sourcePath}`);
          console.log(`${logPrefix} \u76EE\u6807\u76EE\u5F55: ${targetPath}`);
          console.log(`${logPrefix} \u6784\u5EFA\u6A21\u5F0F: ${buildMode}`);
          console.log(`${logPrefix} \u76EE\u6807\u5E73\u53F0: ${platform}`);
          console.log(`${logPrefix} \u53D1\u73B0 ${sourceFiles.length} \u4E2A\u539F\u751F\u63D2\u4EF6\u6587\u4EF6/\u76EE\u5F55`);
        }
        await fs2.copy(sourcePath, targetPath, {
          overwrite: true,
          // 覆盖已存在的文件，确保使用最新版本
          errorOnExist: false,
          // 如果目标文件存在不报错
          preserveTimestamps: true
          // 保持文件的时间戳
        });
        if (verbose) {
          console.log(`${logPrefix} \u2705 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u590D\u5236\u5B8C\u6210`);
          console.log(`${logPrefix} \u5DF2\u6210\u529F\u590D\u5236 ${sourceFiles.length} \u4E2A\u6587\u4EF6/\u76EE\u5F55\u5230\u6784\u5EFA\u76EE\u5F55`);
          console.log(`${logPrefix} \u539F\u751F\u63D2\u4EF6\u73B0\u5728\u53EF\u4EE5\u5728 App \u4E2D\u6B63\u5E38\u4F7F\u7528`);
        }
      } catch (error) {
        console.error(`${config.logPrefix} \u274C \u590D\u5236 UniApp \u672C\u5730\u539F\u751F\u63D2\u4EF6\u5931\u8D25:`, error);
        console.error(`${config.logPrefix} \u9519\u8BEF\u8BE6\u60C5:`, error instanceof Error ? error.message : String(error));
        console.error(`${config.logPrefix} \u8BF7\u68C0\u67E5\u6E90\u76EE\u5F55\u6743\u9650\u548C\u78C1\u76D8\u7A7A\u95F4`);
      }
    }
  };
}
function createCopyNativeResourcesPlugin(enable = true, options = {}) {
  return copyNativeResources({ enable, ...options });
}

// vite-plugins/sync-manifest-plugins.ts
import fs3 from "node:fs";
import path3 from "node:path";
import process3 from "node:process";
function syncManifestPlugin() {
  return {
    name: "sync-manifest",
    apply: "build",
    enforce: "post",
    writeBundle: {
      order: "post",
      handler() {
        const srcManifestPath = path3.resolve(process3.cwd(), "./src/manifest.json");
        const distAppPath = path3.resolve(process3.cwd(), "./dist/dev/app/manifest.json");
        try {
          const srcManifest = JSON.parse(fs3.readFileSync(srcManifestPath, "utf8"));
          const distAppDir = path3.dirname(distAppPath);
          if (!fs3.existsSync(distAppDir)) {
            fs3.mkdirSync(distAppDir, { recursive: true });
          }
          let distManifest = {};
          if (fs3.existsSync(distAppPath)) {
            distManifest = JSON.parse(fs3.readFileSync(distAppPath, "utf8"));
          }
          if (srcManifest["app-plus"]?.distribute?.plugins) {
            if (!distManifest.plus)
              distManifest.plus = {};
            if (!distManifest.plus.distribute)
              distManifest.plus.distribute = {};
            distManifest.plus.distribute.plugins = srcManifest["app-plus"].distribute.plugins;
            fs3.writeFileSync(distAppPath, JSON.stringify(distManifest, null, 2));
            console.log("\u2705 Manifest plugins \u540C\u6B65\u6210\u529F");
          }
        } catch (error) {
          console.error("\u274C \u540C\u6B65 manifest plugins \u5931\u8D25:", error);
        }
      }
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig(({ command, mode }) => {
  console.log("command, mode -> ", command, mode);
  const { UNI_PLATFORM } = process4.env;
  console.log("UNI_PLATFORM -> ", UNI_PLATFORM);
  const env = loadEnv(mode, path4.resolve(process4.cwd(), "env"));
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_APP_TITLE,
    VITE_DELETE_CONSOLE,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY_ENABLE,
    VITE_APP_PROXY_PREFIX,
    VITE_COPY_NATIVE_RES_ENABLE
  } = env;
  console.log("\u73AF\u5883\u53D8\u91CF env -> ", env);
  return defineConfig({
    envDir: "./env",
    // 自定义env目录
    base: VITE_APP_PUBLIC_BASE,
    plugins: [
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      UniPages({
        exclude: ["**/components/**/**.*"],
        // pages 目录为 src/pages，分包目录不能配置在pages目录下！！
        // 是个数组，可以配置多个，但是不能为pages里面的目录！！
        subPackages: [
          "src/pages-fg"
          // 这个是相对必要的路由，尽量留着（登录页、注册页、404页等）
        ],
        dts: "src/types/uni-pages.d.ts"
      }),
      // Optimization 插件需要 page.json 文件，故应在 UniPages 插件之后执行
      Optimization({
        enable: {
          "optimization": true,
          "async-import": true,
          "async-component": true
        },
        dts: {
          base: "src/types"
        },
        logger: false
      }),
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false"
          }
        }
      }),
      // UniXXX 需要在 Uni 之前引入
      // 若存在改变 pages.json 的插件，请将 UniKuRoot 放置其后
      UniKuRoot({
        excludePages: ["**/components/**/**.*"]
      }),
      Uni(),
      {
        // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
        // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
        // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
        name: "fix-vite-plugin-vue",
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === "vite:vue");
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false;
          }
        }
      },
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"],
        // 自动导入 hooks
        vueTemplate: true
        // default false
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"]
      }),
      // h5环境增加 BUILD_TIME 和 BUILD_BRANCH
      UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_TIME%", dayjs().format("YYYY-MM-DD HH:mm:ss")).replace("%VITE_APP_TITLE%", VITE_APP_TITLE);
        }
      },
      // 打包分析插件，h5 + 生产环境才弹出
      UNI_PLATFORM === "h5" && mode === "production" && visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
      // 原生插件资源复制插件 - 仅在 app 平台且启用时生效
      createCopyNativeResourcesPlugin(
        UNI_PLATFORM === "app" && VITE_COPY_NATIVE_RES_ENABLE === "true",
        {
          verbose: mode === "development"
          // 开发模式显示详细日志
        }
      ),
      syncManifestPlugin(),
      Components({
        extensions: ["vue"],
        deep: true,
        // 是否递归扫描子目录，
        directoryAsNamespace: false,
        // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: "src/types/components.d.ts"
        // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
      }),
      // 自动打开开发者工具插件 (必须修改 .env 文件中的 VITE_WX_APPID)
      openDevTools()
    ],
    define: {
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY_ENABLE)
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ]
      }
    },
    resolve: {
      alias: {
        "@": path4.join(process4.cwd(), "./src"),
        "@img": path4.join(process4.cwd(), "./src/static/images")
      }
    },
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY_ENABLE) ? {
        [VITE_APP_PROXY_PREFIX]: {
          target: VITE_SERVER_BASEURL,
          changeOrigin: true,
          // 后端有/api前缀则不做处理，没有则需要去掉
          rewrite: (path5) => path5.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), "")
        }
      } : void 0
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === "true" ? ["console", "debugger"] : []
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: "es6",
      // 开发环境不用压缩
      minify: mode === "development" ? false : "esbuild"
    }
  });
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9vcGVuLWRldi10b29scy5qcyIsICJ2aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzLnRzIiwgInZpdGUtcGx1Z2lucy9zeW5jLW1hbmlmZXN0LXBsdWdpbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveGllemhpcWkvRG9jdW1lbnRzL3dlYjMvYWlfcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3hpZXpoaXFpL0RvY3VtZW50cy93ZWIzL2FpX3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3hpZXpoaXFpL0RvY3VtZW50cy93ZWIzL2FpX3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgVW5pIGZyb20gJ0B1bmktaGVscGVyL3BsdWdpbi11bmknXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktY29tcG9uZW50cydcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbGF5b3V0c1xuaW1wb3J0IFVuaUxheW91dHMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLWxheW91dHMnXG5cbi8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3VuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLW1hbmlmZXN0XG5pbXBvcnQgVW5pTWFuaWZlc3QgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLW1hbmlmZXN0J1xuLy8gQHNlZSBodHRwczovL3VuaS1oZWxwZXIuanMub3JnL3ZpdGUtcGx1Z2luLXVuaS1wYWdlc1xuaW1wb3J0IFVuaVBhZ2VzIGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wYWdlcydcbi8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3VuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBsYXRmb3JtXG4vLyBcdTk3MDBcdTg5ODFcdTRFMEUgQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLXBhZ2VzIFx1NjNEMlx1NEVGNlx1NEUwMFx1OEQ3N1x1NEY3Rlx1NzUyOFxuaW1wb3J0IFVuaVBsYXRmb3JtIGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wbGF0Zm9ybSdcbi8qKlxuICogXHU1MjA2XHU1MzA1XHU0RjE4XHU1MzE2XHUzMDAxXHU2QTIxXHU1NzU3XHU1RjAyXHU2QjY1XHU4REU4XHU1MzA1XHU4QzAzXHU3NTI4XHUzMDAxXHU3RUM0XHU0RUY2XHU1RjAyXHU2QjY1XHU4REU4XHU1MzA1XHU1RjE1XHU3NTI4XG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmkta3UvYnVuZGxlLW9wdGltaXplclxuICovXG5pbXBvcnQgT3B0aW1pemF0aW9uIGZyb20gJ0B1bmkta3UvYnVuZGxlLW9wdGltaXplcidcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS91bmkta3Uvcm9vdFxuaW1wb3J0IFVuaUt1Um9vdCBmcm9tICdAdW5pLWt1L3Jvb3QnXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXG5pbXBvcnQgVml0ZVJlc3RhcnQgZnJvbSAndml0ZS1wbHVnaW4tcmVzdGFydCdcbmltcG9ydCBvcGVuRGV2VG9vbHMgZnJvbSAnLi9zY3JpcHRzL29wZW4tZGV2LXRvb2xzJ1xuaW1wb3J0IHsgY3JlYXRlQ29weU5hdGl2ZVJlc291cmNlc1BsdWdpbiB9IGZyb20gJy4vdml0ZS1wbHVnaW5zL2NvcHktbmF0aXZlLXJlc291cmNlcydcbmltcG9ydCBzeW5jTWFuaWZlc3RQbHVnaW4gZnJvbSAnLi92aXRlLXBsdWdpbnMvc3luYy1tYW5pZmVzdC1wbHVnaW5zJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICAvLyBAc2VlIGh0dHBzOi8vdW5vY3NzLmRldi9cbiAgLy8gY29uc3QgVW5vQ1NTID0gKGF3YWl0IGltcG9ydCgndW5vY3NzL3ZpdGUnKSkuZGVmYXVsdFxuICAvLyBjb25zb2xlLmxvZyhtb2RlID09PSBwcm9jZXNzLmVudi5OT0RFX0VOVikgLy8gdHJ1ZVxuXG4gIC8vIG1vZGU6IFx1NTMzQVx1NTIwNlx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1OEZEOFx1NjYyRlx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1xuICBjb25zb2xlLmxvZygnY29tbWFuZCwgbW9kZSAtPiAnLCBjb21tYW5kLCBtb2RlKVxuICAvLyBwbnBtIGRldjpoNSBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gc2VydmUgZGV2ZWxvcG1lbnRcbiAgLy8gcG5wbSBidWlsZDpoNSBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxuICAvLyBwbnBtIGRldjptcC13ZWl4aW4gXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIGRldmVsb3BtZW50IChcdTZDRThcdTYxMEZcdTUzM0FcdTUyMkJcdUZGMENjb21tYW5kXHU0RTNBYnVpbGQpXG4gIC8vIHBucG0gYnVpbGQ6bXAtd2VpeGluIFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBidWlsZCBwcm9kdWN0aW9uXG4gIC8vIHBucG0gZGV2OmFwcCBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgZGV2ZWxvcG1lbnQgKFx1NkNFOFx1NjEwRlx1NTMzQVx1NTIyQlx1RkYwQ2NvbW1hbmRcdTRFM0FidWlsZClcbiAgLy8gcG5wbSBidWlsZDphcHAgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIHByb2R1Y3Rpb25cbiAgLy8gZGV2IFx1NTQ4QyBidWlsZCBcdTU0N0RcdTRFRTRcdTUzRUZcdTRFRTVcdTUyMDZcdTUyMkJcdTRGN0ZcdTc1MjggLmVudi5kZXZlbG9wbWVudCBcdTU0OEMgLmVudi5wcm9kdWN0aW9uIFx1NzY4NFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlxuXG4gIGNvbnN0IHsgVU5JX1BMQVRGT1JNIH0gPSBwcm9jZXNzLmVudlxuICBjb25zb2xlLmxvZygnVU5JX1BMQVRGT1JNIC0+ICcsIFVOSV9QTEFURk9STSkgLy8gXHU1Rjk3XHU1MjMwIG1wLXdlaXhpbiwgaDUsIGFwcCBcdTdCNDlcblxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnZW52JykpXG4gIGNvbnN0IHtcbiAgICBWSVRFX0FQUF9QT1JULFxuICAgIFZJVEVfU0VSVkVSX0JBU0VVUkwsXG4gICAgVklURV9BUFBfVElUTEUsXG4gICAgVklURV9ERUxFVEVfQ09OU09MRSxcbiAgICBWSVRFX0FQUF9QVUJMSUNfQkFTRSxcbiAgICBWSVRFX0FQUF9QUk9YWV9FTkFCTEUsXG4gICAgVklURV9BUFBfUFJPWFlfUFJFRklYLFxuICAgIFZJVEVfQ09QWV9OQVRJVkVfUkVTX0VOQUJMRSxcbiAgfSA9IGVudlxuICBjb25zb2xlLmxvZygnXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGIGVudiAtPiAnLCBlbnYpXG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgZW52RGlyOiAnLi9lbnYnLCAvLyBcdTgxRUFcdTVCOUFcdTRFNDllbnZcdTc2RUVcdTVGNTVcbiAgICBiYXNlOiBWSVRFX0FQUF9QVUJMSUNfQkFTRSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBVbmlMYXlvdXRzKCksXG4gICAgICBVbmlQbGF0Zm9ybSgpLFxuICAgICAgVW5pTWFuaWZlc3QoKSxcbiAgICAgIFVuaVBhZ2VzKHtcbiAgICAgICAgZXhjbHVkZTogWycqKi9jb21wb25lbnRzLyoqLyoqLionXSxcbiAgICAgICAgLy8gcGFnZXMgXHU3NkVFXHU1RjU1XHU0RTNBIHNyYy9wYWdlc1x1RkYwQ1x1NTIwNlx1NTMwNVx1NzZFRVx1NUY1NVx1NEUwRFx1ODBGRFx1OTE0RFx1N0Y2RVx1NTcyOHBhZ2VzXHU3NkVFXHU1RjU1XHU0RTBCXHVGRjAxXHVGRjAxXG4gICAgICAgIC8vIFx1NjYyRlx1NEUyQVx1NjU3MFx1N0VDNFx1RkYwQ1x1NTNFRlx1NEVFNVx1OTE0RFx1N0Y2RVx1NTkxQVx1NEUyQVx1RkYwQ1x1NEY0Nlx1NjYyRlx1NEUwRFx1ODBGRFx1NEUzQXBhZ2VzXHU5MUNDXHU5NzYyXHU3Njg0XHU3NkVFXHU1RjU1XHVGRjAxXHVGRjAxXG4gICAgICAgIHN1YlBhY2thZ2VzOiBbXG4gICAgICAgICAgJ3NyYy9wYWdlcy1mZycsIC8vIFx1OEZEOVx1NEUyQVx1NjYyRlx1NzZGOFx1NUJGOVx1NUZDNVx1ODk4MVx1NzY4NFx1OERFRlx1NzUzMVx1RkYwQ1x1NUMzRFx1OTFDRlx1NzU1OVx1Nzc0MFx1RkYwOFx1NzY3Qlx1NUY1NVx1OTg3NVx1MzAwMVx1NkNFOFx1NTE4Q1x1OTg3NVx1MzAwMTQwNFx1OTg3NVx1N0I0OVx1RkYwOVxuICAgICAgICBdLFxuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvdW5pLXBhZ2VzLmQudHMnLFxuICAgICAgfSksXG4gICAgICAvLyBPcHRpbWl6YXRpb24gXHU2M0QyXHU0RUY2XHU5NzAwXHU4OTgxIHBhZ2UuanNvbiBcdTY1ODdcdTRFRjZcdUZGMENcdTY1NDVcdTVFOTRcdTU3MjggVW5pUGFnZXMgXHU2M0QyXHU0RUY2XHU0RTRCXHU1NDBFXHU2MjY3XHU4ODRDXG4gICAgICBPcHRpbWl6YXRpb24oe1xuICAgICAgICBlbmFibGU6IHtcbiAgICAgICAgICAnb3B0aW1pemF0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAnYXN5bmMtaW1wb3J0JzogdHJ1ZSxcbiAgICAgICAgICAnYXN5bmMtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZHRzOiB7XG4gICAgICAgICAgYmFzZTogJ3NyYy90eXBlcycsXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ2dlcjogZmFsc2UsXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgICBpbmplY3Q6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBFTkFCTEVfRVJVREE6IGVudi5WSVRFX0VOQUJMRV9FUlVEQSB8fCAnZmFsc2UnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIC8vIFVuaVhYWCBcdTk3MDBcdTg5ODFcdTU3MjggVW5pIFx1NEU0Qlx1NTI0RFx1NUYxNVx1NTE2NVxuICAgICAgLy8gXHU4MkU1XHU1QjU4XHU1NzI4XHU2NTM5XHU1M0Q4IHBhZ2VzLmpzb24gXHU3Njg0XHU2M0QyXHU0RUY2XHVGRjBDXHU4QkY3XHU1QzA2IFVuaUt1Um9vdCBcdTY1M0VcdTdGNkVcdTUxNzZcdTU0MEVcbiAgICAgIFVuaUt1Um9vdCh7XG4gICAgICAgIGV4Y2x1ZGVQYWdlczogWycqKi9jb21wb25lbnRzLyoqLyoqLionXSxcbiAgICAgIH0pLFxuICAgICAgVW5pKCksXG4gICAgICB7XG4gICAgICAgIC8vIFx1NEUzNFx1NjVGNlx1ODlFM1x1NTFCMyBkY2xvdWRpbyBcdTVCOThcdTY1QjlcdTc2ODQgQGRjbG91ZGlvL3VuaS1tcC1jb21waWxlciBcdTUxRkFcdTczQjBcdTc2ODRcdTdGMTZcdThCRDEgQlVHXG4gICAgICAgIC8vIFx1NTNDMlx1ODAwMyBnaXRodWIgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY2xvdWRpby91bmktYXBwL2lzc3Vlcy80OTUyXG4gICAgICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NEVGNlx1Nzk4MVx1NzUyOCB2aXRlOnZ1ZSBcdTYzRDJcdTRFRjZcdTc2ODQgZGV2VG9vbHNFbmFibGVkXHVGRjBDXHU1RjNBXHU1MjM2XHU3RjE2XHU4QkQxIHZ1ZSBcdTZBMjFcdTY3N0ZcdTY1RjYgaW5saW5lIFx1NEUzQSB0cnVlXG4gICAgICAgIG5hbWU6ICdmaXgtdml0ZS1wbHVnaW4tdnVlJyxcbiAgICAgICAgY29uZmlnUmVzb2x2ZWQoY29uZmlnKSB7XG4gICAgICAgICAgY29uc3QgcGx1Z2luID0gY29uZmlnLnBsdWdpbnMuZmluZChwID0+IHAubmFtZSA9PT0gJ3ZpdGU6dnVlJylcbiAgICAgICAgICBpZiAocGx1Z2luICYmIHBsdWdpbi5hcGkgJiYgcGx1Z2luLmFwaS5vcHRpb25zKSB7XG4gICAgICAgICAgICBwbHVnaW4uYXBpLm9wdGlvbnMuZGV2VG9vbHNFbmFibGVkID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgVW5vQ1NTKCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndW5pLWFwcCddLFxuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnQuZC50cycsXG4gICAgICAgIGRpcnM6IFsnc3JjL2hvb2tzJ10sIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBob29rc1xuICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSwgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgfSksXG4gICAgICBWaXRlUmVzdGFydCh7XG4gICAgICAgIC8vIFx1OTAxQVx1OEZDN1x1OEZEOVx1NEUyQVx1NjNEMlx1NEVGNlx1RkYwQ1x1NTcyOFx1NEZFRVx1NjUzOXZpdGUuY29uZmlnLmpzXHU2NTg3XHU0RUY2XHU1MjE5XHU0RTBEXHU5NzAwXHU4OTgxXHU5MUNEXHU2NUIwXHU4RkQwXHU4ODRDXHU0RTVGXHU3NTFGXHU2NTQ4XHU5MTREXHU3RjZFXG4gICAgICAgIHJlc3RhcnQ6IFsndml0ZS5jb25maWcuanMnXSxcbiAgICAgIH0pLFxuICAgICAgLy8gaDVcdTczQUZcdTU4ODNcdTU4OUVcdTUyQTAgQlVJTERfVElNRSBcdTU0OEMgQlVJTERfQlJBTkNIXG4gICAgICBVTklfUExBVEZPUk0gPT09ICdoNScgJiYge1xuICAgICAgICBuYW1lOiAnaHRtbC10cmFuc2Zvcm0nLFxuICAgICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCkge1xuICAgICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoJyVCVUlMRF9USU1FJScsIGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykpLnJlcGxhY2UoJyVWSVRFX0FQUF9USVRMRSUnLCBWSVRFX0FQUF9USVRMRSlcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBcdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcdTYzRDJcdTRFRjZcdUZGMENoNSArIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NjI0RFx1NUYzOVx1NTFGQVxuICAgICAgVU5JX1BMQVRGT1JNID09PSAnaDUnXG4gICAgICAmJiBtb2RlID09PSAncHJvZHVjdGlvbidcbiAgICAgICYmIHZpc3VhbGl6ZXIoe1xuICAgICAgICBmaWxlbmFtZTogJy4vbm9kZV9tb2R1bGVzLy5jYWNoZS92aXN1YWxpemVyL3N0YXRzLmh0bWwnLFxuICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgLy8gXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU4RDQ0XHU2RTkwXHU1OTBEXHU1MjM2XHU2M0QyXHU0RUY2IC0gXHU0RUM1XHU1NzI4IGFwcCBcdTVFNzNcdTUzRjBcdTRFMTRcdTU0MkZcdTc1MjhcdTY1RjZcdTc1MUZcdTY1NDhcbiAgICAgIGNyZWF0ZUNvcHlOYXRpdmVSZXNvdXJjZXNQbHVnaW4oXG4gICAgICAgIFVOSV9QTEFURk9STSA9PT0gJ2FwcCcgJiYgVklURV9DT1BZX05BVElWRV9SRVNfRU5BQkxFID09PSAndHJ1ZScsXG4gICAgICAgIHtcbiAgICAgICAgICB2ZXJib3NlOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnLCAvLyBcdTVGMDBcdTUzRDFcdTZBMjFcdTVGMEZcdTY2M0VcdTc5M0FcdThCRTZcdTdFQzZcdTY1RTVcdTVGRDdcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgICBzeW5jTWFuaWZlc3RQbHVnaW4oKSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxuICAgICAgICBkZWVwOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTkwMTJcdTVGNTJcdTYyNkJcdTYzQ0ZcdTVCNTBcdTc2RUVcdTVGNTVcdUZGMENcbiAgICAgICAgZGlyZWN0b3J5QXNOYW1lc3BhY2U6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTYyOEFcdTc2RUVcdTVGNTVcdTU0MERcdTRGNUNcdTRFM0FcdTU0N0RcdTU0MERcdTdBN0FcdTk1RjRcdTUyNERcdTdGMDBcdUZGMEN0cnVlIFx1NjVGNlx1N0VDNFx1NEVGNlx1NTQwRFx1NEUzQSBcdTc2RUVcdTVGNTVcdTU0MEQrXHU3RUM0XHU0RUY2XHU1NDBEXHVGRjBDXG4gICAgICAgIGR0czogJ3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLCAvLyBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTc2ODRcdTdFQzRcdTRFRjZcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcdUZGMDhcdTc1MjhcdTRFOEUgVHlwZVNjcmlwdCBcdTY1MkZcdTYzMDFcdUZGMDlcbiAgICAgIH0pLFxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU2M0QyXHU0RUY2IChcdTVGQzVcdTk4N0JcdTRGRUVcdTY1MzkgLmVudiBcdTY1ODdcdTRFRjZcdTRFMkRcdTc2ODQgVklURV9XWF9BUFBJRClcbiAgICAgIG9wZW5EZXZUb29scygpLFxuICAgIF0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX1ZJVEVfQVBQX1BST1hZX186IEpTT04uc3RyaW5naWZ5KFZJVEVfQVBQX1BST1hZX0VOQUJMRSksXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIC8vIGF1dG9wcmVmaXhlcih7XG4gICAgICAgICAgLy8gICAvLyBcdTYzMDdcdTVCOUFcdTc2RUVcdTY4MDdcdTZENEZcdTg5QzhcdTU2NjhcbiAgICAgICAgICAvLyAgIG92ZXJyaWRlQnJvd3NlcnNsaXN0OiBbJz4gMSUnLCAnbGFzdCAyIHZlcnNpb25zJ10sXG4gICAgICAgICAgLy8gfSksXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnLi9zcmMnKSxcbiAgICAgICAgJ0BpbWcnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJy4vc3JjL3N0YXRpYy9pbWFnZXMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgIGhtcjogdHJ1ZSxcbiAgICAgIHBvcnQ6IE51bWJlci5wYXJzZUludChWSVRFX0FQUF9QT1JULCAxMCksXG4gICAgICAvLyBcdTRFQzUgSDUgXHU3QUVGXHU3NTFGXHU2NTQ4XHVGRjBDXHU1MTc2XHU0RUQ2XHU3QUVGXHU0RTBEXHU3NTFGXHU2NTQ4XHVGRjA4XHU1MTc2XHU0RUQ2XHU3QUVGXHU4RDcwYnVpbGRcdUZGMENcdTRFMERcdThENzBkZXZTZXJ2ZXIpXG4gICAgICBwcm94eTogSlNPTi5wYXJzZShWSVRFX0FQUF9QUk9YWV9FTkFCTEUpXG4gICAgICAgID8ge1xuICAgICAgICAgICAgW1ZJVEVfQVBQX1BST1hZX1BSRUZJWF06IHtcbiAgICAgICAgICAgICAgdGFyZ2V0OiBWSVRFX1NFUlZFUl9CQVNFVVJMLFxuICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICAgIC8vIFx1NTQwRVx1N0FFRlx1NjcwOS9hcGlcdTUyNERcdTdGMDBcdTUyMTlcdTRFMERcdTUwNUFcdTU5MDRcdTc0MDZcdUZGMENcdTZDQTFcdTY3MDlcdTUyMTlcdTk3MDBcdTg5ODFcdTUzQkJcdTYzODlcbiAgICAgICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7VklURV9BUFBfUFJPWFlfUFJFRklYfWApLCAnJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgfSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICBkcm9wOiBWSVRFX0RFTEVURV9DT05TT0xFID09PSAndHJ1ZScgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICAvLyBcdTY1QjlcdTRGQkZcdTk3NUVoNVx1N0FFRlx1OEMwM1x1OEJENVxuICAgICAgLy8gc291cmNlbWFwOiBWSVRFX1NIT1dfU09VUkNFTUFQID09PSAndHJ1ZScsIC8vIFx1OUVEOFx1OEJBNFx1NjYyRmZhbHNlXG4gICAgICB0YXJnZXQ6ICdlczYnLFxuICAgICAgLy8gXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTBEXHU3NTI4XHU1MzhCXHU3RjI5XG4gICAgICBtaW5pZnk6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcgPyBmYWxzZSA6ICdlc2J1aWxkJyxcbiAgICB9LFxuICB9KVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3hpZXpoaXFpL0RvY3VtZW50cy93ZWIzL2FpX3Byb2plY3Qvc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3hpZXpoaXFpL0RvY3VtZW50cy93ZWIzL2FpX3Byb2plY3Qvc2NyaXB0cy9vcGVuLWRldi10b29scy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveGllemhpcWkvRG9jdW1lbnRzL3dlYjMvYWlfcHJvamVjdC9zY3JpcHRzL29wZW4tZGV2LXRvb2xzLmpzXCI7aW1wb3J0IHsgZXhlYyB9IGZyb20gJ25vZGU6Y2hpbGRfcHJvY2VzcydcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xuXG4vKipcbiAqIFx1NjI1M1x1NUYwMFx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3N1xuICovXG5mdW5jdGlvbiBfb3BlbkRldlRvb2xzKCkge1xuICBjb25zdCBwbGF0Zm9ybSA9IHByb2Nlc3MucGxhdGZvcm0gLy8gZGFyd2luLCB3aW4zMiwgbGludXhcbiAgY29uc3QgeyBVTklfUExBVEZPUk0gfSA9IHByb2Nlc3MuZW52IC8vICBtcC13ZWl4aW4sIG1wLWFsaXBheVxuXG4gIGNvbnN0IHVuaVBsYXRmb3JtVGV4dCA9IFVOSV9QTEFURk9STSA9PT0gJ21wLXdlaXhpbicgPyAnXHU1RkFFXHU0RkUxXHU1QzBGXHU3QTBCXHU1RThGJyA6IFVOSV9QTEFURk9STSA9PT0gJ21wLWFsaXBheScgPyAnXHU2NTJGXHU0RUQ4XHU1QjlEXHU1QzBGXHU3QTBCXHU1RThGJyA6ICdcdTVDMEZcdTdBMEJcdTVFOEYnXG5cbiAgLy8gXHU5ODc5XHU3NkVFXHU4REVGXHU1Rjg0XHVGRjA4XHU2Nzg0XHU1RUZBXHU4RjkzXHU1MUZBXHU3NkVFXHU1RjU1XHVGRjA5XG4gIGNvbnN0IHByb2plY3RQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGBkaXN0L2Rldi8ke1VOSV9QTEFURk9STX1gKVxuXG4gIC8vIFx1NjhDMFx1NjdFNVx1Njc4NFx1NUVGQVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVx1NjYyRlx1NTQyNlx1NUI1OFx1NTcyOFxuICBpZiAoIWZzLmV4aXN0c1N5bmMocHJvamVjdFBhdGgpKSB7XG4gICAgY29uc29sZS5sb2coYFx1Mjc0QyAke3VuaVBsYXRmb3JtVGV4dH1cdTY3ODRcdTVFRkFcdTc2RUVcdTVGNTVcdTRFMERcdTVCNThcdTU3Mjg6YCwgcHJvamVjdFBhdGgpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zb2xlLmxvZyhgXHVEODNEXHVERTgwIFx1NkI2M1x1NTcyOFx1NjI1M1x1NUYwMCR7dW5pUGxhdGZvcm1UZXh0fVx1NUYwMFx1NTNEMVx1ODAwNVx1NURFNVx1NTE3Ny4uLmApXG5cbiAgLy8gXHU2ODM5XHU2MzZFXHU0RTBEXHU1NDBDXHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGXHU2MjY3XHU4ODRDXHU0RTBEXHU1NDBDXHU1NDdEXHU0RUU0XG4gIGxldCBjb21tYW5kID0gJydcblxuICBpZiAocGxhdGZvcm0gPT09ICdkYXJ3aW4nKSB7XG4gICAgLy8gbWFjT1NcbiAgICBpZiAoVU5JX1BMQVRGT1JNID09PSAnbXAtd2VpeGluJykge1xuICAgICAgY29tbWFuZCA9IGAvQXBwbGljYXRpb25zL3dlY2hhdHdlYmRldnRvb2xzLmFwcC9Db250ZW50cy9NYWNPUy9jbGkgLW8gXCIke3Byb2plY3RQYXRofVwiYFxuICAgIH1cbiAgICBlbHNlIGlmIChVTklfUExBVEZPUk0gPT09ICdtcC1hbGlwYXknKSB7XG4gICAgICBjb21tYW5kID0gYC9BcHBsaWNhdGlvbnMvXHU1QzBGXHU3QTBCXHU1RThGXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3LmFwcC9Db250ZW50cy9NYWNPUy9cdTVDMEZcdTdBMEJcdTVFOEZcdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzcgLS1wIFwiJHtwcm9qZWN0UGF0aH1cImBcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAocGxhdGZvcm0gPT09ICd3aW4zMicgfHwgcGxhdGZvcm0gPT09ICd3aW42NCcpIHtcbiAgICAvLyBXaW5kb3dzXG4gICAgaWYgKFVOSV9QTEFURk9STSA9PT0gJ21wLXdlaXhpbicpIHtcbiAgICAgIGNvbW1hbmQgPSBgXCJDOlxcXFxQcm9ncmFtIEZpbGVzICh4ODYpXFxcXFRlbmNlbnRcXFxcXHU1RkFFXHU0RkUxd2ViXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XFxcXGNsaS5iYXRcIiAtbyBcIiR7cHJvamVjdFBhdGh9XCJgXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIExpbnV4IFx1NjIxNlx1NTE3Nlx1NEVENlx1N0NGQlx1N0VERlxuICAgIGNvbnNvbGUubG9nKCdcdTI3NEMgXHU1RjUzXHU1MjREXHU3Q0ZCXHU3RURGXHU0RTBEXHU2NTJGXHU2MzAxXHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU1RkFFXHU0RkUxXHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3JylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGV4ZWMoY29tbWFuZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coYFx1Mjc0QyBcdTYyNTNcdTVGMDAke3VuaVBsYXRmb3JtVGV4dH1cdTVGMDBcdTUzRDFcdTgwMDVcdTVERTVcdTUxNzdcdTU5MzFcdThEMjU6YCwgZXJyb3IubWVzc2FnZSlcbiAgICAgIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURDQTEgXHU4QkY3XHU3ODZFXHU0RkREJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU2NzBEXHU1MkExXHU3QUVGXHU1M0UzXHU1REYyXHU1NDJGXHU3NTI4YClcbiAgICAgIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURDQTEgXHU1M0VGXHU0RUU1XHU2MjRCXHU1MkE4XHU2MjUzXHU1RjAwJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU1RTc2XHU1QkZDXHU1MTY1XHU5ODc5XHU3NkVFOmAsIHByb2plY3RQYXRoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHN0ZGVycikge1xuICAgICAgY29uc29sZS5sb2coJ1x1MjZBMFx1RkUwRiBcdThCNjZcdTU0NEE6Jywgc3RkZXJyKVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGBcdTI3MDUgJHt1bmlQbGF0Zm9ybVRleHR9XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU1REYyXHU2MjUzXHU1RjAwYClcblxuICAgIGlmIChzdGRvdXQpIHtcbiAgICAgIGNvbnNvbGUubG9nKHN0ZG91dClcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9wZW5EZXZUb29scygpIHtcbiAgLy8gXHU5OTk2XHU2QjIxXHU2Nzg0XHU1RUZBXHU2ODA3XHU4QkIwXG4gIGxldCBpc0ZpcnN0QnVpbGQgPSB0cnVlXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndW5pLWRldnRvb2xzJyxcbiAgICB3cml0ZUJ1bmRsZSgpIHtcbiAgICAgIGlmIChpc0ZpcnN0QnVpbGQgJiYgcHJvY2Vzcy5lbnYuVU5JX1BMQVRGT1JNPy5pbmNsdWRlcygnbXAnKSkge1xuICAgICAgICBpc0ZpcnN0QnVpbGQgPSBmYWxzZVxuICAgICAgICBfb3BlbkRldlRvb2xzKClcbiAgICAgIH1cbiAgICB9LFxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy94aWV6aGlxaS9Eb2N1bWVudHMvd2ViMy9haV9wcm9qZWN0L3ZpdGUtcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3hpZXpoaXFpL0RvY3VtZW50cy93ZWIzL2FpX3Byb2plY3Qvdml0ZS1wbHVnaW5zL2NvcHktbmF0aXZlLXJlc291cmNlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveGllemhpcWkvRG9jdW1lbnRzL3dlYjMvYWlfcHJvamVjdC92aXRlLXBsdWdpbnMvY29weS1uYXRpdmUtcmVzb3VyY2VzLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJ1xuXG4vKipcbiAqIFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1OEQ0NFx1NkU5MFx1NTkwRFx1NTIzNlx1OTE0RFx1N0Y2RVx1NjNBNVx1NTNFM1xuICpcbiAqIFx1NjgzOVx1NjM2RSBVbmlBcHAgXHU1Qjk4XHU2NUI5XHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly91bmlhcHAuZGNsb3VkLm5ldC5jbi9wbHVnaW4vbmF0aXZlLXBsdWdpbi5odG1sIyVFNiU5QyVBQyVFNSU5QyVCMCVFNiU4RiU5MiVFNCVCQiVCNi0lRTklOUQlOUUlRTUlODYlODUlRTclQkQlQUUlRTUlOEUlOUYlRTclOTQlOUYlRTYlOEYlOTIlRTQlQkIlQjZcbiAqIFx1NjcyQ1x1NTczMFx1NjNEMlx1NEVGNlx1NUU5NFx1OEJFNVx1NUI1OFx1NTBBOFx1NTcyOFx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NzY4NCBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1NEUwQlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvcHlOYXRpdmVSZXNvdXJjZXNPcHRpb25zIHtcbiAgLyoqIFx1NjYyRlx1NTQyNlx1NTQyRlx1NzUyOFx1NjNEMlx1NEVGNiAqL1xuICBlbmFibGU/OiBib29sZWFuXG4gIC8qKlxuICAgKiBcdTZFOTBcdTc2RUVcdTVGNTVcdThERUZcdTVGODRcdUZGMENcdTc2RjhcdTVCRjlcdTRFOEVcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcbiAgICogXHU5RUQ4XHU4QkE0XHU0RTNBICduYXRpdmVwbHVnaW5zJ1x1RkYwQ1x1N0IyNlx1NTQwOCBVbmlBcHAgXHU1Qjk4XHU2NUI5XHU4OUM0XHU4MzAzXG4gICAqIEBzZWUgaHR0cHM6Ly91bmlhcHAuZGNsb3VkLm5ldC5jbi9wbHVnaW4vbmF0aXZlLXBsdWdpbi5odG1sIyVFNiU5QyVBQyVFNSU5QyVCMCVFNiU4RiU5MiVFNCVCQiVCNi0lRTklOUQlOUUlRTUlODYlODUlRTclQkQlQUUlRTUlOEUlOUYlRTclOTQlOUYlRTYlOEYlOTIlRTQlQkIlQjZcbiAgICovXG4gIHNvdXJjZURpcj86IHN0cmluZ1xuICAvKipcbiAgICogXHU3NkVFXHU2ODA3XHU3NkVFXHU1RjU1XHU1NDBEXHU3OUYwXHVGRjBDXHU2Nzg0XHU1RUZBXHU1NDBFXHU1NzI4IGRpc3QgXHU3NkVFXHU1RjU1XHU0RTJEXHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHU1NDBEXG4gICAqIFx1OUVEOFx1OEJBNFx1NEUzQSAnbmF0aXZlcGx1Z2lucydcdUZGMENcdTRFMEVcdTZFOTBcdTc2RUVcdTVGNTVcdTRGRERcdTYzMDFcdTRFMDBcdTgxRjRcbiAgICovXG4gIHRhcmdldERpck5hbWU/OiBzdHJpbmdcbiAgLyoqIFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQVx1OEJFNlx1N0VDNlx1NjVFNVx1NUZEN1x1RkYwQ1x1NEZCRlx1NEU4RVx1OEMwM1x1OEJENVx1NTQ4Q1x1NzZEMVx1NjNBN1x1NTkwRFx1NTIzNlx1OEZDN1x1N0EwQiAqL1xuICB2ZXJib3NlPzogYm9vbGVhblxuICAvKiogXHU4MUVBXHU1QjlBXHU0RTQ5XHU2NUU1XHU1RkQ3XHU1MjREXHU3RjAwXHVGRjBDXHU3NTI4XHU0RThFXHU1MzNBXHU1MjA2XHU0RTBEXHU1NDBDXHU2M0QyXHU0RUY2XHU3Njg0XHU2NUU1XHU1RkQ3XHU4RjkzXHU1MUZBICovXG4gIGxvZ1ByZWZpeD86IHN0cmluZ1xufVxuXG4vKipcbiAqIFx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVxuICpcbiAqIFx1NjgzOVx1NjM2RSBVbmlBcHAgXHU1Qjk4XHU2NUI5XHU2NTg3XHU2ODYzXHU4OUM0XHU4MzAzXHU4QkJFXHU3RjZFXHU5RUQ4XHU4QkE0XHU1MDNDXHVGRjFBXG4gKiAtIHNvdXJjZURpcjogJ25hdGl2ZXBsdWdpbnMnIC0gXHU3QjI2XHU1NDA4XHU1Qjk4XHU2NUI5XHU2NzJDXHU1NzMwXHU2M0QyXHU0RUY2XHU1QjU4XHU1MEE4XHU4OUM0XHU4MzAzXG4gKiAtIHRhcmdldERpck5hbWU6ICduYXRpdmVwbHVnaW5zJyAtIFx1Njc4NFx1NUVGQVx1NTQwRVx1NEZERFx1NjMwMVx1NzZGOFx1NTQwQ1x1NzY4NFx1NzZFRVx1NUY1NVx1N0VEM1x1Njc4NFxuICovXG5jb25zdCBERUZBVUxUX09QVElPTlM6IFJlcXVpcmVkPENvcHlOYXRpdmVSZXNvdXJjZXNPcHRpb25zPiA9IHtcbiAgZW5hYmxlOiB0cnVlLFxuICBzb3VyY2VEaXI6ICduYXRpdmVwbHVnaW5zJyxcbiAgdGFyZ2V0RGlyTmFtZTogJ25hdGl2ZXBsdWdpbnMnLFxuICB2ZXJib3NlOiB0cnVlLFxuICBsb2dQcmVmaXg6ICdbY29weS1uYXRpdmUtcmVzb3VyY2VzXScsXG59XG5cbi8qKlxuICogVW5pQXBwIFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1OEQ0NFx1NkU5MFx1NTkwRFx1NTIzNlx1NjNEMlx1NEVGNlxuICpcbiAqIFx1NTI5Rlx1ODBGRFx1OEJGNFx1NjYwRVx1RkYxQVxuICogMS4gXHU4OUUzXHU1MUIzIFVuaUFwcCBcdTRGN0ZcdTc1MjhcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTY1RjZcdUZGMENcdTYyNTNcdTUzMDVcdTU0MEVcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdThENDRcdTZFOTBcdTYyN0VcdTRFMERcdTUyMzBcdTc2ODRcdTk1RUVcdTk4OThcbiAqIDIuIFx1NUMwNlx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1NTkwRFx1NTIzNlx1NTIzMFx1Njc4NFx1NUVGQVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVx1NEUyRFxuICogMy4gXHU2NTJGXHU2MzAxIEFuZHJvaWQgXHU1NDhDIGlPUyBcdTVFNzNcdTUzRjBcdTc2ODRcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdThENDRcdTZFOTBcdTU5MERcdTUyMzZcbiAqIDQuIFx1NEVDNVx1NTcyOCBhcHAgXHU1RTczXHU1M0YwXHU2Nzg0XHU1RUZBXHU2NUY2XHU3NTFGXHU2NTQ4XHVGRjBDXHU1MTc2XHU0RUQ2XHU1RTczXHU1M0YwXHVGRjA4SDVcdTMwMDFcdTVDMEZcdTdBMEJcdTVFOEZcdUZGMDlcdTRFMERcdTYyNjdcdTg4NENcbiAqXG4gKiBcdTRGN0ZcdTc1MjhcdTU3M0FcdTY2NkZcdUZGMUFcbiAqIC0gXHU0RjdGXHU3NTI4XHU0RTg2IFVuaUFwcCBcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdUZGMDhcdTk3NUVcdTRFOTFcdTdBRUZcdTYzRDJcdTRFRjZcdUZGMDlcbiAqIC0gXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU1MzA1XHU1NDJCXHU5ODlEXHU1OTE2XHU3Njg0XHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHVGRjA4XHU1OTgyIC5zbyBcdTVFOTNcdTY1ODdcdTRFRjZcdTMwMDFcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTdCNDlcdUZGMDlcbiAqIC0gXHU5NzAwXHU4OTgxXHU1NzI4XHU2MjUzXHU1MzA1XHU1NDBFXHU0RkREXHU2MzAxXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU3Njg0XHU1QjhDXHU2NTc0XHU3NkVFXHU1RjU1XHU3RUQzXHU2Nzg0XG4gKlxuICogXHU1Qjk4XHU2NUI5XHU2NTg3XHU2ODYzXHU1M0MyXHU4MDAzXHVGRjFBXG4gKiBAc2VlIGh0dHBzOi8vdW5pYXBwLmRjbG91ZC5uZXQuY24vcGx1Z2luL25hdGl2ZS1wbHVnaW4uaHRtbCMlRTYlOUMlQUMlRTUlOUMlQjAlRTYlOEYlOTIlRTQlQkIlQjYtJUU5JTlEJTlFJUU1JTg2JTg1JUU3JUJEJUFFJUU1JThFJTlGJUU3JTk0JTlGJUU2JThGJTkyJUU0JUJCJUI2XG4gKiBAc2VlIGh0dHBzOi8vdW5pYXBwLmRjbG91ZC5uZXQuY24vdHV0b3JpYWwvbnZ1ZS1hcGkuaHRtbCNkb21cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBcdTYzRDJcdTRFRjZcdTkxNERcdTdGNkVcdTkwMDlcdTk4NzlcbiAqIEByZXR1cm5zIFZpdGUgXHU2M0QyXHU0RUY2XHU1QkY5XHU4QzYxXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5TmF0aXZlUmVzb3VyY2VzKG9wdGlvbnM6IENvcHlOYXRpdmVSZXNvdXJjZXNPcHRpb25zID0ge30pOiBQbHVnaW4ge1xuICBjb25zdCBjb25maWcgPSB7IC4uLkRFRkFVTFRfT1BUSU9OUywgLi4ub3B0aW9ucyB9XG5cbiAgLy8gXHU1OTgyXHU2NzlDXHU2M0QyXHU0RUY2XHU4OEFCXHU3OTgxXHU3NTI4XHVGRjBDXHU4RkQ0XHU1NkRFXHU0RTAwXHU0RTJBXHU3QTdBXHU2M0QyXHU0RUY2XG4gIGlmICghY29uZmlnLmVuYWJsZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnY29weS1uYXRpdmUtcmVzb3VyY2VzLWRpc2FibGVkJyxcbiAgICAgIGFwcGx5OiAnYnVpbGQnLFxuICAgICAgd3JpdGVCdW5kbGUoKSB7XG4gICAgICAgIC8vIFx1NjNEMlx1NEVGNlx1NURGMlx1Nzk4MVx1NzUyOFx1RkYwQ1x1NEUwRFx1NjI2N1x1ODg0Q1x1NEVGQlx1NEY1NVx1NjRDRFx1NEY1Q1xuICAgICAgfSxcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdjb3B5LW5hdGl2ZS1yZXNvdXJjZXMnLFxuICAgIGFwcGx5OiAnYnVpbGQnLCAvLyBcdTUzRUFcdTU3MjhcdTY3ODRcdTVFRkFcdTY1RjZcdTVFOTRcdTc1MjhcbiAgICBlbmZvcmNlOiAncG9zdCcsIC8vIFx1NTcyOFx1NTE3Nlx1NEVENlx1NjNEMlx1NEVGNlx1NjI2N1x1ODg0Q1x1NUI4Q1x1NkJENVx1NTQwRVx1NjI2N1x1ODg0Q1xuXG4gICAgYXN5bmMgd3JpdGVCdW5kbGUoKSB7XG4gICAgICBjb25zdCB7IHNvdXJjZURpciwgdGFyZ2V0RGlyTmFtZSwgdmVyYm9zZSwgbG9nUHJlZml4IH0gPSBjb25maWdcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU4REVGXHU1Rjg0XG4gICAgICAgIGNvbnN0IHByb2plY3RSb290ID0gcHJvY2Vzcy5jd2QoKVxuXG4gICAgICAgIC8vIFx1Njc4NFx1NUVGQVx1NkU5MFx1NzZFRVx1NUY1NVx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFx1RkYwOFx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1RkYwOVxuICAgICAgICBjb25zdCBzb3VyY2VQYXRoID0gcGF0aC5yZXNvbHZlKHByb2plY3RSb290LCBzb3VyY2VEaXIpXG5cbiAgICAgICAgLy8gXHU2Nzg0XHU1RUZBXHU3NkVFXHU2ODA3XHU4REVGXHU1Rjg0XHVGRjFBZGlzdC9bYnVpbGR8ZGV2XS9bcGxhdGZvcm1dL25hdGl2ZXBsdWdpbnNcbiAgICAgICAgLy8gYnVpbGRNb2RlOiAnYnVpbGQnIChcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODMpIFx1NjIxNiAnZGV2JyAoXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzKVxuICAgICAgICAvLyBwbGF0Zm9ybTogJ2FwcCcgKEFwcFx1NUU3M1x1NTNGMCkgXHU2MjE2XHU1MTc2XHU0RUQ2XHU1RTczXHU1M0YwXHU2ODA3XHU4QkM2XG4gICAgICAgIGNvbnN0IGJ1aWxkTW9kZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyAnYnVpbGQnIDogJ2RldidcbiAgICAgICAgY29uc3QgcGxhdGZvcm0gPSBwcm9jZXNzLmVudi5VTklfUExBVEZPUk0gfHwgJ2FwcCdcbiAgICAgICAgY29uc3QgdGFyZ2V0UGF0aCA9IHBhdGgucmVzb2x2ZShcbiAgICAgICAgICBwcm9qZWN0Um9vdCxcbiAgICAgICAgICAnZGlzdCcsXG4gICAgICAgICAgYnVpbGRNb2RlLFxuICAgICAgICAgIHBsYXRmb3JtLFxuICAgICAgICAgIHRhcmdldERpck5hbWUsXG4gICAgICAgIClcblxuICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTZFOTBcdTc2RUVcdTVGNTVcdTY2MkZcdTU0MjZcdTVCNThcdTU3MjhcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU0RTBEXHU1QjU4XHU1NzI4IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHVGRjBDXHU4QkY0XHU2NjBFXHU5ODc5XHU3NkVFXHU2Q0ExXHU2NzA5XHU0RjdGXHU3NTI4XHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XG4gICAgICAgIGNvbnN0IHNvdXJjZUV4aXN0cyA9IGF3YWl0IGZzLnBhdGhFeGlzdHMoc291cmNlUGF0aClcbiAgICAgICAgaWYgKCFzb3VyY2VFeGlzdHMpIHtcbiAgICAgICAgICBpZiAodmVyYm9zZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU2RTkwXHU3NkVFXHU1RjU1XHU0RTBEXHU1QjU4XHU1NzI4XHVGRjBDXHU4REYzXHU4RkM3XHU1OTBEXHU1MjM2XHU2NENEXHU0RjVDYClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NVx1OERFRlx1NUY4NDogJHtzb3VyY2VQYXRofWApXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTU5ODJcdTk3MDBcdTRGN0ZcdTc1MjhcdTY3MkNcdTU3MzBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdUZGMENcdThCRjdcdTU3MjhcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcdTUyMUJcdTVFRkEgbmF0aXZlcGx1Z2lucyBcdTc2RUVcdTVGNTVgKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU1RTc2XHU2MzA5XHU3MTY3XHU1Qjk4XHU2NUI5XHU2NTg3XHU2ODYzXHU2NTNFXHU1MTY1XHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU2NTg3XHU0RUY2YClcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NTNDMlx1ODAwMzogaHR0cHM6Ly91bmlhcHAuZGNsb3VkLm5ldC5jbi9wbHVnaW4vbmF0aXZlLXBsdWdpbi5odG1sYClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdTY4QzBcdTY3RTVcdTZFOTBcdTc2RUVcdTVGNTVcdTY2MkZcdTU0MjZcdTRFM0FcdTdBN0FcbiAgICAgICAgLy8gXHU1OTgyXHU2NzlDXHU3NkVFXHU1RjU1XHU1QjU4XHU1NzI4XHU0RjQ2XHU0RTNBXHU3QTdBXHVGRjBDXHU0RTVGXHU4REYzXHU4RkM3XHU1OTBEXHU1MjM2XHU2NENEXHU0RjVDXG4gICAgICAgIGNvbnN0IHNvdXJjZUZpbGVzID0gYXdhaXQgZnMucmVhZGRpcihzb3VyY2VQYXRoKVxuICAgICAgICBpZiAoc291cmNlRmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaWYgKHZlcmJvc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NVx1NEUzQVx1N0E3QVx1RkYwQ1x1OERGM1x1OEZDN1x1NTkwRFx1NTIzNlx1NjRDRFx1NEY1Q2ApXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bG9nUHJlZml4fSBcdTZFOTBcdTc2RUVcdTVGNTVcdThERUZcdTVGODQ6ICR7c291cmNlUGF0aH1gKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2xvZ1ByZWZpeH0gXHU4QkY3XHU1NzI4IG5hdGl2ZXBsdWdpbnMgXHU3NkVFXHU1RjU1XHU0RTJEXHU2NTNFXHU1MTY1XHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU2NTg3XHU0RUY2YClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBcdTc4NkVcdTRGRERcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTVcdTUzQ0FcdTUxNzZcdTcyMzZcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcbiAgICAgICAgYXdhaXQgZnMuZW5zdXJlRGlyKHRhcmdldFBhdGgpXG5cbiAgICAgICAgaWYgKHZlcmJvc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NUYwMFx1NTlDQlx1NTkwRFx1NTIzNiBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2Li4uYClcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NkU5MFx1NzZFRVx1NUY1NTogJHtzb3VyY2VQYXRofWApXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTU6ICR7dGFyZ2V0UGF0aH1gKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGOiAke2J1aWxkTW9kZX1gKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGAke2xvZ1ByZWZpeH0gXHU3NkVFXHU2ODA3XHU1RTczXHU1M0YwOiAke3BsYXRmb3JtfWApXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTUzRDFcdTczQjAgJHtzb3VyY2VGaWxlcy5sZW5ndGh9IFx1NEUyQVx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NjU4N1x1NEVGNi9cdTc2RUVcdTVGNTVgKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gXHU2MjY3XHU4ODRDXHU2NTg3XHU0RUY2XHU1OTBEXHU1MjM2XHU2NENEXHU0RjVDXG4gICAgICAgIC8vIFx1NUMwNlx1NjU3NFx1NEUyQSBuYXRpdmVwbHVnaW5zIFx1NzZFRVx1NUY1NVx1NTkwRFx1NTIzNlx1NTIzMFx1Njc4NFx1NUVGQVx1OEY5M1x1NTFGQVx1NzZFRVx1NUY1NVxuICAgICAgICBhd2FpdCBmcy5jb3B5KHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIHtcbiAgICAgICAgICBvdmVyd3JpdGU6IHRydWUsIC8vIFx1ODk4Nlx1NzZENlx1NURGMlx1NUI1OFx1NTcyOFx1NzY4NFx1NjU4N1x1NEVGNlx1RkYwQ1x1Nzg2RVx1NEZERFx1NEY3Rlx1NzUyOFx1NjcwMFx1NjVCMFx1NzI0OFx1NjcyQ1xuICAgICAgICAgIGVycm9yT25FeGlzdDogZmFsc2UsIC8vIFx1NTk4Mlx1Njc5Q1x1NzZFRVx1NjgwN1x1NjU4N1x1NEVGNlx1NUI1OFx1NTcyOFx1NEUwRFx1NjJBNVx1OTUxOVxuICAgICAgICAgIHByZXNlcnZlVGltZXN0YW1wczogdHJ1ZSwgLy8gXHU0RkREXHU2MzAxXHU2NTg3XHU0RUY2XHU3Njg0XHU2NUY2XHU5NUY0XHU2MjMzXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHZlcmJvc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1MjcwNSBVbmlBcHAgXHU2NzJDXHU1NzMwXHU1MzlGXHU3NTFGXHU2M0QyXHU0RUY2XHU1OTBEXHU1MjM2XHU1QjhDXHU2MjEwYClcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJHtsb2dQcmVmaXh9IFx1NURGMlx1NjIxMFx1NTI5Rlx1NTkwRFx1NTIzNiAke3NvdXJjZUZpbGVzLmxlbmd0aH0gXHU0RTJBXHU2NTg3XHU0RUY2L1x1NzZFRVx1NUY1NVx1NTIzMFx1Njc4NFx1NUVGQVx1NzZFRVx1NUY1NWApXG4gICAgICAgICAgY29uc29sZS5sb2coYCR7bG9nUHJlZml4fSBcdTUzOUZcdTc1MUZcdTYzRDJcdTRFRjZcdTczQjBcdTU3MjhcdTUzRUZcdTRFRTVcdTU3MjggQXBwIFx1NEUyRFx1NkI2M1x1NUUzOFx1NEY3Rlx1NzUyOGApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGAke2NvbmZpZy5sb2dQcmVmaXh9IFx1Mjc0QyBcdTU5MERcdTUyMzYgVW5pQXBwIFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1NTkzMVx1OEQyNTpgLCBlcnJvcilcbiAgICAgICAgY29uc29sZS5lcnJvcihgJHtjb25maWcubG9nUHJlZml4fSBcdTk1MTlcdThCRUZcdThCRTZcdTYwQzU6YCwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKVxuICAgICAgICBjb25zb2xlLmVycm9yKGAke2NvbmZpZy5sb2dQcmVmaXh9IFx1OEJGN1x1NjhDMFx1NjdFNVx1NkU5MFx1NzZFRVx1NUY1NVx1Njc0M1x1OTY1MFx1NTQ4Q1x1NzhDMVx1NzZEOFx1N0E3QVx1OTVGNGApXG4gICAgICAgIC8vIFx1NEUwRFx1NjI5Qlx1NTFGQVx1OTUxOVx1OEJFRlx1RkYwQ1x1OTA3Rlx1NTE0RFx1NUY3MVx1NTRDRFx1NjU3NFx1NEUyQVx1Njc4NFx1NUVGQVx1OEZDN1x1N0EwQlx1RkYwQ1x1NEY0Nlx1NEYxQVx1OEJCMFx1NUY1NVx1OEJFNlx1N0VDNlx1NzY4NFx1OTUxOVx1OEJFRlx1NEZFMVx1NjA2RlxuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cblxuLyoqXG4gKiBcdTUyMUJcdTVFRkEgVW5pQXBwIFx1NjcyQ1x1NTczMFx1NTM5Rlx1NzUxRlx1NjNEMlx1NEVGNlx1OEQ0NFx1NkU5MFx1NTkwRFx1NTIzNlx1NjNEMlx1NEVGNlx1NzY4NFx1NEZCRlx1NjM3N1x1NTFGRFx1NjU3MFxuICpcbiAqIFx1OEZEOVx1NjYyRlx1NEUwMFx1NEUyQVx1NEZCRlx1NjM3N1x1NzY4NFx1NURFNVx1NTM4Mlx1NTFGRFx1NjU3MFx1RkYwQ1x1NzUyOFx1NEU4RVx1NUZFQlx1OTAxRlx1NTIxQlx1NUVGQVx1NjNEMlx1NEVGNlx1NUI5RVx1NEY4QlxuICogXHU3Mjc5XHU1MjJCXHU5MDAyXHU3NTI4XHU0RThFXHU1NzI4IHZpdGUuY29uZmlnLnRzIFx1NEUyRFx1OEZEQlx1ODg0Q1x1Njc2MVx1NEVGNlx1NjAyN1x1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RVxuICpcbiAqIFx1NEY3Rlx1NzUyOFx1NzkzQVx1NEY4Qlx1RkYxQVxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gXHU1NzI4IHZpdGUuY29uZmlnLnRzIFx1NEUyRFxuICogcGx1Z2luczogW1xuICogICAvLyBcdTRFQzVcdTU3MjggYXBwIFx1NUU3M1x1NTNGMFx1NEUxNFx1NTQyRlx1NzUyOFx1NjVGNlx1NzUxRlx1NjU0OFxuICogICBVTklfUExBVEZPUk0gPT09ICdhcHAnXG4gKiAgICAgPyBjcmVhdGVDb3B5TmF0aXZlUmVzb3VyY2VzUGx1Z2luKFxuICogICAgICAgICBWSVRFX0NPUFlfTkFUSVZFX1JFU19FTkFCTEUgPT09ICd0cnVlJyxcbiAqICAgICAgICAgeyB2ZXJib3NlOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnIH1cbiAqICAgICAgIClcbiAqICAgICA6IG51bGwsXG4gKiBdXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gZW5hYmxlIFx1NjYyRlx1NTQyNlx1NTQyRlx1NzUyOFx1NjNEMlx1NEVGNlx1RkYwQ1x1OTAxQVx1NUUzOFx1OTAxQVx1OEZDN1x1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NjNBN1x1NTIzNlxuICogQHBhcmFtIG9wdGlvbnMgXHU1MTc2XHU0RUQ2XHU5MTREXHU3RjZFXHU5MDA5XHU5ODc5XHVGRjBDXHU0RTBEXHU1MzA1XHU1NDJCIGVuYWJsZSBcdTVDNUVcdTYwMjdcbiAqIEByZXR1cm5zIFZpdGUgXHU2M0QyXHU0RUY2XHU1QkY5XHU4QzYxXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3B5TmF0aXZlUmVzb3VyY2VzUGx1Z2luKFxuICBlbmFibGU6IGJvb2xlYW4gPSB0cnVlLFxuICBvcHRpb25zOiBPbWl0PENvcHlOYXRpdmVSZXNvdXJjZXNPcHRpb25zLCAnZW5hYmxlJz4gPSB7fSxcbik6IFBsdWdpbiB7XG4gIHJldHVybiBjb3B5TmF0aXZlUmVzb3VyY2VzKHsgZW5hYmxlLCAuLi5vcHRpb25zIH0pXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy94aWV6aGlxaS9Eb2N1bWVudHMvd2ViMy9haV9wcm9qZWN0L3ZpdGUtcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3hpZXpoaXFpL0RvY3VtZW50cy93ZWIzL2FpX3Byb2plY3Qvdml0ZS1wbHVnaW5zL3N5bmMtbWFuaWZlc3QtcGx1Z2lucy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveGllemhpcWkvRG9jdW1lbnRzL3dlYjMvYWlfcHJvamVjdC92aXRlLXBsdWdpbnMvc3luYy1tYW5pZmVzdC1wbHVnaW5zLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5cbmludGVyZmFjZSBNYW5pZmVzdFR5cGUge1xuICAncGx1cyc/OiB7XG4gICAgZGlzdHJpYnV0ZT86IHtcbiAgICAgIHBsdWdpbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4gICAgfVxuICB9XG4gICdhcHAtcGx1cyc/OiB7XG4gICAgZGlzdHJpYnV0ZT86IHtcbiAgICAgIHBsdWdpbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bmNNYW5pZmVzdFBsdWdpbigpOiBQbHVnaW4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdzeW5jLW1hbmlmZXN0JyxcbiAgICBhcHBseTogJ2J1aWxkJyxcbiAgICBlbmZvcmNlOiAncG9zdCcsXG4gICAgd3JpdGVCdW5kbGU6IHtcbiAgICAgIG9yZGVyOiAncG9zdCcsXG4gICAgICBoYW5kbGVyKCkge1xuICAgICAgICBjb25zdCBzcmNNYW5pZmVzdFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy4vc3JjL21hbmlmZXN0Lmpzb24nKVxuICAgICAgICBjb25zdCBkaXN0QXBwUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLi9kaXN0L2Rldi9hcHAvbWFuaWZlc3QuanNvbicpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBcdThCRkJcdTUzRDZcdTZFOTBcdTY1ODdcdTRFRjZcbiAgICAgICAgICBjb25zdCBzcmNNYW5pZmVzdCA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHNyY01hbmlmZXN0UGF0aCwgJ3V0ZjgnKSkgYXMgTWFuaWZlc3RUeXBlXG5cbiAgICAgICAgICAvLyBcdTc4NkVcdTRGRERcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcbiAgICAgICAgICBjb25zdCBkaXN0QXBwRGlyID0gcGF0aC5kaXJuYW1lKGRpc3RBcHBQYXRoKVxuICAgICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0QXBwRGlyKSkge1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRpc3RBcHBEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gXHU4QkZCXHU1M0Q2XHU3NkVFXHU2ODA3XHU2NTg3XHU0RUY2XHVGRjA4XHU1OTgyXHU2NzlDXHU1QjU4XHU1NzI4XHVGRjA5XG4gICAgICAgICAgbGV0IGRpc3RNYW5pZmVzdDogTWFuaWZlc3RUeXBlID0ge31cbiAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXN0QXBwUGF0aCkpIHtcbiAgICAgICAgICAgIGRpc3RNYW5pZmVzdCA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGRpc3RBcHBQYXRoLCAndXRmOCcpKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NkU5MFx1NjU4N1x1NEVGNlx1NUI1OFx1NTcyOCBwbHVnaW5zXG4gICAgICAgICAgaWYgKHNyY01hbmlmZXN0WydhcHAtcGx1cyddPy5kaXN0cmlidXRlPy5wbHVnaW5zKSB7XG4gICAgICAgICAgICAvLyBcdTc4NkVcdTRGRERcdTc2RUVcdTY4MDdcdTY1ODdcdTRFRjZcdTRFMkRcdTY3MDlcdTVGQzVcdTg5ODFcdTc2ODRcdTVCRjlcdThDNjFcdTdFRDNcdTY3ODRcbiAgICAgICAgICAgIGlmICghZGlzdE1hbmlmZXN0LnBsdXMpXG4gICAgICAgICAgICAgIGRpc3RNYW5pZmVzdC5wbHVzID0ge31cbiAgICAgICAgICAgIGlmICghZGlzdE1hbmlmZXN0LnBsdXMuZGlzdHJpYnV0ZSlcbiAgICAgICAgICAgICAgZGlzdE1hbmlmZXN0LnBsdXMuZGlzdHJpYnV0ZSA9IHt9XG5cbiAgICAgICAgICAgIC8vIFx1NTkwRFx1NTIzNiBwbHVnaW5zIFx1NTE4NVx1NUJCOVxuICAgICAgICAgICAgZGlzdE1hbmlmZXN0LnBsdXMuZGlzdHJpYnV0ZS5wbHVnaW5zID0gc3JjTWFuaWZlc3RbJ2FwcC1wbHVzJ10uZGlzdHJpYnV0ZS5wbHVnaW5zXG5cbiAgICAgICAgICAgIC8vIFx1NTE5OVx1NTE2NVx1NjZGNFx1NjVCMFx1NTQwRVx1NzY4NFx1NTE4NVx1NUJCOVxuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkaXN0QXBwUGF0aCwgSlNPTi5zdHJpbmdpZnkoZGlzdE1hbmlmZXN0LCBudWxsLCAyKSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgTWFuaWZlc3QgcGx1Z2lucyBcdTU0MENcdTZCNjVcdTYyMTBcdTUyOUYnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdcdTI3NEMgXHU1NDBDXHU2QjY1IG1hbmlmZXN0IHBsdWdpbnMgXHU1OTMxXHU4RDI1OicsIGVycm9yKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsT0FBT0EsV0FBVTtBQUM5VCxPQUFPQyxjQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUV2QixPQUFPLGdCQUFnQjtBQUd2QixPQUFPLGlCQUFpQjtBQUV4QixPQUFPLGNBQWM7QUFHckIsT0FBTyxpQkFBaUI7QUFLeEIsT0FBTyxrQkFBa0I7QUFFekIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sV0FBVztBQUNsQixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxpQkFBaUI7OztBQzNCbVQsU0FBUyxZQUFZO0FBQ2hXLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUNqQixPQUFPLGFBQWE7QUFLcEIsU0FBUyxnQkFBZ0I7QUFDdkIsUUFBTSxXQUFXLFFBQVE7QUFDekIsUUFBTSxFQUFFLGFBQWEsSUFBSSxRQUFRO0FBRWpDLFFBQU0sa0JBQWtCLGlCQUFpQixjQUFjLG1DQUFVLGlCQUFpQixjQUFjLHlDQUFXO0FBRzNHLFFBQU0sY0FBYyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsWUFBWSxZQUFZLEVBQUU7QUFHMUUsTUFBSSxDQUFDLEdBQUcsV0FBVyxXQUFXLEdBQUc7QUFDL0IsWUFBUSxJQUFJLFVBQUssZUFBZSwrQ0FBWSxXQUFXO0FBQ3ZEO0FBQUEsRUFDRjtBQUVBLFVBQVEsSUFBSSxxQ0FB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TTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsWUFBWTtBQUFBLE1BQ2QsQ0FBQztBQUFBO0FBQUEsTUFFRDtBQUFBLFFBQ0UsaUJBQWlCLFNBQVMsZ0NBQWdDO0FBQUEsUUFDMUQ7QUFBQSxVQUNFLFNBQVMsU0FBUztBQUFBO0FBQUEsUUFDcEI7QUFBQSxNQUNGO0FBQUEsTUFDQSxtQkFBbUI7QUFBQSxNQUNuQixXQUFXO0FBQUEsUUFDVCxZQUFZLENBQUMsS0FBSztBQUFBLFFBQ2xCLE1BQU07QUFBQTtBQUFBLFFBQ04sc0JBQXNCO0FBQUE7QUFBQSxRQUN0QixLQUFLO0FBQUE7QUFBQSxNQUNQLENBQUM7QUFBQTtBQUFBLE1BRUQsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLG9CQUFvQixLQUFLLFVBQVUscUJBQXFCO0FBQUEsSUFDMUQ7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBS0MsTUFBSyxLQUFLRCxTQUFRLElBQUksR0FBRyxPQUFPO0FBQUEsUUFDckMsUUFBUUMsTUFBSyxLQUFLRCxTQUFRLElBQUksR0FBRyxxQkFBcUI7QUFBQSxNQUN4RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLE1BQU0sT0FBTyxTQUFTLGVBQWUsRUFBRTtBQUFBO0FBQUEsTUFFdkMsT0FBTyxLQUFLLE1BQU0scUJBQXFCLElBQ25DO0FBQUEsUUFDRSxDQUFDLHFCQUFxQixHQUFHO0FBQUEsVUFDdkIsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBO0FBQUEsVUFFZCxTQUFTLENBQUFDLFVBQVFBLE1BQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7QUFBQSxRQUMzRTtBQUFBLE1BQ0YsSUFDQTtBQUFBLElBQ047QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU0sd0JBQXdCLFNBQVMsQ0FBQyxXQUFXLFVBQVUsSUFBSSxDQUFDO0FBQUEsSUFDcEU7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQTtBQUFBO0FBQUEsTUFHWCxRQUFRO0FBQUE7QUFBQSxNQUVSLFFBQVEsU0FBUyxnQkFBZ0IsUUFBUTtBQUFBLElBQzNDO0FBQUEsRUFDRixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJwcm9jZXNzIiwgInBhdGgiLCAicHJvY2VzcyIsICJmcyIsICJwcm9jZXNzIiwgInBhdGgiLCAiZnMiLCAiZnMiLCAicGF0aCIsICJwcm9jZXNzIiwgInBhdGgiLCAicHJvY2VzcyIsICJmcyIsICJwcm9jZXNzIiwgInBhdGgiXQp9Cg==
