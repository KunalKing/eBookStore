import { useEffect, useState } from 'react';

export default function Homepage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5174/api/books'); // Update the port here
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBooks(data);
            } catch (err) {
                setError(err);
                console.error("Error fetching books:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading books...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (books.length === 0) {
        return <div>No books found.</div>;
    }


    return (
        <div>
            <div>
                <h1>Book List</h1>
                <ul>
                    {books.map((book) => (
                        <li key={book.book_id}>
                            <h2>{book.title}</h2> {/* Only the title is displayed */}
                        </li>
                    ))}
                </ul>
            </div>


        </div>
    );
}

//Next is to render the class box multiple times
//make it mobile responsive
