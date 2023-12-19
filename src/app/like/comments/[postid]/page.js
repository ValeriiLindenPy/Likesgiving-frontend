import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { CommentComponent } from "@/components/Comment/Comment";
import { Post } from '@/components/Posts'
import { CommentFormComponent } from "@/components/CommentForm/CommentForm";
import styles from './Comment.module.css'

async function getData(id, token) {
  try {
    const url = `https://ihl-project-606adf7a8500.herokuapp.com/posts/v1/posts/${id}/`;
    const response = await fetch(url, {
      cache: "force-cache",
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

      <div className ={styles.commentBody}>
          <Post type='like' post={data} />

          <CommentFormComponent type="like" token={session?.token} post={params.postid} />

          <CommentComponent idPost={params.postid} token={session?.token} type="like" />



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
