export const bytesToMB = (bytes: number, decimals = 2) => {
    const k = 1024;
    const m = k * k;
    return (bytes / m).toFixed(decimals) + ' MB';
}