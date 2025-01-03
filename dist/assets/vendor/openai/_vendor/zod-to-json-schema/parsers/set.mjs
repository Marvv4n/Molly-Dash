import { setResponseValueAndErrors } from "../errorMessages.mjs";
import { parseDef } from "../parseDef.mjs";
export function parseSetDef(def, refs) {
    const items = parseDef(def.valueType._def, {
        ...refs,
        currentPath: [...refs.currentPath, 'items'],
    });
    const schema = {
        type: 'array',
        uniqueItems: true,
        items,
    };
    if (def.minSize) {
        setResponseValueAndErrors(schema, 'minItems', def.minSize.value, def.minSize.message, refs);
    }
    if (def.maxSize) {
        setResponseValueAndErrors(schema, 'maxItems', def.maxSize.value, def.maxSize.message, refs);
    }
    return schema;
}
//# sourceMappingURL=set.mjs.map