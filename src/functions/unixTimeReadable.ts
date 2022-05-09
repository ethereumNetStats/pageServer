export const unixTimeReadable = (unix_sec: number): string => {
    let date_obj: Date = new Date(unix_sec);
    return `${('0' + (date_obj.getUTCMonth() + 1)).slice(-2)}/${('0' + date_obj.getUTCDate()).slice(-2)} ${('0' + date_obj.getUTCHours()).slice(-2)}:${('0' + date_obj.getUTCMinutes()).slice(-2)}`;
};
