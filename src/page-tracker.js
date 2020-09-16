import { watch, nextTick } from "vue";
import { merge } from "@/utils";
import { screenview, pageview } from "@/api";
import { isTracking } from "@/state";
import routerState, { useRouterState } from "@/router-state";

export const getTemplate = (to = {}, from = {}) => {
  const { template, useScreenview } = useRouterState();
  const customTemplate = template.value ? template.value(to, from) : null;

  if (customTemplate) {
    return customTemplate;
  } else if (useScreenview.value) {
    return {
      screen_name: to.name,
    };
  } else {
    return {
      page_title: to.name,
      page_path: to.path,
      page_location: window.location.href,
    };
  }
};

export const trackPage = (to = {}, from = {}) => {
  const { useScreenview, skipSamePath } = useRouterState();

  if (skipSamePath.value && to.path === from.path) {
    return;
  }

  const params = getTemplate(to, from);

  if (useScreenview.value) {
    screenview(params);
  } else {
    pageview(params);
  }
};

export const trackRouter = (router, newState = {}) => {
  merge(routerState, newState);

  watch(
    () => isTracking.value,
    (val) => {
      if (!val) {
        return;
      }

      router.isReady().then(() => {
        nextTick(() => {
          trackPage(router.currentRoute.value);
        });

        router.afterEach((to, from) => {
          nextTick(() => {
            trackPage(to, from);
          });
        });
      });
    },
    { immediate: true }
  );
};
