import config from "@/api/config";

export default (value) => {
  let params = {};

  if (typeof value === "string") {
    params = {
      page_path: value,
      page_location: window.location.href,
    };
  } else {
    params = value;
  }

  config(params);
};
