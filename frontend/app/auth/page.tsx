"use client";
import BlankLayout from '@/components/layouts/BlankLayout';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function auth() {
  const router = useRouter();
  const checkEmail = (email: string) => {
    const emailRegex = new RegExp(
      '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    );
    return emailRegex.test(email);
  }
  const handleSubmit = async (e: any) => {
    console.log("submit");
    
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    if (!checkEmail(email)) {
      console.log("enter proper email");
      
      return;
    }
    const password = e.target[2].value;
    if (!password || password.length < 8) {
      console.log("password must be atleast 8 characters long");
      return;
    }
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      if (res.status === 400) {
        console.log("Email already Registered");
        return;
      }
      if (res.status === 500) {
        console.log("Server Error");
        return;
      }
      if (res.status === 201) {
        console.log(res.json());
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BlankLayout>
      <form className='flex flex-col w-[50%] h-full m-auto min-h-screen' onSubmit={handleSubmit}>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="password" placeholder="confirm password" />
        <button type="submit">Signup</button>
      </form>
    </BlankLayout>
  )
}
