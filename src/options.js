import { reactive, computed, toRefs } from "vue";

export const options = reactive({
  property: null,
  isEnabled: false,
  globalObjectName: "gtag",
  globalDataLayerName: "dataLayer",
  domain: "https://www.googletagmanager.com",
  customResource: null,
});

export const useOptions = () => {
  return toRefs(options);
};

export const defaultProperty = computed(() => {
  const { property } = useOptions();

  if (!property.value) {
    return;
  }

  if (Array.isArray(property.value)) {
    return property.value.find((p) => p.default === true) || property.value[0];
  }

  return property.value;
});

export const hasId = computed(() => {
  return options.property && options.property.id !== null;
});

export const allProperties = computed(() => {
  const { property } = useOptions();

  if (Array.isArray(property.value)) {
    return property.value;
  }

  return [property.value];
});

export const mergeOptions = (newOptions = {}) => {
  Object.keys(newOptions).forEach((key) => {
    options[key] = newOptions[key];
  });
};

export const isTracking = computed(() => {
  const { isEnabled } = useOptions();
  const property = defaultProperty.value;

  return property && property.id && isEnabled.value;
});
