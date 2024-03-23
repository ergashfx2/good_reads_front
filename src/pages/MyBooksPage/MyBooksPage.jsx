import React, {useEffect, useState} from 'react';
import MyBooksLiked from "../../components/MyBooksLiked/MyBooksLiked";
import api from "../../utils/utils";

function MyBooksPage(props) {
    const [books,setBooks] = useState()
    useEffect(() => {
        const FetchData = async () =>{
            const token = localStorage.getItem('token')
            await api.get('/my-liked-books/',{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }).then(res=>{
                setBooks(res.data.books)
            })
        }
        FetchData()
    }, []);
    return (
        <div>
            <MyBooksLiked books={books}/>
        </div>
    );
}

export default MyBooksPage;