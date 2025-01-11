import { IBook } from "../lib/types";

function BookCard({ data }: { data: IBook }) {
  return (
    <div className="m-5 w-40 rounded border p-5 shadow">
      <h1>{data.name}</h1>
    </div>
  );
}

export default BookCard;
