import { watch } from "vue";
import bootstrap from "@/bootstrap";
import { options, mergeOptions } from "@/options";

export default {
  install: (app, newOptions = {}) => {
    mergeOptions(newOptions);

    watch(
      [() => options.isGtagEnabled, () => options.id],
      ([isEnabled, id]) => id && isEnabled && bootstrap(),
      { immediate: true }
    );
  },
};

export { useOptions } from "@/options";
export { isBootstrapped, isReady } from "@/states";
