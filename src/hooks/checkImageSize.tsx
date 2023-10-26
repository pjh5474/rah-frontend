import { IMAGE_FILE_SIZE } from "../constants";

export const CheckFileSize = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  console.log(file);
  const maxSize = IMAGE_FILE_SIZE; // 3MB
  if (file && file.size > maxSize) {
    alert("파일 사이즈는 3MB 이내로 등록 가능합니다.");
    e.target.value = "";
  }
};
