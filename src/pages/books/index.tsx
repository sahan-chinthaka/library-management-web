import NotFound from "@/assets/not-found.png";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth-context";
import { IBook } from "@/lib/types";
import { api, cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import NewBook from "./new-book";

function BooksPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [books, setBooks] = useState<IBook[]>();
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>();
  const query = searchParams.get("q");
  const [auth] = useAuth();
  const [filter, setFilter] = useState<"all" | "my">("all");

  function update() {
    setBooks(undefined);
    api.get(`/api/Books?name=${query ?? ""}`).then((res) => {
      setBooks(res.data);
    });
  }

  useEffect(update, [query]);

  useEffect(() => {
    if (books) {
      setFilteredBooks(
        filter == "all"
          ? books
          : books.filter((book) => book.userId === auth?.id),
      );
    }
  }, [filter, books, auth]);

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
              <h2>Are you interested in uploading a book?</h2>
              <p className="my-4 text-gray-700">
                {auth == null
                  ? "To upload a book, you should sign in here"
                  : "You can upload any book here"}
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
        <div className="mt-5 flex gap-4">
          <span
            onClick={() => setFilter("all")}
            className={cn(
              "cursor-pointer border-b border-b-primary font-bold",
              filter === "all"
                ? "border-b-primary text-primary"
                : "border-b-gray-500 text-gray-500",
            )}
          >
            All Books
          </span>
          <span
            onClick={() => setFilter("my")}
            className={cn(
              "cursor-pointer border-b border-b-primary font-bold",
              filter === "my"
                ? "border-b-primary text-primary"
                : "border-b-gray-500 text-gray-500",
            )}
          >
            My Books
          </span>
        </div>
        {!filteredBooks && (
          <div className="mt-32 flex justify-center">
            <div className="loader"></div>
          </div>
        )}
        {filteredBooks && filteredBooks.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:grid-cols-3 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} data={book} />
            ))}
          </div>
        )}
        {filteredBooks && filteredBooks.length == 0 && (
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
