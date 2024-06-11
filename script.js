document.addEventListener('DOMContentLoaded', function () {
    const generatePdfButton = document.getElementById('generatePdf');
    const departmentSelect = document.getElementById('department');
    const teacherNameInput = document.getElementById('teacherName');
    const attendanceDateInput = document.getElementById('attendanceDate');
    const classNameInput = document.getElementById('className');
    const semesterSelect = document.getElementById('semester');
    const noOfClassesInput = document.getElementById('noOfClasses');
    const rollNumbersContainer = document.getElementById('rollNumbers');
    const addRollNumberButton = document.getElementById('addRollNumber');

    semesterSelect.addEventListener('change', function () {
        if (parseInt(semesterSelect.value) > 2) {
            noOfClassesInput.style.display = 'block';
            noOfClassesInput.removeAttribute('disabled');
        } else {
            noOfClassesInput.style.display = 'none';
            noOfClassesInput.setAttribute('disabled', 'disabled');
            noOfClassesInput.value = '';
        }
        toggleGenerateButton();
    });

    departmentSelect.addEventListener('change', toggleGenerateButton);
    teacherNameInput.addEventListener('input', toggleGenerateButton);
    attendanceDateInput.addEventListener('input', toggleGenerateButton);
    classNameInput.addEventListener('input', toggleGenerateButton);
    noOfClassesInput.addEventListener('input', toggleGenerateButton);

    generatePdfButton.addEventListener('click', function () {
        generatePDF();
    });

    addRollNumberButton.addEventListener('click', function () {
        addRollNumberInput();
    });

    function toggleGenerateButton() {
        const departmentValue = departmentSelect.value;
        const teacherNameValue = teacherNameInput.value.trim();
        const attendanceDateValue = attendanceDateInput.value.trim();
        const classNameValue = classNameInput.value.trim();
        const semesterValue = semesterSelect.value;
        const noOfClassesValue = noOfClassesInput.value.trim();
        const rollInputs = document.querySelectorAll('.rollNumberInput');

        if (departmentValue && teacherNameValue && attendanceDateValue && classNameValue && semesterValue && rollInputs.length > 0) {
            if (parseInt(semesterValue) > 2) {
                if (noOfClassesValue) {
                    generatePdfButton.removeAttribute('disabled');
                } else {
                    generatePdfButton.setAttribute('disabled', 'disabled');
                }
            } else {
                generatePdfButton.removeAttribute('disabled');
            }
        } else {
            generatePdfButton.setAttribute('disabled', 'disabled');
        }
    }

    function generatePDF() {
        const department = departmentSelect.value;
        const teacherName = teacherNameInput.value;
        const attendanceDate = attendanceDateInput.value;
        const className = classNameInput.value;
        const semester = semesterSelect.value;
        const noOfClasses = noOfClassesInput.value;
        const rollNumbers = [];

        const rollInputs = document.querySelectorAll('.rollNumberInput');
        rollInputs.forEach(input => {
            const rollNumber = input.value.trim();
            if (rollNumber) {
                rollNumbers.push(rollNumber);
            }
        });

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add college logo
        const logoUrl = 'img/clg-logo.png'; // Replace with the correct path to your logo
        doc.addImage(logoUrl, 'PNG', 20, 10, 30, 30);

        // Add college name
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40, 40, 40);
        doc.text('Asutosh College', 60, 25);

        // Add header
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40, 40, 40);
        doc.text('Attendance Report', 60, 34);

        // Add a line below the header
        doc.setLineWidth(0.5);
        doc.line(20, 45, 190, 45);

        // Add department, teacher name, date, class name, semester, and no of classes
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(60, 60, 60);
        doc.text('Department: ', 20, 55);
        doc.setFont('helvetica', 'normal');
        doc.text(department, 60, 55);

        doc.setFont('helvetica', 'bold');
        doc.text('Teacher Name: ', 20, 65);
        doc.setFont('helvetica', 'normal');
        doc.text(teacherName, 60, 65);

        doc.setFont('helvetica', 'bold');
        doc.text('Date: ', 20, 75);
        doc.setFont('helvetica', 'normal');
        doc.text(attendanceDate, 60, 75);

        doc.setFont('helvetica', 'bold');
        doc.text('Class Name: ', 20, 85);
        doc.setFont('helvetica', 'normal');
        doc.text(className, 60, 85);

        doc.setFont('helvetica', 'bold');
        doc.text('Semester: ', 20, 95);
        doc.setFont('helvetica', 'normal');
        doc.text(semester, 60, 95);

        if (parseInt(semester) > 2) {
            doc.setFont('helvetica', 'bold');
            doc.text('Number of Classes: ', 20, 105);
            doc.setFont('helvetica', 'normal');
            doc.text(noOfClasses, 60, 105);
        }

        // Add roll numbers in a table format
        const startY = parseInt(semester) > 2 ? 115 : 105;
        doc.autoTable({
            startY: startY,
            head: [['Roll Number']],
            body: rollNumbers.map(rollNumber => [rollNumber]),
        });

        // Save the PDF
        doc.save('attendance_report.pdf');
    }

    function addRollNumberInput() {
        const rollNumberInput = document.createElement('input');
        rollNumberInput.setAttribute('type', 'text');
        rollNumberInput.setAttribute('class', 'rollNumberInput');
        rollNumberInput.setAttribute('placeholder', 'Enter Roll Number (e.g., 001, 234, 1014)');
        rollNumbersContainer.appendChild(rollNumberInput);

        rollNumberInput.addEventListener('input', toggleGenerateButton);
    }
});
