'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'

export const PostCount = () => {
    const [count, setCount]=useState('');
    useEffect(() => {
        axios.get("http://localhost:8000/api/posts")
            .then(res => {
                setCount(res.data.length);
            })
            .catch(err=>{
                console.error(err);
            })
    }, [true]);
  return (
    <div>{count}</div>
  )
}