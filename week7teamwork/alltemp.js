// 抓取各產業的薪資滿意度、產業滿意度的平均分數
// 撈取男性跟女性比例有多少
// 自行思考自己要如何撈想撈的資料，以及組員會如何實作

//https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json?token=AAQWFQDSNRRXC6FBW7PDSETBOESVW


let data = [];
let tempData = {};
  // axios get 範例
  axios.get('https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json?token=AAQWFQDSNRRXC6FBW7PDSETBOESVW')        //LV2
  .then(function (response) {
    console.log(response.data);
    data = response.data;

    tempData = data.reduce(function (acc,item) {
      if (acc?.[item.company.industry]) {
        acc[item.company.industry].人數++;
        acc[`${item.company.industry}薪資滿意度平均`] += parseInt(item.company.salary_score);
        acc[`${item.company.industry}薪資滿意度平均`] /= 2;
        acc[`${item.company.industry}產業滿意度平均`] += parseInt(item.company.score);
        acc[`${item.company.industry}產業滿意度平均`] /= 2;
        if (item.gender === '女性') {
          acc[`${item.company.industry}女性`]++;
          //acc[`${item.company.industry}女性`] /= 
        }else if(item.gender === '男性'){
          acc[`${item.company.industry}男性`]++;
        }
      }else{
        acc[item.company.industry] = {'人數': 1};
        acc[`${item.company.industry}薪資滿意度平均`] = parseInt(item.company.salary_score);
        acc[`${item.company.industry}產業滿意度平均`] = parseInt(item.company.score);
        if (item.gender === '女性') {
          acc[`${item.company.industry}女性`] = 1;
          acc[`${item.company.industry}男性`] = 0;
        }else if(item.gender === '男性'){
          acc[`${item.company.industry}男性`] = 1;
          acc[`${item.company.industry}女性`] = 0;
        }
      }
      //acc[`${item.company.industry}薪資滿意度平均`] /= acc[item.company.industry];

      return acc;
    },{})
    console.log(tempData);
  })
  .catch(function (error) {
    console.log(error);
  });






