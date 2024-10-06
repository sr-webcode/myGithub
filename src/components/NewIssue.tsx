import {
  Modal,
  Input,
  Button,
  Textarea,
  ModalBody,
  useBoolean,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { composeUrl } from '../utils/url';
import { createIssue, RepoParams, REQUEST_OPTIONS } from '../api/github';

type NewIssueProps = UseDisclosureProps & RepoParams;

const NewIssue = (props: NewIssueProps) => {
  const [isLoading, setLoading] = useBoolean(false);
  const { repo, owner, isOpen = false, onClose = () => {} } = props;
  const titleRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const toast = useToast();

  const handleCreateIssue = async () => {
    const title = titleRef?.current?.value;
    const description = textAreaRef?.current?.value;

    if (!title)
      return toast({
        title: 'Unable to create issue.',
        description: 'Please include a title',
        status: 'error',
        isClosable: true
      });
    setLoading.on();
    try {
      const url = composeUrl(createIssue({ repo, owner }), {});
      await fetch(url, {
        method: 'POST',
        ...REQUEST_OPTIONS,
        body: JSON.stringify({
          title,
          body: description
        })
      });
      toast({
        title: 'New Issue Created.',
        description: 'Click the user again to and see update issues.',
        status: 'success',
        isClosable: true
      });
      onClose?.();
    } catch (error) {
      toast({
        title: 'Unable to create issue.',
        description: 'Please try again after a while',
        status: 'error',
        isClosable: true
      });
    } finally {
      setLoading.off();
    }
  };

  return (
    <Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader padding={8}>New Issue</ModalHeader>
        <ModalCloseButton size="md" />
        <ModalBody display="flex" gap={4} flexDirection="column" paddingX={8}>
          <Input ref={titleRef} size="lg" placeholder="Title" />
          <Textarea
            size="lg"
            minH={200}
            ref={textAreaRef}
            placeholder="Description"
          />
        </ModalBody>
        <ModalFooter display="flex" gap={4} padding={8}>
          <Button size="lg" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="lg"
            isLoading={isLoading}
            onClick={() => handleCreateIssue()}
            colorScheme="blue"
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewIssue;
