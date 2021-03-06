import { name } from "./package.json";
import path from "path";

const projectRoot = path.resolve(__dirname);

const config = {
  input: {
    [name]: "./src/index.js",
  },
  externals: ["vue"],
  plugins: {
    alias: {
      resolve: [".js"],
      entries: [
        { find: /^@\/(.*)/, replacement: path.resolve(projectRoot, "src/$1") },
      ],
    },
  },
  output: {
    dir: "./dist/",
    format: ["esm", "cjs", "umd", "umd-min"],
    moduleName: "VueGtag",
  },
};

export default config;
