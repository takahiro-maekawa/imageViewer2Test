import React, { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default Page;