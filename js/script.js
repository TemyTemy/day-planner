var LOCAL_STORAGE_KEY = "events";
var EVENTS = {list: []};
var EMPTY_EVENTS = {
   list:[{
       time: "9:00 AM",
       event: ''
   },
   {
       time: "10:00 AM",
       'event': ''
   },
   {
    time: "11:00 AM",
    'event': ''
   },
   {
    time: "12:00 PM",
    'event': ''
   },
   {
    time: "1:00 PM",
    'event': ''
   },
   {
    time: "2:00 PM",
    'event': ''
   },
   {
    time: "3:00 PM",
    'event': ''
   },
   {
    time: "4:00 PM",
    'event': ''
   },
   {
    time: "5:00 PM",
    'event': ''
   }
  ]
};
var timeDisplayEl = $('#displayMoment');

// handle displaying the time
// function displayTime() {

  var displayedTime = moment();
  var rightNowText = displayedTime.format('MMM DD, YYYY  hh:mm:ss a');
  timeDisplayEl.text(rightNowText);


  function addRow(time, evt) {
    var text = "<div class='row'>"
                  + "<div class='col-sm-1 time-block'>" + time + "</div>"
                  +  constructEventBlock(time, evt)
                  + "<div class='col-sm-1 action-block' data-time='" + time + "'><span><i class='fa fa-lock'></i></span></div>"
                + "</div>";
    return text;           
  }

  function constructEventBlock(time, evt) {
    var currentHour = moment(time, "LT").hour();
    var displayedHour = displayedTime.hour();
    var colorClass;

    if (displayedHour < currentHour) {
      colorClass = "later";
    } 

    if (displayedHour === currentHour) {
        colorClass = "current"
    }
    
    if (displayedHour > currentHour) {
        colorClass = "";
    }

    return "<div class='col-sm-10 event-block " + colorClass + "'><textarea data-time='" + time + "'>" + evt + "</textarea></div>"
  }



  function readEventsFromLocalStorage() {
    var eventText = localStorage.getItem(LOCAL_STORAGE_KEY);
    EVENTS = eventText ? JSON.parse(eventText) : EMPTY_EVENTS;
  }

  function displayEvents() {
      var eventText = "";
      for (var i = 0; i < EVENTS.list.length; i++) {
          var evt = EVENTS.list[i];
          eventText += addRow(evt.time, evt.event);
      }
      $(".container").html(eventText);

      $(".action-block").click((event) => {
          var time = event.currentTarget.dataset.time;
          updateEvent(time);
      });
  }

  function updateEvent(timeText) {
    var eventToUpdate = EVENTS.list.find((x) => x.time === timeText);
    if (eventToUpdate) {
        var textData = $("textarea[data-time='" + eventToUpdate.time + "'").val();
        eventToUpdate.event = textData;
        saveEvents();
    }
  }

  function saveEvents() {
      var eventText = JSON.stringify(EVENTS);
      localStorage.setItem(LOCAL_STORAGE_KEY, eventText);
      displayEvents();      
  }

  readEventsFromLocalStorage();
  displayEvents();
