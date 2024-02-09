import { useState } from 'react';
import { FaFire, FaEllipsisH, FaBell } from 'react-icons/fa';
import '../../styles/TopBar.scss';

interface Props {
  header: string;
}

const TopBar = ({ header }: Props) => {
  const [ellipsisMenuToggled, setEllipsisMenuToggled] = useState(false);
  const [bellMenuToggled, setBellMenuToggled] = useState(false);

  const toggleEllipsis = (e: any) => {
    setEllipsisMenuToggled(!ellipsisMenuToggled);
  };

  const toggleBell = (e: any) => {
    setBellMenuToggled(!bellMenuToggled);
  };

  const hideMenus = (e: any) => {
    setEllipsisMenuToggled(false);
    setBellMenuToggled(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="menu-button ellipsis" onClick={(e) => toggleEllipsis(e)}>
          <FaEllipsisH />
        </div>
        <div className="header">
          <div className="logo">
            <FaFire />
          </div>
          <h1>{header}</h1>
        </div>
        <div className="menu-button bell" onClick={(e) => toggleBell(e)}>
          <FaBell />
        </div>
      </div>

      <div className={'modal-wrapper' + (ellipsisMenuToggled || bellMenuToggled ? '' : ' hidden')} onClick={(e) => hideMenus(e)}>
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
