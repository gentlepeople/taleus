export const sumNumOfAsciiCode = (str: string) =>
  str.split('').reduce((sum, code) => sum + code.charCodeAt(0), 0);

export const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const sortByHashKey = (seed: number) => (a: any, b: any) => {
  const hashA = sumNumOfAsciiCode(String(a)) * seed;
  const hashB = sumNumOfAsciiCode(String(b)) * seed;
  return seededRandom(hashA) - seededRandom(hashB);
};

export function getTodaySeed(): number {
  const today = new Date();
  const seedString = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  return parseInt(seedString, 10);
}

export const shuffleListWithHash = (seed: number, list: any[]) => {
  return [...list].sort(sortByHashKey(seed));
};
