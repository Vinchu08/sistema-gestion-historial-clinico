'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function SearchPatient({ placeholder, queryParam }: { placeholder: string; queryParam: string; }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(queryParam, term);
    } else {
      params.delete(queryParam);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(event) => handleSearch(event.target.value)}
      className="mb-4 p-2 w-full border rounded"
      defaultValue={searchParams.get(queryParam) || ''}
    />
  );
}

export function SearchMeeting({
  placeholder,
  queryParam,
}: {
  placeholder: string;
  queryParam: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(queryParam, term);
      params.delete("dateQuery"); // Borra dateQuery si se busca texto
    } else {
      params.delete(queryParam);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(event) => handleSearch(event.target.value)}
      className="p-2 border rounded w-full"
      defaultValue={searchParams.get(queryParam) || ''}
    />
  );
}
