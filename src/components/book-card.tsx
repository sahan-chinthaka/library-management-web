import Photo from "@/assets/sample-book.webp";
import { Link } from "react-router-dom";
import { IBook } from "../lib/types";

function BookCard({ data }: { data: IBook }) {
  return (
    <Link to={`/books/${data.id}`} className="group block w-full">
      <div
        style={{
          backgroundImage: `url(${Photo})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
        className="mx-auto h-[300px] w-full max-w-[250px] overflow-hidden rounded-lg border shadow"
      >
        <div className="flex h-full w-full bg-gradient-to-b from-transparent to-black transition-[background-image]">
          <div className="mt-auto flex-1 border-t p-5 transition-[background] group-hover:bg-primary">
            <h2 className="text-gray-200 transition-colors hover:text-white">
              {data.name}
            </h2>
            <p className="text-gray-300">By {data.author}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
