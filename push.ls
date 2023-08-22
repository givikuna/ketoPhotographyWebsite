(require! {
    'lsse':{execute,input,println,sleep}
})

(commit-name = input "enter commit name: ")

(println "\n")

(println "this may take a couple of minutes...")

(println "\n")

(cmds = [
    "npm run compile"
    "npm run format-code"
    "git add ."
    "git commit -m \"#commit-name\""
    "git push"
])

(i = 0)
(for cmd in cmds
    (execute cmd)
    (switch i
    case 0 then do
        (println "compiled all the files")
    case 1 then do
        (println ("formatted all of the files")
        (sleep 1000))
    case 1 then do
        (println "staged all of the changes")
        (sleep 1000)
    case 2 then do
        (println "commited all of the changes to the repo")
        (sleep 1000)
    case 3 then do
        (println "pushed the code to github")
        (sleep 1000))
    (i++))
