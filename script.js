
// Creating the current day
var showTime = $('#current-day');

function displayTime() {
  var todaysDate = moment().format('dddd - MMM DD, YYYY');
  showTime.text(todaysDate);
}

setInterval(displayTime, 1000);

// Creating the list of work hours
var businessHours = [9,10,11,12,13,14,15,16,17];

// Adjust hours
function displayHours(){

  for (var i = 0; i < businessHours.length; i++) {
    //Div is created for making a row
    var row = $("<div class='row'>");
    //Within the container the row will be added
    $("#container").append(row);
    //First column is created
    var col1 = $("<div class='col-sm-2'>")

    //Create business hours from a.m to p.m
    var updatedBusinessHrs = businessHours[i] + " a.m.";

    if(businessHours[i] >= 12){
      updatedBusinessHrs = businessHours[i] + " p.m.";

      if(businessHours[i] >= 13){
        updatedBusinessHrs = businessHours[i] -12 + " p.m.";
      }
    }

    // The hours are added to the first column
    col1.append(updatedBusinessHrs);
    // Second column created
    var col2 = $("<div class='col-sm-8'>")
    //Text area created with an id attribute and using bootstrap to create a class
    var textArea = $('<textarea>');
    textArea.attr("id", "textarea" + i);
    textArea.addClass("form-control");

    //Text area is grabbed to put to local storage
    var getTextArea = localStorage.getItem("textarea"+ i)
    textArea.text(getTextArea)
    textArea.addClass('past present future')
    //Text area is added to second column
    col2.append(textArea)

    //The hour of the day
    var hour = moment().format('H');
    //Color of text area changes
    if (businessHours[i] < hour) {
      textArea.removeClass('present future');
    } else if (businessHours[i] > hour) {
      textArea.removeClass('past present')
    } else {
      textArea.removeClass('past future')
    }

    //Third column is created
    var col3 =  $("<div class='col-sm-2'>");
    //Button is created that consists of a class and attribute
    var btn = $('<button>')

    btn.addClass('saveBtn')
    btn.attr("id", 'saveBtn')
    btn.text('SAVE')
    //Button is added to the third column
    col3.append(btn);
    //Column 1,2,3 is added to the row div
    row.append(col1, col2, col3)
  }
}
//Invokes the function to show the buisness hours, text area and save button
displayHours();
//Selects the saveBtn attribute and adds an event listener
$("#saveBtn").on('click', function () {
  for (var i = 0; i < businessHours.length; i++) {
    var getTextArea = $("#textarea" + i).val();

    localStorage.setItem("textarea" + i, getTextArea);    
  }
})
