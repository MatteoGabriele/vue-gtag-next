import { useBootstrapWatcher } from "@/bootstrap";
import { mergeOptions } from "@/options";
import * as api from "@/api";
import registerGlobalObject from "@/register-global-object";

export default {
  install: (app, newOptions = {}) => {
    mergeOptions(newOptions);
    registerGlobalObject();
    useBootstrapWatcher();

    app.config.globalProperties.$gtag = api;
  },
};

export { useOptions } from "@/options";
export { isBootstrapped, isReady } from "@/states";
