const { invoke } = window.__TAURI__.tauri;


var currentTime_var = document.getElementsByClassName("currenttime")[0];
var currentDate_var = document.getElementsByClassName("currentdate")[0];
var batterydata_percentage_var = document.getElementsByClassName("batterydata_percentage")[0];
var batterydata_status_var = document.getElementsByClassName("batterydata_status")[0];
var batterydata_timetoempty_var = document.getElementsByClassName("batterydata_timetoempty")[0];

function showTime() {
  var currentDateTimeNow = new Date();
  var hours = "0" + currentDateTimeNow.getHours();
  var minutes = "0" + currentDateTimeNow.getMinutes();
  var seconds = "0" + currentDateTimeNow.getSeconds();

  currentDateTimeNow = hours.slice(-2) + " : " + minutes.slice(-2) + " : " + seconds.slice(-2);

  currentTime_var.innerHTML = `<p style="color: #A8CED0; font-size: 30px;">${currentDateTimeNow}</p>`;
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;

  currentDate_var.innerHTML = `<p style="color: #A8CED0; font-size: 30px;">${today}</p>`;
  setTimeout(showDate, 3600000);
}
showDate();

async function getBattery() {
  var batteryPercentage = "";
  var batteryPlugged = "";
  var timeToEmpty = "";
  var battery = await invoke('getbattery');
  var battery_list = battery.split('\n');
  for (var i=0; i<battery_list.length; i++) {
    if (battery_list[i].match("percentage")) {
      batteryPercentage = ((battery_list[i]).trim().split(" ")).at(-1);
    }
    if (battery_list[i].match("state")) {
      batteryPlugged = (battery_list[i]).trim().split(" ").at(-1);
    }
    if (battery_list[i].match("time to empty")) {
      timeToEmpty = (battery_list[i]).trim().split(" ").at(-1);
    }
  }

  batterydata_percentage_var.innerHTML = `<p style="color:  darkslategrey; font-size: 10px;"> $PERCENTAGE: <p style="color: #A8CED0; font-size: 15px;">${batteryPercentage}</p></p>`;
  batterydata_status_var.innerHTML = `<p style="color:  darkslategrey; font-size: 10px;"> $STATUS: <p style="color: #A8CED0; font-size: 15px;">${batteryPlugged}</p> </p>`;
  batterydata_timetoempty_var.innerHTML = `<p style="color:  darkslategrey; font-size: 10px;"> $TIMETOEMPTY </p><p style="color: #A8CED0; font-size: 18px;">${timeToEmpty}</p>`;
  setTimeout(getBattery, 60000);
}
getBattery()

async function getUserName() {
  var myusername = await invoke("whoami");
  console.log(myusername);
}
getUserName()

async function getCpuLoad() {
  var cpudata = await invoke("getcpuload");
  console.log(cpudata);
}
getCpuLoad()


