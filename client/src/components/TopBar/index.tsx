import React, { useState } from 'react';
import { FaFire, FaBell } from 'react-icons/fa';
import './TopBar.scss';

import HamburgerMenu from './HamburgerMenu';
import BellMenu from './BellMenu';
import useTransition from '../../hooks/TransitionHook';

export interface TopBarProps {
  header: string;
}

const TopBar = ({ header }: TopBarProps) => {
  const [hamburgerMenuToggled, setHamburgerMenuToggled] = useState(false);
  const [bellMenuToggled, setBellMenuToggled] = useState(false);
  const hamburgerMenuMounted = useTransition(hamburgerMenuToggled, 250);
  const bellMenuMounted = useTransition(bellMenuToggled, 250);

  const toggleHamburger = (e: React.MouseEvent) => {
    setHamburgerMenuToggled(!hamburgerMenuToggled);
    setBellMenuToggled(false);
  };

  const toggleBell = (e: React.MouseEvent) => {
    setBellMenuToggled(!bellMenuToggled);
    setHamburgerMenuToggled(false);
  };

  const hideMenus = (e: React.MouseEvent) => {
    setHamburgerMenuToggled(false);
    setBellMenuToggled(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="menu-button hamburger" onClick={toggleHamburger} data-toggled={hamburgerMenuToggled}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <div className="header">
          <div className="logo">
            <FaFire />
          </div>
          <h1>{header}</h1>
        </div>
        <div className="menu-button bell" onClick={toggleBell}>
          <FaBell />
        </div>
      </div>

      <div className="modal-wrapper" onClick={hideMenus} data-backdrop={hamburgerMenuToggled} data-enabled={hamburgerMenuToggled || bellMenuToggled}>
        {hamburgerMenuMounted && (
          <HamburgerMenu
            enabled={hamburgerMenuToggled}
            onAnimationEnd={() => {
              if (!hamburgerMenuToggled) setHamburgerMenuToggled(false);
            }}
          />
        )}
        {bellMenuMounted && (
          <BellMenu
            enabled={bellMenuToggled}
            onAnimationEnd={() => {
              if (!bellMenuToggled) setBellMenuToggled(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default TopBar;
