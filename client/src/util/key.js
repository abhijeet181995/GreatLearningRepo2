const aplhaNumeric =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

module.exports.generateRandomKey = (size = 10) => {
  return Array(size)
    .fill(0)
    .map((_) => aplhaNumeric[Math.floor(Math.random() * aplhaNumeric.length)])
    .join("");
};
