import { IBook } from "../lib/types";

function BookCard({ data }: { data: IBook }) {
  return (
    <div className="w-40 rounded border bg-white p-5 shadow">
      <h2>{data.name}</h2>
    </div>
  );
}

export default BookCard;
