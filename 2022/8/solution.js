import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const rows = input.split(/\r?\n/).map((row) => row.split("").map((tree) => parseInt(tree)));

const lowerThan = (value) => (check) => check < value;
const isVisible = (row, col) => {
    const left = rows[row].slice(0, col);
    const right = rows[row].slice(col + 1);
    const column = rows.map((row) => row[col]);
    const top = column.slice(0, row);
    const bottom = column.slice(row + 1);
    return (
        left.every(lowerThan(rows[row][col])) ||
        right.every(lowerThan(rows[row][col])) ||
        top.every(lowerThan(rows[row][col])) ||
        bottom.every(lowerThan(rows[row][col]))
    );
};

let part1 = rows.length * 2 + rows[0].length * 2 - 4;
for (let i = 1; i < rows.length - 1; i++) {
    for (let j = 1; j < rows[i].length - 1; j++) {
        if (isVisible(i, j)) {
            part1++;
        }
    }
}

console.log("Part 1:", part1);

const getVisibilityScore = (row, col) => {
    const left = rows[row].slice(0, col).reverse();
    const right = rows[row].slice(col + 1);
    const column = rows.map((row) => row[col]);
    const top = column.slice(0, row).reverse();
    const bottom = column.slice(row + 1);
    let scores = [left, right, top, bottom].map((line) => {
        let score = 0;
        for (let i = 0; i < line.length; i++) {
            score++;
            if (line[i] >= rows[row][col]) break;
        }
        return score;
    });
    return scores.reduce((mult, value) => mult * value, 1);
};

let part2 = 0;
for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
        part2 = Math.max(part2, getVisibilityScore(row, col));
    }
}
console.log("Part 2:", part2);
