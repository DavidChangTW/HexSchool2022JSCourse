// 可用到的情境
// 1.將物件展開、合併陣列
// 2.將物件擴展，轉為另一個物件
// 3.將陣列變數展開作為一個個參數
// 4.將類陣列轉為純陣列

const people = ['大雄','多拉A夢','靜香'];
const person = {
  myName: '小明',
  age: 16,
  like: '鍋燒意麵',
  url: 'https://randomuser.me/api/',
};

console.log(people);      //
console.log(...people);   //...陣列，可將陣列拆解成獨立字串
console.log(person);      //
console.log({...person}); //{...物件}，可將物件拆解成獨立字串

// 合併陣列
const people1 = ['小夫','胖虎'];
const people2 = [...people,...people1]; // 合併陣列
console.log(people2);

// 物件賦予是傳參考的概念，2個物件會指向同一組記憶體。
// 因此修改person1之值，等同修改person。
const person1 = person;
person1.myName = '小王';
console.log(person.myName);
console.log(person1 === person);

// 若要產生一個完全不同的物件，就要使用淺層拷貝。
const person2 = {...person};  // 淺層拷貝
console.log(person2 === person);
person2.myName = '小張';
console.log(person.myName);

// 陣列變數展開作為一個個參數
function fn(n1, n2, n3) {
  console.log(n1, n2, n3);
}
fn(...people);


// 將累陣列轉為純陣列
function fn1() {
  console.log(arguments); // 可用arguments取出傳入參數，會以陣列的方式呈現，稱為類陣列。但無法存取此陣列。
  const arg = [...arguments]; // 將類陣列轉為純陣列
  arg.forEach(a => {
    console.log(a);
  })
}
fn1(1, 2, 3, 4, 5);

// 當參數數量不確定時
// 優點是純陣列，不會有轉型的問題
function fn2(a, ...arg) {
  console.log(a, arg);
  arg.forEach(a => {
    console.log(typeof a, a);
  })
}
fn2(6, 7, 8, 9, '10');