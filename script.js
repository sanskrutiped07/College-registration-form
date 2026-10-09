// Load saved registrations from localStorage (or start with an empty list)
let students = JSON.parse(localStorage.getItem("students")) || [];

// Show an error message under a field
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

// Clear all error messages
function clearErrors() {
  let errorIds = ["nameError", "dobError", "genderError", "emailError", "phoneError",
                  "addressError", "courseError", "yearError", "percentError", "agreeError"];
  for (let i = 0; i < errorIds.length; i++) {
    showError(errorIds[i], "");
  }
}

// Check all fields. Returns true only if everything is correct.
function validateForm() {
  let valid = true;

  // Get the values typed by the user
  let name = document.getElementById("name").value.trim();
  let dob = document.getElementById("dob").value;
  let gender = document.querySelector('input[name="gender"]:checked');
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let address = document.getElementById("address").value.trim();
  let course = document.getElementById("course").value;
  let year = document.getElementById("year").value;
  let percent = document.getElementById("percent").value.trim();
  let agree = document.getElementById("agree").checked;

  clearErrors();

  // Name: at least 3 characters
  if (name.length < 3) {
    showError("nameError", "Name must be at least 3 characters");
    valid = false;
  }

  // Date of birth: must be selected and not in the future
  if (dob === "" || new Date(dob) > new Date()) {
    showError("dobError", "Select a valid date of birth");
    valid = false;
  }

  // Gender: one radio button must be selected
  if (gender === null) {
    showError("genderError", "Select a gender");
    valid = false;
  }

  // Email: must contain @ and a dot
  if (!email.includes("@") || !email.includes(".")) {
    showError("emailError", "Enter a valid email");
    valid = false;
  }

  // Phone: exactly 10 digits
  if (phone.length !== 10 || isNaN(phone)) {
    showError("phoneError", "Enter a 10-digit mobile number");
    valid = false;
  }

  // Address: at least 10 characters
  if (address.length < 10) {
    showError("addressError", "Address must be at least 10 characters");
    valid = false;
  }

  // Course and year: must not be the default option
  if (course === "") {
    showError("courseError", "Select a course");
    valid = false;
  }
  if (year === "") {
    showError("yearError", "Select a year");
    valid = false;
  }

  // Percentage: must be a number between 0 and 100
  if (percent === "" || isNaN(percent) || percent < 0 || percent > 100) {
    showError("percentError", "Enter a percentage between 0 and 100");
    valid = false;
  }

  // Checkbox: must be ticked
  if (!agree) {
    showError("agreeError", "Please confirm before submitting");
    valid = false;
  }

  return valid;
}

// Show all registrations in the table
function showStudents() {
  let rows = "";
  for (let i = 0; i < students.length; i++) {
    rows += "<tr>" +
      "<td>" + students[i].id + "</td>" +
      "<td>" + students[i].name + "</td>" +
      "<td>" + students[i].course + "</td>" +
      "<td>" + students[i].year + "</td>" +
      "<td><button onclick='deleteStudent(" + i + ")'>Delete</button></td>" +
      "</tr>";
  }
  document.getElementById("tableBody").innerHTML = rows;
  document.getElementById("count").textContent = students.length;

  // Show "No registrations yet" only when the list is empty
  if (students.length === 0) {
    document.getElementById("emptyMsg").style.display = "block";
  } else {
    document.getElementById("emptyMsg").style.display = "none";
  }
}

// Delete one registration and save again
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  showStudents();
}

// When the form is submitted
document.getElementById("regForm").addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  if (validateForm()) {
    let student = {
      id: "REG" + (students.length + 1),
      name: document.getElementById("name").value.trim(),
      dob: document.getElementById("dob").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      course: document.getElementById("course").value,
      year: document.getElementById("year").value,
      percent: document.getElementById("percent").value.trim()
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    alert("Registration successful! Your ID is " + student.id);
    document.getElementById("regForm").reset();
    showStudents();
  }
});

// Reset button also clears the red error messages
document.getElementById("resetBtn").addEventListener("click", clearErrors);

// Show saved registrations when the page opens
showStudents();
