function loadData() {}

// функция чтения данных
function readJsonFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

readJsonFile("./data/cars-1.json", function(text) {
  var data = JSON.parse(text);
  console.log(data);
});
