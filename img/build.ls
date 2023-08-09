(fs = require 'fs')
({
    print
    len
    read-dir
    random
} = require 'lsse')
({
    floor
} = require 'prelude-ls')

(categories = require './categories.json')
(customers = require './customers.json')
(sessions = require './sessions.json')
(stills = require './stills')

(main = do ->
    (images = read-dir './img')
    (count = 1)
    (for image in images
        (stills.push do
            ((img) ->
                ({
                    UID: count
                    SESSION_UID: (do ->
                        (Math.random!
                            |>  (* 9)
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
            4)
    (return))
