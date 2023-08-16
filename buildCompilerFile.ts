import * as fs from "fs";
import * as prettier from "prettier";

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

const compileables: Readonly<LanguageToCompile>[] = [];

const compilerSettings: Readonly<CompilerSettings> =
    require("./compilerSettings.json") as Readonly<CompilerSettings>;

const approvedFileExtensions: string[] = compilerSettings.compile.languages.map(
    (programmingLanguage: ProgrammingLanguage): string => {
        return programmingLanguage.extension;
    },
);

for (let i: number = 0; i < compilerSettings.compile.languages.length; i++) {
    compileables.push({
        type_: compilerSettings.compile.languages[i].extension,
        command: compilerSettings.compile.languages[i].command,
        files: [],
    } as Readonly<LanguageToCompile>);
}

function traverseDirectories(dir: string = "./") {
    const paths: string[] = fs.readdirSync(dir);
    for (let i: number = 0; i < paths.length; i++) {
        if (
            !compilerSettings.compilerIgnore.directories.includes(paths[i]) &&
            fs.statSync(`${dir}${paths[i]}`).isDirectory()
        ) {
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
                        filename: ((_paths: Readonly<string[]>): string => {
                            const filename_: string | undefined = _paths[i].split("/").pop();
                            return typeof filename_ === "string" ? filename_ : "";
                        })(paths),
                        compilesTo: ((ext: string, _dir: string, _paths: Readonly<string[]>): string => {
                            switch (ext) {
                                case "ts":
                                    return `${_dir}${_paths[i].slice(0, -2)}js`;
                                case "rs":
                                    return `${_dir}${[_paths[i]]}`.slice(0, -3);
                                default:
                                    return "";
                            }
                        })(fileExtension, dir, paths as Readonly<typeof paths>),
                    });
                }
            }
        }
    }
}

traverseDirectories();

(async (): Promise<void> => {
    fs.writeFileSync(
        "./compile.json",
        await ((_compileables: Readonly<Readonly<LanguageToCompile>[]>): Promise<string> => {
            return prettier.format(JSON.stringify(_compileables), {
                parser: "json",
                ...require("./.prettierrc.json"),
            });
        })(compileables as Readonly<typeof compileables>),
        "utf-8",
    );
})();
