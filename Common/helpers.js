function replaceString(str) {
  let result = str.split("");
  let indexUnderscore = result.indexOf("_");
  result[indexUnderscore + 1] = result[indexUnderscore + 1].toUpperCase();
  return result.filter(s => s !== "_").join("");
}

function buildCountersResults(items) {
  let counters = {};
  for (let key in items) {
    if (key === "entries") {
      counters[key] = items[key];
    } else {
      let newKeyName = replaceString(key);
      counters[newKeyName] = items[key];
    }
  }
  return counters;
}

module.exports = {
  buildCountersResults
};
