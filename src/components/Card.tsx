import '../styles/Card.scss';

interface Props {
  icon: string;
  title: string;
  type: string;
  date: string;
  length: string;
}

const Card = ({ icon, title, type, date, length }: Props) => {
  return (
    <>
      <div role="listitem" className="card">
        <div className="main-info">
          <img role="img" className="icon" src={icon} />
          <div className="desc">
            <p className="title">{title}</p>
            <p className="type">{type}</p>
          </div>
        </div>
        <p className="date">{date}</p>
        <p className="length">{length}</p>
      </div>
    </>
  );
};

export default Card;
