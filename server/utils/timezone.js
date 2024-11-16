const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs-timezone-iana-plugin");

// Extend `dayjs` with UTC and Timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Utility function to get the WIB date-time
const getWIBDateTime = (date = null) => {
  const baseDate = date ? dayjs(date) : dayjs();
  return baseDate.tz("Asia/Jakarta");
};

module.exports = { dayjs, getWIBDateTime };
