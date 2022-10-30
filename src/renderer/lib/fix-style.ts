export default function fixStyle (style: string): string {
    const lines = style.replace(/\n\n/g, '\n').split('\n');

    let result = '';

    lines.map((line, i) => {
        line = line.trim();

        if (i !== lines.length - 1) {
            line += '\n';
        }

        result += `\t${line}`;
    });

    return result;
}