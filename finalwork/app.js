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


// 取得商品清單
axios.get('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/products')
.then(function (response) {
  // 成功會回傳的內容
  // console.log(response.data.products);
  initialProducts(response.data.products);

  // 產品搜尋
  const productSelect = document.querySelector('.productSelect');
  productSelect.addEventListener("change", function (e) {
    if (e.target.value === '全部') {
      initialProducts(response.data.products);
    } else {
      let tempData = [];
      response.data.products.forEach(function (item) {
        if (e.target.value === item.category) {
          tempData.push(item);
        }
      })
      initialProducts(tempData);
    }
  });

  // 加入購物車
  // const addCardBtn = document.querySelector('.addCardBtn');
  const productWrap = document.querySelector('.productWrap');
  productWrap.addEventListener("click",function (e) {
    e.preventDefault();
    if (e.target.nodeName === 'A') {
      console.log(e.target.getAttribute('data-id'));
      addCarts(e.target.getAttribute('data-id'),5);
    }
  })

})
.catch(function (error) {
// 失敗會回傳的內容
  console.log(error);
})

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

function addCarts(productsId, productsQuantity) {
  axios.post('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts',
  {
    "data": {
      "productId": productsId,
      "quantity": productsQuantity
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
}

// 取得購物車 
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
  ary.forEach(function (item, index) {
    cartStr += `
    <tr>
      <td>
        <div class="cardItem-title">
            <img src="${item.product.images}" alt="">
            <p>${item.product.title}</p>
        </div>
      </td>
      <td>NT$${item.product.price.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")}</td>
      <td>${item.quantity}</td>
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
  
  discardAllBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(e.target.nodeName);
    console.log(e.target.getAttribute('class'));
    if (e.target.nodeName === 'A') {
      axios.delete('https://livejs-api.hexschool.io/api/livejs/v1/customer/davidchang/carts/')
      .then(function (response) {
        console.log(response.data);
        alert(response.data.message);
        initialCarts(response.data.carts, response.data);
      })
      .catch(function (error) {
        // 失敗會回傳的內容
        console.log(error);
        alert(error.message);
      })      
    }
  })
  
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
          initialCarts(response.data.carts, response.data);
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
    item.addEventListener("change", function() {
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

orderInfoBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target.value);

  let checkOkay = false;

  orderInfoMessage.forEach(function (item) {
    if (item.textContent !== '') {
      checkOkay = false;
    }
    else checkOkay = true;
  })

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

