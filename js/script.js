var timeDisplayEl = $('#displayMoment');

// handle displaying the time
// function displayTime() {

  var rightNow = moment().format('MMM DD, YYYY  hh:mm:ss a');
  timeDisplayEl.text(rightNow);
