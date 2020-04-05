import React from 'react';
import { Rounded } from '~/styles';
import styled from 'styled-components';
import useAdmin from '~/data/admin';
import { UncontrolledCollapse, Card, CardBody, UncontrolledTooltip } from 'reactstrap';
import Button from '~/components/Button';
import { useFirebase } from '~/firebase';
import {client as AdminApiClient, getItemCSV} from '~/data/AdminApi';
import ProfileCard from '~/components/ProfileCard';
import { NavEmoji } from './Sidebar';
import { TESC_BLUE, TESC_BLUE_LIGHTER } from '~/styles/constants';

const Collapse = styled(UncontrolledCollapse)`
  transform: translateX(calc(-1.5rem)) translateY(3rem);
  z-index: 30;
` 

const Emoji = styled(NavEmoji)`
  filter: none;
  text-align: center;
  display: block;
  width: 21px;
  font-size: 1.2rem;
`

const Action = styled(Rounded)`
  padding: 0;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  background: ${TESC_BLUE};

  &:hover {
    background: ${TESC_BLUE_LIGHTER};
  }

  &:focus {
    outline: none;
    background: ${TESC_BLUE_LIGHTER};
  }
`

const TopAction: React.FunctionComponent<{
  text: string; 
  tooltip?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = (props) => {

  return (
    <Action 
      as='button' 
      className="rounded-circle shadow-sm" 
      id={props.text}
      onClick={props.onClick}
    >
      <Emoji>
        {props.text}
      </Emoji>
      {props.tooltip && 
        <UncontrolledTooltip placement="top" target={props.text}>
          {props.tooltip}
        </UncontrolledTooltip>
      }
    </Action>
  )
}

const TopBar: React.FunctionComponent = () => {

  const admin = useAdmin();
  const firebase = useFirebase();

  async function onLogout() {
    await firebase.logout();
    AdminApiClient.defaults.headers['Authorization'] = ``;
  }

  async function onExport(e: React.MouseEvent<HTMLButtonElement>) {
    const res = await getItemCSV();

    const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tesc-inventory-${Date.now()}.csv`);
    document.body.appendChild(link);

    link.click(); 
  }

  return (
    <>
    <Rounded className="w-100 bg-white mb-3 d-flex">
      <div className="d-flex">
        <h4 className="my-auto">🖥️ TESC Inventory </h4>
      </div>
      <div className="ml-auto d-flex">
        <TopAction 
          text="🖨️" 
          tooltip="Export Items As CSV" 
          onClick={onExport}
        />

        <ProfileCard className="img-fluid shadow-sm" src={admin.photoURL} id="profileImg"/>

        <Collapse toggler="#profileImg" className="position-absolute">
          <Card className="mt-1">
            <CardBody>
              <div className="text-center mb-1">
                {admin.displayName}
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