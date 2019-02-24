import { ReturnType, createStandardAction } from './redux/typesafe-actions'

export const incrementCounter = createStandardAction('INCREMENT_COUNTER')<number>()

export const decrementCounter = createStandardAction('DECREMENT_COUNTER')<number>()

export const resetCounter = createStandardAction('RESET_COUNTER')<void>()

export type ActionType = ReturnType<typeof incrementCounter | typeof decrementCounter | typeof resetCounter>
