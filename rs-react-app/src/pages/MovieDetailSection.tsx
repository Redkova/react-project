import { useParams } from 'react-router';

export function MovieDetailSection() {
  const { itemID } = useParams();

  return (
    <div className="p-4 border-l w-full">
      <h2 className="text-xl font-bold">Details for {itemID}</h2>
    </div>
  );
}
