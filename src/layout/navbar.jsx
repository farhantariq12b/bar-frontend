import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

import { Link } from "react-router-dom";
import { useState } from "react";

function AppNavBar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md" {...args}>
        <NavbarBrand href="/">Coffee Bar</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <Link to="/products">
              <NavItem>
                <NavLink href="/products">Products</NavLink>
              </NavItem>
            </Link>
            <Link to="/deals">
              <NavItem>
                <NavLink href="/deals">Deals</NavLink>
              </NavItem>
            </Link>
            <Link to="/orders">
              <NavItem>
                <NavLink href="/orders">Orders</NavLink>
              </NavItem>
            </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavBar;
