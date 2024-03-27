import React, {useEffect, useState} from 'react';
import EditItemForm from "../../components/EditItemForm/EditItemForm";
import api from "../../utils/utils";
import {useParams} from "react-router-dom";

function EditItemPage(props) {
    const params = useParams()
    const [item,setItem] = useState()
    const [loading,setLoading] = useState(true)
        useEffect(() => {
        const GetCustoms = async () => {
            console.log(params.id)
            await api.get('/item-detail/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    item_id: params.id
                }
            }).then(res => {
                setItem(res.data.item[0])
                setLoading(false)
            })
        }
        GetCustoms()
    }, []);
    return (
        <div>
            <EditItemForm loading={loading} item={item}/>
        </div>
    );
}

export default EditItemPage;