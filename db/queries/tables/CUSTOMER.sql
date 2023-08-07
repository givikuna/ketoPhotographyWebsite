-- Table: public.CUSTOMER

-- DROP TABLE IF EXISTS public."CUSTOMER";

CREATE TABLE IF NOT EXISTS public."CUSTOMER"
(
    "UID" bigint NOT NULL,
    "NAME" character(100) COLLATE pg_catalog."default" NOT NULL,
    "DESCRIPTION" text COLLATE pg_catalog."default",
    CONSTRAINT "CUSTOMER_pkey" PRIMARY KEY ("UID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CUSTOMER"
    OWNER to postgres;
