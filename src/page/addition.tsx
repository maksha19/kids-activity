import classNames from "classnames";
import React, { CSSProperties, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { StrictModeDroppable } from "../components/StrictModeDroppable";
import _lodash from "lodash";

type stateElement = {
  id: string;
  content: string;
};
// fake data generator
const getItems = (count: number, answer: string[]): stateElement[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}-${new Date().getTime()}`,
    content: answer[k],
  }));

const reorder = (
  list: stateElement[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: stateElement[],
  destination: stateElement[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: Record<string, stateElement[]> = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any
): CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0  ${grid}px`,
  height: "9vh",
  width: "9vh",
  borderRadius: "50%",

  // change background colour if dragging
  background: isDragging ? "#D9753B" : "#F2D335",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "#2A3A59" : "#2A3A59",
  display: "flex",
  // padding: grid,
  // overflow: "auto",
  alignItems: "center",
  minHeight: "20vh",
  minWidth: "20vh",
});

const Addition = () => {
  const [state, setState] = useState<stateElement[][]>([]);
  const [initNumbersList, setInitNumbersList] = useState<number[]>([]);
  const [cardFlipper, setCardFlipper] = useState(false);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    const firstNumber = ~~(Math.random() * 10);
    const secondNumber = ~~(Math.random() * 20);
    const answer = firstNumber + secondNumber;
    const options = new Set<string>([answer.toString()]);

    while (options.size < 4) {
      const x = ~~(Math.random() * 20);
      console.log(x);
      options.add(x.toString());
    }

    console.log(options);

    setInitNumbersList([firstNumber, secondNumber, answer]);
    const state1: stateElement[] = [];
    const state2 = getItems(4, _lodash.shuffle([...options]));
    setState([state1, state2]);
    setCardFlipper(!cardFlipper);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(source, destination);

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (Number(state[sInd][source.index].content) !== initNumbersList[2]) {
      return;
    }

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setState(newState);
    }
  };

  return (
    <div className="h-screen grid grid-cols-6 mt-[20%] container">
      <div className="col-span-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <div className="flex justify-center mt-10 ">
              <div className="mx-8 text-4xl">{String(initNumbersList[0])}</div>
              <div className="mx-8 text-4xl">{"+"}</div>
              <div className="mx-8 text-4xl">{String(initNumbersList[1])}</div>
            </div>

            <div className="flex justify-center overflow-auto p-8">
              <StrictModeDroppable
                key={0}
                droppableId={"0"}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    className="justify-center sticky"
                  >
                    <div className="h-[12vh] w-[12vh] bg-[#f3f2ef] absolute "></div>
                    {state[0].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div className="z-30">
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className="flex items-center justify-center"
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                                className="justify-center text-4xl"
                              >
                                {item.content}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </div>
            <div className="h-10vh"></div>
            <div className="flex justify-center mx-4">
              <StrictModeDroppable
                key={1}
                droppableId={"1"}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    className={classNames("flex-none")}
                  >
                    {state[1].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className={classNames(
                              "flex items-center justify-center"
                            )}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                              className={classNames("text-4xl")}
                            >
                              {item.content}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </div>
            <div className="flex justify-center">
              <button
                className="text-white font-bold w-40 py-2 px-4 m-4 rounded border-b-4  bg-blue-500 border-blue-700 hover:border-blue-500  hover:bg-blue-400 "
                onClick={() => refreshList()}
              >
                NeXt
              </button>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Addition;
