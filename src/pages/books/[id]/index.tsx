import Photo from "@/assets/sample-book.webp";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth-context";
import { IBookWithUser } from "@/lib/types";
import { api } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditBook from "./edit-book";

function SingleBookViewPage() {
  const [book, setBook] = useState<IBookWithUser>();
  const { id } = useParams();
  const [auth] = useAuth();

  function update() {
    api
      .get(`/api/Books/${id}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
      })
      .catch((e) => {
        if (e.status == 404) toast(`No book with id: ${id}`, { type: "error" });
        else toast(e.message, { type: "error" });
      });
  }

  useEffect(update, [id]);

  if (!book) {
    return (
      <div className="mt-40 flex justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-1 gap-5 p-10 md:grid-cols-3">
      <div className="flex-grow">
        <img
          src={Photo}
          className="mx-auto w-full max-w-[250px] rounded-lg shadow"
        />
      </div>
      <div className="md:col-span-2">
        <h1>{book.name}</h1>
        <i className="text-sm text-gray-600">By {book.author}</i>
        <div className="mb-5 mt-5 border-b border-b-primary text-primary">
          Description
        </div>
        <p className="text-gray-600">{book.description}</p>
        <div className="mb-5 mt-10 border-b border-b-primary text-primary">
          Details
        </div>
        <table className="table-fixed text-gray-600">
          <tbody>
            <tr>
              <td className="w-36">Author</td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <td>Publisher</td>
              <td>{book.publisher}</td>
            </tr>
            <tr>
              <td>Uploaded by</td>
              <td>{book.user.username}</td>
            </tr>
            <tr>
              <td>Uploaded date</td>
              <td>{new Date(book.createdDate).toDateString()}</td>
            </tr>
          </tbody>
        </table>
        {auth?.id === book.user.id && (
          <div className="mt-10 space-x-2">
            <Button variant="outline">Delete</Button>
            <EditBook book={book} update={update} />
          </div>
        )}
      </div>
    </main>
  );
}

export default SingleBookViewPage;
