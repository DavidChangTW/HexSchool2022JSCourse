// 一條長條圖：接案公司的薪資滿意度平均分數
// 二條長條圖：抓取博弈、電商公司兩個產業滿意度的平均分數
// 圓餅圖：撈取男性跟女性比例有多少
// 圓餅圖：顯示薪水區間分佈

//https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json?token=AAQWFQDSNRRXC6FBW7PDSETBOESVW


let data = [];
let tempData = {};
let temp1Data = {};
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
    // console.log(tempData);
    // console.log(Object.values(tempData));

    temp1Data = data.reduce(function (acc,item) {
      if (acc?.[item.company.salary]) {
        acc[item.company.salary].人數++;
      }else{
        acc[item.company.salary] = {'人數': 1};
        acc[item.company.salary].薪水級距 = item.company.salary;
      }
      return acc;
    },{})
    // console.log(tempData);
    console.log(Object.values(temp1Data));

    Object.values(tempData).forEach(function (item, index) {
      if (index == 0) {
        console.log(`所有工程師人數為${item.總人數}人，女性占比為${(item.女性人數*100/item.總人數).toFixed(2)}%，男性占比為${(item.男性人數*100/item.總人數).toFixed(2)}%`);
      } else {
        console.log(`產業：${item.產業名稱}，人數為${item.女性人數+item.男性人數}人，薪資滿意度為${(item.薪資滿意度總和/(item.女性人數+item.男性人數)).toFixed(2)}，產業滿意度為${(item.產業滿意度總和/(item.女性人數+item.男性人數)).toFixed(2)}`);
      }
    })


    let salaryScoreData = []; //接案公司的薪資滿意度平均分數
    let scoreData = []; //抓取博弈、電商公司兩個產業滿意度的平均分數
    let genderData = []; //撈取男性跟女性比例有多少
    let salaryData = []; //顯示薪水區間分佈

    Object.values(tempData).forEach(function(item,index){
      let ary1 = [];
      let ary2 = [];

      if (index == 0) {
        ary1.push('男性');
        ary1.push(item.男性人數);
        genderData.push(ary1);
        ary2.push('女性');
        ary2.push(item.女性人數);
        genderData.push(ary2);        
      } else {
        ary1.push(item.產業名稱);
        ary1.push((item.薪資滿意度總和/(item.女性人數+item.男性人數)).toFixed(2));
        salaryScoreData.push(ary1);
        ary2.push(item.產業名稱);
        ary2.push((item.產業滿意度總和/(item.女性人數+item.男性人數)).toFixed(2));
        scoreData.push(ary2);        
      }
    })

    Object.values(temp1Data).forEach(function(item,index){
      let ary = [];
      ary.push(item.薪水級距);
      ary.push(item.人數);
      salaryData.push(ary); 
    })
    console.log(genderData);
    console.log(salaryScoreData);
    console.log(scoreData);
    console.log(salaryData);

    // 將 薪資滿意度平均分數 丟入 c3 產生器
    const chartSalaryScoreData = c3.generate({
      bindto: "#chartSalaryScoreData",
      data: {
        columns: salaryScoreData,
        type : 'bar',
        hide: true
      },
      bar: {

      }
    });
    chartSalaryScoreData.show('接案公司');

    // 將 產業滿意度平均分數 丟入 c3 產生器
    const chartScoreData = c3.generate({
      bindto: "#chartScoreData",
      data: {
        columns: scoreData,
        type : 'bar',
        hide: true
      },
      bar: {

      }
    });
    chartScoreData.show(['博奕','電子商務']);

    // 將 男性跟女性比例 丟入 c3 產生器
    const chartGenderData = c3.generate({
      bindto: "#chartGenderData",
      data: {
        columns: genderData,
        type : 'pie',
      },
      pie: {

      }
    });

    // 將 薪水區間分佈丟入 c3 產生器
    const chartSalaryData = c3.generate({
      bindto: "#chartSalaryData",
      data: {
        columns: salaryData,
        type : 'pie',
      },
      pie: {

      }
    });


  })
  .catch(function (error) {
    console.log(error);
  });

