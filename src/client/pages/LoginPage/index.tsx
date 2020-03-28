import React, { useState } from 'react';
import Button from '~/components/Button';
import { useFirebase } from '~/firebase';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FunctionComponent = () => {
  const firebase = useFirebase();
  const [error, setError] = useState<string>(null);
  const history = useHistory();

  async function onLogin() {
    const res = await firebase.signInWithPopup();

    if (res.user) {
      const [, domain] = res.user.email.split('@')
      if (domain.trim() !== 'tesc.ucsd.edu') {
        await logout();
        setError('You tried logging in with a non tesc.ucsd.edu account.')
      } else {
        history.push('/admin');
      }
    } else {
      setError('Something went wrong!')
    }
  }

  async function logout() {
    await firebase.logout();
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="w-100 text-danger text-center">{error}</div>
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