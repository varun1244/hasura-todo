CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;

CREATE FUNCTION public.set_todos_completed_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
  _old record;
BEGIN
  _new := NEW;
  _old := OLD;

  IF (_new.is_completed AND NOT _old.is_completed) THEN
    _new."completed_at" = NOW();
  END IF;
  RETURN _new;
END;
$$;

CREATE TABLE public.todos (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "desc" text NOT NULL,
    user_id integer NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    completed_at timestamp with time zone
);
CREATE SEQUENCE public.todos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;
ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);
ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_todos_updated_at BEFORE UPDATE ON public.todos FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_todos_updated_at ON public.todos IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TRIGGER set_public_todos_completed_at BEFORE UPDATE ON public.todos FOR EACH ROW EXECUTE FUNCTION public.set_todos_completed_at();
COMMENT ON TRIGGER set_public_todos_updated_at ON public.todos IS 'trigger to set value of column "completed_at" to current timestamp on todo complete';

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
