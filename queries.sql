create type user_aggregate_event as enum ('created', 'password_changed', 'deleted');

drop type if exists user_aggregate_event;

create table if not exists user_events
(
    id          uuid primary key,
    snapshot_id uuid                     not null,
    sequence    integer                  not null,
    name        user_aggregate_event     not null,
    created_at  timestamp with time zone not null,
    payload     jsonb                    not null,

    constraint user_events_snapshot_id_foreign_key foreign key (snapshot_id) references user_snapshots (id),
    constraint user_events_sequence_min_value check ( sequence >= 1 ),
    constraint user_events_sequence_snapshot_id_unique unique (sequence, snapshot_id)
);

drop table if exists user_events;

create table if not exists user_snapshots
(
    id            uuid primary key,
    version       integer                  not null,


    created_at    timestamp with time zone not null,
    updated_at    timestamp with time zone not null,
    deleted_at    timestamp with time zone,

    name          text                     not null,
    email         text                     not null,
    password_hash text                     not null,

    constraint user_snapshots_version_min_value check ( version >= 1 ),

    constraint user_snapshots_email_min_length check ( length(email) >= 4 ),
    constraint user_snapshots_email_max_length check ( length(email) <= 100 ),
    constraint user_snapshots_email_unique unique (email),

    constraint user_snapshots_name_min_length check ( length(name) >= 4 ),
    constraint user_snapshots_name_max_length check ( length(name) <= 100 )
);

drop table if exists user_snapshots;