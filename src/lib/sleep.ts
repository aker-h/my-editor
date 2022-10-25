export default async function sleep (ms: number): Promise<void> {
    return new Promise(async (resolve) => {
        await setTimeout(() => {
            resolve();
        }, ms)
    });
}