$(document).ready(function(){
    $('#inputPhone').mask('(00) 00000-0000');
  });

  var courses = [];

  loadCourses();
  loadStudents();

  function loadCourses() {
    $.ajax({
             url:"http://localhost:8080/courses",
             type:"GET",
             async: false,
             success: (response) => {
                courses = response;
                for (var course of courses) {
                  document.getElementById("selectCourse").innerHTML += `<option value=${course.id}>${course.name}</option>`;
                }
             }
    });
  }

  function loadStudents() {
    $.getJSON("http://localhost:8080/students", (response) => {
      students = response;
      for (let student of students) {
        addNewRow(student);
      }
    })
  }

  function save() {

    let selectedPeriod = document.getElementById("flexRadioMorning").checked ? 1 :
                         document.getElementById("flexRadioAfternoon").checked ? 2 :
                         document.getElementById("flexRadioNight").checked ? 3 : 0; 

    var stud = {
      id: students.length+1,
      name: document.getElementById("inputName").value,
      email: document.getElementById("inputEmail").value,
      phone: document.getElementById("inputPhone").value,
      idCourse: parseInt(document.getElementById("selectCourse").value),
      period: selectedPeriod
    };

    $.ajax({
             url:"http://localhost:8080/students",
             type:"POST",
             contentType: "application/json",
             data: JSON.stringify(stud),
             success: (student) => {
                addNewRow(student);
                students.push(student);
                document.getElementById("formStudent").reset();
             }
    });

    
  }

  function addNewRow(stud) {
    var table = document.getElementById("studentsTable");

    var newRow = table.insertRow();

    var idNode = document.createTextNode(stud.id);
    newRow.insertCell().appendChild(idNode);

    var nameNode = document.createTextNode(stud.name);
    newRow.insertCell().appendChild(nameNode);

    var emailNode = document.createTextNode(stud.email);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(emailNode);

    var phoneNode = document.createTextNode(stud.phone);
    newRow.insertCell().appendChild(phoneNode);

    var courseNode = document.createTextNode(courses[stud.idCourse - 1].name);
    newRow.insertCell().appendChild(courseNode);
  
    var shifts = "";
    if (stud.period == 1) {
      shifts = "<span>Manhã</span>";
    }

    if (stud.period == 2) {
      shifts = "<span>Tarde</span>";
    }

    if (stud.period == 3) {
      shifts = "<span>Noite</span>";
    }

    var cell = newRow.insertCell();
    cell.className="d-none d-md-table-cell"
    cell.innerHTML = shifts; 
  }