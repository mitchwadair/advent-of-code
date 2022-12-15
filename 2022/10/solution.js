import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const instructions = input.split(/\r?\n/).map((line) => line.split(" "));
let register = 1;
let cycle = 1;
const signalStrengths = [];
const signalCycles = [20, 60, 100, 140, 180, 220];
const drawCycles = [40, 80, 120, 160, 200, 240];
let currentInstruction = instructions.shift();
let addxComplete = false;
let drawRow = ["#"];
let pixel = new Array(3).fill("#").concat(new Array(37).fill("."));
while (currentInstruction) {
    if (signalCycles.includes(cycle)) {
        signalStrengths.push(cycle * register);
    } else if (drawCycles.includes(cycle)) {
        console.log(drawRow.join(""));
        drawRow = [];
    }
    drawRow.push(drawRow.length === 0 || pixel[drawRow.length - 1] === "#" ? "#" : ".");
    if (currentInstruction[0] === "addx") {
        if (addxComplete) {
            register += parseInt(currentInstruction[1]);
            pixel.splice(pixel.indexOf("#"), 3, ".", ".", ".");
            pixel.splice(register - 1, 3, "#", "#", "#");
            currentInstruction = instructions.shift();
            addxComplete = false;
        } else {
            addxComplete = true;
        }
    } else {
        currentInstruction = instructions.shift();
    }
    cycle++;
}

const part1 = signalStrengths.reduce((sum, value) => sum + value, 0);
console.log("Part 1:", part1);
