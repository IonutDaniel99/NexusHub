export function bytesToGB(bytes: number) {
    const GB = bytes / Math.pow(1024, 3);
    return Number(GB.toFixed(2)); // Round to 2 decimal places
}