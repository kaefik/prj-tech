function loadData() {  
  readJsonFile("./data/cars-1.json", function(text) {
    var data = JSON.parse(text);
    const htmlArray = data.map(function(obj, index){
      return getRowTable(obj);
    });
    console.log(htmlArray);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      document.body.appendChild(getRowTable(element));
      
    }
  });
}


function getScrollHeight(){
  var height = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  return height;
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
  elem.className="table__row";
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

window.onscroll = function() {
  /*
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  document.querySelector(".showScroll").textContent = scrolled + 'px';
  console.log("scrolled = ", scrolled + 'px');
  var scrollHeight = 

  console.log("hight = ",getScrollHeight());
  */
 
  var scrollHeight, totalHeight;
  scrollHeight = document.body.scrollHeight;
  totalHeight = window.scrollY + window.innerHeight;

  if(totalHeight >= scrollHeight)
  {
      console.log("at the bottom");
  }
}


