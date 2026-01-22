import React from 'react';
import styled from 'styled-components';
import { Header } from '../organisms';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 32px 24px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
    </LayoutContainer>
  );
};
