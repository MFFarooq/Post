'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'

export const CommentCount = (pid:any) => {
    const [count, setCount]=useState('');
    useEffect(() => {
        axios.get("http://localhost:8000/api/comments/" + pid.pid)
            .then(res => {
                setCount(res.data.length);
            })
            .catch(err=>{
                console.error(err);
            })
    }, []);
  return (
    <div>{count}</div>
  )
}

