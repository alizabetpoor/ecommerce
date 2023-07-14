export default function makeTextShorter(
  text: string,
  endingCharacterIndex: number = 44
): string {
  if (text.length <= endingCharacterIndex) {
    return text;
  }
  const shortedText = text.slice(0, endingCharacterIndex);
  const convertedText = shortedText + " ...";
  return convertedText;
}
