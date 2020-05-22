
import { 
  UseExpandedRowProps, 
  UsePaginationInstanceProps,
  UsePaginationState } from "react-table";

declare module 'react-table' {
  interface Row<D> extends UseExpandedRowProps<D> { }
  interface TableInstance<D extends object = {}> extends UsePaginationInstanceProps<D> {}
  interface TableState<D extends object = {}> extends UsePaginationState<D> {}
}

