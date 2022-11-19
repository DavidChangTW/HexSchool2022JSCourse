const bmiStatesData = {
  "overThin": {
    "state": "過輕",
    "color": "藍色"
  },
  "normal": {
    "state": "正常",
    "color": "紅色"
  },
  "overWeight": {
    "state": "過重",
    "color": "澄色"
  },
  "mildFat": {
    "state": "輕度肥胖",
    "color": "黃色"
  },
  "moderateFat": {
    "state": "中度肥胖",
    "color": "黑色"
  },
  "severeFat": {
    "state": "重度肥胖",
    "color": "綠色"
  },
}

function printBMI(height, weight) {
  
  if ( (typeof height != 'number') || (typeof weight != 'number') ){
    return "您的數值輸入錯誤，請重新輸入";
  }
  let bmi = weight *10000 / (height * height) ;
  if (bmi < 18.5) {
    bmiHistoryData.push(`${bmi.toFixed(2)}，體重${bmiStatesData.overThin.state}!健康指數為${bmiStatesData.overThin.color}!`);
    return `您的體重${bmiStatesData.overThin.state}，健康指數為${bmiStatesData.overThin.color}`;
  } 
  else if (bmi >= 18.5 && bmi < 24 ) {
    bmiHistoryData.push(`${bmi.toFixed(2)}，體重${bmiStatesData.normal.state}!健康指數為${bmiStatesData.normal.color}!`);
    return `您的體重${bmiStatesData.normal.state}，健康指數為${bmiStatesData.normal.color}`;;
  }
  else if (bmi >= 24 && bmi < 27 ) {
    bmiHistoryData.push(`${bmi.toFixed(2)}，體重${bmiStatesData.overWeight.state}!健康指數為${bmiStatesData.overWeight.color}!`);
    return `您的體重${bmiStatesData.overWeight.state}，健康指數為${bmiStatesData.overWeight.color}`;;
  }
  else if (bmi >= 27 && bmi < 30 ) {
    bmiHistoryData.push(`${bmi.toFixed(2)}，體重${bmiStatesData.mildFat.state}!健康指數為${bmiStatesData.mildFat.color}!`);
    return `您的體重${bmiStatesData.mildFat.state}，健康指數為${bmiStatesData.mildFat.color}`;;
  }
  else if (bmi >= 30 && bmi < 35 ) {
    bmiHistoryData.push(`${bmi.toFixed(2)}，體重${bmiStatesData.moderateFat.state}!健康指數為${bmiStatesData.moderateFat.color}!`);
    return `您的體重${bmiStatesData.moderateFat.state}，健康指數為${bmiStatesData.moderateFat.color}`;;
  }
  else{
    bmiHistoryData.push(`${bmi.toFixed(2)}，體重${bmiStatesData.severeFat.state}!健康指數為${bmiStatesData.severeFat.color}!`);
    return `您的體重${bmiStatesData.severeFat.state},健康指數為${bmiStatesData.severeFat.color}`;;
  }
}

function showHistoryData() {
  console.log(`您總共計算 ${bmiHistoryData.length} 次 BMI 紀錄，最後一次 BMI 指數為 ${bmiHistoryData[bmiHistoryData.length-1]}`);
}

let bmiHistoryData = [];

console.log(printBMI(178, 20));
console.log(printBMI(178, 70));
console.log(printBMI(178, 85));
// console.log(printBMI(178, 90));
// console.log(printBMI(178, 110));
// console.log(printBMI(178, 130));
console.log(printBMI("身高","體重"));
console.log(showHistoryData());