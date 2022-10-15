import axios from 'axios';
import React, { useState } from 'react';
import { instance } from '../../axiosconf';
import './checkbox.scss';
export default function Task({ task }) {
  const [data, setData] = useState(task);
  const setInitData = () => {
    setData(task, { ...task });
  };

  const handleChange = async (event) => {
    // console.log(event.target.checked);
    // console.log(event.target.name);
    setData({ ...data, status: event.target.checked === true ? 1 : 0 });
    // eslint-disable-next-line eqeqeq
    try {
      const body = { ...data, status: event.target.checked === true ? 1 : 0 };
      const res = await instance.put('', body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={task.id} className='container-wrapper'>
      <label
        className={`container`}
        style={{
          textDecoration: data.status === 1 ? 'line-through' : 'none',
          color: data.status === 1 ? '#FF8787' : '',
        }}
      >
        <input
          type='checkbox'
          defaultChecked={data.status}
          onChange={handleChange}
          name='status'
        />
        {data.task}
        <span className='checkmark'></span>
      </label>
    </div>
  );
}
