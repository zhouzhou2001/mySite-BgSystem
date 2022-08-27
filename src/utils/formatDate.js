export default function formatDate(timestamp) {
  let date = new Date(parseInt(timestamp));
  //年月日
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  //时秒分
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  //星期
  let weekarr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let week = weekarr[date.getDay()];
  //一位数补零
  if (month >= 0 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minute >= 0 && minute <= 9) {
    minute = "0" + minute;
  }
  if (second >= 0 && second <= 9) {
    second = "0" + second;
  }

  return (
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second +
    " " +
    week
  );
}
