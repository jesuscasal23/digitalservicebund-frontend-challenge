import { expect, test } from 'vitest'
import { addRankToDepartments } from './helpers.ts'

test('should correctly assign ranks to departments based on datasets', () => {
  const departments = [
    { name: 'Dept A', datasets: 10 },
    { name: 'Dept B', datasets: 20 },
    { name: 'Dept C', datasets: 15 },
  ]

  const result = addRankToDepartments(departments)

  expect(result).toEqual([
    { name: 'Dept B', datasets: 20, rank: 1 },
    { name: 'Dept C', datasets: 15, rank: 2 },
    { name: 'Dept A', datasets: 10, rank: 3 },
  ])
})

test('should assign the same rank to departments with the same number of datasets', () => {
  const departments = [
    { name: 'Dept A', datasets: 10 },
    { name: 'Dept B', datasets: 15 },
    { name: 'Dept C', datasets: 15 },
    { name: 'Dept D', datasets: 5 },
  ]

  const result = addRankToDepartments(departments)

  expect(result).toEqual([
    { name: 'Dept B', datasets: 15, rank: 1 },
    { name: 'Dept C', datasets: 15, rank: 1 },
    { name: 'Dept A', datasets: 10, rank: 2 },
    { name: 'Dept D', datasets: 5, rank: 3 },
  ])
})

test('should handle an empty departments array', () => {
  const departments = []

  const result = addRankToDepartments(departments)

  expect(result).toEqual([])
})

test('should handle a single department correctly', () => {
  const departments = [{ name: 'Dept A', datasets: 10 }]

  const result = addRankToDepartments(departments)

  expect(result).toEqual([{ name: 'Dept A', datasets: 10, rank: 1 }])
})

test('should handle departments with zero datasets correctly', () => {
  const departments = [
    { name: 'Dept A', datasets: 0 },
    { name: 'Dept B', datasets: 0 },
    { name: 'Dept C', datasets: 10 },
  ]

  const result = addRankToDepartments(departments)

  expect(result).toEqual([
    { name: 'Dept C', datasets: 10, rank: 1 },
    { name: 'Dept A', datasets: 0, rank: 2 },
    { name: 'Dept B', datasets: 0, rank: 2 },
  ])
})
