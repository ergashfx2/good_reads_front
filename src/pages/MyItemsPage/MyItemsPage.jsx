import React, {useEffect, useState} from 'react';
import MyItemsLiked from "../../components/MyItemsLiked/MyItemsLiked";
import api from "../../utils/utils";

function MyItemsPage(props) {
    const [items,setitems] = useState()
    useEffect(() => {
        const FetchData = async () =>{
            const token = localStorage.getItem('token')
            await api.get('/my-liked-items/',{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }).then(res=>{
                setitems(res.data.items)
            })
        }
        FetchData()
    }, []);
    return (
        <div>
            <MyItemsLiked items={items}/>
        </div>
    );
}

export default MyItemsPage;