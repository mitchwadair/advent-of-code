import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const levels = "abcdefghijklmnopqrstuvwxyz";

const map = input.split(/\r?\n/).map((row) =>
    row.split("").map((level) => {
        if (level === "S" || level === "E") {
            return level;
        }
        return levels.indexOf(level);
    })
);

const getNode = (node) => {
    let x = -1;
    const y = map.findIndex((row, i) => {
        if (row.includes(node)) {
            x = row.indexOf(node);
            return true;
        } else {
            return false;
        }
    }, -1);
    return [y, x];
};
const endNode = getNode("E");

const getHeuristicScore = (x, y) => {
    const distX = Math.abs(endNode[1] - x);
    const distY = Math.abs(endNode[0] - y);
    return Math.sqrt((distX ^ 2) + (distY ^ 2));
};

const getLevel = (y, x) => {
    const val = map[y]?.[x];
    if (val) {
        if (val === "E") {
            return levels.length - 1;
        }
        return val;
    }
};

const getMovableNeighbors = (x, y) => {
    const movableNeighbors = [];
    let level = map[y][x];
    if (level === "S") level = 0;
    const above = getLevel(y - 1, x);
    const below = getLevel(y + 1, x);
    const left = getLevel(y, x - 1);
    const right = getLevel(y, x + 1);
    if (above && above - level <= 1) {
        const hScore = getHeuristicScore(x, y - 1);
        movableNeighbors.push({
            x,
            y: y - 1,
            hScore,
        });
    }
    if (below && below - level <= 1) {
        const hScore = getHeuristicScore(x, y + 1);
        movableNeighbors.push({
            x,
            y: y + 1,
            hScore,
        });
    }
    if (left && left - level <= 1) {
        const hScore = getHeuristicScore(x - 1, y);
        movableNeighbors.push({
            x: x - 1,
            y,
            hScore,
        });
    }
    if (right && right - level <= 1) {
        const hScore = getHeuristicScore(x + 1, y);
        movableNeighbors.push({
            x: x + 1,
            y,
            hScore,
        });
    }
    return movableNeighbors;
};

const findPath = (startNode) => {
    const constructPath = (node) => {
        const path = [];
        let temp = node;
        while (temp) {
            temp = temp.prevNode;
            path.push(temp);
        }
        return path;
    };
    let nodes = [{ x: startNode[1], y: startNode[0], hScore: getHeuristicScore(startNode[1], startNode[0]) }];

    const distScores = {};
    distScores[`${nodes[0].x},${nodes[0].y}`] = 0;

    while (nodes.length > 0) {
        const current = nodes.shift();
        if (current.x === endNode[1] && current.y === endNode[0]) {
            return constructPath(current);
        }
        const neighbors = getMovableNeighbors(current.x, current.y);
        const cKey = `${current.x},${current.y}`;
        neighbors.forEach((neighbor) => {
            const nKey = `${neighbor.x},${neighbor.y}`;
            const distScore = distScores[cKey] + 1;
            if (!distScores[nKey] || distScore < distScores[nKey]) {
                neighbor.prevNode = current;
                neighbor.potential = distScore + neighbor.hScore;
                distScores[nKey] = distScore;
                if (!nodes.includes(neighbor)) {
                    nodes.push(neighbor);
                    nodes.sort((n1, n2) => n1.potential - n2.potential);
                }
            }
        });
    }
};

const part1 = findPath(getNode("S")).length - 1;
console.log("Part 1:", part1);

const pathLengths = [];
map.forEach((row, y) => {
    row.forEach((node, x) => {
        if (node === 0 || node === "S") {
            const path = findPath([y, x]);
            if (path) pathLengths.push(path.length - 1);
        }
    });
});

const part2 = pathLengths.reduce((shortest, length) => Math.min(shortest, length));
console.log("Part 2:", part2);
