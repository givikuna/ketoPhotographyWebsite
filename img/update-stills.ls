(require! {
    'lsse':{println,len,defun,echo,str}
    'fs':filesystem
})

(current-stills = ( filesystem.read-file-sync \stills.json \utf-8 ) |> JSON.parse)

(defun \get-front-cover-images ->
    ([ \349984376_255579210458984_8220216849840623738_n.jpeg
        \346827502_147798384939495_7929983836452488461_n.jpeg
        \313259401_838576830633702_7727858395197320125_n.jpeg
        \114894154_176645777415072_5329867957643512513_n.jpeg
        \119894154_176645757415072_5329867957643512513_n.jpeg ]))

(defun \is-front-cover-image ->
    (if it.NAME in get-front-cover-images!
        (return true))
    (false))

(new-stills = (->
    (to-return = [])
    (for i in [til len current-stills]
        (new-element = {
            UID: current-stills[i]UID
            SESSION_UID: current-stills[i]SESSION_UID
            NAME: current-stills[i]NAME
            IS_FRONT_COVER_IMAGE: is-front-cover-image current-stills[i]
        })
        (to-return.push new-element))
    (to-return))!)

(filesystem.write-file-sync do
    \./stills.json
    JSON.stringify do
        new-stills
        null
        4
    'utf-8')
