// 地區用 change 監聽
// 上方新增的地區跟下方篩選的地區都寫死選項（依照目前提供的 JSON data area 欄位）
// 地區的篩選下拉需要加上『全部地區』option
// 不需要有「清除資料」的按鈕
// 預設資料為 3 筆（內容需依照目前提供的 JSON data）
// 篩選後會顯示『搜尋資料為 ? 筆』
// 描述欄位使用 textarea
// 星級區間是 1-10 分
// 金額、組數、星級的 type 為 Number

let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];

const card = document.querySelector('.ticketCard-area');
const filter = document.querySelector('.regionSearch');
const filterCount = document.querySelector('#searchResult-text');
const addBtn = document.querySelector('.addTicket-btn');
const addTicket = document.querySelector('.addTicket-form');

// console.log(addTicket.ticketName.value);

// 初始化已有旅遊行程
function initialTravel(params) {
  let travelContent = '';
  data.forEach(function(item,index){
    travelContent += `
    <li class="ticketCard">
    <div class="ticketCard-img">
      <a href="#">
        <img src=${item.imgUrl} alt="">
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
          ${item.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
      </div>
    </div>
  </li>
    `;
  });
  card.innerHTML = travelContent;
}
initialTravel();
// console.log(travelContent);

// 篩選旅遊行程
filter.addEventListener("change",function (e) {
  let travelContent = '';
  let searchCount = 0;
  data.forEach(function(item,index) {
    if (e.target.value == '') {
      searchCount++;
      travelContent += `
      <li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src=${item.imgUrl} alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${item.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>
      `;
    } else if(e.target.value == item.area){
      searchCount++;
      travelContent += `
      <li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src=${item.imgUrl} alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${item.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>
      `;
    }
  })
  card.innerHTML = travelContent;
  filterCount.textContent = `本次搜尋共 ${searchCount} 筆資料`;
})


// 新增旅遊行程
addBtn.addEventListener("click",function (e) {
  if (addTicket.ticketName.value.length == 0) {
    alert("請輸入套票名稱");
    return;
  }
  if (addTicket.ticketImgUrl.value.length == 0) {
    alert("請輸入圖片網址");
    return;
  }
  if (addTicket.ticketRegion.value.length == 0) {
    alert("請選擇景點地區");
    return;
  }
  if (addTicket.ticketDescription.value.length == 0) {
    alert("請輸入套票描述");
    return;
  }
  if (isNaN(parseInt(addTicket.ticketNum.value, 10))) {
    alert("套票組數請輸入數字");
    return;
  }
  if (parseInt(addTicket.ticketNum.value, 10) < 0) {
    alert("套票組數不可小於零");
    return;
  }
  if (isNaN(parseInt(addTicket.ticketPrice.value, 10))) {
    alert("套票金額請輸入數字");
    return;
  }
  if (parseInt(addTicket.ticketPrice.value, 10) < 0) {
    alert("套票金額不可小於零");
    return;
  }
  if (isNaN(parseInt(addTicket.ticketRate.value, 10))) {
    alert("套票星級請輸入數字");
    return;
  }
  if (parseInt(addTicket.ticketRate.value, 10) < 0 || parseInt(addTicket.ticketRate.value, 10) > 10) {
    alert("套票星級必須在1~10之間");
    return;
  }

  let obj = {};
  obj.name = addTicket.ticketName.value;
  obj.imgUrl = addTicket.ticketImgUrl.value;
  obj.area = addTicket.ticketRegion.value;
  obj.description = addTicket.ticketDescription.value;
  obj.group = parseInt(addTicket.ticketNum.value, 10);
  obj.price = parseInt(addTicket.ticketPrice.value, 10);
  obj.rate = parseInt(addTicket.ticketRate.value, 10);
  data.push(obj);
  alert("成功新增旅遊套票");
  initialTravel();
})



