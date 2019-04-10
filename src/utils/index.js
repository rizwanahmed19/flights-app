export const formatDate = date => {
  const d = new Date(date);

  const day = d
    .getDate()
    .toString()
    .padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
