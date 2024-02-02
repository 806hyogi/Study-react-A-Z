// 클래스 컴포넌트로 제작

import React, { Component } from "react"; // 리엑트 라이브러리에서 컴포넌트 가져옴
import "./App.css";

export default class App extends Component { // 확장

  // State를 생성해서 리랜더링해서 (새로고침) 보여준다.
  state = {
    // map() 메소드를 사용하여 데이터 생성
      todoData: [],
      value: "",
    };

  // JSX 안에서 스타일링
  btnstyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom:"1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    }
  }


  // 클릭 이벤트 발생시 함수 호출
  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter((data) => data.id !== id);
    this.setState({ todoData: newTodoData }) // state를 바꾸려면
  };

  // 다이어리에 추가하는 부분
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  // 다이어리에 제출하는 부분
  handleSubmit = (e) => {
    // 폼 안에 input을 전송할때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    }

    // 월래 있던 할 일에 새로운 할 일 더해주기, 입력란에 있던 글씨 지워주기
    this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
  }

  // 체크시 줄 그어지기
  handleCompleChange = (id) => {
    let newTodoData = this.state.todoData.map((data) => {
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    this.setState({ todoData: newTodoData });
  }


  render() { // 클래스 컴포넌트를 사용할때 랜더 사용
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1 style={{fontFamily: "dailyfont"}}>🍓효기's 다이어리🍓</h1>
          </div>

          {/* 할일 목록 */}
          <form style={{ display: 'flex' }} onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: '10', padding: '5px', border: 'none'}}
              placeholder="나만의 할일을 입력하세요."
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="전송"
              className="btn"
              style={{ flex: '1', fontFamily: "dailyfont", border: 'none', borderRadius: 50, color: 'black'}}
            />
          </form>

          {/* 데이터 */}
          {this.state.todoData.map((data) => ( 
            <div style={this.getStyle(data.completed)} key={data.id}>
              <p>
                <input type="checkbox" 
                onChange={() => this.handleCompleChange(data.id)}
                defaultChecked={false} 
                />
                {" "}{data.title} {/* 왼쪽 공백을 포함 */}
                <button style={this.btnstyle} onClick={() => this.handleClick(data.id)}>x</button>
              </p>
            </div>
          ))}
        </div>

        
      </div>
    )
  }
}