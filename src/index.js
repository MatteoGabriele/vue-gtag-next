import { useBootstrapWatcher } from "@/bootstrap";
import { mergeOptions } from "@/options";

export default {
  install: (app, newOptions = {}) => {
    mergeOptions(newOptions);
    useBootstrapWatcher();
  },
};

export { useOptions } from "@/options";
export { isBootstrapped, isReady } from "@/states";
