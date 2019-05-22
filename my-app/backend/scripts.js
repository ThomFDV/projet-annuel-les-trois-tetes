/**
 * dateNow
 * get and format the current datetime
 */
var newDate = function dateNow() {
  var dateNow = new Date();
  var day = dateNow.getDate();
  var month = dateNow.getMonth();
  var year = dateNow.getFullYear();
  var hour = dateNow.getHours();
  var minutes = dateNow.getMinutes();
  var seconds = dateNow.getSeconds();
  month += 1;
  const dateFormatted = year + '-' + formatDigits(month) + '-' + formatDigits(day) + 'T' + formatDigits(hour) + ':' + formatDigits(minutes) + ':' + formatDigits(seconds) + 'Z';
  return dateFormatted;
}
/**
 * formatDigits
 * add 0 when number < 10
 */
function formatDigits(number) {
  if(number < 10) {
    number = ('0' + number);
  }
  return number;
}

module.exports = newDate;
