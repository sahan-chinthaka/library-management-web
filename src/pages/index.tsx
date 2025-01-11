import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/book-card";
import { IBook } from "../lib/types";

function HomePage() {
  const [books, setBooks] = useState<IBook[]>();

  useEffect(() => {
    axios.get("http://localhost:5127/api/Books").then((res) => {
      console.log(res.data);
      setBooks(res.data);
    });
  }, []);

  return (
    <main>
      {!books && <div>Loading...</div>}
      {books && books.map((book) => <BookCard data={book} key={book.id} />)}
    </main>
  );
}

export default HomePage;
