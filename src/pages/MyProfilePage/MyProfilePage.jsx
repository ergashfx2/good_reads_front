import React, {useEffect, useState} from 'react';
import MyProfile from "../../components/MyProfile/MyProfile";
import "./MyProfilePage.css"
import api from "../../utils/utils";

function MyProfilePage(props) {
    const [profile, setProfile] = useState();
    const [image, setImage] = useState();
    const [error, setError] = useState();
    const [changed, setChanged] = useState()
    const [show, setShow] = useState(false);
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [gender, setGender] = useState()
    const [bio, setBio] = useState()
    const [address, setAddress] = useState()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/my-profile/', {
                    headers:  {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                });
                const profile = response.data.profile[0]
                setProfile(profile);
                setChanged(response.data.message)
                setGender(profile.gender)
                setEmail(profile.email)
                setAddress(profile.address)
                setBio(profile.bio)
                setName(profile.name)

            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [changed]);

    return (
        <div className={'my-profile w-100'}>
            <MyProfile
                profile={profile}
                setProfile={setProfile}
                image={image}
                setImage={setImage}
                error={error}
                setError={setError}
                changed={changed}
                setChanged={setChanged}
                show={show}
                setShow={setShow}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                gender={gender}
                setGender={setGender}
                bio={bio}
                setBio={setBio}
                address={address}
                setAddress={setAddress}
            />
        </div>
    );
}

export default MyProfilePage;