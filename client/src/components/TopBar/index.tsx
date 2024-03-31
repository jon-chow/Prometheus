import React, { useState } from 'react';
import { FaFire, FaBell, FaSearch } from 'react-icons/fa';
import { audioStore } from '../../stores/audioStore.store';
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
  const [searchToggled, setSearchToggled] = useState(false);
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

  const toggleSearch = (e: React.MouseEvent) => {
    setSearchToggled(!searchToggled);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    audioStore.setKey('searchTerm', e.target.value);
  }

  return (
    <>
      <div className="topbar">
        <div className="menu-button hamburger" title="Menu" onClick={toggleHamburger} data-toggled={hamburgerMenuToggled}>
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
        <div className="search-bar">
          <input type="text" placeholder="Search..." data-toggled={searchToggled} onChange={handleSearch} />
          <div className="search-button" title="Search" onClick={toggleSearch}>
            <FaSearch />
          </div>
        </div>
        <div className="menu-button bell" title="Notifications" onClick={toggleBell}>
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
