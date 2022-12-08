import { readFileSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const out = input.split(/\r?\n/);
const fs = {};
let path = "";
out.forEach((line, i) => {
    if (line.startsWith("$")) {
        const cmd = line.substring(2, 4);
        if (cmd === "cd") {
            const arg = line.substring(5);
            if (arg === "/") {
                path = "";
            } else {
                const newPath = path === "" ? [] : path.split("/");
                if (arg === "..") {
                    newPath.pop();
                } else {
                    newPath.push(arg);
                }
                path = newPath.join("/");
            }
        }
    } else {
        const [value, name] = line.split(" ");
        const ref = path.split("/").reduce((obj, path) => obj?.[path], fs) || fs;
        if (value === "dir") {
            if (!ref[name]) {
                ref[name] = {};
            }
        } else {
            ref[name] = parseInt(value);
        }
    }
});

const dirSizes = {};
const getSize = (path, dir) => {
    let size = 0;
    Object.entries(dir).forEach(([key, value]) => {
        if (typeof value === "number") {
            size += value;
        } else {
            const newPath = path === "" ? [] : path.split("/");
            newPath.push(key);
            size += getSize(newPath.join("/"), value);
        }
    });
    dirSizes[path] = size;
    return size;
};
const usedSpace = getSize("", fs);

const part1 = Object.values(dirSizes)
    .filter((size) => size <= 100000)
    .reduce((sum, size) => sum + size, 0);

console.log("Part 1:", part1);

const unusedSpace = 70000000 - usedSpace;
const part2 = Object.values(dirSizes)
    .filter((size) => size >= 30000000 - unusedSpace)
    .sort((a, b) => a - b)[0];

console.log("Part 2:", part2);
