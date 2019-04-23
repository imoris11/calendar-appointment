//I HAVE NOT USED JQUERY AND VANILLA JS IN THREE YEARS...

//INITIALIZE VARS
var appointments = {};
var year = new Date().getFullYear();
var month = new Date().getMonth();
var days = new Date(year, month+1, 0).getDate();
var today = new Date().getDate();
var selectedDay = today;
//JQUERY INIT
$(function(){
  $("#form").css({display:'none'});
  var daysArray = "";
  let count = 0;
  for (let i=1; i<=days; i++) {
    //Add Days of the month to string of <li> elements
    if (count === 7 ){
      daysArray +="<br/><br/>";
      daysArray += `<li onclick="selectDate(this, ${i})" class='date-item'>${i}</li>`;
      count = 0;
    }else if (i===today) {
      daysArray += `<li  onclick="selectDate(this, ${i})" class='date-item'><span class='active'>${i}</span></li>`;
    }else{
      daysArray += `<li  onclick="selectDate(this, ${i})" class='date-item'>${i}</li>`;
    }
    count++;
  }
  //Show calendar
  $("#calendar").html(daysArray);
  //Show current date appointments
  $("#appointments_title").html("Appointments for " + formatDate(today));
  showAppointment();
})

//SHOW APPOINTMENTS
function showAppointment () {
  var appointment = appointments[selectedDay];
  if (appointment) {
    var item = `
    <p class='alert alert-primary'>${appointment}</p>
    <button onclick="deleteAppointment()" class='btn btn-danger'>Delete</button>
    <button onclick="editAppointment()" class='btn btn-primary'>Edit</button>
    `;
    $('.appointment').html(item);
  }else{
    $('.appointment').html(`<button onclick='addAppointment()' class='btn btn-primary'>Create Appointment</button>`);
  }

}

//RETURN DATE FORMAT DD/MM/YYYY
function formatDate (day) {
  return day.toString() +"/"+(month+1).toString()+  "/" + year.toString();
}

//UPDATE SELECTED DATE
function selectDate(ele, day) {
  $("li").removeClass('selected')
  $(ele).addClass('selected');
  $("#form").css({display:'none'});
  $(".appointment").css({display:'block'});
  $("#appointment_info").val('');
  $("#appointments_title").html("Appointments for " + formatDate(day));
  selectedDay = day
  showAppointment();
}
//TOGGLE UI FOR ADDING APPOINTMENT
function addAppointment () {
  $("#form").css({display:'block'});
  $(".appointment").css({display:'none'});
}
//EDIT APPOINTMENT
function editAppointment () {
  var appointment = appointments[selectedDay];
  $("#form").css({display:'block'});
  $(".appointment").css({display:'none'});
    $("#appointment_info").val(appointment);
}
//DELETE APPOINTMENT
function deleteAppointment () {
  delete appointments[selectedDay];
  this.showAppointment();
}
//SUBMIT FORM
function submitForm () {
  var appointment = $("#appointment_info").val();
  if (appointment !== '') {
    $("#appointment_info").val('');
    appointments[selectedDay] = appointment;
    $("#form").css({display:'none'});
    $(".appointment").css({display:'block'});
    $("#error_message").html("")
    showAppointment();
  }else{
    $("#error_message").html("Cannot save empty appointment!!")
  }
}
