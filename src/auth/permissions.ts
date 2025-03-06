import { createAccessControl } from 'better-auth/plugins/access'
import {
  adminAc,
  defaultStatements,
  userAc,
} from 'better-auth/plugins/admin/access'

const statement = {
  ...defaultStatements,
  todo: ['create', 'share', 'update', 'delete'],
} as const

export const ac = createAccessControl(statement)

const user = ac.newRole({
  todo: ['share'],
  ...userAc.statements,
})

const editor = ac.newRole({
  todo: ['create', 'share', 'update', 'delete'],
  ...userAc.statements,
})

const admin = ac.newRole({
  todo: ['create', 'share', 'update', 'delete'],
  ...adminAc.statements,
})

export const roles = {
  user,
  editor,
  admin,
}
