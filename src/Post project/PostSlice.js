//createslice to create the slices and actions of state
//createasyncthunk allows one to create asychronous thunks.Thunks  are functions that can be dispatched ti perfomr asychronous 
// logic eg,api request error handling it gives pending fullfilled and rejected hence we use extrareducer to define reducers to
//respond to  actions generated
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts=createAsyncThunk(
    'posts/fetchPosts',
    async()=>{
        const response=await fetch('https://jsonplaceholder.typicode.com/posts')
        const data=await response.json();
        return data;
    }
)
//async for creating new post
export const addNewPost=createAsyncThunk(
    'posts/addNewPost',
    async(initialPost)=>{
        const response=await fetch ('https://jsonplaceholder.typicode.com/posts',
            {
            method:'POST',
           body:JSON.stringify(initialPost),
           Headers:{
            'Content-Type':'application/json',
            }}

        )
        return response.json();
    }
)

//initialstate
const initialState={
    posts:[],
    status:'idle',
    error:null,
}
//createslice


const PostSlice = createSlice({
    name:'posts',
    initialState,
    //reducer
    reducers:{},  
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state)=>{
            state.status='loading'
        })
      .addCase(fetchPosts.fulfilled,(state,action)=>{
        state.status='succeeded';
        state.posts=action.payload;
      })
       .addCase(fetchPosts.rejected,(state,action)=>{
        state.status='failed';
        state.error=action.erroe.message
       })
       .addCase(addNewPost.fulfilled,(state,action)=>{
        state.posts.push(action.payload)
       })

    }
})

export default PostSlice.reducer