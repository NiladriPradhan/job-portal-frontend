function checkSalaryRange(jobSalary: number, range: string) {
  const ranges = {
    "0-40k": [0, 40000],
    "40k-1lpa": [40000, 100000],
    "1lpa-2lpa": [100000, 200000],
    "2lpa-3lpa": [200000, 300000],
    "3lpa-4lpa": [300000, 400000]
  };

  const [min, max] = ranges[range];
  return jobSalary >= min && jobSalary <= max;
}

export default checkSalaryRange;