import event from "@/api/event";

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

  event("page_view", params);
};
