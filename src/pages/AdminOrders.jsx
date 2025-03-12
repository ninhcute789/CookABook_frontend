import { use, useEffect, useState } from "react";
// import SideBar from "../components/common/SideBar";

const AdminOrders = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const handleChange = (event) => {
    setTodo(event.target.value);
  };
  const handleClick = () => {
    setTodoList([todo, ...todoList]);
  };
  const handleDelete = (index) => {
    setTodoList(todoList.filter((item, i) => i !== index));
  };

  return (
    <div className=" w-full bg-gray-100">
      {/* <div className="flex flex-col">
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
                <div className="flex w-24 h-24 bg-yellow-400 grow  justify-center">siu</div>
            </div> */}
      <div className="justify-center flex items-center">
        <input
          type="text"
          placeholder="Add a todo"
          className="bg-white m-5 rounded"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer
            rounded text-white px-2 py-1 "
          onClick={handleClick}>
          Add
        </button>
      </div>
      <div className=" flex-col items-center w-fit mx-auto">
        {todoList.map((item, index) => {
          return (
            <div key={index}>
              <div className="bg-white text-black px-2 py-1 m-2 ">
                {item}
                <button
                  onClick={(index) => {
                    handleDelete(index);
                  }}
                  className="bg-black hover:bg-red-500 hover:cursor-pointer
                text-white px-1 rounded ml-2">
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrders;
