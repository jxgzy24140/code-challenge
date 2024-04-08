const sum_to_n_a = (n) => {
  return n?.reduce((a, b) => a + b, 0);
};

const sum_to_n_b = (n) => {
  let total = 0;
  n?.map((item) => (total += item));
  return total;
};

const sum_to_n_c = (n) => {
  let total = 0;
  for (let i = 0; i < n?.length; i++) total += n[i];
  return total;
};
const resultA = sum_to_n_a([1, 2, 3, 4, 5]);
const resultB = sum_to_n_b([1, 2, 3, 4, 5]);
const resultC = sum_to_n_c([1, 2, 3, 4, 5]);
console.log(resultA, resultB, resultC);
