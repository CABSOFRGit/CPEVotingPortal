function sanitizeInput(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}


function showCourseDetails(course) {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();

  if (!firstName || !lastName) {
    alert("Please enter both your first and last name before selecting a course.");
    return;
  }

  document.getElementById("screen1").style.display = "none";
  document.getElementById("screen2").style.display = "block";
  const fullName = sanitizeInput(firstName + " " + lastName);
  document.getElementById("userNameDisplay").textContent = fullName;

  document.getElementById("courseDetails").innerHTML = `
Course Code: ${sanitizeInput(course["COURSE CODE"])}
Title: ${sanitizeInput(course["CPE Title"])}
Sponsor: ${sanitizeInput(course["Sponsor"])}
Date: ${sanitizeInput(course["CPE Date"])}
Description: ${sanitizeInput(course["Description of Activity"])}
Link: <a href="${sanitizeInput(course["Link"])}" target="_blank">${sanitizeInput(course["Link"])}</a>
Hours: ${sanitizeInput(course["Hours"])}
Topics: ${sanitizeInput(course["DoDI Criteria Topics"])}
  `;
  window.currentCourse = course;
}


function submitVote() {
  const firstName = sanitizeInput(document.getElementById("firstName").value);
  const lastName = sanitizeInput(document.getElementById("lastName").value);
  const vote = document.getElementById("voteSelect").value;
  const comments = sanitizeInput(document.getElementById("comments").value);
  const course = window.currentCourse;

  if (!firstName || !lastName || !vote || !course) {
    alert("Please fill out all required fields.");
    return;
  }

  // Example of where to place SharePoint submission
  // fetch("https://yoursharepointsite/_api/web/lists/getbytitle('Votes')/items", {
  //   method: "POST",
  //   headers: {
  //     "Accept": "application/json;odata=verbose",
  //     "Content-Type": "application/json;odata=verbose",
  //     "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value
  //   },
  //   body: JSON.stringify({
  //     Title: "Vote",
  //     FirstName: firstName,
  //     LastName: lastName,
  //     CourseCode: course["COURSE CODE"],
  //     Vote: vote,
  //     Comments: comments
  //   })
  // }).then(response => response.json()).then(data => {
  //   console.log("Success:", data);
  // }).catch(error => {
  //   console.error("Error submitting to SharePoint:", error);
  // });

  document.getElementById("screen2").style.display = "none";
  document.getElementById("screen3").style.display = "block";
}

window.onload = function() {
  const container = document.getElementById("courseList");
  courses.forEach(course => {
    const btn = document.createElement("button");
    btn.textContent = course["COURSE CODE"];
    btn.onclick = () => showCourseDetails(course);
    container.appendChild(btn);
  });
};