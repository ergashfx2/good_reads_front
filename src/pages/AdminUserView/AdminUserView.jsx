import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { apiAdmin } from "../../utils/utils";
import AdminViewUser from "../../components/AdminViewUser/AdminViewUser";

function AdminUserView(props) {
    const params = useParams()
    const [user, setUser] = useState()
    const [collections, setCollections] = useState()
    const [items,setItems] = useState()
    useEffect(() => {
        const GetUserAll = async () => {
            try {
                const res = await apiAdmin.get('/get-userAll/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    params: {
                        user_id: params.user_id
                    }
                });
                setUser(res.data.user[0]);
                setCollections(res.data.collections);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        GetUserAll();
    }, [params.user_id]);

    const handleCollection = async (e) => {
        try {
            const res = await apiAdmin.get('/get-collectionItems/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    collection_id: e.target.id
                }
            });
            setItems(res.data.items)
            console.log(res.data.items)
        } catch (error) {
            console.error("Error fetching collection items:", error);
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className={'container'}>
            <AdminViewUser
                user={user}
                collections={collections}
                formatDate={formatDate}
                handleCollection={handleCollection}
                items={items}
            />
        </div>
    );
}

export default AdminUserView;
