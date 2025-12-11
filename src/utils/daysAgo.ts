export function daysAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < 5) return "Just now";

  for (let key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      return interval === 1
        ? `${interval} ${key} ago`
        : `${interval} ${key}s ago`;
    }
  }

  return "Just now";
}


// or
// function daysAgo(mongodbTime) {
//   const createdAt = new Date(mongodbTime);
//   const now = new Date();

//   const diffMs = now.getTime() - createdAt.getTime();
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   return diffDays;
// }

// export default daysAgo;
