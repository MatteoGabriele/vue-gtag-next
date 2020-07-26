import { reactive, toRefs } from "vue";

export let options = reactive({
  id: null,
  params: {},
  appName: null,
  isGtagEnabled: true,
  globalObjectName: "gtag",
  globalDataLayerName: "dataLayer",
  isPageTrackerEnabled: false,
  isLoggerEnabled: false,
});

export const useOptions = () => {
  return toRefs(options);
};

export const mergeOptions = (newOptions = {}) => {
  options = reactive({ ...options, ...newOptions });
};
