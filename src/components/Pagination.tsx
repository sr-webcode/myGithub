import styled from 'styled-components';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

const StyledPagination = styled(ReactPaginate)`
  display: flex;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 12px;
  overflow: hidden;
  border-radius: 20px;
  li {
    user-select: none;
    list-style: none;
    &.selected > a {
      color: #0379ef;
    }
    a {
      padding: 8px;
    }
  }
`;

const Pagination = (props: Partial<ReactPaginateProps>) => {
  const {
    pageCount = 10,
    breakLabel = '...',
    pageRangeDisplayed = 5,
    renderOnZeroPageCount = null,
    ...rest
  } = props;
  return (
    <StyledPagination
      pageCount={pageCount}
      breakLabel={breakLabel}
      pageRangeDisplayed={pageRangeDisplayed}
      renderOnZeroPageCount={renderOnZeroPageCount}
      previousLabel={<ArrowBackIcon />}
      nextLabel={<ArrowForwardIcon />}
      {...rest}
    />
  );
};

export default Pagination;
