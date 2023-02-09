import * as fs from "fs";
import { promisify } from "util";
import { createInterface } from "readline";


// creating interface for reading input from console
const readLine = createInterface({
    input: process.stdin,
    output: process.stdout,
});

// promisifying the readline.question function to use it in async/await syntax 
const readLineAsync = promisify(readLine.question).bind(readLine) ;

// class for checking if a name is a founder of a startup or not
/**
 * @class StartupFounderChecker - class for checking if a name is a founder of a startup or not
 * @constructor filePath - path of the file containing the names of the founders
 * @method isFounder - function to check if a name is a founder or not
 * @property founders - set of founders of the startup
 * @description  the class takes the file path as an argument and reads the file and stores the names in a set for fast lookup
 * @example const founderChecker = new StartupFounderChecker(filePath); 
 */
class StartupFounderChecker {
    // founders of startup are stored in a set for fast lookup
    private readonly founders: Set<string>;

    // constructor takes the file path as an argument
    constructor(filePath: string) {
        // reading the file and storing the names in a set
        this.founders = new Set(fs.readFileSync(filePath, "utf8").split("\n"));
    }

    // function to check if a name is a founder or not
    /**
     * isFounder function to check if a name is a founder or not
     * @param name - name of the person to check if he is a founder or not
     * @returns true if the name is a founder of the startup, false otherwise
     */
    public isFounder(name: string): boolean {
        return this.founders.has(name);
    }
}

// main function to run the program
async function main() {
    // reading the file path from the console
    const filePath = await readLineAsync("Enter the file path: ") as any;
    
    // checking if the file path is provided or not
    if (!filePath) {
        // if not provided then exiting the program with error code 1 and printing the error message
        console.error("Please provide the file path as the first argument");
        process.exit(1);
    }


    // creating an instance of the class with the file path provided
    const founderChecker = new StartupFounderChecker(filePath);

    // reading the name from the console
    const name = await readLineAsync("Enter a name: ") as any;

    // checking if the name is provided or not
    if (!name) {
        // if not provided then exiting the program with error code 1 and printing the error message
        console.error("Please provide a name as the second argument");
        process.exit(1);
    }

    // checking if the name is a founder or not
    if (founderChecker.isFounder(name)) {
        console.log(`${name} is a startup founder`);
    } else {
        console.log(`${name} is not a startup founder`);
    }
    
    // closing the readline interface and exiting the program
    readLine.close();
    process.exit(0);
}

main();
