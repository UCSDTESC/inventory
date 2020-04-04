import { useContext } from 'react';
import AdminContext from './context';

function useAdmin() {
  return useContext(AdminContext);
}

export default useAdmin;