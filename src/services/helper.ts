import dayjs from "dayjs";

export const FORMAT_DATE_DEFAULT = "YYYY-MM-DD";
export const FORMAT_DATE_VN = "DD/MM/YYYY";
export const MAX_UPLOAD_IMAGE_SIZE = 5; // MB

export const dateRangeValidate = (dateRange: any) => {
  if (!dateRange) return undefined;

  const startDate = dayjs(dateRange[0]).format(FORMAT_DATE_DEFAULT);
  const endDate = dayjs(dateRange[1]).format(FORMAT_DATE_DEFAULT);

  return [startDate, endDate];
};
