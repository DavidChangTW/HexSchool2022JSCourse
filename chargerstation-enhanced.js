// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
// <h1>新增資料</h1>
// <input type="text" placeholder="充電站名稱" class="chargingStation">
// <select name="" class="payment">
//     <option value="免費">免費</option>
//     <option value="投幣式">投幣式</option>
// </select>
// <input type="button" value="儲存" class="save">
// <h1>資料顯示</h1>
// <div class="filter">
//     <input type="button" value="全部" class="showAll">
//     <input type="button" value="免費" class="showFree">
//     <input type="button" value="投幣式" class="showCoin">
// </div>

// <ul class="list"></ul>

//     <script src="all.js"></script>
//     <style>
//         .blue{
//             color: blue;
//         }
//     </style>
// </body>
// </html>

data = [
  {
    charge:"免費",
    name:"北投充電站"        
  },
  {
    charge:"免費",
    name:"士林充電站"        
  },
  {
    charge:"投幣式",
    name:"南港充電站"        
  },
  {
    charge:"投幣式",
    name:"汐止充電站"        
  },
  {
    charge:"免費",
    name:"內湖充電站"        
  },  
];

let saveBtn = document.querySelector(".save");
let stationName = document.querySelector(".chargingStation");
let paymentMethod = document.querySelector(".payment");
let filter = document.querySelector(".filter");

// 新增充電站函式
saveBtn.addEventListener("click",function (e) {
  let obj = {};
  console.log(stationName.value,paymentMethod.value);
  obj.charge = paymentMethod.value;
  obj.name = stationName.value;
  data.push(obj);
  showIni();
  paymentMethod.value = "免費"; //老師寫法，恢復預設值
  stationName.value = ""; //老師寫法，恢復預設值
})
//console.log(data);

// 顯示充電站資訊(ALL)
function showIni(){
  let liString = ``;
  let list = document.querySelector(".list");
  data.forEach((item, index, array) => {
    liString += `<li>${item.name}，${item.charge}</li>`;
  });
  list.innerHTML = liString;
}

// 以UL為區域偵測，判斷觸發顯示按鈕
// filter.addEventListener("click", function (e) {
//   let liString = ``;
//   let list = document.querySelector(".list");
//   if (e.target.className == 'showFree') {
//     data.forEach((item, index, array) => {
//       if (item.charge == '免費') {
//         liString += `<li>${item.name}，${item.charge}</li>`;
//       }
//     });
//   }else if (e.target.className == 'showCoin') {
//     data.forEach((item, index, array) => {
//       if (item.charge == '投幣式') {
//         liString += `<li>${item.name}，${item.charge}</li>`;
//       }
//     });    
//   } else {
//       data.forEach((item, index, array) => {
//         liString += `<li>${item.name}，${item.charge}</li>`;
//       });  
//   }
//   list.innerHTML = liString;
// })

// 以UL為區域偵測，判斷觸發顯示按鈕(參考老師寫法)
filter.addEventListener("click", function (e) {
  if (e.target.value == undefined) {
    return;
  }
  let liString = ``;
  let list = document.querySelector(".list");
  data.forEach((item, index, array) => {
    if (e.target.value == '全部') {
      liString += `<li>${item.name}，${item.charge}</li>`;
    }else if (e.target.value == item.charge){
      liString += `<li>${item.name}，${item.charge}</li>`;
    }
  });
  list.innerHTML = liString;
})

showIni();


axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
