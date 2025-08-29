import dayjs from "dayjs";

export const FORMAT_DATE = "YYYY-MM-DD";

export const dateRangeValidate = (dateRange: any) => {
  if (!dateRange) return undefined;

  const startDate = dayjs(dateRange[0]).format(FORMAT_DATE);
  const endDate = dayjs(dateRange[1]).format(FORMAT_DATE);

  return [startDate, endDate];
};
