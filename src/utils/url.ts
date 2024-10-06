export const composeUrl = (baseUrl: string, params: Record<string, string | number | undefined>): string => {
    const url = new URL(baseUrl);
    const searchParams = new URLSearchParams();
  
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value.toString());
      }
    });
  
    url.search = searchParams.toString();
    return url.toString();
  };
  