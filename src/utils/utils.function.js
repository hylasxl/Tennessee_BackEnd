function stringToSlug(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

function getNextAcceptedDays(days, startDate, length) {
  const daysArray = days.split(',');
  const result = [];
  let date = new Date(startDate);
  while (result.length < length) {
      let dayOfWeek = date.getDay();
      dayOfWeek = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
      if (daysArray[dayOfWeek] === '1') {
          const formattedDate = date.toISOString().split('T')[0];
          result.push(formattedDate);
      }
      date.setDate(date.getDate() + 1);
  }
  return result;
}

function addMinutesFromNow(minutes) {
  let date = new Date();
  date.setMinutes(date.getMinutes() + +minutes);
  return date;
}


module.exports = {
  stringToSlug,
  getNextAcceptedDays,
  addMinutesFromNow
}
