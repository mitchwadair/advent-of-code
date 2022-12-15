import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });

const getInitialState = () => {
    return input.split(/\r?\n\r?\n/).map((data) => {
        const [_monkeyIndex, itemsRaw, operationRaw, testRaw, condTrueRaw, condFalseRaw] = data.split(/\r?\n/);
        const items = itemsRaw
            .split(": ")[1]
            .split(", ")
            .map((str) => parseInt(str));
        const operationData = operationRaw.split(" ");
        const operationAmount = parseInt(operationData.pop());
        const operator = operationData.pop();
        const operation = (old) => {
            const amount = isNaN(operationAmount) ? old : operationAmount;
            if (operator === "*") {
                return old * amount;
            } else {
                return old + amount;
            }
        };
        const mod = parseInt(testRaw.split(" ").pop());
        const test = (val) => {
            return val % mod === 0;
        };
        const destIfTrue = parseInt(condTrueRaw.split(" ").pop());
        const destIfFalse = parseInt(condFalseRaw.split(" ").pop());
        return {
            items,
            operation,
            test,
            mod,
            destIfFalse,
            destIfTrue,
            inspections: 0,
        };
    });
};

const doRounds = (rounds, extraWorried = false) => {
    // WTF?? https://en.wikipedia.org/wiki/Chinese_remainder_theorem
    const mod = monkeys.map((m) => m.mod).reduce((a, m) => a * m);
    for (let round = 0; round < rounds; round++) {
        for (let m = 0; m < monkeys.length; m++) {
            const monkey = monkeys[m];
            let currentItem = monkey.items.shift();
            while (currentItem) {
                monkey.inspections++;
                let newWorryLevel = monkey.operation(currentItem);
                if (!extraWorried) {
                    newWorryLevel = Math.floor(newWorryLevel / 3);
                }
                if (monkey.test(newWorryLevel)) {
                    monkeys[monkey.destIfTrue].items.push(newWorryLevel % mod);
                } else {
                    monkeys[monkey.destIfFalse].items.push(newWorryLevel % mod);
                }
                currentItem = monkey.items.shift();
            }
        }
    }
};

const getMonkeyBusiness = () => {
    const sorted = monkeys.sort((m1, m2) => m2.inspections - m1.inspections);
    return sorted[0].inspections * sorted[1].inspections;
};

let monkeys = getInitialState();
doRounds(20);
const part1 = getMonkeyBusiness();
console.log("Part 1:", part1);

monkeys = getInitialState();
doRounds(10000, true);
const part2 = getMonkeyBusiness();
console.log("Part 2:", part2);
