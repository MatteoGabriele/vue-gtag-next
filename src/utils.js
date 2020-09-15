export const loadScript = (source, domain) => {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName("head")[0];
    const script = document.createElement("script");

    script.async = true;
    script.src = source;
    script.charset = "utf-8";

    if (domain) {
      const link = document.createElement("link");

      link.href = domain;
      link.rel = "preconnect";

      head.appendChild(link);
    }

    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  });
};

export function merge(obj, src) {
  Object.keys(src).forEach(function (key) {
    const type = obj[key] && Object.prototype.toString.call(obj[key]);

    if (type === "[object Object]" || type === "[object Array]") {
      merge(obj[key], src[key]);
      return;
    }
    obj[key] = src[key];
  });

  return obj;
}
