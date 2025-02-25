import { deleteAsync } from 'del'

export function cleanTest() {
  return deleteAsync('../../dist/**/__test__', { force: true })
}
