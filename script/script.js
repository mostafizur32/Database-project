// Sample data to store students
let students = [];

// Auto-generate Student ID
function generateStudentID() {
    const currentYear = new Date().getFullYear();
    const randomRoll = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    // return ${currentYear}${randomRoll};
}

document.getElementById("student-id").value = generateStudentID();

// Division-District Data for Bangladesh
const divisions = {
    "Dhaka": ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
    "Chittagong": ["Chittagong", "Bandarban", "Brahmanbaria", "Chandpur", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
    "Khulna": ["Khulna", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
    "Rajshahi": ["Rajshahi", "Bogra", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Sirajganj"],
    "Barisal": ["Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
    "Sylhet": ["Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"],
    "Rangpur": ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
    "Mymensingh": ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"]
};

// Populate Division Dropdown
const presentDivision = document.getElementById("present-division");
const permanentDivision = document.getElementById("permanent-division");

for (const division in divisions) {
    const option1 = document.createElement("option");
    option1.value = division;
    option1.textContent = division;
    presentDivision.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = division;
    option2.textContent = division;
    permanentDivision.appendChild(option2);
}

// Update District Dropdown Based on Division
function updateDistricts(divisionDropdown, districtDropdown) {
    const selectedDivision = divisionDropdown.value;
    districtDropdown.innerHTML = "<option value=''>Select District</option>";

    if (selectedDivision) {
        divisions[selectedDivision].forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtDropdown.appendChild(option);
        });
    }
}

presentDivision.addEventListener("change", () => updateDistricts(presentDivision, document.getElementById("present-district")));
permanentDivision.addEventListener("change", () => updateDistricts(permanentDivision, document.getElementById("permanent-district")));

// Phone Number Validation
document.getElementById("phone-number").addEventListener("input", function () {
    const phoneNumber = this.value;
    const phoneError = document.getElementById("phone-error");
    const regex = /^\d{10}$/;

    if (!regex.test(phoneNumber)) {
        phoneError.textContent = "Phone number must be 10 digits.";
    } else {
        phoneError.textContent = "";
    }
});

// Email Validation
document.getElementById("email").addEventListener("input", function () {
    const email = this.value;
    const emailError = document.getElementById("email-error");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !regex.test(email)) {
        emailError.textContent = "Invalid email format.";
    } else {
        emailError.textContent = "";
    }
});

// Show/Hide Other Religion Input
document.getElementById("religion").addEventListener("change", function () {
    const otherReligionInput = document.getElementById("other-religion");
    if (this.value === "Others") {
        otherReligionInput.style.display = "block";
        otherReligionInput.setAttribute("required", true);
    } else {
        otherReligionInput.style.display = "none";
        otherReligionInput.removeAttribute("required");
    }
});

// Show/Hide Other Nationality Input
document.getElementById("nationality").addEventListener("change", function () {
    const otherNationalityInput = document.getElementById("other-nationality");
    if (this.value === "Others") {
        otherNationalityInput.style.display = "block";
        otherNationalityInput.setAttribute("required", true);
    } else {
        otherNationalityInput.style.display = "none";
        otherNationalityInput.removeAttribute("required");
    }
});

// Form Submission
document.getElementById("admission-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate Phone Number
    const phoneNumber = document.getElementById("phone-number").value;
    if (!/^\d{10}$/.test(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Validate Email (if provided)
    const email = document.getElementById("email").value;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Add student to the list
    const student = {
        studentID: document.getElementById("student-id").value,
        name: document.getElementById("student-name").value,
        fatherName: document.getElementById("father-name").value,
        motherName: document.getElementById("mother-name").value,
        birthDate: document.getElementById("birth-date").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        presentAddress: {
            division: document.getElementById("present-division").value,
            district: document.getElementById("present-district").value,
            address: document.getElementById("present-address").value,
        },
        permanentAddress: {
            division: document.getElementById("permanent-division").value,
            district: document.getElementById("permanent-district").value,
            address: document.getElementById("permanent-address").value,
        },
        class: document.getElementById("class").value,
        classRoll: document.getElementById("class-roll").value,
        religion: document.getElementById("religion").value === "Others" ? document.getElementById("other-religion").value : document.getElementById("religion").value,
        nationality: document.getElementById("nationality").value === "Others" ? document.getElementById("other-nationality").value : document.getElementById("nationality").value,
        phoneNumber: phoneNumber,
        email: email,
        bloodGroup: document.getElementById("blood-group").value,
        photo: document.getElementById("photo").files[0] ? document.getElementById("photo").files[0].name : null,
    };

    students.push(student);

    // Display Success Message
    document.getElementById("success-message").textContent = "Form submitted successfully!";
    setTimeout(() => {
        document.getElementById("success-message").textContent = "";
    }, 3000);

    // Reset Form
    document.getElementById("admission-form").reset();
    document.getElementById("student-id").value = generateStudentID();
});

// Generate Report
document.getElementById("generate-report").addEventListener("click", function () {
    const reportResults = document.getElementById("report-results");
    if (students.length === 0) {
        reportResults.innerHTML = "<p>No students found.</p>";
        return;
    }

    let reportHTML = "<table><tr><th>Student ID</th><th>Name</th><th>Class</th><th>Class Roll</th><th>Religion</th><th>Nationality</th></tr>";
    students.forEach(student => {
        reportHTML += <tr><td>${student.studentID}</td><td>${student.name}</td><td>${student.class}</td><td>${student.classRoll}</td><td>${student.religion}</td><td>${student.nationality}</td></tr>;
    });
    reportHTML += "</table>";
    reportResults.innerHTML = reportHTML;
});

// Export Data as CSV
document.getElementById("export-data").addEventListener("click", function () {
    if (students.length === 0) {
        alert("No data to export.");
        return;
    }

    const csvContent = "data:text/csv;charset=utf-8," +
        "Student ID,Name,Father's Name,Mother's Name,Birth Date,Gender,Present Address,Permanent Address,Class,Class Roll,Religion,Nationality,Phone Number,Email,Blood Group,Photo\n" +
        students.map(student => Object.values(student).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
});