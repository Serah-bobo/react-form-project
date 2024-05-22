import { configureStore } from "@reduxjs/toolkit";
import PostReducer from './PostSlice'



const Store =configureStore ({
    reducer:{
        posts:PostReducer
    }
})

export default Store