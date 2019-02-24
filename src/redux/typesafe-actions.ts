interface Action<Type, PayloadType> {
    type: Type,
    payload: PayloadType,
}

// typesafe-actions simplified
export function createStandardAction<Type extends string>(type: Type) {
    return function<PayloadType>() {
        return (payload: PayloadType): Action<Type, PayloadType> => ({ type, payload })
    }
}

// Copied from https://www.typescriptlang.org/docs/handbook/advanced-types.html
type AnyFunction = (...args: any[]) => any;
export type ReturnType<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any;
