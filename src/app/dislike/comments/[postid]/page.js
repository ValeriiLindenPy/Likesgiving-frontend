import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { CommentComponent } from "@/components/Comment/Comment";
import { Post } from '@/components/Posts'
import { CommentFormComponent } from "@/components/CommentForm/CommentForm";



async function getData(id, token) {
  try {
    const url = `https://ihl-project-606adf7a8500.herokuapp.com/posts/v1/posts/${id}/`;
    const response = await fetch(url, {
      method: 'GET',
      cache: "force-cache",
      headers: {
        'Authorization': `Token ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log(response);
    }
  } catch (error) {
    throw error;
  }
}



export default async function Comment({ params }) {
  
  const session = await getServerSession(authOptions);
  const data = await getData(params.postid, session?.token);
  
  return (
    <>
      <main style={{
        backgroundColor: "#131313",
        color: "white",
        height: "100%",
      }}>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '29%'
        }}>
          <Post type='dislike' post={data} />

          <CommentFormComponent type="dislike" token={session?.token} post={params.postid} />


          <CommentComponent idPost={params.postid} token={session?.token} type="dislike" />


        </div>



      </main>
    </>

  );
}

export async function generateStaticParams() {

  const staticParams = [
      { 
         postid: '31', 

      }
  ]
  return staticParams;
}
