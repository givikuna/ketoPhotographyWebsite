import * as fs from "fs";

import { getFileExtension } from "./cgi/extensions/syntax";

type LanguageToCompile = {
    type_: string;
    command: string;
    files: LanguageFile[];
};

type LanguageFile = {
    dir: string;
    file: string;
    filename: string;
    compilesTo: string;
};

type CompilerIgnore = {
    files: string[];
    directories: string[];
};

type CompilerSettings = {
    compilerIgnore: CompilerIgnore;
    compile: {
        languages: ProgrammingLanguage[];
    };
};

type ProgrammingLanguage = {
    extension: string;
    language: string;
    command: string;
    files: string[];
};

const compileables: LanguageToCompile[] = [];

const compilerSettings: CompilerSettings = JSON.parse(fs.readFileSync("./compilerSettings.json", { encoding: "utf8", flag: "r" })) as CompilerSettings;
const approvedFileExtensions: string[] = compilerSettings.compile.languages.map((programmingLanguage: ProgrammingLanguage): string => programmingLanguage.extension);

for (let i: number = 0; i < compilerSettings.compile.languages.length; i++) {
    compileables.push({
        type_: compilerSettings.compile.languages[i].extension,
        command: compilerSettings.compile.languages[i].command,
        files: [],
    } as LanguageToCompile);
}

function traverseDirectories(dir: string = "./") {
    const paths: string[] = fs.readdirSync(dir);
    for (let i: number = 0; i < paths.length; i++) {
        if (!compilerSettings.compilerIgnore.directories.includes(paths[i]) && fs.statSync(`${dir}${paths[i]}`).isDirectory()) {
            traverseDirectories(`${dir}${paths[i]}/`);
        }
        if (
            !fs.statSync(`${dir}${paths[i]}`).isDirectory() &&
            approvedFileExtensions.includes(getFileExtension(paths[i]) as string) &&
            !compilerSettings.compilerIgnore.files.includes(paths[i].split("/").pop() as string)
        ) {
            const fileExtension: string = getFileExtension(paths[i]) as string;
            for (let j: number = 0; j < compileables.length; j++) {
                if (compileables[j].type_ === fileExtension) {
                    compileables[j].files.push({
                        dir: dir.slice(2),
                        file: `${dir}${paths[i]}`,
                        filename: paths[i].split("/").pop() as string,
                        compilesTo: ((): string => {
                            switch (fileExtension) {
                                case "ts":
                                    return `${dir}${paths[i].slice(0, -2)}js`;
                                case "rs":
                                    return `${dir}${[paths[i]]}`.slice(0, -3);
                                default:
                                    return "";
                            }
                        })(),
                    });
                }
            }
        }
    }
}

traverseDirectories();

fs.writeFileSync("./compile.json", JSON.stringify(compileables), "utf-8");
