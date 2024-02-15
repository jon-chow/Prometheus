import './BellMenu.scss';

interface Props {
  enabled?: boolean;
  onAnimationEnd?: () => void;
}

const BellMenu = ({ enabled = false, onAnimationEnd }: Props) => {
  return (
    <div className="bell-menu" data-enabled={enabled} onAnimationEnd={onAnimationEnd} onClick={(e) => e.stopPropagation()}>
      <div className="menu-item">Menu Item 1</div>
      <div className="menu-item">Menu Item 2</div>
      <div className="menu-item">Menu Item 3</div>
    </div>
  );
}

export default BellMenu;
