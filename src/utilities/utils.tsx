export const todaysDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

// export const generateCurrentTime = () => {
//   const now = new Date();
//   const hours = now.getHours().toString().padStart(2, "0");
//   const minutes = now.getMinutes().toString().padStart(2, "0");
//   return `${hours}:${minutes}`
// };


export const generateCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  let period = "AM"; // Default to AM

  // Convert hours to 12-hour format and determine the period (AM/PM)
  let hours12 = hours;
  if (hours >= 12) {
    period = "PM";
    hours12 = hours === 12 ? 12 : hours - 12;
  } else if (hours === 0) {
    hours12 = 12;
  }

  const formattedHours = hours12.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const generateCurrentTimeWithSeconds = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
