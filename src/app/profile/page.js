"use client";
import useSWR from 'swr'
import api from '../api/auth/baseaxios'
import { useSession } from 'next-auth/react'




export default function Profile() {
    const { data: session } = useSession();
    const config = {
        headers: {
            'Authorization': `Token ${session?.token}`,
        },
    }

    const fetcher = url => api.get(url, config).then(res => res.data);
    const { data, error } = useSWR('http://127.0.0.1:8000/auth/profile/', fetcher);


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%'
        }}>
            <h1 style={{
                display: 'flex',
            }}>{data?.user_name}</h1>
        </div>
    );
}