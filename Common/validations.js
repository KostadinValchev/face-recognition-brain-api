function isExisting(value) {
  if (typeof value !== "undefined" && value !== null) return true;
  else return false;
}

module.exports = {
  isExisting
};
