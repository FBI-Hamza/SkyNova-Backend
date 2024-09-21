// 
function base64ToBlob(base64, contentType = '', sliceSize = 512) {
    // Check if base64 contains a comma (indicating a Data URL format)
    const parts = base64.split(',');
    const base64String = parts.length > 1 ? parts[1] : parts[0];

    // Decode the base64 string
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    // Create and return the Blob
    return new Blob(byteArrays, { type: contentType });
}

module.exports = base64ToBlob;
