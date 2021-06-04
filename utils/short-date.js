export default function shortDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
        undefined, {
        month: 'long',
        year: 'numeric',
    });
};
