export const isEmptyObject = (obj: object | null): boolean => {
  if (obj) {
    return Object.keys(obj).length === 0;
  }

  return true;
};

// Helper function to format a given Date object
export function formatDateTime(date: Date): string {
  // Get day name
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName: string = days[date.getDay()];

  // Get day number
  const day: number = date.getDate();

  // Get month name
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName: string = months[date.getMonth()];

  // Get year
  const year: number = date.getFullYear();

  // Get hours and minutes
  const hours: number = date.getHours();
  const minutes: string = date.getMinutes().toString().padStart(2, "0");

  // Format hours and minutes to am/pm format
  const ampm: string = hours >= 12 ? "pm" : "am";
  const formattedHours: number = hours % 12 || 12; // Convert 0 to 12 for 12am

  // Combine into desired format
  const formattedDate: string = `${dayName}, ${day} ${monthName} ${formattedHours}:${minutes} ${ampm}`;

  return formattedDate;
}

interface DateInput {
  year?: number;
  month?: number;
  day?: number;
}

export function getPastTime(input: DateInput | string): string {
  const currentDate = new Date();
  let givenDate: Date;

  if (typeof input === "string") {
    givenDate = new Date(input);
  } else {
    givenDate = new Date(
      input.year || currentDate.getFullYear(),
      input.month || currentDate.getMonth(),
      input.day || currentDate.getDate()
    );
  }

  const diffInMs = Math.abs(currentDate.getTime() - givenDate.getTime());
  const diffInHours = Math.floor(diffInMs / (24 * 60 * 60 * 1000));

  if (diffInHours > 1) {
    const daysDiff = Math.floor(diffInHours / 24);

    return `${daysDiff} days ago`;
  }

  return `${diffInHours} hours ago`;
}
