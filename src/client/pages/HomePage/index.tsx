import React from 'react';
import Button from '~/components/Button';

const HomePage: React.FunctionComponent = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Button>
            Home Page!
          </Button>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
