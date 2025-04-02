import { useParams } from 'react-router-dom';

const AlertDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <h1>AlertDetails for: {id}</h1>
    </>
  );
};

export default AlertDetails;
