document.addEventListener('DOMContentLoaded', function () {
    const generatePdfButton = document.getElementById('generatePdf');
    const departmentSelect = document.getElementById('department');
    const teacherNameInput = document.getElementById('teacherName');
    const attendanceDateInput = document.getElementById('attendanceDate');
    const classNameInput = document.getElementById('className');
    const rollNumbersContainer = document.getElementById('rollNumbers');
    const addRollNumberButton = document.getElementById('addRollNumber');

    let rollInputsCount = 0;

    departmentSelect.addEventListener('change', toggleGenerateButton);
    teacherNameInput.addEventListener('input', toggleGenerateButton);
    attendanceDateInput.addEventListener('input', toggleGenerateButton);
    classNameInput.addEventListener('input', toggleGenerateButton);

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

        if (departmentValue && teacherNameValue && attendanceDateValue && classNameValue && rollInputsCount > 0) {
            generatePdfButton.removeAttribute('disabled');
        } else {
            generatePdfButton.setAttribute('disabled', 'disabled');
        }
    }

    function generatePDF() {
        const department = departmentSelect.value;
        const teacherName = teacherNameInput.value;
        const attendanceDate = attendanceDateInput.value;
        const className = classNameInput.value;
        const rollNumbers = [];

        const rollInputs = document.querySelectorAll('.rollNumberInput');
        rollInputs.forEach(input => {
            const rollNumber = input.value.trim();
            if (rollNumber) {
                rollNumbers.push(rollNumber);
            }
        });

        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Set font size and style for the header
        doc.setFontSize(16);
        doc.setFontStyle('bold');

        // Add header
        doc.text('Attendance Report', 20, 20);

        // Set font size and style for content
        doc.setFontSize(12);
        doc.setFontStyle('normal');

        // Add department, teacher name, date, class name, and roll numbers to the PDF
        doc.text(`Department: ${department}`, 20, 30);
        doc.text(`Teacher Name: ${teacherName}`, 20, 40);
        doc.text(`Date: ${attendanceDate}`, 20, 50);
        doc.text(`Class Name: ${className}`, 20, 60);
        doc.text(`Roll Numbers: ${rollNumbers.join(', ')}`, 20, 70);

        // Save the PDF
        doc.save('attendance_report.pdf');
    }

    function addRollNumberInput() {
        if (rollInputsCount === 0) {
            const rollNumberInput = document.createElement('input');
            rollNumberInput.setAttribute('type', 'text');
            rollNumberInput.setAttribute('class', 'rollNumberInput');
            rollNumberInput.setAttribute('placeholder', 'Enter Roll Number (e.g., 001, 234, 1014)');
            rollNumbersContainer.appendChild(rollNumberInput);
            rollInputsCount++;

            toggleGenerateButton();
        }

        addRollNumberButton.setAttribute('disabled', 'disabled');
    }
});
