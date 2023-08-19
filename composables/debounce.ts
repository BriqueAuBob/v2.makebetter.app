export const useDebounce = (timeout: number, callback: Function) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), timeout);
    };
};
