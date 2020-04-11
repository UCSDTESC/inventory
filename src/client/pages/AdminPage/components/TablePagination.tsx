import React from 'react';
import { PaginationItem, PaginationLink, Pagination } from "reactstrap"
import styled from 'styled-components';
import { BORDER_RADIUS_LG, TESC_BLUE } from '~/styles/constants';

type Props = {
  pageCount: number,
  pageIndex: number,
  previousPage: () => void,
  gotoPage: (i: number) => void
  nextPage: () => void
}

const Container = styled(Pagination)`

  ul {
    li > button, li > a {
      color: white;
      background: ${TESC_BLUE};
    }

    .page-link:focus {
      box-shadow: none;
    }

    .page-item.active .page-link {
      background: white;
      color: ${TESC_BLUE};
      border: 0;
      outline: 0;
    }

    li:first-child > button {
      border-radius: ${BORDER_RADIUS_LG} 0 0 ${BORDER_RADIUS_LG} !important;
    }

    li:last-child > button {
      border-radius: 0 ${BORDER_RADIUS_LG} ${BORDER_RADIUS_LG} 0 !important;
    }
  }
`

const TablePagination: React.FunctionComponent<Props> = (props) => {

  const {
    pageCount,
    pageIndex,
    previousPage,
    gotoPage,
    nextPage
  } = props;

  return (
    <Container className="w-100 d-flex align-items-center justify-content-center">
      <PaginationItem>
        <PaginationLink previous disabled={pageIndex == 0} onClick={previousPage} />
      </PaginationItem>
      {[...Array(pageCount)].map((page, i) => (
        <PaginationItem active={i === pageIndex} key={i}>
          <PaginationLink onClick={e => gotoPage(i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink next disabled={pageIndex == pageCount - 1} onClick={nextPage} />
      </PaginationItem>
    </Container>
  )
}

export default TablePagination;