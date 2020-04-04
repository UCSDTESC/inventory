import React from 'react';
import { useParams } from 'react-router';
import { Rounded } from '~/styles';

const ItemPage: React.FunctionComponent = (props) => {

  const {id} = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h3>
            Item Info here?
          </h3>
        </div>
        <Rounded className="col-md-4 bg-tesc-blue">
          <h3>
            Checkout History
          </h3>
        </Rounded>
      </div>
    </div>
  )
}

export default ItemPage;