// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
// <h1 class="title">註冊與登入功能實作</h1>
// <h2>註冊功能：</h2>
// 帳號：
// <input type="text" class="singup_account">
// <br>
// 密碼：
// <input type="password" class="singup_password">
// <br>
// <input type="button" value="註冊" class="singup">
// <h2>登入功能：</h2>
// 帳號：
// <input type="text" class="singin_account">
// <br>
// 密碼：
// <input type="password" class="singin_password">
// <br>
// <input type="button" value="登入" class="singin">



// <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
// <script src="all.js"></script>
    

// </body>
// </html>

//URL: https://hexschool-tutorial.herokuapp.com/api/signup
//URL: https://hexschool-tutorial.herokuapp.com/api/signin


let singUpAccount = document.querySelector('.singup_account');
let singUpPassword = document.querySelector('.singup_password');
let singUpBtn = document.querySelector('.singup');
let singInAccount = document.querySelector('.singin_account');
let singInPassword = document.querySelector('.singin_password');
let singInBtn = document.querySelector('.singin');


// 註冊
singUpBtn.addEventListener("click",function (e) {
  signUp();
})

function signUp() {
  
  if (singUpAccount.value == "" || singUpPassword.value == "") {
    alert('請輸入正確資訊');
    return;
  }
  
  let obj = {};
  obj.email = singUpAccount.value;
  obj.password = singUpPassword.value;
  
  console.log(obj);

  // axios post 範例
  axios.post('https://hexschool-tutorial.herokuapp.com/api/signup', obj)
  .then(function (response) {
    console.log(response);
    alert(response.data.message);
    // if (response.data.message == '帳號註冊成功') {
    //   alert('成功註冊');
    // } else {
    //   alert('無法註冊，此Mail使被他人使用');
    // }
  })
  .catch(function (error) {
    console.log(error);
    alert(response.data.message);
  });
}
// 登入
singInBtn.addEventListener("click",function (e) {
  signIn();
})

function signIn() {
  
  if (singInAccount.value == "" || singInPassword.value == "") {
    alert('請輸入正確資訊');
    return;
  }
  
  let obj = {};
  obj.email = singInAccount.value;
  obj.password = singInPassword.value;
  
  // console.log(obj);

  // axios post 範例
  axios.post('https://hexschool-tutorial.herokuapp.com/api/signin', obj)
  .then(function (response) {
    console.log(response);
    alert(response.data.message);
    // if (response.data.message == '帳號註冊成功') {
    //   alert('成功註冊');
    // } else {
    //   alert('無法註冊，此Mail使被他人使用');
    // }
  })
  .catch(function (error) {
    console.log(error);
    alert(response.data.message);
  });
}
