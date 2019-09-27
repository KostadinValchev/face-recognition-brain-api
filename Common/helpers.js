function replaceString(str) {
  let result = str.split("");
  let indexUnderscore = result.indexOf("_");
  result[indexUnderscore + 1] = result[indexUnderscore + 1].toUpperCase();
  return result.filter(s => s !== "_").join("");
}

function buildCountersReults(items) {
  let counters = {};
  for (let key in items[0]) {
    if (key === "entries") {
      counters[key] = items[0][key];
    } else {
      let newKeyName = replaceString(key);
      counters[newKeyName] = items[0][key];
    }
  }
  console.log(counters)
  return counters;
}

module.exports = {
  buildCountersReults
};
