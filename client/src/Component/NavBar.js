import React, { useState } from 'react';
import { IoIosLogOut, IoIosLogIn, IoIosArchive } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaUserGraduate, FaCertificate } from "react-icons/fa";
import logo from '../images/aeternity.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md" light fixed="top">
        <NavbarBrand href="/"><img src={logo} height="40rem" width="70rem" alt="Sistema de Encuentros" /></NavbarBrand>
        <NavbarToggler   onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto ml-5" navbar>
             <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Cursos
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/curso"><FaCertificate />Registrar Cursos</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/consultarcurso"><IoIosArchive />Consultar Cursos</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/apostillar"><AiOutlineSafetyCertificate />Apostillar Certificado</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/certificado"><IoIosArchive />Consultar Certificados</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Alumnos
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/pagar"><MdPayment />Pagar Curso</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/inscritos"><FaUserGraduate />Alumnos Inscritos</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="navbar-right" navbar>
           
            <NavItem>
              <NavLink href="/salir/"><IoIosLogOut />Logout</NavLink>
            </NavItem>
          </Nav>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;