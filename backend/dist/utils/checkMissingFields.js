function getMissing(...fields) {
    return fields.some((field) => Object.is(field, undefined));
}
export default getMissing;
