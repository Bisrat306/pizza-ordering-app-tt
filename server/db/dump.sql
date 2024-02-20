--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.item OWNER TO postgres;

--
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_id_seq OWNER TO postgres;

--
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;


--
-- Name: item_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_images (
    id integer NOT NULL,
    item_id integer,
    item_type_id integer,
    url character varying(255) NOT NULL,
    alt_name character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.item_images OWNER TO postgres;

--
-- Name: item_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_images_id_seq OWNER TO postgres;

--
-- Name: item_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_images_id_seq OWNED BY public.item_images.id;


--
-- Name: item_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_types (
    id integer NOT NULL,
    item_id integer,
    name character varying(255) NOT NULL,
    description text,
    price numeric(8,2),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.item_types OWNER TO postgres;

--
-- Name: item_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_types_id_seq OWNER TO postgres;

--
-- Name: item_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_types_id_seq OWNED BY public.item_types.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    quantity integer,
    item_types_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    total numeric(8,2),
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    phoneno character varying(20),
    email character varying(255) NOT NULL,
    status_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_id_seq OWNER TO postgres;

--
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- Name: item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);


--
-- Name: item_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_images ALTER COLUMN id SET DEFAULT nextval('public.item_images_id_seq'::regclass);


--
-- Name: item_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_types ALTER COLUMN id SET DEFAULT nextval('public.item_types_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item (id, name, created_at, updated_at) FROM stdin;
1	Pizza	2024-02-18 11:22:38.893894	2024-02-18 11:22:38.893894
\.


--
-- Data for Name: item_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_images (id, item_id, item_type_id, url, alt_name, created_at, updated_at) FROM stdin;
1	1	1	https://embed.widencdn.net/img/beef/78foq693gs/1600x1200px/pizza-with-a-purpose-horizontal.tiff?keep=c&u=7fueml	\N	2024-02-18 11:34:57.764526	2024-02-18 11:34:57.764526
2	1	1	https://media.istockphoto.com/id/1210739896/photo/roast-beef-pizza-close-up.webp?s=1024x1024&w=is&k=20&c=SY74SbYE1uzLgddLJynh12Nt3A7AOmKfr3dIXkKqWxo=	\N	2024-02-18 11:34:57.764368	2024-02-18 11:34:57.764368
3	1	2	https://as1.ftcdn.net/v2/jpg/00/70/92/26/1000_F_70922648_9R9qDzIL2bgMX314XB5vygULmoB1m0xm.jpg	\N	2024-02-18 11:35:08.021845	2024-02-18 11:35:08.021845
4	1	2	https://previews.123rf.com/images/handmadepictures/handmadepictures1410/handmadepictures141000161/32073665-fresh-made-tuna-pizza-with-corn-and-red-onions.jpg	\N	2024-02-18 11:35:08.021907	2024-02-18 11:35:08.021907
17	1	26	https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Whole-Wheat-Veggie-Pizza_EXPS_HCKA19_12558_C10_13_5b.jpg	Vegetable Pizza	2024-02-20 19:06:27.802397	2024-02-20 19:06:27.802397
18	1	26	https://deenshouston.com/wp-content/uploads/2023/12/Vegetable-Pizza.jpg	Vegetable Pizza	2024-02-20 19:06:27.802551	2024-02-20 19:06:27.802551
5	1	3	https://media.istockphoto.com/id/905492462/photo/pizza-margarita-with-mozzarella-cheese-basil-and-tomato-template-for-your-design-and-menu-of.jpg?s=1024x1024&w=is&k=20&c=ImaKDAycz31YZKGKqcdHVOrv_CqLMMehxS6mBgeON1A=	\N	2024-02-18 11:43:32.035463	2024-02-18 11:43:32.035463
\.


--
-- Data for Name: item_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_types (id, item_id, name, description, price, created_at, updated_at) FROM stdin;
1	1	Beef Pizza	A very tasty beef pizza	35.60	2024-02-18 11:34:57.262525	2024-02-18 11:34:57.262525
2	1	Tuna Pizza	A very tasty tuna pizza	35.60	2024-02-18 11:35:07.995603	2024-02-18 11:35:07.995603
26	1	Vegetable Pizza	A delicious vegetable pizzas.	21.00	2024-02-20 19:06:27.778688	2024-02-20 21:43:02.171213
3	1	Margharitta Pizza	A very tasty, aromatic, cheese field pizza.	47.50	2024-02-18 11:43:31.995124	2024-02-20 21:55:11.821202
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, quantity, item_types_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, total, firstname, lastname, phoneno, email, status_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (id, name, created_at, updated_at) FROM stdin;
1	pending	2024-02-18 12:00:44.283156	2024-02-18 12:00:44.283156
2	in-preparation	2024-02-18 12:00:50.528305	2024-02-18 12:00:50.528305
3	ready-for-pickup	2024-02-18 12:01:03.426558	2024-02-18 12:01:03.426558
4	completed	2024-02-18 12:01:12.431243	2024-02-18 12:01:12.431243
5	cancelled	2024-02-18 12:01:22.587488	2024-02-18 12:01:22.587488
\.


--
-- Name: item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_id_seq', 1, true);


--
-- Name: item_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_images_id_seq', 18, true);


--
-- Name: item_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_types_id_seq', 26, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 5, true);


--
-- Name: item_images item_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT item_images_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: item_types item_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_types
    ADD CONSTRAINT item_types_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- Name: orders FK_03a801095cb90cf148e474cfcb7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_03a801095cb90cf148e474cfcb7" FOREIGN KEY (status_id) REFERENCES public.status(id);


--
-- Name: order_items FK_145532db85752b29c57d2b7b1f1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: item_types FK_24087f957a497fb5f5dfac4ea05; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_types
    ADD CONSTRAINT "FK_24087f957a497fb5f5dfac4ea05" FOREIGN KEY (item_id) REFERENCES public.item(id);


--
-- Name: order_items FK_4bf757b5769698a96d3d8450e81; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "FK_4bf757b5769698a96d3d8450e81" FOREIGN KEY (item_types_id) REFERENCES public.item_types(id);


--
-- Name: item_images FK_9c2c7fb12650a18c61f758cdfb8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT "FK_9c2c7fb12650a18c61f758cdfb8" FOREIGN KEY (item_id) REFERENCES public.item(id);


--
-- Name: item_images FK_d2c8c4c1f03983b802de9d63f5c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_images
    ADD CONSTRAINT "FK_d2c8c4c1f03983b802de9d63f5c" FOREIGN KEY (item_type_id) REFERENCES public.item_types(id);


--
-- PostgreSQL database dump complete
--

