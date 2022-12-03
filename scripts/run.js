import { exec } from "node:child_process";
import { exit } from "node:process";
import { resolve } from "path";

const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error("USAGE: npm run solve <year> <day>");
    exit(1);
}

exec(`node ${resolve(process.cwd(), args[0], args[1], "solution.js")}`, (err, out) => {
    if (err) exit(1);
    console.log(out);
});
