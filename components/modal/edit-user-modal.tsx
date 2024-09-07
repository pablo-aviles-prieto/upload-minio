'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFetch } from '@/hooks/use-fetch';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/models';
import { BucketItemFromList } from 'minio';
import { EditUserForm } from '../form/user/edit';
import { EditUserFormValue } from '@/schema/edit-user-form-schema';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: User | null;
  bucketOptions: BucketItemFromList[];
}

interface EditUserResponse {
  ok: boolean;
  error?: string;
  message?: string;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  userData,
  onClose,
  bucketOptions,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const { fetchPetition } = useFetch();
  const { toast } = useToast();

  useEffect(() => {
    if (userData) setIsMounted(true);
  }, [userData]);

  // const onSubmit = async (data: ForgotPasswordFormValue) => {
  //   setIsSendingMail(true);
  //   const response = await fetchPetition<ForgotPasswordMailResponse>({
  //     method: "POST",
  //     url: URL_RECOVER_PASSWORD,
  //     body: { email: data.email },
  //   });

  //   if (response.error) {
  //     toast({
  //       title: "Error sending the reset password email",
  //       description: response.error,
  //       variant: "destructive",
  //     });
  //   } else if (response.message) {
  //     toast({
  //       title: "Email sent",
  //       description: response.message,
  //       variant: "success",
  //     });
  //   }
  //   onClose();
  //   setIsSendingMail(false);
  // };

  // TODO: Finish the submit handler.
  const onSubmit = async (data: EditUserFormValue) => {
    console.log('data', data);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Edit User'
      description='Change the user permissions'
      isOpen={isOpen}
      onClose={onClose}
    >
      <ScrollArea maxHeight={450}>
        {userData && bucketOptions.length > 0 ? (
          <EditUserForm
            bucketOptions={bucketOptions}
            isEditingUser={isEditingUser}
            userData={userData}
            onSubmit={onSubmit}
          />
        ) : (
          <div>There was an error, try again later</div>
        )}
      </ScrollArea>
    </Modal>
  );
};
