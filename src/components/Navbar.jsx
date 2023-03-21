import React from 'react';
import styled from 'styled-components';
import { BiLogOutCircle } from 'react-icons/bi';
import { signOut } from "firebase/auth";
import { auth } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const NAV = styled.div`
/* border: 2px solid greenyellow; */
width: inherit;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0px 19px;
z-index: 1;
    .logo {
      /* border: 2px solid crimson; */
      img {
        width: 165px;
        cursor: pointer;
        @media only screen and (max-width: 768px) {
          width: 125px;
        }
      }
    }
    .profile {
      /* border: 2px solid yellow; */
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px 15px;
      img {
        width: 40px;
        cursor: pointer;
        margin: 0px 5px;
        @media only screen and (max-width: 768px) {
          width: 30px;
        }
      }
    }
`;

function Navbar() {
  const navigate = useNavigate();
  const toggleLogout = async () => {
    await signOut(auth);
    cookies.remove('user');
    navigate('/signin');
  };

  return (
    <NAV>
      <div className="logo">
        <img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo.png" alt='Netflix' />
      </div>
      <div className="profile">
        <img src="https://external-preview.redd.it/0dTT-3SprPcsNCqo1GTCI-nqGM9EdZYwqyYr_pZ-baE.jpg?auto=webp&s=a1e8532d326f5aa122df2f31694bf142f117fc06" alt="Profile" />
        <BiLogOutCircle onClick={toggleLogout} size={"1.85rem"} color="#ffff" style={{ cursor: "pointer" }} />
      </div>
    </NAV>
  )
}

export default Navbar