export const filenameRx = /\/([^/]+\.[0-9a-z]+$)/i;

export function getFilename(path: string) {
    if (!path) {
        return null;
    }

    const match = path.match(filenameRx);
    if (match && match.length === 2) {
        return match[1];
    }

    return null;
}

export function getOrdinalIndicator(num: number) {
    if (num > 10 && num <14) {
        return 'th';
    }

    num %= 10;
    switch (num) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';

        default: return 'th';
    }
}

export function template(template: TemplateStringsArray, ...keys: string[]) {
    return (function(...values: any[]) {
        let dict = (values[values.length - 1] || {}) as { [key: string]: string };
        let result = [template[0]];

        keys.forEach(function(key, i) {
            let value = Number.isInteger(key) ? values[Number.parseInt(key)] : dict[key];
            result.push(value, template[i + 1]);
        });
        
        return result.join('');
    });
}