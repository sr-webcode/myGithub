import { Container, ContainerProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren<ContainerProps>;

const Layout = ({ children, ...containerProps }: LayoutProps) => {
  const { maxW = 'container.lg', ...rest } = containerProps;

  return (
    <Container maxW={maxW} {...rest}>
      {children}
    </Container>
  );
};

export default Layout;
