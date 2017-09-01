
function Student(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.courses = [];
}
Student.prototype.name = function () {
  return `${this.firstName} ${this.lastName}`;
};
Student.prototype.enroll = function (course) {
  if(this.courses.some(c => course.conflictsWith(c))) {
    throw "Conflict!";
  }
  if (!this.courses.some(c => c.name === course.name)) {
    this.courses.push(course);
  }
};
Student.prototype.courseLoad = function () {
  let load = {};
  this.courses.forEach(c => {
    if (load[c.department]) {
      load[c.department] += c.credits;
    } else {
      load[c.department] = c.credits;
    }
  });
  return load;
};
function Course(name, department, credits, dow, timeSlot){
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.timeSlot = timeSlot;
  this.dow = dow;
}
Course.prototype.addStudent = function (student) {
  student.enroll(this);
};

Course.prototype.conflictsWith = function (course) {
  if(course.timeSlot !== this.timeSlot){
    return false;
  }
  if(this.dow.some( c => course.dow.includes(c))) {
    return false;
  }
  return true;
};

let andres = new Student('Andres', 'Alfaro');
let course = new Course('Cooking', 'Home Economics', 3, ['m'], 0);
let course2 = new Course('Baking', 'Home Economics', 4, ['t'], 1);
// let course3 = new Course('Cleaning', 'Home Economics', 4, ['t'], 0);
course.addStudent(andres);
course2.addStudent(andres);
// course3.addStudent(andres);
console.log(andres.courseLoad());
