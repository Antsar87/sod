'use client';
import { useFormStatus } from 'react-dom';

const LoadingComponent = ({ text = 'Submit', className }) => {
  const { pending } = useFormStatus();

  console.log(pending)
  return (
    <button className={className} disabled={pending}>
      {pending ? (
        <>
          <span className="loading"></span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingComponent;
