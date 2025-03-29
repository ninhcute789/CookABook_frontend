const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const truncateDate = (text, wordLimit) => {
    if (!text) return ""; // Trả về chuỗi rỗng nếu text là null hoặc undefined
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ")
      : text;
  };

  
export { truncateText, truncateDate };
