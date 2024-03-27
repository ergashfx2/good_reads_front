import axios from "axios";

const api = axios.create({
    baseURL: "https://readopia-backend-2.onrender.com/api/users/"
});

const apiAdmin = axios.create({
    baseURL: "https://readopia-backend-2.onrender.com/api/admin/"
});

const GetItemsFeed = async (category) => {
    try {
        if (!localStorage.getItem('token')) {
            const response = await api.get("/get-feeds/");
            return response.data;
        }

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        if (category !== 'none') {
            config.params = { category: category };
        }

        const response = await api.get("/get-feeds/", config);
        return response.data;
    } catch (error) {
        console.error("Error fetching feeds:", error);
    }
};



const createItem = async (ItemData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.post("/create-item/", ItemData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 200) {
            return res.data
        } else {
            return res.data
        }
    } catch (error) {
        alert("Something went wrong")
    }
};


export {createItem, GetItemsFeed,apiAdmin}
export default api