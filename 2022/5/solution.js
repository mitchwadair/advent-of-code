import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const [initialStacks, movesRaw] = input.split(/\r?\n\r?\n/);

const moves = movesRaw.split(/\r?\n/).map((move) =>
    move
        .split(" ")
        .filter((part) => !isNaN(part))
        .map((part) => parseInt(part))
);

// build our stacks in a usable form
const buildStacks = () => {
    const stacks = Array.from(new Array(9), () => []);
    initialStacks.split(/\r?\n/).forEach((row, i, arr) => {
        if (i < arr.length - 1) {
            for (let j = 0; j < row.length; j += 4) {
                const section = row.slice(j, j + 4);
                if (section.trim().length > 0) {
                    stacks[j / 4].push(section[1]);
                }
            }
        }
    });
    return stacks;
};

// get initial stacks
let stacks = buildStacks();
// perform each move
moves.forEach(([amount, from, to]) => {
    for (let i = 0; i < amount; i++) {
        const moving = stacks[from - 1].shift();
        stacks[to - 1].unshift(moving);
    }
});

const part1 = stacks.map((stack) => stack[0]).join("");
console.log("Part 1:", part1);

// get initial stacks
stacks = buildStacks();
// perform each move
moves.forEach(([amount, from, to]) => {
    const moving = stacks[from - 1].splice(0, amount);
    const newStack = moving.concat(stacks[to - 1]);
    stacks[to - 1] = newStack;
});

const part2 = stacks.map((stack) => stack[0]).join("");
console.log("Part 2:", part2);
