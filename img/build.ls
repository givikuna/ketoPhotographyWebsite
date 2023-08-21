(require! {
    'lsse':{println,len,define,read-dir,lambda,random}
    'fs':filesystem
    'prelude-ls': {floor}
})

# (categories = require './categories.json')
# (customers = require './customers.json')
(sessions = require './sessions.json')

(define \main ->
    (stills = [])
    (images = read-dir './img')
    (count = 1)
    (for image in images
        (stills.push do
            (lambda (img) ->
                ({
                    UID: count
                    SESSION_UID: (do ->
                        (Math.random!
                            |> (* (sessions
                                |> len
                                |> (- 1)))
                            |> floor
                            |> (+ 1)))
                    NAME: img
                })) image)
        (count++))
    (filesystem.write-file-sync do
        \./stills.json
        JSON.stringify do
            stills
            null
            4
        'utf-8')
    (return))!

(println 'built ./stills.json')
