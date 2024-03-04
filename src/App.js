import './App.css';
import Navbar from "./components/Navbar/navbar";
import Home from "./components/HomePage/Home";

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
    // {
    //     'title': "Yellowface",
    //     'image': "https://telegra.ph/file/2f996bf6c7f7562dc8dba.jpg",
    //     'author': "R.F. Kuang",
    //     'description': "With its totally immersive first-person voice, Yellowface grapples with questions of diversity, racism, and cultural appropriation, as well as the terrifying alienation of social media. R.F. Kuang’s novel is timely, razor-sharp, and eminently readable..."
    // }


]

function App() {
    return (
        <div className="main">
            <Navbar/>
            <Home books={books}/>
        </div>
    );
}

export default App;
