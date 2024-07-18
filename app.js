let students = [];

function addStudent() {
    try {
        let id = parseInt(document.getElementById('studentId').value);
        let name = document.getElementById('studentName').value;
        let status = document.getElementById('studentStatus').value;

        // التحقق من أن معرف الطالب غير فارغ والاسم غير فارغ
        if (!id || !name) {
            throw new Error('يرجى إدخال معرف واسم الطالب.');
        }

        // التحقق من وجود معرف الطالب بالفعل
        let existingStudent = students.find(student => student.id === id);
        if (existingStudent) {
            throw new Error(`الطالب بمعرف ${id} موجود بالفعل في القائمة.`);
        }

        // إنشاء طالب جديد وإضافته إلى قائمة الطلاب
        let student = {
            id: id,
            name: name,
            status: status
        };
        students.push(student);

        // تحديث عرض قائمة الطلاب
        printStudents();
    } catch (error) {
        alert(error.message);
    }
}

function printStudents() {
    let studentsListDiv = document.getElementById('studentsList');
    studentsListDiv.innerHTML = '';

    students.forEach(student => {
        let studentDiv = document.createElement('div');
        studentDiv.classList.add('student');

        let studentInfo = document.createElement('span');
        studentInfo.classList.add('student-info');
        studentInfo.textContent = `معرف الطالب: ${student.id}, الاسم: ${student.name}, الحالة: ${student.status}`;

        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'حذف';
        removeBtn.onclick = function() {
            removeStudent(student.id);
        };

        studentDiv.appendChild(studentInfo);
        studentDiv.appendChild(removeBtn);
        studentsListDiv.appendChild(studentDiv);
    });
}

function removeStudent(id) {
    try {
        // البحث عن الطالب باستخدام المعرف
        let index = students.findIndex(student => student.id === id);
        if (index === -1) {
            throw new Error(`الطالب بمعرف ${id} غير موجود في القائمة.`);
        }

        // حذف الطالب من المصفوفة
        students.splice(index, 1);

        // تحديث عرض قائمة الطلاب
        printStudents();
    } catch (error) {
        alert(error.message);
    }
}
