'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useFetch } from '@/hooks/use-fetch';
import { URL_FILTER_USERS } from '@/utils/const';
import { useDebounce } from '@/hooks/use-debounce';
import type { FilterUserResponse } from '@/types';
import { type User } from '@/models';

export const AdminBlock = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const { fetchPetition } = useFetch();
  const debounce = useDebounce();

  const fetchFilteredUsers = useCallback(
    async (input: string) => {
      const response = await fetchPetition<FilterUserResponse>({
        url: `${URL_FILTER_USERS}?query=${input}`,
        method: 'GET',
      });

      if (response && response.users) {
        setResults(response.users);
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

  return (
    <div>
      <Input
        type='text'
        placeholder='Search for a user...'
        value={query}
        onChange={handleInputChange}
      />
      {/* TODO: Render the filtered results! */}
      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};
