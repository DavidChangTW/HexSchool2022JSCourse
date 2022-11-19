// 可用到的情境
// 1.避免深層出錯
// 2.可作為深層判斷
// 3.避免API資訊不正確導致錯誤

const person = {
  myName: '小明',
  age: 16,
  like: '鍋燒意麵',
  url: 'https://randomuser.me/api/',
  friend: {
    Jay: {
      name: '杰',
      id: 1,
    },
    Auntie:{
      name: '阿姨',
      id: 2,
    },
  },
};

// 因為物件內的資料若有缺漏，會導致前端程式出錯，使程式無法往下執行。
// 為避免這個狀況發生，前端必須寫很多判斷式來避免這個問題。
console.log(person.friend.Jay.id);
// 解決的方式可以在物件名稱後面加上問號，當找不到該物件時，會被判斷為「undefined」。
console.log(person.friend?.david?.id);
// 因此採用可選串連的寫法，可以快速判斷該物件是不是存在。
if (person?.friend?.Jay?.id) {
  console.log(person.friend.Jay);
}