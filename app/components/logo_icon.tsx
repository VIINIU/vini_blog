import Image from 'next/image';

const logo = () => {
  return (
    <div>
      <Image src="../../public/logo_small.png" alt="Logo" width={50} height={50} />
    </div>
  );
};


export default logo;