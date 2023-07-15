import { PaginationProps } from "@/interface/Component/Pagination";

export default function Pagination({
  productPerPage,
  totalProducts,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="my-6 flex justify-center"
      aria-label="Page navigation example"
    >
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            disabled={currentPage === 1 ? true : false}
            onClick={() => paginate(currentPage - 1)}
            className={`flex items-center justify-center ${
              currentPage === 1 ? "cursor-not-allowed " : ""
            }px-3 h-8 leading-tight text-gray-800 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700`}
          >
            قبلی
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`flex items-center justify-center ${
                number === currentPage
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-700 border-gray-300"
              } px-3 h-8 leading-tight border cursor-pointer`}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            disabled={
              currentPage === pageNumbers[pageNumbers.length - 1] ? true : false
            }
            onClick={() => paginate(currentPage + 1)}
            className={`flex items-center justify-center ${
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? "cursor-not-allowed "
                : ""
            }px-3 h-8 ml-0 leading-tight text-gray-800 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700`}
          >
            بعدی
          </button>
        </li>
      </ul>
    </nav>
  );
}
