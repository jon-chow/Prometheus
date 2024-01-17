import { component$, useSignal, useStyles$, $ } from '@builder.io/qwik';
import { FaFireSolid, FaEllipsisSolid, FaBellRegular } from '@qwikest/icons/font-awesome';
import styles from './Topbar.scss?inline';

interface Props {
  header: string;
}

export default component$((props: Props) => {
  useStyles$(styles);

  const ellipsisMenuToggled = useSignal(false);
  const bellMenuToggled = useSignal(false);

  const toggleEllipsis = $((e: MouseEvent)  => {
    ellipsisMenuToggled.value = !ellipsisMenuToggled.value;
  });

  const toggleBell = $((e: MouseEvent)  => {
    bellMenuToggled.value = !bellMenuToggled.value;
  });

  const hideMenus = $((e: FocusEvent) => {
    ellipsisMenuToggled.value = false;
    bellMenuToggled.value = false;
  });

  return (
    <>
      <div class="topbar">
        <div class="menu-button ellipsis" onClick$={toggleEllipsis}><FaEllipsisSolid /></div>
        <div class="header">
          <div class="logo"><FaFireSolid /></div>
          <h1>{props.header}</h1>
        </div>
        <div class="menu-button bell" onClick$={toggleBell}><FaBellRegular /></div>
      </div>

      <div class={"modal-wrapper" + (ellipsisMenuToggled.value || bellMenuToggled.value ? '' : ' hidden')} onClick$={hideMenus}>
        <div class={"menu ellipsis-menu" + (ellipsisMenuToggled.value ? '' : ' hidden')}>
          <div class="menu-item">Menu Item 1</div>
          <div class="menu-item">Menu Item 2</div>
          <div class="menu-item">Menu Item 3</div>
        </div>

        <div class={"menu bell-menu" + (bellMenuToggled.value ? '' : ' hidden')}>
          <div class="menu-item">Menu Item 1</div>
          <div class="menu-item">Menu Item 2</div>
          <div class="menu-item">Menu Item 3</div>
        </div>
      </div>
    </>
  );
});
