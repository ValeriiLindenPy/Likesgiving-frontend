import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { CommentComponent } from "@/components/Comment/Comment";
import { Post } from '@/components/Posts'
import { CommentFormComponent } from "@/components/CommentForm/CommentForm";


async function getData(id, token) {
  try {
    const url = `http://127.0.0.1:8000/posts/v1/post/${id}/`;
    const response = await fetch(url, {
      method: 'GET',
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
  const session = await getServerSession(authOptions)
  const data = await getData(params.postid, session?.token)




  return (
    <>
      <main>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '29%'
        }}>
          <Post type='like' post={data} />

          <CommentFormComponent type="like" token={session?.token} post={params.postid} />

          <CommentComponent idPost={params.postid} token={session?.token} type="like" />



        </div>



      </main>
    </>

  );
}
