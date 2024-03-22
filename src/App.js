import './App.css';
import Navbar from "./components/Navbar/navbar";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Register from "./pages/Registration/Register";
import Login from "./pages/Login/Login";
import {AuthProvider} from "./context/AuthProvider";
import MyCollections from "./pages/MyCollections/MyCollections";
import CollectionBooksPage from "./pages/CollectionBooks/CollectionBooksPage";
import AddBookPage from "./pages/AddBookPage/AddBookPage";
import BookDetailedPage from "./pages/BookDetailedPage/BookDetailedPage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";
import AuthorPage from "./pages/AuthorPage/AuthorPage";

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


function App() {
    return (
        <div className="main">
            <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Home categories={bookCategories}/>}/>
                    <Route path={"/sign-up/"} element={< Register/>}/>
                    <Route path={"/sign-in/"} element={<Login/>}/>
                    <Route path={"/my-collections/"} element={<MyCollections/>}/>
                    <Route path={"/collection/:colID"} element={<CollectionBooksPage/>}/>
                    <Route path={"/collection/add-book/:colID/"} element={<AddBookPage/>}/>
                    <Route path={"/books/:bookID"} element={<BookDetailedPage/>}/>
                    <Route path={"/my-profile/"} element={<MyProfilePage/>}/>
                    <Route path={"/author/:id"} element={<AuthorPage/>}/>
                </Routes>
            </AuthProvider>
        </div>

    );
}

export default App;
