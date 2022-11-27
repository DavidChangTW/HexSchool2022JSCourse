const token = {
  headers: {
    'Authorization': 'l8RBNxrth3etIQcXKV4Kn3OaZdi2'
  }
};

// 取得所有預定清單
axios.get('https://livejs-api.hexschool.io/api/livejs/v1/admin/davidchang/orders', token)
.then(function (response) {
  // 成功會回傳的內容
  console.log(response.data.orders);
  initialOrders(response.data.orders);

})
.catch(function (error) {
// 失敗會回傳的內容
  console.log(error);
})

function initialOrders(orders) {
  const orderPageTable = document.querySelector('.orderPage-table');
  let ordersStr = ' \
  <thead> \
    <tr> \
        <th>訂單編號</th> \
        <th>聯絡人</th> \
        <th>聯絡地址</th> \
        <th>電子郵件</th> \
        <th>訂單品項</th> \
        <th>訂單日期</th> \
        <th>訂單狀態</th> \
        <th>操作</th> \
    </tr> \
  </thead> \
  ';

  let productsObj = {}
  let categoryObj = {};
  let productsArray = [];

  orders.forEach(function (item,index) {
    let datetime;

    // datetime = new Date(item.createdAt * 1000).toLocaleString();  // 將時間戳記轉換回當地日期時間字串
    datetime = `${new Date(item.createdAt * 1000).getFullYear()}/${new Date(item.createdAt * 1000).getMonth()}/${new Date(item.createdAt * 1000).getDate()}`;  // 將時間戳記轉換並取出年月日
    ordersStr += `
    <tr>
      <td>${item.id}</td>
      <td>
        <p>${item.user.name}</p>
        <p>${item.user.tel}</p>
      </td>
      <td>${item.user.address}</td>
      <td>${item.user.email}</td>
      <td>
    `;

    item.products.forEach(function(item){
      ordersStr += `<p>${item.title}</p>`;

      // console.log(item.category);
      if (categoryObj[item.category]) {
        categoryObj[item.category].該類別營收 += item.price*item.quantity;
      } else {
        categoryObj[item.category] = {類型:item.category};
        categoryObj[item.category].該類別營收 = item.price*item.quantity;
      }

      // console.log(item.title);
      if (productsObj[item.title]) {
        productsObj[item.title].該產品營收 += item.price*item.quantity;
        productsObj[item.title].該產品銷售數量 += item.quantity;
      } else {
        productsObj[item.title] = {類型:item.title};
        productsObj[item.title].該產品營收 = item.price*item.quantity;
        productsObj[item.title].該產品銷售數量 = item.quantity;
      }
    })
    
    ordersStr += `    
      </td>
      <td>${datetime}</td>
      <td class="orderStatus">
        <a href="#" data-id = ${item.id}>${item.paid ? "已處理" : "未處理"}</a>
      </td>
      <td>
        <input type="button" class="delSingleOrder-Btn" data-id = ${item.id} value="刪除">
      </td>
    </tr>    
    `;
  });
  orderPageTable.innerHTML = ordersStr;
  // console.log(categoryObj);
  console.log(productsObj);

  let categoryData = [];
  let category = Object.keys(categoryObj);
  // area output ["床架","窗簾","收納"]
  category.forEach(function(item,index){
    let ary = [];
    ary.push(item);
    ary.push(categoryObj[item].該類別營收);
    categoryData.push(ary);
  })
  console.log(categoryData);  

  let productsData = [];
  let products = Object.keys(productsObj);
  // area output ["Charles 雙人床架","Louvre 雙人床架／雙人加大","Antony 雙人床架／雙人加大",.....]
  products.forEach(function(item,index){
    let ary = [];
    ary.push(item);
    ary.push(productsObj[item].該產品營收);
    productsData.push(ary);
  })  

  productsData.sort(function(a, b) {
    // boolean false == 0; true == 1
    return b[1] > a[1]? 1 : -1;
  });
  console.log(productsData);

  let productsSortData = [];
  let otherSum = 0;
  productsData.forEach(function (item,index) {
    // console.log(item,index);
    if (index <= 2) {
      productsSortData.push(item);
    } else {
      otherSum += item[1];
      if (index === (productsData.length-1)) {
        productsSortData.push(['其他',otherSum]);
      }
    }
  })
  console.log(productsSortData);

  // C3.js
  let chartCategory = c3.generate({
    bindto: '#chartCategory', // HTML 元素綁定
    data: {
        type: "pie",
        columns: categoryData,
        // colors:{
        //     "Louvre 雙人床架":"#DACBFF",
        //     "Antony 雙人床架":"#9D7FEA",
        //     "Anty 雙人床架": "#5434A7",
        //     "其他": "#301E5F",
        // }
    },
  });

  let chartProducts = c3.generate({
    bindto: '#chartProducts', // HTML 元素綁定
    data: {
        type: "pie",
        // columns: productsData,
        columns: productsSortData,
        // colors:{
        //     "Louvre 雙人床架":"#DACBFF",
        //     "Antony 雙人床架":"#9D7FEA",
        //     "Anty 雙人床架": "#5434A7",
        //     "其他": "#301E5F",
        // }
    },
  });

  const discardAllBtn = document.querySelector('.discardAllBtn');
  const delSingleOrderBtn = document.querySelectorAll('.delSingleOrder-Btn');
  const orderStatus = document.querySelectorAll('.orderStatus');
  
  // console.log(discardAllBtn);
  // console.log(delSingleOrderBtn);
  // console.log(orderStatus);

  // 刪除全部訂單
  discardAllBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target.nodeName);
    console.log(e.target.getAttribute('class'));
    if (e.target.nodeName === 'A') {
      axios.delete('https://livejs-api.hexschool.io/api/livejs/v1/admin/davidchang/orders', token)
      .then(function (response) {
        console.log(response.data);
        alert(response.data.message);
        initialOrders(response.data.orders);
      })
      .catch(function (error) {
        // 失敗會回傳的內容
        console.log(error);
        alert(error.message);
      })      
    }
  })
  
  // 刪除單筆訂單
  delSingleOrderBtn.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(e.target.nodeName);
      console.log(e.target.getAttribute('data-id'));
      if (e.target.nodeName === 'INPUT') {
        axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/davidchang/orders/${e.target.getAttribute('data-id')}`, token)
        .then(function (response) {
          console.log(response.data);
          initialOrders(response.data.orders);
          alert('成功刪除單筆訂單');
        })
        .catch(function (error) {
          // 失敗會回傳的內容
          console.log(error);
          // alert(error.message);
        })
      }      
    })
  })

  // 更新單筆訂單
  orderStatus.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(e.target.nodeName);
      console.log(e.target.getAttribute('data-id'));
      console.log(e.target.textContent);
      if (e.target.nodeName === 'A') {
        axios.put('https://livejs-api.hexschool.io/api/livejs/v1/admin/davidchang/orders',{
          "data": {
            "id": e.target.getAttribute('data-id'),
            "paid": (e.target.textContent==='已處理') ? false : true
          }
        }, token)
        .then(function (response) {
          console.log(response.data);
          initialOrders(response.data.orders);
          alert('成功更新單筆訂單狀態');
        })
        .catch(function (error) {
          // 失敗會回傳的內容
          console.log(error);
          // alert(error.message);
        })
      }      
    })
  })

}



