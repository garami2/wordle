// 5글자 단어 (존재하는 단어 아니어도 됨)_event 사용
const 정답 = "APPLE";

let index = 0;
let attempts = 0; // 시도 횟수 카운티 위해

function appStart() {
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    //정답확인
    let 맞은_개수 = 0;
    for (let i = 0; i < 5; i++) {
      //   console.log(i);
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      //   console.log(block.innerText);
      const 입력_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      console.log(입력_글자, 정답_글자);
      if (입력_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "#6aaa64";
      } else if (정답.includes(입력_글자)) {
        //문자열.includes('찾을 문자열') -> true, false 반환
        block.style.background = "#c9b458";
      } else {
        block.style.background = "#787c7e";
      }
      block.style.color = "white";
    }
    if (맞은_개수 === 5) gameover();
    else {
      nextLine();
    }
  };

  //로직 구현
  const handleKeydown = (event) => {
    // console.log("키 눌림", event); // 콘솔에 이벤트 정보 확인 할 수 있음
    // console.log(event.key, event.keyCode);
    const key = event.key.toUpperCase(); //문자열.toUpperCase -> 소문자 대문자로 변환 (문자열만 가능)
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    // a : 65 ,z : 90, enter : 13 , backspacd : 8
    if (index === 5) {
      if (event.keyCode === 13) handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      //같은 표현이라 볼 수 있음
      index += 1;
      //   index++;
      //   index = index + 1;
    }
  };

  window.addEventListener("keydown", handleKeydown);
}

// 함수 실행
appStart();
