import axios from 'axios';

export function setJwtToLocalStorage (jwt: string): void {
    window.localStorage.setItem('token', jwt);
}

export function getJwtFromLocalStorage(): string {
    return window?.localStorage?.getItem('token');
}

export function setAuthorisationHeader (jwt: string): void {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export function removeToken(): void {
    window.localStorage.removeItem('token');
}

export function login(jwt: string): void {
    setJwtToLocalStorage(jwt);
    setAuthorisationHeader(jwt);
}
