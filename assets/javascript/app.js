  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB8B4MMuNlUimpcGPw6qj8fWHiHCPjYQt4",
    authDomain: "train-scheduler-bafca.firebaseapp.com",
    databaseURL: "https://train-scheduler-bafca.firebaseio.com",
    projectId: "train-scheduler-bafca",
    storageBucket: "train-scheduler-bafca.appspot.com",
    messagingSenderId: "813945349999"
  };
  firebase.initializeApp(config);

  newFunction();

  function newFunction() {
    var database = firebase.database();
    //inital values
    var trainName = "";
    var destination = "";
    var frequency = "";
    var nextArrival = "";
    var militaryTime = "HH:mm";
    // var convertedDate = moment(nextArrival, militaryTime);
    //capture button on click
    $("#add-train-btn").on("click", function () {
      event.preventDefault();
      trainName = $("#train-name-input").val().trim();
      destination = $("#destination-input").val().trim();
      trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
      nextArrival = $("#frequency-input").val().trim();
      database.ref().set({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        monthlyRate: monthlyRate
      });
      $(".form-control").val("");
    });
    //firebase watcher + initial loader
    // The createRow function takes data returned by OMDB and appends the table data to the tbody
    database.ref().on("value", function (data) {
      console.log(data.val());
      // Get reference to existing tbody element, create a new table row element
      var tBody = $("tBody");
      var tRow = $("<tr>");
      var child = data.val();
      // Methods run on jQuery selectors return the selector they we run on
      // This is why we can create and save a reference to a td in the same statement we update its text
      var empNameTd = $("<td>").text(child.empName);
      var roleTd = $("<td>").text(child.role);
      var startDateTd = $("<td>").text(moment.unix(child.startDate).format("MM/DD/YY"));
      var monthlyRateTd = $("<td>").text(child.monthlyRate);
      // var empStartPretty = 
      var empMonthsTd = $("<td>").text(moment().diff(moment.unix(child.startDate, "X"), "months"));
      console.log(empMonthsTd);
      // Append the newly created table data to the table row
      tRow.append(empNameTd, roleTd, startDateTd, empMonthsTd, monthlyRateTd);
      // Append the table row to the table body
      tBody.append(tRow);
    });
  }