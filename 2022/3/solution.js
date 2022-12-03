import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const rucksacks = input.split(/\r?\n/);
const compartments = rucksacks.map((sack) => [sack.substring(0, sack.length / 2), sack.substring(sack.length / 2)]);
const priorities = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const part1 = compartments.reduce((sum, [first, second]) => {
    const dupe = first.split("").find((item) => second.includes(item));
    return sum + priorities.indexOf(dupe);
}, 0);

console.log("Part 1:", part1);

// get our groups
const groups = [];
while (rucksacks.length) {
    groups.push(rucksacks.splice(0, 3));
}

const part2 = groups.reduce((sum, [first, second, third]) => {
    const dupesFirstAndSecond = first.split("").filter((item) => second.includes(item));
    const dupe = third.split("").find((item) => dupesFirstAndSecond.includes(item));
    return sum + priorities.indexOf(dupe);
}, 0);

console.log("Part 2:", part2);
