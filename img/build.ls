(fs = require 'fs')
({
    print
    len
    read-dir
    random
    defun
    lambda
} = require 'lsse')
({
    floor
} = require 'prelude-ls')

# (categories = require './categories.json')
# (customers = require './customers.json')
(sessions = require './sessions.json')

(defun \main ->
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
    (fs.write-file-sync do
        \./stills.json
        JSON.stringify do
            stills
            null
            4
        'utf-8')
    (return))

main!
