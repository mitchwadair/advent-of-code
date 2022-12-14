import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const moves = input.split(/\r?\n/).map((m) => m.split(" "));

const follow = (node1, node2) => {
    let x = node1[0] - node2[0];
    let y = node1[1] - node2[1];
    if (Math.abs(x) > 1 || Math.abs(y) > 1) {
        if (node1[0] !== node2[0] && node1[1] !== node2[1]) {
            node2[0] = x >= 0 ? node2[0] + 1 : node2[0] - 1;
            node2[1] = y >= 0 ? node2[1] + 1 : node2[1] - 1;
        } else {
            if (x === 0) {
                node2[1] = y > 0 ? node2[1] + 1 : node2[1] - 1;
            } else {
                node2[0] = x > 0 ? node2[0] + 1 : node2[0] - 1;
            }
        }
    }
};
const processMoves = (knots) => {
    const visited = {};
    const head = knots[0];
    const tail = knots[knots.length - 1];
    moves.forEach(([dir, num]) => {
        const times = parseInt(num);
        for (let i = 0; i < times; i++) {
            if (dir === "R") {
                head[0]++;
            } else if (dir === "L") {
                head[0]--;
            } else if (dir === "U") {
                head[1]++;
            } else {
                head[1]--;
            }
            for (let j = 1; j < knots.length; j++) {
                follow(knots[j - 1], knots[j]);
            }
            visited[tail.join(",")] = true;
        }
    });
    return Object.keys(visited).length;
};
const getRope = (knots) => new Array(knots).fill().map(() => [0, 0]);

const part1 = processMoves(getRope(2));
console.log("Part 1:", part1);

const part2 = processMoves(getRope(10));
console.log("Part 2:", part2);
