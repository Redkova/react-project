import Button from '../ui/Button';

interface Props {
  page: number;
  onNext: () => void;
  onPrev: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

function MoviesPagination({
  page,
  onNext,
  onPrev,
  isFirstPage,
  isLastPage,
}: Props) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        onClick={onPrev}
        disabled={isFirstPage}
        className={
          isFirstPage
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 text-black md:hover:bg-gray-300'
        }
      >
        Prev
      </Button>

      <span className="font-semibold">Page {page}</span>

      <Button
        onClick={onNext}
        disabled={isLastPage}
        className={
          isLastPage
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 text-black md:hover:bg-gray-300'
        }
      >
        Next
      </Button>
    </div>
  );
}

export default MoviesPagination;
