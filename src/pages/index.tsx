import NotFound from "@/assets/not-found.png";
import BookCard from "@/components/book-card";
import DashboardCount from "@/components/dashboard-count";
import { IBook } from "@/lib/types";
import { api } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ICounts {
  bookCount: number;
  userCount: number;
}

function HomePage() {
  const [counts, setCounts] = useState<ICounts>();
  const [books, setBooks] = useState<IBook[]>();

  useEffect(() => {
    api.get("/api/Dashboard").then((res) => {
      setCounts(res.data);
    });
    api.get("/api/Books/recent").then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
    <main className="p-5">
      <div className="container mx-auto">
        <h2>Dashboard</h2>
        <div className="mt-4 flex gap-4">
          {counts ? (
            <>
              <DashboardCount title="Total Books" count={counts.bookCount} />
              <DashboardCount title="Total Users" count={counts.userCount} />
            </>
          ) : (
            <div className="my-10 flex flex-1 justify-center">
              <div className="loader"></div>
            </div>
          )}
        </div>
        <h2 className="mt-10">Recent Books</h2>
        {!books && (
          <div className="mt-32 flex justify-center">
            <div className="loader"></div>
          </div>
        )}
        {books && books.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.id} data={book} />
            ))}
          </div>
        )}
        {books && books.length == 0 && (
          <div className="mt-16 space-y-8">
            <img src={NotFound} className="mx-auto w-32" />
            <p className="text-center text-primary">Not found any results</p>
          </div>
        )}
        {books && books.length > 0 && (
          <div className="mt-5 flex justify-center">
            <Link className="text-primary" to="/books">
              View all books &rarr;
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;
