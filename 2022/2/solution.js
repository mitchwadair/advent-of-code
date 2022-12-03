import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const SCORE_MAP = {
    X: {
        A: 4,
        B: 1,
        C: 7,
    },
    Y: {
        A: 8,
        B: 5,
        C: 2,
    },
    Z: {
        A: 3,
        B: 9,
        C: 6,
    },
};

const OUTCOME_MAP = {
    X: {
        A: 3,
        B: 1,
        C: 2,
    },
    Y: {
        A: 4,
        B: 5,
        C: 6,
    },
    Z: {
        A: 8,
        B: 9,
        C: 7,
    },
};

const getScore = (map, xyz, abc) => {
    if (!xyz || !abc) return 0;
    return map[xyz][abc];
};

// get each match
const matches = input.split(/\r?\n/).map((line) => line.split(" "));
// get the score for each match
const part1 = matches.reduce((sum, [opponent, me]) => sum + getScore(SCORE_MAP, me, opponent), 0);

console.log("Part 1:", part1);

// get the score for each match
const part2 = matches.reduce((sum, [opponent, outcome]) => sum + getScore(OUTCOME_MAP, outcome, opponent), 0);

console.log("Part2:", part2);
