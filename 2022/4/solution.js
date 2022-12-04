import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

// get our pairs
const pairs = input
    .split(/\r?\n/)
    .map((ranges) => ranges.split(",").map((range) => range.split("-").map((num) => parseInt(num))));

const part1 = pairs.reduce((sum, [range1, range2]) => {
    if (range1[0] === range2[0] || range1[1] === range2[1]) {
        return sum + 1;
    } else {
        if ((range1[0] > range2[0] && range1[1] < range2[1]) || (range1[0] < range2[0] && range1[1] > range2[1])) {
            return sum + 1;
        }
        return sum;
    }
}, 0);

console.log("Part 1:", part1);

const noOverlap = pairs.reduce((sum, [range1, range2]) => {
    if ((range1[0] < range2[0] && range1[1] < range2[0]) || (range1[0] > range2[0] && range1[0] > range2[1])) {
        return sum + 1;
    }
    return sum;
}, 0);
const part2 = pairs.length - noOverlap;

console.log("Part2:", part2);
