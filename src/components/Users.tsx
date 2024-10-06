import {
  Flex,
  Wrap,
  Text,
  Avatar,
  WrapItem,
  AvatarProps,
  SystemStyleObject
} from '@chakra-ui/react';

import { DataProps } from '../types/data';
import { GithubUserList } from '../types/github';
import ContentSection from '../ui/ContentSection';
import { SkeletonAvatarLoader } from '../ui/Skeleton';

type UsersProps = DataProps<{
  data: GithubUserList | null;
  selectedUser?: string;
  onClickUser: (userName: string) => void;
}>;

type AvatarItemsProps = Pick<AvatarProps, 'src' | 'name'>;

const activeStyle: SystemStyleObject = {
  outline: '2px solid',
  outlineOffset: 'blue.900'
};

const AvatarItem = ({ name, src }: AvatarItemsProps) => (
  <Avatar size="2xl" src={src} name={name} borderRadius={0} />
);

const Users = (props: UsersProps) => {
  const { data, isLoading, onClickUser, selectedUser } = props;

  if (isLoading) return <SkeletonAvatarLoader count={12} />;

  const hasEmptyUserData = !data || data.length < 1;

  const content = hasEmptyUserData ? (
    <Flex width="100%" minHeight={280} justify="center" alignItems="center">
      <Text fontSize="8xl" color="gray.200" userSelect="none">
        No users found
      </Text>
    </Flex>
  ) : (
    <Wrap spacing={10}>
      {data?.map((user) => {
        const { id, login: loginName, avatar_url } = user;
        const isUserSelected = selectedUser === loginName;
        return (
          <WrapItem
            key={id}
            cursor="pointer"
            flexBasis="auto"
            overflow="hidden"
            userSelect="none"
            borderRadius="md"
            onClick={() => onClickUser(user.login)}
            sx={{
              outline: isUserSelected ? activeStyle.outline : undefined,
              outlineColor: isUserSelected
                ? activeStyle.outlineColor
                : undefined,
              ':hover': { ...activeStyle }
            }}
          >
            <AvatarItem name={loginName} src={avatar_url} />
          </WrapItem>
        );
      })}
    </Wrap>
  );

  return (
    <ContentSection title={hasEmptyUserData ? undefined : 'Users'}>
      {content}
    </ContentSection>
  );
};

export default Users;
