export const queryParams = <T>(query: T): string => {
    const keys: string[] = Object.keys(query);

    return keys.reduce((prevKey, nextKey) => {
        return prevKey + `${nextKey}=${String(query[nextKey])}&`
    }, '');
}
