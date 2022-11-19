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

function bmiStates(type) {
  return `您的體重${type.state}，健康指數為${type.color}`;
}

function printBMI(height, weight) {
  
  if ( (typeof height != 'number') || (typeof weight != 'number') ){
    return "您的數值輸入錯誤，請重新輸入";
  }
  let bmi = (weight * 10000 / (height * height)).toFixed(2) ;
  if (bmi < 18.5) {
    saveHistoryData(bmi, bmiStatesData.overThin);
    return bmiStates(bmiStatesData.overThin);
  } 
  else if (bmi >= 18.5 && bmi < 24 ) {

    saveHistoryData(bmi, bmiStatesData.normal);
    return bmiStates(bmiStatesData.normal);
  }
  else if (bmi >= 24 && bmi < 27 ) {
    saveHistoryData(bmi, bmiStatesData.overWeight);
    return bmiStates(bmiStatesData.overWeight);
  }
  else if (bmi >= 27 && bmi < 30 ) {
    saveHistoryData(bmi, bmiStatesData.mildFat);
    return bmiStates(bmiStatesData.mildFat);
  }
  else if (bmi >= 30 && bmi < 35 ) {
    saveHistoryData(bmi, bmiStatesData.moderateFat);
    return bmiStates(bmiStatesData.moderateFat);
  }
  else{
    saveHistoryData(bmi, bmiStatesData.severeFat);
    return bmiStates(bmiStatesData.severeFat);
  }
}

function saveHistoryData(bmi, obj) {
  bmiHistoryData.push({bmi, obj});
}

function showHistoryData() {
  let lastIndex = bmiHistoryData.length - 1;
  console.log(`您總共計算 ${bmiHistoryData.length} 次 BMI 紀錄，最後一次 BMI 指數為 ${bmiHistoryData[lastIndex].bmi}，體重${bmiHistoryData[lastIndex].obj.state}!健康指數為${bmiHistoryData[lastIndex].obj.color}!`);
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