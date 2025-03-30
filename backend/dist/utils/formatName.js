function formatNameArr(fullname) {
    return fullname
        .split(" ")
        .map((name) => name[0].toUpperCase() + name.slice(1).toLowerCase());
}
export default formatNameArr;
