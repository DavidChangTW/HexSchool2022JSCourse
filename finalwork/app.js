const constraints = {
  姓名: {
    presence: {
      message: "是必填欄位"
    },
  },
  電話:{
    presence: {
      message: "是必填欄位"
    },
    length: {
      minimum: 8,
      maximum: 10,
      message: "需輸入8~10位數"
    },
    numericality: {
      onlyInteger: true,
      message: "需輸入數字"
    },
  },
  Email:{
    presence: {
      message: "是必填欄位"
    },
    email: {
      message: "格式錯誤"
    },
  },
  寄送地址:{
    presence: {
      message: "是必填欄位"
    },
  }
};


// *取得商品清單
axios.get('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/products')
.then(function (response) {
  // 成功會回傳的內容
  // console.log(response.data.products);
  initialProducts(response.data.products);

  // *產品搜尋
  filterProduct(response.data.products);


  // *加入購物車
  const productWrap = document.querySelector('.productWrap');
  productWrap.addEventListener("click",function (e) {
    e.preventDefault();
    if (e.target.nodeName === 'A') {
      console.log(e.target.getAttribute('data-id'));
      addCarts(e.target.getAttribute('data-id'), 1);  // *傳入購物產品ID與數量
    }
  })

})
.catch(function (error) {
// 失敗會回傳的內容
  console.log(error);
})

// *產品搜尋
function filterProduct(ary) {
  const productSelect = document.querySelector('.productSelect');
  productSelect.addEventListener("change", function (e) {
    if (e.target.value === '全部') {
      initialProducts(ary);
    } else {
      let tempData = [];
      ary.forEach(function (item) {
        if (e.target.value === item.category) {
          tempData.push(item);
        }
      })
      initialProducts(tempData);
    }
  });
}

// *產品清單渲染
function initialProducts(ary) {
  const productWrap = document.querySelector('.productWrap');
  let productStr = '';
  ary.forEach(function (item, index) {
    productStr += `
    <li class="productCard">
    <h4 class="productType">${item.category}</h4>
    <img src="${item.images}" alt="">
    <a href="#" class="addCardBtn" data-id='${item.id}'>加入購物車</a>
    <h3>${item.title}</h3>
    <del class="originPrice">>NT$${item.origin_price.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}</del>
    <p class="nowPrice">NT$${item.price.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}</p>
    </li>  
    `;
  });
  productWrap.innerHTML = productStr;
}

/**
 * *加入購物車 
 * @param productsId 產品ID
 * @param productsQuantity 該產品加入購物車數量
 */ 
function addCarts(productsId, productsQuantity) {
  let tempProductsQuantity = 0;
  // *先取得既有購物車內容
  axios.get('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts')
  .then(function (response) {
    // *
    response.data.carts.forEach(function (item) {
      if (item.product.id === productsId) {
        tempProductsQuantity = item.quantity;
      }
    }) 
    tempProductsQuantity += productsQuantity;

    // *將產品加入購物車
    axios.post('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts',
    {
      "data": {
        "productId": productsId,
        "quantity": tempProductsQuantity
        // "quantity": productsQuantity
      }  
    })
    .then(function (response) {
      // 成功會回傳的內容
      console.log(response.data);
      initialCarts(response.data.carts, response.data);
    })
    .catch(function (error) {
    // 失敗會回傳的內容
      console.log(error);
    })

  })
  .catch(function (error) {
    // 失敗會回傳的內容
    console.log(error);
  })
}

// *取得購物車 
axios.get('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts')
.then(function (response) {
  // 成功會回傳的內容
  console.log(response.data);
  initialCarts(response.data.carts, response.data);
})
.catch(function (error) {
  // 失敗會回傳的內容
  console.log(error);
})

// *購物車渲染
function initialCarts(ary,obj) {
  const shoppingCart = document.querySelector('.shoppingCart-table');
  let cartStr = ' \
  <tr> \
  <th width="40%">品項</th> \
  <th width="15%">單價</th> \
  <th width="15%">數量</th> \
  <th width="15%">金額</th> \
  <th width="15%"></th> \
  </tr> \
  ';
  ary.forEach(function (item, index) {  //<td>${item.quantity}</td>
    cartStr += `
    <tr>
      <td>
        <div class="cardItem-title">
            <img src="${item.product.images}" alt="">
            <p>${item.product.title}</p>
        </div>
      </td>
      <td>NT$${item.product.price.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}</td>
      
      <td><input type="number" min="0" max="100" id="quantity" value=${item.quantity} data-id=${item.id}></td>
      <td>NT$${(item.product.price*item.quantity).toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}</td>
      <td class="discardBtn">
        <a href="#" class="material-icons" data-id="${item.id}">
            clear
        </a>
      </td>
    </tr> 
    `;
  });
  cartStr += ` \
  <tr> \
  <td> \
      <a href="#" class="discardAllBtn">刪除所有品項</a> \
  </td> \
  <td></td> \
  <td></td> \
  <td> \
      <p>總金額</p> \
  </td> \
  <td>NT$${obj.finalTotal.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}</td> \
  </tr> \  
  `;
  shoppingCart.innerHTML = cartStr;

  const discardAllBtn = document.querySelector('.discardAllBtn');
  const discardBtn = document.querySelectorAll('.discardBtn');
  
  // *刪除購物車內所有商品
  discardAllBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target.nodeName);
    console.log(e.target.getAttribute('class'));
    if (e.target.nodeName === 'A') {
      axios.delete('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts/')
      .then(function (response) {
        console.log(response.data);
        alert(response.data.message);
        initialCarts(response.data.carts, response.data); // *刪除完成，重新渲染
      })
      .catch(function (error) {
        // 失敗會回傳的內容
        console.log(error);
        alert(error.message);
      })      
    }
  })
  
  // *刪除購物車內某項商品
  discardBtn.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(e.target.nodeName);
      console.log(e.target.getAttribute('data-id'));
      if (e.target.nodeName === 'A') {
        axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts/${e.target.getAttribute('data-id')}`)
        .then(function (response) {
          console.log(response.data);
          // alert(response.data.message);
          initialCarts(response.data.carts, response.data); // *刪除完成，重新渲染
        })
        .catch(function (error) {
          // 失敗會回傳的內容
          console.log(error);
          // alert(error.message);
        })
      }      
    })
  })

  // *更新購物車數量
  const quantityBtn = document.querySelectorAll('#quantity');
  quantityBtn.forEach(function (item) {
    item.addEventListener('change', function (e) {
      if (e.target.nodeName === 'INPUT') {
        if (parseInt(e.target.value) === 0) {
          alert("商品數量不可為0");
          return;
        }
        console.log(e.target.getAttribute('data-id'));
        console.log(e.target.value);
        axios.patch(`https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts`,
        {
          "data": {
            "id": e.target.getAttribute('data-id'),
            "quantity": parseInt(e.target.value) 
          }  
        })
        .then(function (response) {
          console.log(response.data);
          // alert(response.data.message);
          initialCarts(response.data.carts, response.data); // *更新完成，重新渲染
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

const orderInfoBtn = document.querySelector('.orderInfo-btn');
const orderInfoForm = document.querySelector('.orderInfo-form');
const orderInfoMessage = document.querySelectorAll('.orderInfo-message');
const inputs = document.querySelectorAll("input[type=text],input[type=tel],input[type=email]");

inputs.forEach((item) => {
  // console.log(item)
    
   // console.log(item.nextElementSibling)
    item.addEventListener("input", function() {
      //預設為空值
      item.nextElementSibling.textContent = "";
      
      // 驗證回傳的內容
      let errors = validate(orderInfoForm, constraints);
      // console.log(errors)
      
      //呈現在畫面上
      if(errors){
        // console.log(Object.keys(errors)) //keys -> 屬性
        
        Object.keys(errors).forEach(function(keys) {
          // console.log(keys); 
          document.querySelector(`.${keys}`).textContent = errors[keys] 
        })
      }
    });
  });

// *訂單格式檢查，成功即送出訂單
orderInfoBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target.value);

  let checkOkay = true; // *資料檢查旗標
  orderInfoMessage.forEach(function (item) {
    console.log(item.textContent);
    if (item.textContent !== '') {
      checkOkay = false;
    }
  })
  // *若有資料檢查未通過，即跳出
  if (!checkOkay) {
    return;
  } 

  let orders = {}
  orders.name = document.getElementById('customerName').value;
  orders.tel = document.getElementById('customerPhone').value;
  orders.email = document.getElementById('customerEmail').value;
  orders.address = document.getElementById('customerAddress').value;
  orders.payment = document.getElementById('tradeWay').value;
  console.log(orders);
  addOrders(orders);
  orderInfoForm.reset();
})

// *新增訂單
function addOrders(orders) {
  axios.post('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/orders',
  {
    "data": {
      "user": orders
    }  
  })
  .then(function (response) {
    // 成功會回傳的內容
    console.log(response);
    alert(`預訂成功，您的預訂編號為${response.data.id}`);
    window.location.reload();
  })
  .catch(function (error) {
  // 失敗會回傳的內容
    console.log(error);
    alert("預訂失敗");
  })
}

