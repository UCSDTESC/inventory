import React, { useEffect, useState } from 'react';
import { TESC_BLUE } from '~/styles/constants';
import { Rounded } from '~/styles';
import styled from 'styled-components';
import NewItemForm from './components/NewItemForm';
import * as AdminApi from '~/data/AdminApi';

const Container = styled(Rounded)`
  background: ${TESC_BLUE};
`

const NewItemPage: React.FunctionComponent = () => {

  const [tags, setTags] = useState<Array<string>>([]);

  useEffect(() => {
    async function getTags() {
      let x = await AdminApi.getItemTags();
      setTags(x.data);
    }
    getTags();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Container>
            <div className="text-white text-center">
              <h1>Create An Item</h1>
            </div>
            <NewItemForm tags={tags} />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default NewItemPage;