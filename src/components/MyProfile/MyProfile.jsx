import "./MyProfile.css"
import api from "../../utils/utils";
import {uploadImage} from "../../utils/FireBaseConfig";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyProfile({
                       profile,
                       name,
                       gender,
                       email,
                       error,
                       bio,
                       setEmail,
                       setError,
                       setGender,
                       setBio,
                       show,
                       setName,
                       setShow,
                       setImage,
                       setAddress,
                       setChanged,
                       address,
                       image
                   }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    }

    const handleImage = async (e) => {

        setImage(e.target.files[0]);
    };

    const handeChange = async () => {
        if (image) {
            console.log(image);

            try {
                const imageUrl = await uploadImage(image);
                console.log("Image URL:", imageUrl);
                if (imageUrl) {
                    const token = localStorage.getItem('token');
                    const response = await api.patch("/update-user/", {image: imageUrl}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log("Update response:", response.data);
                    setChanged(response.data.message);
                }
            } catch (error) {
                console.error("Error updating user profile:", error);
                setError(error.message);
            }
        } else {
            setError("No image input");
        }
    };


    const handleUpdateInfo = async () => {
        const token = localStorage.getItem('token');
        try {
            await api.patch("/update-user/", {
                name: name, email: email, gender: gender, bio: bio, address: address
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res.data)
                setChanged(res.data)
                handleClose()
            });
        } catch (error) {
            setError(error.message.message);

        }
    };


    const handleFormChange = (e) => {
        const id = e.target.id
        if (id === 'name') {
            setName(e.target.value)
        } else if (id === 'email') {
            setEmail(e.target.value)
        } else if (id === 'gender') {
            setGender(e.target.value)
        } else if (id === 'address') {
            setAddress(e.target.value)
        } else if (id === 'email') {
            setEmail(e.target.value)
        } else if (id === 'bio') {
            setBio(e.target.value)
        }
    }
    if (profile) {
        console.log(profile.avatar)
    }
    return (<div className={"profile"}>
            {error ? (<div className={'alert alert-danger'}>{error}</div>) : null}
            {profile ? (<div className={"row"}>
                    <div className={"col-lg-4 col-md-1 col-sm-1 d-lg-flex flex-column"}>
                        <label htmlFor="profile-picture-upload" className=""
                               style={{position: 'relative', display: 'inline-block'}}>
                            {profile.avatar ? (<img className="mt-4 image mx-5"
                                                    src={profile.avatar}
                                                    alt="Change Profile"
                                                    style={{maxWidth: '400px', maxHeight: '400px'}}/>) : (<img
                                className="mt-4 image mx-5"
                                src="https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"
                                alt="Change Profile" style={{maxWidth: '400px', maxHeight: '400px'}}/>)}
                            <input onChange={handleImage} id="profile-picture-upload" type="file"
                                   style={{display: 'none'}}/>
                        </label>
                        <button onClick={handeChange}
                                className={'btn btn-success mt-5 align-content-center m-2'}>Change
                            Now
                        </button>
                    </div>
                    <div className={"col-lg-7 col-md-1 col-sm-1 mt-4 bg-light"}>
                        <button className={'btn btn-success btn-lg'} onClick={handleShow}>Edit Informations</button>
                        <div className={'mt-3'}>
                            <table className={"table"}>
                                <tbody>
                                <tr>
                                    <th>Full name</th>
                                    <td>{profile.name}</td>
                                </tr>
                                <tr>
                                    <th>Bio</th>
                                    <td>{profile.bio}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{profile.email}</td>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <td>{profile.role}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{profile.status}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{profile.gender || "Unknown"}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{profile.address}</td>
                                </tr>
                                <tr>
                                    <th>Date Registered</th>
                                    <td>{formatDate(profile.date_registered)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit your informations </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className={'form-control'}>
                                <label className={'fw-bold'}>Full name</label>
                                <input onChange={handleFormChange} className={'form-control'} id={'name'} value={name}/>
                                <label>Bio</label>
                                <textarea value={bio} onChange={handleFormChange} id={'bio'}
                                          className={'form-control'}/>
                                <label className={'fw-bold'}>Email</label>
                                <input onChange={handleFormChange} className={'form-control'} id={'email'}
                                       value={email}/>
                                <label className={'fw-bold'}>Gender</label>
                                <input onChange={handleFormChange} className={'form-control'} id={'gender'}
                                       value={gender}/>
                                <label className={'fw-bold'}>Address</label>
                                <input onChange={handleFormChange} className={'form-control'} id={'address'}
                                       value={address}/>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={handleUpdateInfo}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            ) : null}
        </div>

    );
}

export default MyProfile;
