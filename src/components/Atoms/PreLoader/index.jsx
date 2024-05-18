import Image from 'next/image';
import React from 'react';
import Loading from '../../../../public/images/svg/pre-loader.svg';

const PreLoader = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <Image width={65} height={65} src={Loading} />
  </div>
);

export default PreLoader;
