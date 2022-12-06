import { exit } from "node:process";
import { resolve } from "path";
import { writeFileSync, mkdirSync, existsSync } from "fs";

const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error("USAGE: npm run create <year> <day>");
    exit(1);
}

const boilerplate = `
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const input = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "input.txt"), { encoding: "utf8" });
`;

const path = resolve(process.cwd(), args[0], args[1]);
if (existsSync(path)) {
    console.error(`Directory ${path} already exists`);
    exit(1);
}

mkdirSync(path);
writeFileSync(resolve(path, "solution.js"), boilerplate);
writeFileSync(resolve(path, "input.txt"), "");
