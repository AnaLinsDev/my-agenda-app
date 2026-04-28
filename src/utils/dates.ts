export function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
  });
}

export const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};
