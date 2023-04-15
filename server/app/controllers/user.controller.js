exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};

exports.facultyBoard = (req, res) => {
  res.status(200).send("Faculty Content.");
};

exports.hodBoard = (req, res) => {
  res.status(200).send("HoD Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
