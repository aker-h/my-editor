const log = {
    error: (message: string): void => {
        console.error(styledLog('ERROR', message));
    },
    event: (message: string): void => {
        console.log(styledLog('EVENT', message));
    }
}

export default log;

function getLogTime (): string {
    let logTime: string = ((now) => {
        let fix= (num: number): string  => {
            let str = '0' + Number(num).toString();
            return str.slice(-2);
        };
        return `${fix(now.getHours())}:${fix(now.getMinutes())}:${fix(now.getSeconds())}`;
    })(new Date);

    return logTime;
}

function  getSrc (): string {
    let e: Error = new Error();
    let strStack: any = e.stack;
    if (strStack === undefined) {
        return 'undefined';
    }

    let es: string[] = strStack.split('\n');
    let srcRow: string = es[4].trim();
    let fullSrc: string = srcRow.substring(srcRow.lastIndexOf('/') + 1, srcRow.indexOf(')'));
    let splitedSrc: string[] = fullSrc.split(":");
    let src: string = `${splitedSrc[0]}:${splitedSrc[1]}`;

    return src;
}

function styledLog (type: string, message: string) {
    let logTime: string = getLogTime();
    return `[${type}] ${logTime} -- ${message} [${getSrc()}]`;
}