import React from 'react';
import Button from '~/components/Button';

const HomePage: React.FunctionComponent = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Button>
            Button
          </Button>
          {alert('hello')}
        </div>
      </div>

    </div>
  );
}

export default HomePage;
