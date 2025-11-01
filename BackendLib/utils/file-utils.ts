import * as fs from 'fs/promises'
import * as path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as readline from 'readline'

const execAsync = promisify(exec)

function getProjectRoot(): string {
    return path.resolve(__dirname, '../../../..')
}

async function createRLInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
}


// creating and reading
export async function create_file(file: string, content: string): Promise<string> {
    await fs.writeFile(file, content, 'utf-8')
    console.log(`die Datei: '${file}' wurde erstellt`)
    return file
}

export async function create_sub_file(pathStr: string, content: string): Promise<string> {
    const dir = path.dirname(pathStr)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(pathStr, content, 'utf-8')
    console.log(`der Tree: '${pathStr}' wurde erstellt`)
    return pathStr
}

export async function read_file(file: string): Promise<string> {
    let filePath = path.resolve(file)
    
    if (!path.isAbsolute(file)) {
        const projectRoot = getProjectRoot()
        filePath = path.join(projectRoot, file)
        
        try {
            await fs.access(filePath)
        } catch {
            filePath = path.resolve(file)
        }
    }
    
    try {
        await fs.access(filePath)
    } catch {
        throw new Error(`Datei nicht gefunden: ${file}`)
    }
    
    const content = await fs.readFile(filePath, 'utf-8')
    console.log(`die Datei: '${filePath}' wurde ausgelesen`)
    return content
}

export async function read_all_files_in_dir(dir: string): Promise<string[]> {
    const dirPath = path.join(getProjectRoot(), dir)
    const files: string[] = []
    
    async function readDir(currentPath: string) {
        const entries = await fs.readdir(currentPath, { withFileTypes: true })
        
        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name)
            
            if (entry.isFile()) {
                const content = await fs.readFile(fullPath, 'utf-8')
                files.push(content)
                console.log(`die Datei: '${fullPath}' wurde ausgelesen`)
            } else if (entry.isDirectory()) {
                await readDir(fullPath)
            }
        }
    }
    
    await readDir(dirPath)
    console.log(`der ordner: ${dir} wurde vollständig ausgelesen`)
    return files
}

export async function read_file_lines(file: string): Promise<string[]> {
    const content = await fs.readFile(file, 'utf-8')
    const lines = content.split('\n')
    console.log(`die Datei: '${file}' wurde Zeile für Zeile ausgelesen und in ein array gepackt`)
    return lines
}

export async function add_to_file(file: string, content: string): Promise<string> {
    await fs.appendFile(file, `\n${content}`, 'utf-8')
    console.log(`in Datei: '${file}' wurde Inhalt: '${content}' hinzugefügt`)
    return file
}

export async function does_file_exist(file: string): Promise<boolean> {
    try {
        await fs.access(file)
        console.log(`die Datei: '${file}' exestiert`)
        return true
    } catch {
        console.log(`die Datei: '${file}' exestiert nicht`)
        return false
    }
}

// running code
export async function write_n_run(
    file: string,
    content: string,
    interpreter: string,
    is_subfile: boolean = false,
    aus_führen: boolean = false
): Promise<string> {
    const filePath = path.resolve(file)
    
    if (is_subfile) {
        const dir = path.dirname(filePath)
        await fs.mkdir(dir, { recursive: true })
    }
    
    await fs.writeFile(filePath, content, 'utf-8')
    console.log(`der ${interpreter} Code-Datei: '${file}' wurde erstellt`)
    
    if (aus_führen) {
        await execAsync(`${interpreter} ${filePath}`)
        console.log(`die ${interpreter} Code-Datei: '${file}' wird ausgeführt`)
    }
    
    return filePath
}

export async function write_n_run_py(
    file: string,
    content: string,
    is_subfile: boolean = false,
    aus_führen: boolean = false
): Promise<string> {
    return write_n_run(file, content, 'python3', is_subfile, aus_führen)
}

export async function write_n_run_js(
    file: string,
    content: string,
    is_subfile: boolean = false,
    aus_führen: boolean = false
): Promise<string> {
    return write_n_run(file, content, 'node', is_subfile, aus_führen)
}

// removing
export async function remove_file(file: string): Promise<void> {
    try {
        await fs.unlink(file)
        console.log(`die Datei: '${file}' wurde gelöscht`)
    } catch {
        // Datei existiert nicht oder kann nicht gelöscht werden
    }
}

export async function remove_empty_dir(dir: string): Promise<void> {
    try {
        await fs.rmdir(dir)
        console.log(`der leere Ordner: '${dir}' wird entfernt`)
    } catch {
        // Ordner ist nicht leer oder existiert nicht
    }
}

export async function kill_tree(dir: string): Promise<void> {
    try {
        await fs.access(dir)
    } catch {
        console.log(`der Ordner: '${dir}' exestiert nicht, somit kann auch nichts gelöscht werden`)
        return
    }
    
    const rl = await createRLInterface()
    
    return new Promise((resolve) => {
        rl.question(`wollen sie den ordner: '${dir}' und somit den gesammten inhalt von ihm löschen?. Nicht rückgängig Y/n `, async (answer) => {
            if (answer.toLowerCase() === 'y') {
                await fs.rm(dir, { recursive: true, force: true })
                console.log('gesammter Baum wurde gelöscht')
                rl.close()
                resolve()
            } else if (answer.toLowerCase() === 'n') {
                console.log(`'${dir}' löschvorgang wurde abgebrochen`)
                rl.close()
                resolve()
            } else {
                console.log("falsche eingabe, sie müssen entweder: 'Y/y' für 'Yes' oder 'N/n' für 'No' eingeben")
                rl.close()
                resolve()
            }
        })
    })
}
