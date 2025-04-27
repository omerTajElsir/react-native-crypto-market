import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for searching and filtering data
 * @param data The array of data to search through
 * @param searchKeys The keys in the data objects to search in
 * @returns An object containing the filtered data, search query, and a function to update the search query
 */
export const useSearch = <T extends Record<string, any>>(
  data: T[],
  searchKeys: (keyof T)[]
) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }

    const normalizedQuery = searchQuery.toLowerCase().trim();
    
    return data.filter(item => {
      return searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(normalizedQuery);
        } else if (typeof value === 'number') {
          return value.toString().includes(normalizedQuery);
        }
        return false;
      });
    });
  }, [data, searchKeys, searchQuery]);

  /**
   * Updates the search query
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  /**
   * Clears the search query
   */
  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    filteredData,
    handleSearch,
    clearSearch,
  };
};