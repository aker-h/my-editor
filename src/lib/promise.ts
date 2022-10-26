export default {
    ANY: (anything: any): Promise<any> => { return (new Promise((resolve) => {resolve(anything)})); },
    BOOL: (boo: boolean): Promise<boolean> => { return (new Promise((resolve) => {resolve(boo)})); },
    NULL: new Promise((resolve) => {resolve(null)}) as Promise<null>,
    NUM: (num: number): Promise<number> => { return (new Promise((resolve) => {resolve(num)})); },
    OBJ: (obj: object): Promise<object> => { return (new Promise((resolve) => {resolve(obj)})); },
    STR: (str: string): Promise<string> => { return (new Promise((resolve) => {resolve(str)})); },
    STRINGS: (strs: string[]): Promise<string[]> => { return (new Promise((resolve) => {resolve(strs)})); },
    UNDEFINED: (): Promise<undefined> => { return (new Promise((resolve) => {resolve(undefined)})); },
    VOID: new Promise((resolve) => {resolve()}) as Promise<void>,
}