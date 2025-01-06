'use client'
import React, { useState } from 'react'
import styles from "@/app/styles.module.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const NewComment = (pid:any) => {
  const [desc, setDesc] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [flag, toggleFlag] = useState(false);
  const [msg, setMsg] = useState("");

  const onSubmit = async (data: any) => {
    setMsg('');
    await axios.post("http://localhost:8000/api/comments", {
        postId: pid.pid,
        name: data.name,
        description: data.description
    })
        .then(res => {
            console.log(res.data);
            setDesc('');
            setMsg("Thank you for your comment.");
            toggleFlag(!flag);
            setTimeout(() => {
                toggleFlag(flag => !flag)
            }, 3000);
        })
        .catch(err => {
            console.log(err.response.data.errors);
        })
};
const onChange = (e: any) => {
      setDesc(e.target.value);
}
  return (
    // Add New Comment
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset style={{ borderRadius: '7px', marginBottom: '7px' }}>
        <div>
          <h3>New Comment...!</h3>
        </div>
        <div>
          <textarea className={styles.uText} style={{width:'60%'}} {...register("description", { required: true, minLength: 5 })} placeholder="Type a comment..." id="descid" rows={10} onChange={onChange} value={desc}></textarea>
        </div>
        <div>
          <button className={styles.bCancel}>Reset</button>
          <button className={styles.bNewComment} type="submit">Submit</button>
          {
            errors.description?.type == "minLength" && <p style={{ color: 'red' }}>Minimum length of comment is 5 charactors.</p>
          }
        </div>
        <div>
          {flag ? <p style={{ color: 'green' }}>{msg}</p> : null}
        </div>
      </fieldset>
      <br />
    </form>
  )
}
