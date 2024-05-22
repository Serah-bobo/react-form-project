import { useState } from "react"
import { useDispatch } from "react-redux"
import { addNewPost } from "./PostSlice";
import { nanoid } from "@reduxjs/toolkit";

const AddForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
  
    const onTitle=(e)=>
        setTitle(e.target.value);

    const onBody=(e)=>setBody(e.target.value)

    const onSavePost=()=>{
        if(title && body){
            dispatch(addNewPost({
                id:nanoid(),
                title,
                body}));
            setTitle('')
            setBody('')
        }
    }
    
  
  return (
    <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add a new post</h2>
        <form className="flex flex-col gap-4">
            <input
            type="text"
            placeholder="post title"
            value={title}
            onChange={onTitle}
            className="p-2 border border-gray-300 rounded"/>
            <textarea
            placeholder="post content"
            value={body}
            onChange={onBody}
            className="p-2 border border-gray-300 rounded"/>
            <button
            type="button"
            onClick={onSavePost}
            className="self-start px-4 py-2 bg-blue-700 text-white rounded shadow">
                Save Post
            </button>
        </form>
    </section>
  )
}

export default AddForm