
'use client'
import { useEffect, useState } from "react";
import styles from "@/app/styles.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import AllPosts from "./allposts/page";

function PostForm() {
    const [api, setApi] = useState([]);
    const [descMsg, setDescMsg] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(true);
    const [flag, toggleFlag] = useState(false);
    const [postCount, setPostCount] = useState("0");

    useEffect(() => {
        axios.get("http://localhost:8000/api/posts")
            .then(res => {
                setApi(res.data);
                setPostCount(res.data.length);
            })
            .catch(err=>{
                console.log('Server is not running. '+err);
            });
    }, []);

    const onSubmit = async (data: any) => {
        setDescMsg('');
        await axios.post("http://localhost:8000/api/posts", {
            name: data.name,
            description: data.description
        })
            .then(res => {
                console.log(res.data);
                setShow(true);
                setDescMsg("Thank you for your post.");
                setDesc('');
                toggleFlag(!flag);
                setTimeout(() => {
                    toggleFlag(flag => !flag)
                }, 5000);
            })
            .catch(err => {
                console.log(err.response.data.errors);
            })
    };
    const onChange = (e: any) => {
        if (e.target.name == 'name')
            setName(e.target.value);
        else
            setDesc(e.target.value);
    }
    const ResetPost = () => {
            setName('');
            setDesc('');
    }
    return <div className={styles.newpost} style={{}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset style={{ borderRadius: '7px', marginBottom: '7px', boxShadow: '0px 0px 9px 0px darkgreen', border:'none', backgroundImage: 'linear-gradient(180deg, darkgreen, transparent)', width:'60%' }}>
                <div style={{ color: 'white' }}>
                    <div style={{ position: 'relative', textAlign: 'right', top: '5px' }}>Total Posts ({postCount})</div>
                    <div style={{ position: 'relative', textAlign: 'left', top: '5px' }}></div>

                    <div style={{ position: 'absolute', top: '5px', left: '10%', right: '10%' }}>{flag ? <p style={{ color: '#adffad' }}>{descMsg}</p> : null}
                        {
                            errors.description?.type == "minLength" && <p style={{ color: '#fd9898' }}>Minimum length of post is 5 charactors.</p>
                        }
                    </div>
                    <div>
                        <h1>Post it... What You Want...</h1>
                    </div>
                </div>
                <div>
                    <input className={styles.uText} type="text" 
                    {...register("name", { required: true, minLength: 3 })} style={{width:'60%', marginBottom:'5px', height:'17px'}} placeholder="Your name please..." id="nameid" onChange={onChange} value={name} />
                    
                    <textarea className={styles.uText} style={{width:'60%'}} 
                    {...register("description", { required: true, minLength: 5 })} placeholder="Type a post...message...or anything you just want to share with others..." id="descid" rows={10} onChange={onChange} value={desc}></textarea>
                </div>
                <div>
                    <button className={styles.bCancel} onClick={ResetPost}>Reset</button>
                    <button className={styles.btnSubmit} type="submit">Submit</button>

                </div>
                <div>

                </div>
            </fieldset>
            <br />
        </form>
        {show &&
            <div>
                {api.map((p: any, index) => {
                    return (
                        <fieldset key={index} style={{ display: 'flex', borderRadius: '7px 7px', marginBottom: '15px', backgroundColor: 'rgb(221 247 221)', border:'none', boxShadow: '0px 0px 9px 0px darkgreen', width: '60%' }}>
                            <div style={{ width: '3%', marginTop: '15px' }}>
                                <div>{index + 1}</div>
                            </div>
                            <div style={{ width: '97%' }}>
                                <AllPosts post={{ id: p.id, name: p.name, description: p.description, createdAt: p.createdAt, updatedAt: p.updatedAt }} />
                            </div>
                        </fieldset>)
                })}
            </div>
        }
    </div>
}

export default PostForm