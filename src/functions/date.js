import { format } from "date-fns";
// const axios = require("axios");
export function date(timestamp) {
  return format(timestamp.toDate(), "MMMMMMM dd, yyyy");
}
