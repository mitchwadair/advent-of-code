import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

// get each elf's total calories
const elves = input.split(/\r?\n\r?\n/);
const calories = elves.map((elf) => {
    return elf.split(/\r?\n/).reduce((sum, cal) => {
        return sum + parseInt(cal);
    }, 0);
});

// find how many calories the elf with the most caloreis is carrying
const part1 = calories.reduce((max, cal) => {
    return cal > max ? cal : max;
}, 0);

console.log("Part 1:", part1);

// find the top 3 elves carrying the most calories
let maxes = [];
for (let i = 0; i < 3; i++) {
    let m = calories.reduce(
        (max, cal, index) => {
            return cal > max[0] ? [cal, index] : max;
        },
        [0, -1]
    );
    maxes.push(m);
    calories.splice(m[1], 1);
}
const part2 = maxes.reduce((sum, [value]) => sum + value, 0);

console.log("Part 2:", part2);
