import React, {useEffect, useState} from 'react';
import Author from "../../components/Author/Author";
import api from "../../utils/utils";
import {useParams} from "react-router-dom";
function AuthorPage(props) {
    const [profile,setProfile] = useState()
    const [error,setError] = useState()
    const author_id = useParams()
    useEffect(() => {
                const fetchData = async () => {
            try {
                const response = await api.get('/get-profile/', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    params : {
                        author_id:author_id.id
                    }
                });
                const profile = response.data.profile[0]
                setProfile(profile);
                (profile)

            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);
    if (profile){
        (profile)
    }
    return (
        <div>
            {error ? (<div className={'alert alert-danger'}>{error}</div>):null}
            <Author author={profile}/>
        </div>
    );
}

export default AuthorPage;