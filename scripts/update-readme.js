const fs = require("fs");

const graduationYear = 2029;

function getSchoolYear() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const FIRST_SCHOOL_MONTH = 9; // assume year starts september
  const LAST_SCHOOL_MONTH = 6; // assume year ends june

  if (year > graduationYear || (year === graduationYear && month > LAST_SCHOOL_MONTH)) {
    return "Graduate";
  }

  const academicYear = month >= FIRST_SCHOOL_MONTH ? year : year - 1;
  const yearsUntilGrad = graduationYear - academicYear;

  const map = ["Graduate", "Senior", "Junior", "Sophomore", "Freshman"];
  return map[Math.min(Math.max(yearsUntilGrad, 0), 4)];
}

const grade = getSchoolYear();

let readme = fs.readFileSync("README.md", "utf8");

readme = readme.replace(
  /I'm Faizaan, a .*? at Stuyvesant High School\./,
  `I'm Faizaan, a ${grade} at Stuyvesant High School.`
);

fs.writeFileSync("README.md", readme);

console.log("Updated README with:", grade);