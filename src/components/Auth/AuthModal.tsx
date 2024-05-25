import { Modal } from '@mantine/core';

export type IAuthType = 'login' | 'signup';

export default function AuthModal({
  opened,
  close,
  type,
}: {
  opened: boolean;
  close: () => void;
  type: IAuthType;
}) {
  return (
    <Modal opened={opened} onClose={close} title="Authentication" centered>
      {type === 'login' ? 'Login' : 'SignUp'}
    </Modal>
  );
}
