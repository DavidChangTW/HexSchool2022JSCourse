// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
// <h1 class="title">To-Do List實作</h1>
// <h2 class="addh2">新增待辦項目：
//     <input type="text" class="addlist" placeholder="請輸入待辦事項">
//     <input type="button" value="儲存待辦" class="save">
// </h2>

// <h2>代辦項目清單：</h2>
// <ul class="list">
//     <li>待辦事項一<input type="button" class="delete" value="刪除"></li>
// </ul>



// <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
// <script src="all.js"></script>
// </body>
// </html>


let data = [
  {
    message: '拜訪客戶'
  },
  {
    message: '確認行程'
  },
  {
    message: '回報狀況'
  },
];
const addlist = document.querySelector('.addlist');
const save = document.querySelector('.save');
const list = document.querySelector('.list');


// console.log(addh2);
// console.log(addlist);
// console.log(btnCreate);
// console.log(list);

list.addEventListener('click',function (e) {
  console.log(e.target.getAttribute('data-index'));
  console.log(e.target.nodeName);
  if (e.target.nodeName === 'INPUT') {
    data.splice(parseInt(e.target.getAttribute('data-index')),1);
    renderList();
  }


})

function renderList() {
  let str = ``;
  data.forEach((item, index) => {
    str += `<li>${item.message}<input type="button" data-index="${index}" class="delete" value="刪除"></li>`;
  });
  list.innerHTML = str;
}
renderList();

save.addEventListener('click',function (e) {
  if (addlist.value === "") {
    alert('請輸入待辦事項!!');
    return;
  }
  let obj = {};
  obj.message = addlist.value;
  data.push(obj) ;
  renderList();
})