import { setMode } from '@/redux/features/authSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
  const mode = useSelector((state: any) => state.mode);
  const dispatch = useDispatch();
  const toggleMode = () => {
    dispatch(setMode());
  }
  const li = ['Home', 'Explore']
  return (
    <div className='flex w-[100vw] h-[13vh] justify-between dark:bg-white'>
      <p className='w-[20%] font-mono font-bold m-auto flex justify-center dark:text-black'>palettlepulse</p>
      <ul className='w-[10%] flex justify-between m-auto list-none'>
        {li.map((item) => (
          <li key={item} className='font-mono font-bold flex items-center'>{item}</li>
        ))}
      </ul>
      <div className='w-[60%] flex justify-around items-center'>
        <input type='text' className='w-[40%] h-[50%] px-8 outline-none bg-slate-800' placeholder='Search..' />
        <div className='w-[40%] flex items-center justify-around'>
          <a><i className="fa-solid fa-cart-shopping text-2xl"></i></a>
          <a className='flex items-center'><i className="fa-solid fa-bell text-2xl"></i><div className='w-[10%] h-[10%] bg-red-500 rounded-full flex justify-center items-center text-white font-bold'></div></a>
          {mode === "light" ? <i className="fa-regular fa-moon text-2xl" onClick={() => {toggleMode()}}></i> : <i className="fa-regular fa-sun text-2xl" onClick={() => {toggleMode()}}></i>}
          <div><i className="fa-solid fa-user-circle text-3xl"></i></div>
        </div>
      </div>
    </div>
  )
}
