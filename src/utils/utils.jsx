import axios from "axios";

const api = axios.create({
  baseURL: "https://readopia-backend.onrender.com/api/users/"
});

const bookCategories = [
    {
        category: "Fiction",
        subcategories: ["Literary Fiction", "Science Fiction", "Fantasy", "Mystery", "Romance", "Historical Fiction", "Thriller/Suspense", "Horror"]
    },
    {
        category: "Non-Fiction",
        subcategories: ["Biography/Autobiography", "Memoir", "History", "Self-help/Personal Development", "Business/Entrepreneurship", "Philosophy", "Psychology", "Travel", "Health and Wellness", "Cooking/Food"]
    },
    {
        category: "Children's CollectionBooksPage",
        subcategories: ["Picture CollectionBooksPage", "Early Readers", "Chapter CollectionBooksPage", "Middle Grade", "Young Adult"]
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
        subcategories: ["Art History", "Photography Techniques", "Coffee Table CollectionBooksPage"]
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
        subcategories: ["Biographies of Athletes", "Sports History", "Instructional CollectionBooksPage"]
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

const GetBooksFeed = async () => {
    try {
        const response = await api.get("/get-feeds/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching feeds:", error);
    }
};


        const createBook = async (BookData) => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.post("/create-book/", BookData, {
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



export { bookCategories, createBook,GetBooksFeed }
export default api