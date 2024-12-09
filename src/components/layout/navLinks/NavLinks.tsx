import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavLinksWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.primaryColor};
  &:hover {
    color: ${({ theme }) => theme.accentColor};
  }
  &:visited {
    color: ${({ theme }) => theme.visitedColor};
  }
`;

const NavLinks: React.FC = () => {
  return (
    <NavLinksWrapper>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      {/* Add more links as needed */}
    </NavLinksWrapper>
  );
};

export default NavLinks;