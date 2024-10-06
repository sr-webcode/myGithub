import { useEffect, useState } from 'react';
import { ReactPaginateProps } from 'react-paginate';

type PaginatorData<T extends Record<string, unknown>> = {
  data: T[];
  paginatorRefreshTrigger?: string;
};

const DEFAULT_PAGE_INDEX = 0;

export const usePaginator = <T extends Record<string, unknown>>(
  props: PaginatorData<T>
) => {
  const { data, paginatorRefreshTrigger } = props;

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange: ReactPaginateProps['onPageChange'] = ({
    selected
  }) => {
    setCurrentPage(selected);
  };

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }, [paginatorRefreshTrigger]);

  return {
    pageCount,
    paginatedData,
    handlePageChange
  };
};
