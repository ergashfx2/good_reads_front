import React, {useEffect, useState} from "react";
import {apiAdmin} from "../../utils/utils";
import {Card} from "react-bootstrap";
import {BiUser} from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import './AdminPage.css'
import {Search} from "react-bootstrap-icons";

function AdminPage(props) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [todays, setTodays] = useState();
    const [user_id, setUserId] = useState();
    const [action, setAction] = useState();
    const [actionDone, setActionDone] = useState();
    const [checkedItems, setCheckedItems] = useState({});
    const [show, setShow] = useState(false);
    const [adminError, setAdminError] = useState();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [users, setUsers] = useState()
    const actionValues = {
        block: {
            name: "status",
            value: "Blocked",
        },
        unblock: {
            name: "status",
            value: "Active",
        },
        setAdmin: {
            name: "role",
            value: "Admin",
        },
        removeAdmin: {
            name: "role",
            value: "User",
        },
    };
    useEffect(() => {
        const getUsersAll = async () => {
            try {
                const response = await apiAdmin.get("/all-users/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.status === 200) {
                    setUserData(response.data);
                    setIsLoading(false);
                    setUsers(response.data.users)
                    const today = new Date();
                    const todayFormatted = formatDate(today)
                    const todayUsers = response.data.users.filter(
                        (user) => formatDate(user.date_registered) === todayFormatted
                    );
                    setTodays(todayUsers);
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    setError("Nothing found");
                } else {
                    setError("Nothing found");
                }
                setIsLoading(false);
            }
        };

        getUsersAll();
    }, [actionDone]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    }

    const getUser = async (user_id) => {
        await apiAdmin
            .get("/user/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    user_id: user_id,
                },
            })
            .then((res) => {
                setFormData(res.data.user[0]);
            });
    };

    const handleCheck = async (e) => {
        const {name, checked} = e.target;
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [name]: checked,
        }));
        setUserId(e.target.id);
    };

    const handleSelect = async (e) => {
        setAction(e.target.value);
    };

    const handleFormUpdate = (e) => {
        const {id, value} = e.target;
        setFormData({...formData, [id]: value});
    };

    const deleteUser = async (user_id)=> {
        await apiAdmin.delete(`/delete-user/${user_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(res=>{
            setActionDone(res.data.id)
        })

    }

    const handleGo = async () => {
        if (!user_id) return setAdminError("User is not selected")
        if (!action) return setAdminError("Action is not selected")
        if (action === "update") {
            getUser(user_id);
            setShow(!show);
            return;
        }
        if (action === "view") {
            navigate(`/admin/view/${user_id}`);
            return;
        }

        if (action ==='delete'){
            await deleteUser(user_id)
            return
        }

        try {
            await apiAdmin
                .patch(
                    `/update-user/`,
                    {
                        name: actionValues[action].name,
                        value: actionValues[action].value,
                        id: user_id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((res) => {
                    setActionDone(res.data.id);
                });
        } catch (error) {
            setAdminError(error.response.data.message);
        }
    };
    const handleClose = () => setShow(false);
    const handleSave = async () => {
        await apiAdmin
            .patch("/updates-datas/user/", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setActionDone(res.data.id);
                setShow(!show);
            });
    };

    const handleSearch = async (e) => {
        let filteredName = userData.users.filter(obj => obj.name.toLowerCase().includes(e.target.value.toLowerCase()));
        let filteredId = userData.users.filter(obj => obj.id.toLowerCase().includes(e.target.value.toLowerCase()));
        let filteredEmail = userData.users.filter(obj => obj.email.toLowerCase().includes(e.target.value.toLowerCase()));
        if (e.target.value.length === 0) {
            setUsers(userData.users)
            return

        }
        if (filteredName.length !== 0) setUsers(filteredName)
        if (filteredId.length !== 0) setUsers(filteredId)
        if (filteredEmail.length !== 0) setUsers(filteredEmail)
    }


    return (
        <div>
            {isLoading ? (
                <div className={"text-center align-middle"}></div>
            ) : (
                <>
                    {error ? (
                        <div className={"text-center align-middle"}>{error}</div>
                    ) : (
                        <div className={"container"}>
                            {adminError ? (
                                <div className={"alert alert-danger"}>{adminError}</div>
                            ) : null}
                            <div className={"row mx-0"}>
                                <Card
                                    bg={"light"}
                                    key={1}
                                    text={"black"}
                                    style={{width: "18rem"}}
                                    className="mb-2 mt-4 col-6"
                                >
                                    <Card.Header>Users</Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            <BiUser/> Total Users : {userData.users.length}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card
                                    bg={"light"}
                                    key={1}
                                    text={"black"}
                                    style={{width: "18rem"}}
                                    className="mb-2 mx-3 mt-4 col-6"
                                >
                                    <Card.Header>Users</Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            <BiUser/>
                                            Today's : {todays.length}{" "}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className={"row mt-3 mb-1"}>
                                <div className={"col-3 mx-0"}>
                                    <select onChange={handleSelect} className={"form-select"}>
                                        <option value={false}>Select action</option>
                                        <option value={"delete"}>Delete</option>
                                        <option value={"update"}>Update</option>
                                        <option value={"block"}>Block</option>
                                        <option value={"unblock"}>Unblock User</option>
                                        <option value={"setAdmin"}>Set Admin</option>
                                        <option value={"removeAdmin"}>Remove Admin</option>
                                        <option value={"view"}>View profile</option>
                                    </select>
                                </div>
                                <div className={"col-1"}>
                                    <button onClick={handleGo} className={"btn btn-danger"}>
                                        Go
                                    </button>
                                </div>
                                <div className={"col-3"}></div>
                                <div className={"col input-group mb-3"}>
                                    <input onChange={handleSearch} className={"form-control"}
                                           aria-describedby={'search'} placeholder={"Search"}/>
                                    <span className="input-group-text" id="search"><Search/></span>
                                </div>
                            </div>

                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal title</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {formData ? (
                                        <form>
                                            <label className={"form-label"} htmlFor="name">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                onChange={handleFormUpdate}
                                                className={"form-control"}
                                                value={formData.name || ""}
                                            />

                                            <label className={"form-label"} htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                onChange={handleFormUpdate}
                                                className={"form-control"}
                                                value={formData.email || ""}
                                            />

                                            <label className={"form-label"} htmlFor="address">
                                                Address
                                            </label>
                                            <input
                                                id="address"
                                                onChange={handleFormUpdate}
                                                className={"form-control"}
                                                value={formData.address || ""}
                                            />

                                            <label className={"form-label"} htmlFor="gender">
                                                Gender
                                            </label>
                                            <input
                                                id="gender"
                                                onChange={handleFormUpdate}
                                                className={"form-control"}
                                                value={formData.gender || ""}
                                            />
                                        </form>
                                    ) : null}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button onClick={handleSave} variant="success">
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <table className={"table"} style={{backgroundColor: "white"}}>
                                <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Avatar</th>
                                    <th>Date Registered</th>
                                    {Object.keys(userData.users[0]).map(
                                        (key, index) =>
                                            key !== "bio" &&
                                            key !== "password" &&
                                            key !== "avatar" &&
                                            key !== 'date_registered' && (
                                                <th className={"col"} key={index}>
                                                    {key.toUpperCase()}
                                                </th>
                                            )
                                    )}
                                </tr>
                                </thead>

                                <tbody>
                                {users.map((user, userIndex) => (
                                    <tr key={userIndex}>
                                        <input
                                            name={user.id}
                                            checked={checkedItems[user.id] || false}
                                            onChange={handleCheck}
                                            id={user.id}
                                            className={"mx-3 my-4"}
                                            type={"checkbox"}
                                        />
                                        <td>
                                            <img
                                                src={
                                                    user.avatar ||
                                                    "https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"
                                                }
                                                alt="Avatar"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        </td>
                                        <td>{formatDate(user.date_registered)}</td>
                                        {Object.keys(userData.users[0]).map(
                                            (key, keyIndex) =>
                                                key !== "bio" &&
                                                key !== "password" &&
                                                key !== "avatar" &&
                                                key !== 'date_registered' && (
                                                    <td key={keyIndex}>{user[key]}</td>
                                                )
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default AdminPage;
