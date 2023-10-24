import { useState } from "react";

interface IPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages?: number;
}

export const Pagination = ({ page, setPage, totalPages }: IPaginationProps) => {
  const [pageInput, setPageInput] = useState(page);
  const onNextPageClick = () => {
    setPage((current) => current + 1);
    setPageInput(page + 1);
  };
  const onPrevPageClick = () => {
    setPage((current) => current - 1);
    setPageInput(page - 1);
  };

  const controlPageInput = (value: string) => {
    if (isNaN(Number(value))) return;
    if (totalPages && Number(value) <= totalPages && Number(value) > 0) {
      setPage(Number(value));
    } else {
      return;
    }
  };
  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    controlPageInput(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      controlPageInput(event.currentTarget.value);
    }
  };

  return (
    <div className="grid grid-cols-3 text-center max-w-lg items-center mx-auto mt-10">
      {page > 1 ? (
        <button
          role={"prevPage"}
          onClick={onPrevPageClick}
          className="font-medium text-2xl focus:outline-none"
        >
          &larr;
        </button>
      ) : (
        <div></div>
      )}
      <span>
        Page{" "}
        <input
          role={"pageInput"}
          onBlur={handlePageChange}
          onKeyDown={handleKeyDown}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPageInput(Number(event.target.value));
          }}
          className="w-12 text-center"
          type="number"
          value={pageInput}
        ></input>{" "}
        of <span className="text-center mx-2 ">{totalPages}</span>
      </span>
      {page !== totalPages ? (
        <button
          role={"nextPage"}
          onClick={onNextPageClick}
          className="font-medium text-2xl focus:outline-none"
        >
          &rarr;
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
