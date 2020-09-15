import { merge } from "@/utils";
import { watch, nextTick } from "vue";
import { screenview, query, pageview } from "@/api";
import {
  isTrackRouterEnabled,
  isTracking,
  allProperties,
  routerState,
  useRouterState,
} from "@/state";

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

const view = (params) => {
  const { useScreenview } = useRouterState();

  if (useScreenview.value) {
    screenview(params);
  } else {
    pageview(params);
  }
};

export const trackpage = (to = {}, from = {}) => {
  const { skipSamePath } = useRouterState();

  if (skipSamePath.value && to.path === from.path) {
    return;
  }

  const params = getTemplate(to, from);

  view(params);
};

export const trackRouter = (router, newState = {}) => {
  isTrackRouterEnabled.value = true;

  merge(routerState, newState);

  watch(
    () => isTracking.value,
    (val) => {
      if (!val) {
        return;
      }

      router.isReady().then(() => {
        nextTick(() => {
          allProperties.value.forEach((property) => {
            const params = property.params || {};

            if (typeof params.send_page_view === "undefined") {
              params.send_page_view = false;
            }

            query("config", property.id, params);
          });

          trackpage(router.currentRoute.value);
        });

        router.afterEach((to, from) => {
          nextTick(() => {
            trackpage(to, from);
          });
        });
      });
    },
    { immediate: true }
  );
};
