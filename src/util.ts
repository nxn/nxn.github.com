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