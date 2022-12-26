import { Blocks } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Blocks
      visible={true}
      height="120"
      width="120"
      ariaLabel="blocks-loading"
      wrapperStyle={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, 50%)',
      }}
      wrapperClass="blocks-wrapper"
    />
  );
};
