export function momentToDate(moment: string): string {
  return `${moment.split(' ').join('T')}Z`;
}
