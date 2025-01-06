'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'

export const CommentCount = (pid:any) => {
    const [count, setCount]=useState('');
    useEffect(() => {
        console.log(pid.pid)
        axios.get("http://localhost:8000/api/comments/" + pid.pid)
            .then(res => {
                setCount(res.data.length);
            })
            .catch(err=>{
                console.error(err);
            })
    }, [pid]);
  return (
    <div>{count}</div>
  )
}

