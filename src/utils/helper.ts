
export const formatDate = (date?: string) => {
  const transformedDate = new Date(date ? date : "");
  const year = transformedDate.getFullYear();
  let month = transformedDate.getMonth()+1;
  let dt = transformedDate.getDate();
  const dateString = (dt < 10 ? '0' + dt.toString() : dt.toString());
  const monthString = (month < 10 ? '0' + month.toString() : month.toString());
  const time = transformedDate.getHours() + ":" + (transformedDate.getMinutes() < 10 ? '0' + transformedDate.getMinutes() : transformedDate.getMinutes());

  return `${dateString}-${monthString}-${year} ${time} WIB`;
}