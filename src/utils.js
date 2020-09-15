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

export const merge = (obj = {}, newObj = {}) => {
  Object.keys(newObj).forEach((key) => {
    obj[key] = newObj[key];
  });
};
