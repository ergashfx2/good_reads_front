import axios from "axios";

const api = axios.create({
    baseURL: "https://goodreads-backend.vercel.app/api/users/"
});

const apiAdmin = axios.create({
    baseURL: "https://goodreads-backend.vercel.app/api/admin/"
});

const itemCategories = [
    {
        category: "Fiction",
        subcategories: ["Literary Fiction", "Science Fiction", "Fantasy", "Mystery", "Romance", "Historical Fiction", "Thriller/Suspense", "Horror"]
    },
    {
        category: "Non-Fiction",
        subcategories: ["Biography/Autobiography", "Memoir", "History", "Self-help/Personal Development", "Business/Entrepreneurship", "Philosophy", "Psychology", "Travel", "Health and Wellness", "Cooking/Food"]
    },
    {
        category: "Children's CollectionItemsPage",
        subcategories: ["Picture CollectionItemsPage", "Early Readers", "Chapter CollectionItemsPage", "Middle Grade", "Young Adult"]
    },
    {
        category: "Poetry",
        subcategories: ["Traditional Poetry", "Contemporary Poetry", "Epic Poetry"]
    },
    {
        category: "Graphic Novels/Comics",
        subcategories: ["Superhero Comics", "Manga", "Graphic Memoirs"]
    },
    {
        category: "Reference",
        subcategories: ["Encyclopedias", "Dictionaries", "Almanacs", "Atlases"]
    },
    {
        category: "Religion/Spirituality",
        subcategories: ["Christianity", "Islam", "Buddhism", "Hinduism", "Judaism"]
    },
    {
        category: "Science",
        subcategories: ["Biology", "Physics", "Chemistry", "Astronomy", "Environmental Science"]
    },
    {
        category: "Art/Photography",
        subcategories: ["Art History", "Photography Techniques", "Coffee Table CollectionItemsPage"]
    },
    {
        category: "Technology",
        subcategories: ["Computer Science", "Programming", "Information Technology", "Internet & Web Development"]
    },
    {
        category: "Music",
        subcategories: ["Music Theory", "Biographies of Musicians", "Music History"]
    },
    {
        category: "Sports",
        subcategories: ["Biographies of Athletes", "Sports History", "Instructional CollectionItemsPage"]
    },
    {
        category: "Education",
        subcategories: ["Pedagogy", "Educational Psychology", "Teaching Methods"]
    },
    {
        category: "Travel",
        subcategories: ["Travel Guides", "Travel Memoirs"]
    },
    {
        category: "Humor",
        subcategories: ["Satire", "Comedy", "Jokes and Riddles"]
    }
];

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


export {itemCategories, createItem, GetItemsFeed,apiAdmin}
export default api