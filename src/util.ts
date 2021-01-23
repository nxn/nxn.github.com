export const filenameRx = /\/([^/]+\.[0-9a-z]+$)/i;
export const fileExtRx  = /\/[^/]+\.([0-9a-z]+$)/i;

function getRxGroup(rx: RegExp, text: string, group = 1) {
    if (!text) {
        return null;
    }

    const match = text.match(rx);
    if (match && match.length > group) {
        return match[group];
    }

    return null;
}

export function getFilename(path: string) {
    return getRxGroup(filenameRx, path);
}

export function getFileExt(path: string) {
    return getRxGroup(fileExtRx, path);
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

/// Removes all unnecessary whitespace, wraps each line with quotes, and joins into one string
export const gridTemplate = (...template: string[]) => template.map(
    ln => `"${ ln.split(/\s+/).filter(tk => tk !== '').join(' ') }"`
).join(' ');