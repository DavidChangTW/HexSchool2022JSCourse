const myName = '小王';
const callName = function () {
  console.log(this.myName);
}
const person = {
  myName: '小王',
  
  /*函式原始寫法 
  callName: function () {
  */
  callName() { //函式縮寫，「: function」可以移除。
    console.log(this.myName);
  },
};
//person.callName();

//屬性縮寫，宣告一個空物件，並將1~4行的宣告帶入，若是變數名稱相同即可進行縮寫。
const person1 = {
  /*原始寫法
  myName: myName,
  callName: callName,
  //*/
  //*縮寫寫法
  myName,
  callName
  //*/
};
person1.callName();
console.log(person1);


// 建立新物件，加入其他的屬性
// 搭配展開，擴展物件製作新屬性
const person2 = {
  ...person,
  method () {console.log('這是一個新方法');
  }
};
person2.myName = 'David';
person2.method();
console.log(person2);