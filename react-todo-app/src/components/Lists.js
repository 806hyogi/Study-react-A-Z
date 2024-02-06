
// rfc를 통해서 초기값 불러온다.
import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  // 순차적으로 데이터 적용
  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치와 같은 드레그 이벤트에 대한 정보가 포함
    console.log(result);

    // 목적지가 없으면 (이벤트 취소) 이 함수를 종료합니다.
    if (!result.destination) return;

    // 리엑트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = [...todoData];

    // 1. 변경시키는 아이템을 배열에서 지워준다.
    // 2. return 값으로 지워진 아이템을 잡아준다. (위치 변경 가능하도록 함)
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert 해준다.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      handleClick={handleClick}
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />

                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});
export default Lists;


