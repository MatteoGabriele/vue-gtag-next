import { useBootstrapWatcher } from "@/bootstrap";
import { merge } from "@/utils";
import state from "@/state";
import * as api from "@/api";
import registerGlobalObject from "@/register-global-object";

export default {
  install: (app, newState = {}) => {
    merge(state, newState);
    registerGlobalObject();
    useBootstrapWatcher();

    app.config.globalProperties.$gtag = api;
  },
};

export { isReady } from "@/bootstrap";
export { isTracking, useState } from "@/state";
export { default as useGtag } from "@/api/use-gtag";
export { trackRouter } from "@/page-tracker";
