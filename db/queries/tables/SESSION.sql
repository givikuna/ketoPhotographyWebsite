-- Table: public.SESSION

-- DROP TABLE IF EXISTS public."SESSION";

CREATE TABLE IF NOT EXISTS public."SESSION"
(
    "UID" bigint NOT NULL,
    "CUSTOMER_UID" bigint NOT NULL DEFAULT 0,
    "CATEGORY_UID" bigint NOT NULL DEFAULT 0,
    "SESSION_DATE" date NOT NULL,
    CONSTRAINT "SESSION_pkey" PRIMARY KEY ("UID"),
    CONSTRAINT "FK_SESSION_TO_CATEGORY_UID" FOREIGN KEY ("CATEGORY_UID")
        REFERENCES public."CATEGORY" ("UID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET DEFAULT
        NOT VALID,
    CONSTRAINT "FK_SESSION_TO_CUSTOMER_UID" FOREIGN KEY ("CUSTOMER_UID")
        REFERENCES public."CUSTOMER" ("UID") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET DEFAULT
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."SESSION"
    OWNER to postgres;