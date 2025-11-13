export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Read file failed"));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
