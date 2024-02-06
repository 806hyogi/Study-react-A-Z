import React, { useState } from 'react';

// 계속 반복되는 리랜더링을 방지함
const List = React.memo(({
  id,
  title,
  completed,
  todoData,
  setTodoData,
  provided,
  snapshot,
  handleClick
}) => {

  // 수정을 하는 기능
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  // 체크박스 클릭했을때 선 그어지는 부분
  const handleCompleChange = (id) => {
    let newTodoData = todoData.map((data) => { // 맵을 통해 데이터의 id값을 비교해서 완료 여부를 적용함
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  }

  // 수정하기 버튼을 클릭했을때 값을 변경하는 효과를 가지고 있다.
  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  }

  // 저장하기 부분 (save 클릭했을때)
  const handleSubmit = (e) => {

    e.preventDefault();

    // 맵을 통해서 데이터의 내용이 같으면 새로운 데이터를 setTodoData에 반영시킨다.
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(newTodoData);
    setIsEditing(false); // 수정하기 종료된다.
  };

  if (isEditing) {
    return (
      // 수정부분
      <div
        className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>

        <div className="item-center">
          <form onSubmit={handleSubmit}>
            <input
              value={editedTitle}
              onChange={handleEditChange}
              className='w-full px-3 py-2 mr-4 text-gray-500 rounded'
            />
          </form>

        </div>
        <div className="items-center">
          <button className="px-4 py-2 float-right" onClick={() => setIsEditing(false)} type='button'>x</button>
          <button onClick={handleSubmit} className="px-4 py-2 float-right" type='submit'>save</button>
        </div>
      </div>
    )
  } else {
    return (
      // 입력부분
      <div key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
        className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>

        <div className="item-center">
          <input
            type='checkbox'
            onChange={() => handleCompleChange(id)}
            defaultChecked={completed}
          />{" "}
          <span className={completed ? "line-through" : undefined}>{title}</span>
        </div>
        <div className="items-center">
          <button className="px-4 py-2 float-right" onClick={() => handleClick(id)}>x</button>
          <button className="px-4 py-2 float-right" onClick={() => setIsEditing(true)}>edit</button>
        </div>
      </div>
    );
  }
}
);


export default List;