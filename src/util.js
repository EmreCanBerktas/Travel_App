function timeStampToData(timeStamp) {
  var date = new Date(timeStamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp

  // Will display time in 10:30:23 format
  var formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
}
export { timeStampToData };
