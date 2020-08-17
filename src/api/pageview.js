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

  if (typeof params.send_page_view === "undefined") {
    params.send_page_view = true;
  }

  config(params);
};
