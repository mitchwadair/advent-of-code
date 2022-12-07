import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const findMarker = (length) => {
    const buf = input.substring(0, length).split("");
    for (let i = length; i < input.length - length; i++) {
        if (new Set(buf).size === buf.length) {
            return i;
        }
        buf.shift();
        buf.push(input[i]);
    }
};

const part1 = findMarker(4);

console.log("Part 1:", part1);

const part2 = findMarker(14);

console.log("Part 2:", part2);
