import { reactive, toRefs } from "vue";

export const options = reactive({
  id: null,
  isGtagEnabled: true,
  globalObjectName: "gtag",
  globalDataLayerName: "dataLayer",
  domain: "https://www.googletagmanager.com",
  customResource: null,
});

export const useOptions = () => {
  return toRefs(options);
};

export const mergeOptions = (newOptions = {}) => {
  Object.keys(newOptions).forEach((key) => {
    options[key] = newOptions[key];
  });
};
