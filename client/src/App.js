import { Outlet } from "react-router-dom";
import {
  Container
} from "react-bootstrap";
import MainNavbar from "./navbar/navbar";

import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <div className="no-padding d-flex">
        <MainNavbar></MainNavbar>
        <Container fluid>
          <Outlet />
        </Container>
      </div>
    </CookiesProvider>
  );
}

export default App;
