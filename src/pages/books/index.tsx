import NotFound from "@/assets/not-found.png";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth-context";
import { IBook } from "@/lib/types";
import { api } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NewBook from "./new-book";

function BooksPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [books, setBooks] = useState<IBook[] | undefined>(undefined);
  const query = searchParams.get("q");
  const [auth] = useAuth();

  function update() {
    setBooks(undefined);
    api.get(`/api/Books?name=${query ?? ""}`).then((res) => {
      setBooks(res.data);
    });
    console.log("Update");
  }

  useEffect(update, [query]);

  function search() {
    if (!inputRef.current) return;

    const txt = inputRef.current.value.trim();
    if (txt != query) {
      navigate("/books?q=" + encodeURIComponent(txt));
    }
  }

  return (
    <div className="px-5 sm:px-20">
      <div className="container mx-auto">
        <div>
          {auth !== undefined && (
            <div className="mx-auto mt-5 max-w-[700px] rounded border border-primary bg-white p-5 shadow md:mt-10">
              <h2>Are interested in publishing a book?</h2>
              <p className="my-4 text-gray-700">
                {auth == null
                  ? "To publish a book, you should sign in here"
                  : "You can publish any book here"}
              </p>
              {auth !== null && <NewBook update={update} />}
              {auth == null && (
                <Link to="/sign-in">
                  <Button>Sign in</Button>
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="mt-5 flex gap-2 md:mt-10">
          <Input
            onKeyUp={(e) => {
              if (e.key == "Enter") search();
            }}
            ref={inputRef}
            defaultValue={query ?? ""}
            placeholder="Search here"
          />
          <Button onClick={search}>Search</Button>
        </div>
        {!books && (
          <div className="mt-32 flex justify-center">
            <div className="loader"></div>
          </div>
        )}
        {books && books.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:grid-cols-3 lg:grid-cols-4">
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
      </div>
    </div>
  );
}

export default BooksPage;
