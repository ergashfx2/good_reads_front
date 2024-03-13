import './App.css';
import Navbar from "./components/Navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Register from "./pages/Registration/Register";
import Login from "./pages/Login/Login";
import {AuthProvider} from "./context/AuthProvider";
import MyCollections from "./pages/MyCollections/MyCollections";
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
    category: "Children's Books",
    subcategories: ["Picture Books", "Early Readers", "Chapter Books", "Middle Grade", "Young Adult"]
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
    subcategories: ["Art History", "Photography Techniques", "Coffee Table Books"]
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
    subcategories: ["Biographies of Athletes", "Sports History", "Instructional Books"]
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

const books = [
    {
        'title': "I Was Here",
        'image': "https://telegra.ph/file/ce98c6722a0f3aa587d32.jpg",
        'author': "Gayle Forman",
        'description': "The newest heartwrenchingly powerful novel from the bestelling author of IF I STAY. When her best friend Meg drinks a bottle of industrial-strength cleaner alone in a motel …",
    },
    {
        'title': "Meeting Dr. Praigale",
        'image': "https://telegra.ph/file/37214df864c068327df7a.jpg",
        'author': "Marie-France Léger",
        'description': "Following the death of her abusive ex-boyfriend Malcom, Astra Meredith DuPont moves to a neighboring town in pursuit of a quiet, sedentary lifestyle as an author. While dealing with the traumas of her past, she can't seem to shake off the writer's block that's been eating away at her... that is, until she meets Dr. Noah Praigale, the kind-hearted veterinarian who manages to awaken something beneath the surface.With every chance encounter that pulls the pair together, lines of the…"
    },

]


function App() {
    return (
        <div className="main">
                <AuthProvider>
            <Navbar/>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home books={books} categories = {bookCategories}/>}/>
                        <Route path={"sign-up"} element={< Register/>} />
                        <Route path={"sign-in"} element={<Login/>} />
                        <Route path={"/my-collections"} element={<MyCollections/>} />
                    </Routes>
                </BrowserRouter>
                        </AuthProvider>
        </div>

    );
}

export default App;
