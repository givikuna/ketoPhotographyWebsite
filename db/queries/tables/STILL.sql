-- Table: public.STILL

-- DROP TABLE IF EXISTS public."STILL";

CREATE TABLE IF NOT EXISTS public."STILL"
(
    "UID" bigint NOT NULL,
    "SESSION_UID" bigint NOT NULL DEFAULT 0,
    "NAME" character(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "STILL_pkey" PRIMARY KEY ("UID"),
    CONSTRAINT "FK_STILL_TO_SESSION_UID" FOREIGN KEY ("SESSION_UID")
        REFERENCES public."SESSION" ("UID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET DEFAULT
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."STILL"
    OWNER to postgres;
