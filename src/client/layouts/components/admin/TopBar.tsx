import React from 'react';
import { Rounded } from '~/styles';
import styled from 'styled-components';
import useUser from '~/data/user';
import { UncontrolledCollapse, Card, CardBody } from 'reactstrap';
import Button from '~/components/Button';
import { useFirebase } from '~/firebase';
import {client as AdminApiClient} from '~/data/AdminApi';

const ProfileCard = styled.img`
  height: 2rem;

  &:hover {
    cursor: pointer;
  }
`

const Collapse = styled(UncontrolledCollapse)`
  transform: translateX(calc(-100% + 2rem));
` 

const TopBar: React.FunctionComponent = () => {

  const user = useUser();
  const firebase = useFirebase();

  async function onLogout() {
    await firebase.logout();
    AdminApiClient.defaults.headers['Authorization'] = ``;
  }

  return (
    <>
    <Rounded className="w-100 bg-white mb-3 d-flex">
      <div className="my-auto">
        TESC Inventory (Search??)
      </div>
      <div className="ml-auto">
        <ProfileCard className="img-fluid" src={user.photoURL} id="profileImg"/>
        <Collapse toggler="#profileImg" className="position-absolute">
          <Card className="mt-1">
            <CardBody>
              <div className="text-center mb-1">
                {user.displayName}
              </div>
              <div>
                <Button onClick={onLogout}>Logout</Button>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </Rounded>
    </>
  );
}

export default TopBar;