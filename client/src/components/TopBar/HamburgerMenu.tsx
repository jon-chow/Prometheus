import './HamburgerMenu.scss';

interface Props {
  enabled?: boolean;
  onAnimationEnd?: () => void;
}

const HamburgerMenu = ({ enabled = false, onAnimationEnd }: Props) => {
  return (
    <div className="hamburger-menu" data-enabled={enabled} onAnimationEnd={onAnimationEnd} onClick={(e) => e.stopPropagation()}>
      <div className="menu-item">Menu Item 1</div>
      <div className="menu-item">Menu Item 2</div>
      <div className="menu-item">Menu Item 3</div>
    </div>
  );
}

export default HamburgerMenu;
