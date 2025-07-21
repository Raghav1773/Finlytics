import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  
  // Extract last 3 digits
  const lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);
  
  // Add commas for every 2 digits in the remaining part
  const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  
  const formattedInteger = otherNumbers ? formattedOther + "," + lastThree : lastThree;

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    month: moment(item?.date).format("DD MMM"), // or "MMM YYYY" for month-year
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const preapareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    date: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
}