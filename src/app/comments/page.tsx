'use client'
import axios from 'axios';
import React, { useState } from 'react'
import styles from '@/app/styles.module.css';

export const AllComments = ({ comment }: any) => {
    const [desc, setDesc] = useState("");
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const [flag, toggleFlag] = useState(false);

    const onDelete = async (cid: any) => {
        if (confirm('Do you want to delete this post?')) {
            await axios.delete("http://localhost:8000/api/comments/" + cid, cid)
                .then(res => {
                    setShow(false);
                })
                .catch(err => {
                    console.log(err);
                });

                toggleFlag(!flag);
                setTimeout(() => {
                    toggleFlag(flag => !flag)
                }, 5000);
        }
        else {
        }
    };
    const onUpdate = async (cid: any) => {
        await axios.put("http://localhost:8000/api/comments/" + cid, {
            id: cid,
            name: comment.name,
            description: desc
        })
            .then(res => {
                setShow(false);
                setMsg("Comment updated successfully.")

                toggleFlag(!flag);
                setTimeout(() => {
                    toggleFlag(flag => !flag)
                }, 5000);
            })
            .catch(err => {
                console.error(err);
            });
    };
    const onEdit = (cid: any) => {
        setShow(true);
    };
    const onChange = (e: any) => {
        setDesc(e.target.value);
    };
    const onCancel = () => {
        setShow(false);
    };
    return (
        //Comments Structure
        <fieldset style={{ borderRadius: '7px', marginBottom: '7px', backgroundColor: 'white', boxShadow: '1px 1px 5px 0px darkgreen', border:'none' }}>
            
            <div key={comment.id} style={{ borderBottom: '3px double gray' }}>
                <div style={{ width: '100%', padding: "5px", display: 'flex' }}>
                    <div style={{ textAlign: 'left', width: '70%' }}>
                        <div>
                            {comment.description}
                        </div>
                        <div>
                            {show && (<div>
                                <textarea defaultValue={comment.description} name="desc" rows={5} onChange={onChange}
                                     className={styles.uText} />
                            </div>)}
                            {show && (<div>
                                <button onClick={onCancel}>Cancel</button>
                                <button onClick={() => onUpdate(comment.id)}>Update</button>
                            </div>)}
                            {flag ? <p style={{ color: 'green' }}>{msg}</p> : null}
                        </div>
                    </div>
                    <div style={{ verticalAlign: 'top', textAlign: 'right', width: '29%', fontSize: 'smaller' }}>
                        <div>Commented at: {(new Date(comment.createdAt)).toLocaleString()}</div>
                        <div>Updated at: {comment.updatedAt == null ? '...' : (new Date(comment.updatedAt)).toLocaleString()}</div>
                        <div style={{ fontSize: '12px', float: 'right' }}>
                            {!show && (
                                <div style={{ right: '0' }}>
                                    <button onClick={() => onEdit(comment.id)} style={{ border: 0, backgroundColor: 'transparent', textDecoration: 'underline', color: 'navy', cursor: 'pointer', padding: '0' }}>Edit</button>
                                    {" "}|{" "}
                                    <button onClick={() => onDelete(comment.id)} style={{ border: 0, backgroundColor: 'transparent', textDecoration: 'underline', color: 'maroon', cursor: 'pointer', padding: '0' }}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}
