function loadData(number) {
  var currentFileName = number === undefined ? 1 : number;
  namefile = "./data/cars-" + currentFileName.toString() + ".json";
  console.log("namefile = ", namefile);
  readJsonFile(namefile, function(text) {
    console.log("text = ", text);
    var data = JSON.parse(text);
    const htmlArray = data.map(function(obj, index) {
      return getRowTable(obj);
    });
    const tableBody = document.querySelector(".table__body");
    //console.log(htmlArray);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      tableBody.appendChild(getRowTable(element));
    }
  });
}

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

// добавление ячейки
function getCellTable(data) {
  const elem = document.createElement("div");
  elem.className = "table__cell";
  elem.textContent = data;
  return elem;
}

// добавление строки
function getRowTable(obj) {
  const elem = document.createElement("div");
  elem.className = "table__cell";
  elem.className = "table__row";
  elem.appendChild(getCellTable(obj.Name));
  elem.appendChild(getCellTable(obj.Miles_per_Gallon));
  elem.appendChild(getCellTable(obj.Cylinders));
  elem.appendChild(getCellTable(obj.Displacement));
  elem.appendChild(getCellTable(obj.Horsepower));
  elem.appendChild(getCellTable(obj.Weight_in_lbs));
  elem.appendChild(getCellTable(obj.Acceleration));
  elem.appendChild(getCellTable(obj.Year));
  elem.appendChild(getCellTable(obj.Origin));

  return elem;
}

// получение текущей страницы
function getCurrentFile() {
  return document.querySelector(".currentFileName").innerHTML;
}

// изменение текущей страницы
function setCurrentFile(number) {
  document.querySelector(".currentFileName").innerHTML = number.toString();
}

//обработка события скрола
window.onscroll = function() {
  var scrollHeight, totalHeight;
  scrollHeight = document.body.scrollHeight;
  totalHeight = window.scrollY + window.innerHeight;
  // определяем что достигли дна ;)
  if (totalHeight >= scrollHeight) {
    console.log("at the bottom");
    var currentFileName = parseInt(getCurrentFile(), 10) + 1;
    if (currentFileName <= 5) {
      setCurrentFile(currentFileName);
      loadData(currentFileName);
    } else {
      //скрываем прелоадер если достигли дна
      document
        .querySelector(".data__preloader")
        .setAttribute("style", "display:none");
    }
    console.log("currentFileName = ", currentFileName);
  }
};
