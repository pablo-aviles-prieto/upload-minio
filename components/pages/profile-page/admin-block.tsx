'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useFetch } from '@/hooks/use-fetch';
import { URL_FILTER_USERS } from '@/utils/const';
import { useDebounce } from '@/hooks/use-debounce';
import type { FilterUserResponse } from '@/types';
import { type User } from '@/models';
import { UsersEditCard } from '@/components/cards/users-edit-card';
import { EditUserModal } from '@/components/modal/edit-user-modal';

export const AdminBlock = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const { fetchPetition } = useFetch();
  const debounce = useDebounce();

  const fetchFilteredUsers = useCallback(
    async (input: string) => {
      // TODO: Add loader whenever new users fetched
      const response = await fetchPetition<FilterUserResponse>({
        url: `${URL_FILTER_USERS}?query=${input}`,
        method: 'GET',
      });

      if (response && response.users) {
        setUsers(response.users);
      }
    },
    [fetchPetition]
  );

  // Retrieve the debounced function returned by the debounce hook
  const debouncedFetch = useMemo(
    () => debounce(fetchFilteredUsers, 300),
    [debounce, fetchFilteredUsers]
  );

  useEffect(() => {
    fetchFilteredUsers('');
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedFetch(event.target.value); // Debounced call directly in the input handler
  };

  const editUserHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: User
  ) => {
    e.stopPropagation();
    setUserToEdit(user);
    setOpenEditUserModal(true);
  };

  // TODO: Open a modal with the details to modify the concrete user and send the request to modify it
  // after send the request and modify the user details, reset the states (or maybe just closing
  // the accordion it reset all states)
  return (
    <>
      <EditUserModal
        isOpen={openEditUserModal}
        userData={userToEdit}
        onClose={() => setOpenEditUserModal(false)}
      />
      <div>
        <Input
          className='max-w-md mx-auto my-2'
          type='text'
          placeholder='Search for a user...'
          value={query}
          onChange={handleInputChange}
        />
        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          {users.map((user) => (
            <li key={user.id}>
              <UsersEditCard user={user} onClick={editUserHandler} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
