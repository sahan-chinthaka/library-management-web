import { sleep } from "@/lib/utils";
import { useEffect, useState } from "react";

function DashboardCount({ title, count }: { title: string; count: number }) {
  const [value, setValue] = useState(0);

  async function update(limit: number) {
    for (let i = 1; i <= limit; i++) {
      setValue(i);
      await sleep(1000 / limit);
    }
  }

  useEffect(() => {
    setValue(0);
    const id = setTimeout(() => {
      update(count);
    }, 500);
    return () => clearTimeout(id);
  }, [count]);

  return (
    <div className="space-y-4 rounded border border-primary bg-white p-5 shadow">
      <p>{title}</p>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}

export default DashboardCount;
