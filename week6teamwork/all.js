// 抓取各產業的薪資滿意度、產業滿意度的平均分數
// 撈取男性跟女性比例有多少
// 自行思考自己要如何撈想撈的資料，以及組員會如何實作

//https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json?token=AAQWFQDSNRRXC6FBW7PDSETBOESVW


let data = [];
let tempData = {};
  // axios get 範例
  axios.get('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json?token=AAQWFQDSNRRXC6FBW7PDSETBOESVW')        //LV2
  .then(function (response) {
    //console.log(response.data);
    data = response.data;
    // console.log(data);
    tempData = data.reduce(function (acc,item) {
      if (acc?.[item.company.industry]) {
        acc['00總計'].總人數++;
        acc[item.company.industry].人數++;
        acc[item.company.industry].薪資滿意度總和 += parseInt(item.company.salary_score);
        acc[item.company.industry].產業滿意度總和 += parseInt(item.company.score);

        if (item.gender === '女性') {
          acc[item.company.industry].女性人數++;
          acc['00總計'].女性人數++; 
        }else if(item.gender === '男性'){
          acc[item.company.industry].男性人數++;
          acc['00總計'].男性人數++; 
        }
      }else{
        acc['00總計'].總人數++;
        acc[item.company.industry] = {'人數': 1};
        acc[item.company.industry].產業名稱 = item.company.industry;
        acc[item.company.industry].薪資滿意度總和 = parseInt(item.company.salary_score);
        acc[item.company.industry].產業滿意度總和 = parseInt(item.company.score);

        if (item.gender === '女性') {
          acc[item.company.industry].女性人數 = 1;
          acc[item.company.industry].男性人數 = 0;
          acc['00總計'].女性人數++; 
        }else if(item.gender === '男性'){
          acc[item.company.industry].女性人數 = 0;
          acc[item.company.industry].男性人數 = 1;
          acc['00總計'].男性人數++;
        }
      }
      return acc;
    },{'00總計': {'總人數': 0,'女性人數': 0,'男性人數': 0}})
    //console.log(tempData);
    //console.log(Object.values(tempData));

    Object.values(tempData).forEach(function (item, index) {
      if (index == 0) {
        console.log(`所有工程師人數為${item.總人數}人，女性占比為${(item.女性人數*100/item.總人數).toFixed(2)}%，男性占比為${(item.男性人數*100/item.總人數).toFixed(2)}%`);
      } else {
        console.log(`產業：${item.產業名稱}，人數為${item.女性人數+item.男性人數}人，薪資滿意度為${(item.薪資滿意度總和/(item.女性人數+item.男性人數)).toFixed(2)}，產業滿意度為${(item.產業滿意度總和/(item.女性人數+item.男性人數)).toFixed(2)}`);
      }
    })
  })
  .catch(function (error) {
    console.log(error);
  });

