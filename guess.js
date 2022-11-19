let guessGame = ['剪刀', '石頭', '布', 'X'];
let playerA = guessGame[Math.floor(Math.random() * 4)];
let playerB = guessGame[Math.floor(Math.random() * 4)];

console.log(playerA,playerB);

if(playerA === '剪刀'){
  if(playerB === '剪刀'){
    console.log('平手');
  }else if(playerB === '石頭'){
    console.log('playerB 勝利');
  }else if(playerB === '布'){
    console.log('playerA 勝利');
  }else{
    console.log('playerB 不可亂出拳');
  }
}else if(playerA === '石頭'){
  if(playerB === '剪刀'){
    console.log('playerA 勝利');
  }else if(playerB === '石頭'){
    console.log('平手');
  }else if(playerB === '布'){
    console.log('playerB 勝利');
  }else{
    console.log('playerB 不可亂出拳');
  }  
}else if(playerA === '布'){
  if(playerB === '剪刀'){
    console.log('playerB 勝利');
  }else if(playerB === '石頭'){
    console.log('playerA 勝利');
  }else if(playerB === '布'){
    console.log('平手');
  }else{
    console.log('playerB 不可亂出拳');
  }  
}else{
  console.log('playerA 不可亂出拳');
}