
import { parse } from "https://deno.land/std@0.162.0/encoding/csv.ts"
import * as mod from "https://deno.land/std@0.162.0/node/util.ts";
import {type Question, Categories} from "../src/logic/Game.ts"

if(Deno.args.length !== 1) {
    console.log("first argument must be the path to the csv file")
    Deno.exit(1)
}
// First get the csv data
const rawContent = Deno.readFileSync(Deno.args[0])
const decodedContent = new TextDecoder().decode(rawContent)
// Parse it
const parsed = await parse(decodedContent)
// parsed is already valid JSON. which results in a value that is exactly the same that CSV to JSON would produce

const questions: Question[] = []
const categoryString = parsed[0][0];
parsed.splice(0, 1);

let category: Categories;
if (Object.values(Categories).some((category: string) => category === categoryString))
  category = <Categories> categoryString;
else throw Error("Invalid category");

parsed.forEach((row) => {
    questions.push({
        q: row[0],
        category,
        choices: [
            {text: "oui", score: 1},
            {text: "non", score: 0},
        ],
    })
})

// console.log(JSON.stringify(questions))

await Deno.writeTextFile(`./${categoryString}.json`, mod.inspect(questions, false, 3, false));