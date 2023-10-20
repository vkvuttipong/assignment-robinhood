-- public.itv_card definition

-- Drop table

-- DROP TABLE public.itv_card;

CREATE TABLE public.itv_card (
	id serial4 NOT NULL,
	topic_name varchar(50) NOT NULL,
	topic_desc text NOT NULL,
	status int4 NOT NULL,
	created_by int4 NOT NULL,
	created_on timestamp NOT NULL,
	update_on timestamp NOT NULL,
	CONSTRAINT itv_card_pkey PRIMARY KEY (id)
);


-- public.itv_comment definition

-- Drop table

-- DROP TABLE public.itv_comment;

CREATE TABLE public.itv_comment (
	id serial4 NOT NULL,
	itv_card_id int4 NOT NULL,
	comment_desc varchar(255) NOT NULL,
	created_by int4 NOT NULL,
	created_on timestamp NOT NULL,
	update_on timestamp NOT NULL,
	CONSTRAINT itv_comment_pkey PRIMARY KEY (id)
);


-- public.itv_member definition

-- Drop table

-- DROP TABLE public.itv_member;

CREATE TABLE public.itv_member (
	user_id int4 NOT NULL DEFAULT nextval('user_member_user_id_seq'::regclass),
	username varchar(50) NOT NULL,
	fullname varchar(100) NOT NULL,
	email varchar(255) NOT NULL,
	created_on timestamp NOT NULL,
	update_on timestamp NOT NULL,
	CONSTRAINT user_member_email_key UNIQUE (email),
	CONSTRAINT user_member_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_member_username_key UNIQUE (username)
);


-- public.itv_status definition

-- Drop table

-- DROP TABLE public.itv_status;

CREATE TABLE public.itv_status (
	id serial4 NOT NULL,
	status_name varchar(50) NOT NULL,
	created_by int4 NOT NULL,
	created_on timestamp NOT NULL,
	update_on timestamp NOT NULL,
	CONSTRAINT itv_status_pkey PRIMARY KEY (id)
);