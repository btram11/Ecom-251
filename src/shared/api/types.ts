type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

type Ok<T> = { status: number; data: T; error?: string };
type Err = { status: number; err: string; error?: string };

export type APIResponse<T> = XOR<Ok<T>, Err>;
export const isOk = <T>(r: APIResponse<T>): r is Ok<T> => "data" in r;
