export const transformFileIntoBlob = async (file: File): Promise<Blob> => {
    console.log(file, file instanceof File, file instanceof Blob);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result!;
            const blob = new Blob([data], { type: file.type });
            resolve(blob);
        };
        reader.readAsArrayBuffer(file as Blob);
    });
};

export const fileSize = (file: File): string => {
    const size = file.size;
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
};
