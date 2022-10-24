export default function getOS (): NodeJS.Platform {
    const OS: NodeJS.Platform = process.platform;
    return OS;
}