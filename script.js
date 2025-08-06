function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function renderCourses() {
  const list = document.getElementById('courseList');
  list.innerHTML = '';
  courses.forEach((course, index) => {
    const btn = document.createElement('button');
    btn.textContent = `${course.code} - ${course.title}`;
    btn.onclick = () => selectCourse(index);
    list.appendChild(btn);
    list.appendChild(document.createElement('br'));
  });
}

let selectedCourse = null;

function selectCourse(index) {
  selectedCourse = courses[index];
  const fullName = document.getElementById('firstName').value.trim() + " " + document.getElementById('lastName').value.trim();
  document.getElementById('userNameDisplay').textContent = fullName;
  document.getElementById('courseDetails').textContent = JSON.stringify(selectedCourse, null, 2);
  showScreen('screen2');
}

function submitVote() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const vote = document.getElementById('voteSelect').value;
  const comment = document.getElementById('comments').value.trim();

  if (!firstName || !lastName || !vote || !selectedCourse) {
    alert("Please fill out all fields before submitting.");
    return;
  }

  const item = {
    Title: `${firstName} ${lastName}`,
    FirstName: firstName,
    LastName: lastName,
    CourseCode: selectedCourse.code,
    CourseTitle: selectedCourse.title,
    Vote: vote,
    Comment: comment
  };

  alert("This is where you'd send the vote to SharePoint via REST API. Vote: " + JSON.stringify(item, null, 2));

  showScreen('screen3');
}

renderCourses();