import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { BiLogOutCircle } from 'react-icons/bi';

const BLACK = css`
background: black;
`;

const NAV = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 19px;
    width: 100%;
    z-index: 1;
    ${props => props.toggle && BLACK};
    .logo {
      img {
        width: 165px;
        cursor: pointer;
      }
    }
    .profile {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 40px;
        cursor: pointer;
        margin: 0px 5px;
      }
    }
`;

function Navbar() {
  const [toggle, setToggle] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const handleScroll = () => {
    setToggle(window.scrollY)
  }

  return (
    <NAV toggle={toggle > 100}>
      <div className="logo">
        <img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo.png" alt='Netflix' />
      </div>
      <div className="profile">
        <img src="https://external-preview.redd.it/0dTT-3SprPcsNCqo1GTCI-nqGM9EdZYwqyYr_pZ-baE.jpg?auto=webp&s=a1e8532d326f5aa122df2f31694bf142f117fc06" alt="Profile" />
        <BiLogOutCircle size={"1.89rem"} color="#ffff" style={{ cursor: "pointer" }} />
      </div>
    </NAV>
  )
}

export default Navbar