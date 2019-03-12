create table product (
    productid  text,
    data jsonb,
    created_date date default now(),
    modified_date date default now()
)

create table pricing (
    id  guid,
    data jsonb,
    created_date date default now(),
    modified_date date default now()
)

create table cart (
    id  guid,
    data jsonb,
    created_date date default now(),
    modified_date date default now()
)