export function formatUnixTimestamp(unixTimestamp) {
    // Create a new Date object using the Unix timestamp
    const date = new Date(unixTimestamp * 1000);

    // Format the date and time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Combine the formatted parts into a single string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  }
  export const getStatus = (status) => {
    switch (Number(status)) {
      case 0:
        return "In Queue";
      case 1:
        return "Accepted";
      case 2:
        return "Delivered";
      case 3:
        return "Rejected";
      case 4:
        return "Cancelled";
    }
  };

  export const getOrderType = (type) => {
    switch (Number(type)) {
      case 0:
        return "Dine-In";
      case 1:
        return "Take-Away";
      case 2:
        return "Delivery";
    }
  };