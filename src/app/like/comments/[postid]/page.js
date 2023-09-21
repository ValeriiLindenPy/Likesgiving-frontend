import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Image from "next/image";



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
  console.log('Params: ', params.postid)
  const data = await getData(params.postid, session?.token)

  console.log(data);


  return (
    <>
      <main>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%'
        }}>

          <h1>{data.author.user_name}</h1>


        </div>
      </main>
    </>

  );
}
