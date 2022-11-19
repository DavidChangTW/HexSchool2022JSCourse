import fetch from 'node-fetch';

const person = {
  myName: '小明',
  age: 16,
  like: '鍋燒意麵',
  url: 'https://randomuser.me/api/',
};

//取出特定值
//const myName = person.myName; //一般寫法
//const {myName, age, like} = person; //解構寫法
//console.log(myName, age, like);

const people = ['大雄','多拉A夢','靜香'];
const [A, B, C] = people; //陣列解構
//console.log(A, B, C);

//重新命名，從person取出myName後，再賦予到newName
const {myName: newName, age: newAge, like: newLike} = person; //解構寫法
//console.log(newName, newAge, newLike);

//設定預設值`,若原本的物件宣告沒有值，可賦予一個預設值
const {like = '拉麵'} = person;
//console.log(like);


//將解構應用在AJAX，因為Node預設沒有安裝fetch模組，所以要先安裝「node-fetch」。
//而「node-fetch」不支援以require的方式載入，只支援ESM import(import fetch from 'node-fetch';)，所以要在「pachage.json」文件中加入「"type": "module"」。
fetch('https://randomuser.me/api/')
  .then(res => {
    return res.json();
  })
  .then(json => {
    //console.log(json.results[0]);   //一般寫法
    const [result] = json.results;  //解構寫法
    //console.log(result);
    const {email, phone} = result;  //解構出電子郵件與手機
    //console.log(email, phone);
  })

//在函式中應用解構
  //  Vue,react-> Props
function fn({myName,url}) {
  console.log(myName,url);
}
fn(person);

//在函式回傳值應用解構
function fn2() {
  return{
    myName: '小明',
    age: 16,
    like: '鍋燒意麵',
    url: 'https://ems.allis.com.tw',
  };
}
const {url} = fn2();
console.log(url);



