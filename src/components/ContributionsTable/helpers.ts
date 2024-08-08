import { type DepartmentsType } from '../../api/hooks/useGetDepartments'

export const addRankToDepartments = (departments: DepartmentsType) => {
  if (Array.isArray(departments) && departments.length === 0) return []

  const sortedDepartmentsByDataset = [...departments].sort(
    (a, b) => b.datasets - a.datasets
  )

  let rank = 1
  let previousNumberOfDepartments = sortedDepartmentsByDataset[0].datasets

  const departmentStatsWithRank = sortedDepartmentsByDataset.map(department => {
    // If the current number of departments is different from the previous one
    if (department.datasets !== previousNumberOfDepartments) {
      rank = rank + 1
    }
    previousNumberOfDepartments = department.datasets

    return { ...department, rank }
  })

  return departmentStatsWithRank
}
