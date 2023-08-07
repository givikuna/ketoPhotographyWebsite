-- Table: public.CATEGORY

-- DROP TABLE IF EXISTS public."CATEGORY";

CREATE TABLE IF NOT EXISTS public."CATEGORY"
(
    "UID" bigint NOT NULL,
    "NAME" character(30) COLLATE pg_catalog."default",
    CONSTRAINT "CATEGORIES_pkey" PRIMARY KEY ("UID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CATEGORY"
    OWNER to postgres;
