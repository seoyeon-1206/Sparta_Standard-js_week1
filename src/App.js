import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const initialArray = [
    'apple',
    'bannana',
    'cherry',
    'date',
    'elderberry',
  ];

  const[array, setArray] = useState(initialArray);
  const[result, setResult] = useState("");
  const[query, setQuery] = useState("");
  //useState() 결과물은 배열이다 = [스테이트, 스테이트를제어하는함수]

  const handleForEach = (event) => {
    //원본배열 중 일부 뽑기
    let tempResult = "";
    array.forEach(function(fruits){
      tempResult += `${fruits}, `;
    });
    setResult(tempResult.slice(0,-2))
  };

  const handleFilter = () => {
    const filteredList = array.filter(function(fruits){
      //필터링을 할지말지 결정
      if (fruits.includes(query)) { //b쓰면 b들어간 단어만 나옴
        return true;
      }else{
        return false;
      }
      //return문에서 결정한다.
    });
    setResult(filteredList.join(" "))
  };

  //Map -> 원본배열의 (가공) 복제!!
  const handleMap = () => {
    const mappedList = array.map(function(fruits){
      return fruits.toUpperCase();
    })
    setResult(mappedList.join(", "))
  };

  const handleReduce = ()=> {
    //reduce는 input을 두 개 가짐!! acc(첫번째, 그 뒤는 undefined), cur(두번째부터 반환) 그리고 5번 실행되네?? (배열의 개수-1)개 실행
    const reduceList = array.reduce(function(acc, cur){
      
      //return문에서 acc결정된다.
      return `${acc}, ${cur}`;
    });
    setResult(reduceList);
  };

  //push가 안먹어요,,, state를 왜 직접 바꾸면 안돼? setResult를 통해서만 바꿀 수 있음 불변성을 유지하면서 바꾸는 방법 새롭게 배열을 만들자
  const handlePush = () => {
    if (!query){
      alert("값이 없어요")
      return false;
    }
    const newArr = [...array, query]
    setArray(newArr); //array의 state를 안바꿔주면 뒤에만 계속 갱신
    setResult(newArr.join(", "))
  }

  const handlePop = () => {
    const newArr = [...array];
    newArr.pop();
    setArray(newArr)
    setResult(newArr.join(', '))
  }

  const handleSlice = () => {
    const newArr =  [...array.slice(0, -2)]
    setArray(newArr)
    setResult(newArr.join(', '))
  }

  const handleSplice = () => {
    const middleIndex = Math.floor(array.length /2);
    array.splice(middleIndex, 2, "kiwi", "lime")
    setArray([...array])
    setResult(array.join(', '))
  }

  const handleIndexOf = () => {
    const index = array.indexOf(query)
    if (index !== -1) {
      setResult(index);
    }else {
      setResult(-1);
    }
  }

  const handleIncludes = () => {
    if (array.includes(query)) {
      setResult('true');
    } else{
      setResult('false');
    }
  }

  const handleFind = () => {
    const foundFruit = array.find(fruit=> fruit === query);
    if (foundFruit) {
      setResult(foundFruit);
    } else{
      setResult("Not Found")
    }
  }

  const handleSome = () => {
    const someFruit = array.some(fruit => fruit === query);
    if (someFruit) {
      setResult('true');
    }else{
      setResult('false');
    }
  }

  const handleEvery = () => {
    const everyFruit = array.every(fruit => fruit.length > 5);
    if (everyFruit) {
      setResult('true');
    }else{
      setResult('false');
    }
  }

  const handleSort = () => {
    const newArr = array.sort((a,b) => {
      if (a<b) return -1;
      if (a>b) return 1;
      return 0;
    })
    setArray(newArr);
    setResult(newArr.join(', '));
  }

  const handleJoin = () => {
    setResult(array.join(', '))
  }

  return (
    <div className="App">
      <h1>Standard반 배열 API</h1>
      <div> 
      <input value={query} onChange={function(e){
        setQuery(e.target.value);
      }}/>
      </div>
      <div> 
        {/* {inline 방식}->가독성 안좋음 */}
      <button onClick={handleForEach}>forEach</button>
      <button onClick={handleFilter}>filter</button>
      <button onClick={handleMap}>map</button>
      <button onClick={handleReduce}>reduce</button>
      <button onClick={handlePush}>push</button>
      <button onClick={handlePop}>pop</button>
      <button onClick={handleSlice}>slice</button>
      <button onClick={handleSplice}>splice</button>
      <button onClick={handleIndexOf}>indexOf</button>
      <button onClick={handleIncludes}>includes</button>
      <button onClick={handleFind}>find</button>
      <button onClick={handleSome}>some</button>
      <button onClick={handleEvery}>every</button>
      <button onClick={handleSort}>sort</button>
      <button onClick={handleJoin}>join</button>
      </div>
      <div>
        <strong>Array</strong> : {array.join(', ')}
      </div>
      <div>
        <strong>Result</strong> : {result}
      </div>
    </div>
  );
}

export default App;

//1. 배열 핸들링 (forEach, filter, map)
//2. reduce
// const test = [4, 1, 2, 10, 5];
//       const sum = test.reduce(function(acc,cur){
//         //acc에 계속해서 누적된 값을 더해주자
//         return acc + cur;
//       })
//3. push
  // push 후 배열의 총 길이 반환
//4. pop
// const originalArr = [1, 3, 2, 6, 10]
// const targetArr = [...originalArr] //원본 배열도 변해서 꼭 원본 저장해두기
// targetArr.pop()