
'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { AllComments } from "@/app/comments/page";
import { NewComment } from "@/app/comments/newcomment/page";
import styles from "@/app/styles.module.css"
import { CommentCount } from "@/app/comments/commentcount/page";

const AllPosts = ({ post }: any) => {

    const [api, setApi] = useState([]);
    const [show, setShow] = useState(false);
    const [showNewComment, setShowNewComment] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [desc, setDesc] = useState("");
    const [msg, setMsg] = useState("");
    const [MsgFlag, toggleMsgFlag] = useState(false);

    const onDelete = async () => {
        if (confirm('Do you want to delete this post?')) {
            await axios.delete("http://localhost:8000/api/posts/" + post.id, post.id)
                .then(res => {
                    setShow(false);
                    //console.log(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
        }
    };
    const onUpdate = async () => {
        await axios.put("http://localhost:8000/api/posts/" + post.id, {
            id: post.id,
            name: post.name,
            description: desc
        })
            .then(res => {
                setShow(false);
                setMsg("Post updated successfully.")

                toggleMsgFlag(!MsgFlag);
                setTimeout(() => {
                    toggleMsgFlag(MsgFlag => !MsgFlag)
                }, 3000);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const onEdit = () => {
        if (show == true) {
            setShow(false);
            setShowComments(false);
            setShowNewComment(false);
        }
        else {
            setShow(true);
        }
    };
    const onChange = (e: any) => {
        setDesc(e.target.value);
    };
    const onCancel = () => {
        setShow(false);
    };
    const onAddNewComment = () => {
        setShowComments(true);
        !showNewComment ? setShowNewComment(true) : setShowNewComment(false)
    }
    const onComments = () => {
        !showComments ? setShowComments(true) : setShowComments(false);
    }
    useEffect(() => {
        axios.get("http://localhost:8000/api/comments/" + post.id)
            .then(res => {
                console.log(res.data);
                setApi(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [api]);
    return (
        //All Posts with their comments
        <div>
            {/* All Posts */}
            <div>
                <div style={{ display: 'flex' }}>
                    {/*Post Description Part */}
                    <div style={{ width: '70%', padding: '5px' }}>
                        <div style={{ textAlign: 'left', boxShadow: '1px 1px 3px 0px black', borderRadius: '5px', backgroundColor: 'white', padding: '5px', minHeight: '50px' }}>
                            {/* Description */}
                            <div style={{}}>
                                {post.description}
                            </div>
                            {/* Update Comment Textbox, Cancel, Update */}
                            <div>
                                {show && (<div>
                                    <textarea onChange={onChange} defaultValue={post.description} name="desc" rows={5} className={styles.uText} />
                                </div>)}
                                {show && (<div>
                                    <button onClick={onCancel}>Cancel</button>
                                    <button onClick={onUpdate}>Update</button>
                                </div>)}
                                {MsgFlag ? <p style={{ color: 'green' }}>{msg}</p> : null}
                            </div>
                        </div>
                        {/* Comments and Add New Comment */}
                        <div style={{ width: '100%', marginTop: '15px' }}>
                            <div style={{ fontSize: '12px', float: 'left' }}>
                                {!show && (
                                    <div style={{ display: 'flex' }}>

                                        <button onClick={onComments} style={{ border: 0, backgroundColor: 'transparent', color: 'gray', cursor: 'pointer', padding: '0', display: 'flex' }}>Comments ({<CommentCount pid={post.id} />}) {showComments ? '▼' : '►'}</button>
                                    </div>
                                )}
                            </div>
                            <div style={{ fontSize: '12px', float: 'right' }}>
                                {!show && (
                                    <div style={{ right: '0' }}>
                                        <button onClick={() => onAddNewComment()} style={{ border: 0, backgroundColor: 'transparent', color: 'gray', cursor: 'pointer', padding: '0' }}>Add New Comment {showNewComment ? '▼' : '►'}</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Posted by, Posted at, Updated at, Edit, Delete */}
                    <div style={{ verticalAlign: 'top', textAlign: 'right', width: '29%', fontSize: 'smaller' }}>
                        <div>Posted by: {post.name}</div>
                        <br />
                        <div>Posted at: {(new Date(post.createdAt)).toLocaleString()}</div>
                        <div>Updated at:{post.updatedAt == null ? '...' : (new Date(post.updatedAt)).toLocaleString()}</div>
                        <div>
                            {!show && (
                                <div style={{ right: '0' }}>
                                    <button style={{ border: 0, backgroundColor: 'transparent', textDecoration: 'underline', color: 'navy', cursor: 'pointer', padding: '0' }} onClick={onEdit}>Edit</button>
                                    {" "}|{" "}
                                    <button style={{ border: 0, backgroundColor: 'transparent', textDecoration: 'underline', color: 'maroon', cursor: 'pointer', padding: '0' }} onClick={onDelete}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Comments loop for the the post */}
            <div style={{ animationName: 'example', animationDuration: '4s', animationDelay: '2s' }}>
                {/* Add New Comment Component */}
                {showNewComment === true ? <NewComment pid={post.id} /> : false}
                
                {/* All Comments */}
                {showComments ? <div>
                    {api.map((c: any) => {
                        return (
                            <div key={c.id}>
                                <AllComments comment={{
                                    id: c.id, postId: c.postId, description: c.description,
                                    createdAt: c.createdAt, updatedAt: c.updatedAt, name: c.name
                                }} />
                            </div>
                        )
                    })}
                </div> : false}

            </div>
        </div>
    )
}

export default AllPosts