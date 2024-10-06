import { Text, TextProps } from '@chakra-ui/react';

type HeaderProps = {
  text: string;
} & TextProps;

const Title = ({ text, ...props }: HeaderProps) => {
  return (
    <Text as="header" fontSize="xl" fontWeight="bold" {...props}>
      {text}
    </Text>
  );
};

export default Title;
