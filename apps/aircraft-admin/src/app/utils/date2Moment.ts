export const dateToMoment = (date: string) => {
  return date.slice(0,-5).split("T").join(" ");
}
