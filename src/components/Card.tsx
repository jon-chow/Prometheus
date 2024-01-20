import { component$, useStyles$ } from '@builder.io/qwik';
import styles from '@/styles/Card.scss?inline';

interface Props {
  icon: string;
  title: string;
  type: string;
  date: string;
  length: string;
}

export default component$((props: Props) => {
  useStyles$(styles);

  return (
    <>
      <div role="listitem" class='card'>
        <div class='main-info'>
          <img role="img" class='icon' src={props.icon} />
          <div class='desc'>
            <p class='title'>{props.title}</p>
            <p class='type'>{props.type}</p>
          </div>
        </div>
        <p class='date'>{props.date}</p>
        <p class='length'>{props.length}</p>
      </div>
    </>
  );
});
