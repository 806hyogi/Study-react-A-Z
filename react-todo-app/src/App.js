// 클래스 컴포넌트로 제작

import React, {useState, useCallback} from "react"; // 리엑트 라이브러리에서 컴포넌트 가져옴
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";
import List from "./components/List";

export default function App() { // 확장

  // State를 생성해서 리랜더링해서 (새로고침) 보여준다.
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");


  // 클릭 이벤트 발생시 함수 호출
  // useCallback을 이용한 함수 최적화
  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData); // state를 바꾸려면
  },
  [todoData]
  );

  // 다이어리에 제출하는 부분
  const handleSubmit = (e) => {

    // 폼 안에 input을 전송할때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    // 월래 있던 할 일에 새로운 할 일 더해주기, 입력란에 있던 글씨 지워주기
    setTodoData(prev =>
        [...prev, newTodo]
    );
    setValue("");
  };

  // 모두 삭제하는 부분
  const handleRemoveClick = () => {
    setTodoData([]);
  }
 


  // 클래스 컴포넌트를 사용할때 랜더 사용
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1 style={{ fontFamily: "dailyfont", fontSize: 30, marginBottom: 10}}>🍓효기's 다이어리🍓</h1>
          <button style={{ fontFamily: "dailyfont"}} onClick={handleRemoveClick}>전체 지우기</button>
        </div>
        <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData} /> {/* todoData를 props로 보냄 */}
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} /> {/* handleSubmit을 props로 보냄 */}

      </div>
    </div>
  )

}