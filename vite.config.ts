import dayjs from "dayjs";
import { resolve } from "path";
import pkg from "./package.json";
import { warpperEnv } from "./build";
import { getPluginsList } from "./build/plugins";
import { include, exclude } from "./build/optimize";
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd();

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const {
    VITE_CDN,
    VITE_PORT,
    VITE_COMPRESSION,
    VITE_PUBLIC_PATH,
    VITE_API_BASE_URL,
    VITE_BUILD_TYPE,
  } = warpperEnv(loadEnv(mode, root));
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: { alias },
    server: {
      https: false,
      port: VITE_PORT,
      host: "0.0.0.0",
      proxy: {
        "/match": {
          target: VITE_API_BASE_URL,
          rewrite: path => path.replace(/^\/match/, ""),
          changeOrigin: true,
          configure: (proxy, _) => {
            proxy.on("proxyRes", (_, req, _r) => {
              console.log(req.url);
            });
          },
          headers: {
            Origin: VITE_API_BASE_URL,
            Referer: VITE_API_BASE_URL
          }
        },
      }
    },
    plugins: getPluginsList(command, VITE_CDN, VITE_COMPRESSION),
    optimizeDeps: {
      include,
      exclude
    },
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("index.html")
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      },
      outDir: `dist${VITE_BUILD_TYPE === 'production' ? '/dpgames-back-stage' : ''}`,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
};
