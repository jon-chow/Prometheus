import React, { useState } from 'react';
import { FaFire, FaEllipsisH, FaBell } from 'react-icons/fa';
import './TopBar.scss';

interface Props {
  header: string;
}

const TopBar = ({ header }: Props) => {
  const [ellipsisMenuToggled, setEllipsisMenuToggled] = useState(false);
  const [bellMenuToggled, setBellMenuToggled] = useState(false);

  const toggleEllipsis = (e: React.MouseEvent) => {
    setEllipsisMenuToggled(!ellipsisMenuToggled);
  };

  const toggleBell = (e: React.MouseEvent) => {
    setBellMenuToggled(!bellMenuToggled);
  };

  const hideMenus = (e: React.MouseEvent) => {
    setEllipsisMenuToggled(false);
    setBellMenuToggled(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="menu-button ellipsis" onClick={toggleEllipsis}>
          <FaEllipsisH />
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

      <div className={'modal-wrapper' + (ellipsisMenuToggled || bellMenuToggled ? '' : ' hidden')} onClick={hideMenus}>
        <div className={'menu ellipsis-menu' + (ellipsisMenuToggled ? '' : ' hidden')}>
          <div className="menu-item">Menu Item 1</div>
          <div className="menu-item">Menu Item 2</div>
          <div className="menu-item">Menu Item 3</div>
        </div>

        <div className={'menu bell-menu' + (bellMenuToggled ? '' : ' hidden')}>
          <div className="menu-item">Menu Item 1</div>
          <div className="menu-item">Menu Item 2</div>
          <div className="menu-item">Menu Item 3</div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
