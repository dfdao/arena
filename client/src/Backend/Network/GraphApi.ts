export const getGraphQLData = async (query: string, graphApiUrl: string) => {
  try {
    const response = await fetch(graphApiUrl, {
      method: 'POST',
      body: JSON.stringify({ query, operationName: null, variables: null }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return await response.json();
  } catch (e) {
    console.log('error fetching graph data');
    return { error: 'error fetching graph data' };
  }
};
