import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useAuth0 } from "./react-auth0-spa";


const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <Container className="text-right">
        <Button onClick={() => loginWithRedirect({})}>Log in</Button>
        </Container>
      )}

      {isAuthenticated && (
      <>
      <Container className="text-right">
      <p>User: {user.name}</p><Button onClick={() => logout()}>Log out</Button>
      </Container>
      </>
      )}
    </div>
  );
};

export default NavBar;