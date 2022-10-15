import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './indexpage.scss';
import Task from '../components/task/checktask';
import { instance } from '../axiosconf';

function IndexPage() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getTasks = async () => {
    try {
      const res = await instance.get();
      setTasks(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  function handleChangeInput(event) {
    event.preventDefault();
    setTask(event.target.value);
  }
  async function removeTask(id) {
    try {
      const res = await instance.delete('', { data: { id: id } });
      console.log(res.data);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }
  async function insertTask(e) {
    e.preventDefault();
    setLoading(true);
    const res = await instance.post('', { task: task });
    if (res.status == 200) {
      setLoading(false);
    }
    setTask('');
    getTasks();
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className='root-index'>
      <div className='content'>
        <div className='header'>
          <h1>📌</h1>
          <h1>วันที่ดีมักเริ่มจากการทำอะไรง่ายๆ </h1>
          <h2>หากวันนี้คุณคิดไม่ออกให้เริ่มจากทำอะไรง่าย ๆ 3 อย่าง :) </h2>
        </div>
        <hr />
        <ul>
          {loading && <h3>Loading...............</h3>}
          {error && <h3>error...............</h3>}
          {tasks
            .slice(0)
            .reverse()
            .map((task, i) => (
              <div className='task-wrapper' key={task.id}>
                <Task task={task} />
                <div className='trash' onClick={() => removeTask(task.id)}>
                  <Trash />
                </div>
              </div>
            ))}
          <div className='add-task'>
            <input
              className='input'
              type='text'
              name='task'
              value={task}
              onChange={(e) => handleChangeInput(e)}
              placeholder='ไปกินกาแฟร้านโปรด ....... '
            />
            <button
              disabled={task ? false : true}
              style={{ cursor: task ? 'pointer' : 'not-allowed' }}
              onClick={(e) => insertTask(e)}
            >
              เพิ่มสิ่งที่จะทำวันนี้
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default IndexPage;

function Trash() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='#f8f8f8'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      width={25}
      height={25}
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
      />
    </svg>
  );
}
