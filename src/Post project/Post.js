//usedispatch used for dispatching actions to redux store
//useselector used to accesss state stored in redux store
import { useSelector,useDispatch } from "react-redux";
import { fetchPosts } from "./PostSlice";
import { useEffect } from "react";



const Post = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);
  
    useEffect(() => {
      if(status==='idle'){
        dispatch(fetchPosts())
      }
    }, [status,dispatch]);
  let content;
if(status==='loading'){
content=<p>Loading...</p>
}else if(status==='succeeded'){
content=posts.map((post)=>(
    <article key={post.id} className="mb-4 p-4 bg-gray-100 ronded shadow">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p>{post.body}</p>
    </article>
))
}else if(status==='failed'){
    content=<p>{error}</p>
}
  
    return (
     <section>
        <h2 className="text-2xl font-bold  mb-4">Posts</h2>
        {content}
     </section>
    );
}

export default Post