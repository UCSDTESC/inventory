import React from 'react';
import Button from '~/components/Button';
import { useFirebase } from '~/firebase';

const LoginPage: React.FunctionComponent = () => {
  const firebase = useFirebase();
  
  async function onLogin() {
    const x = await firebase.signInWithPopup();
    console.log(x);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Button onClick={onLogin} className="w-auto d-flex align-items-center justify-content-center">
            <img 
             className="img-fluid mr-3"
             style={{width: '2rem'}}
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"></img>
            Login 
          </Button>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;