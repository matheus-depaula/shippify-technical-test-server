CREATE TABLE vehicles (
    id int NOT NULL AUTO_INCREMENT,
    creation_date datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    plate varchar(100) NOT NULL
    model varchar(100) NOT NULL,
    type enum ('0', '1', '2') NOT NULL,
    capacity varchar(20) NOT NULL,
    driver_id int NULL, UNIQUE INDEX IDX_ec7181ebdab798d97070122a5b (plate),
    PRIMARY KEY (id)
);

CREATE TABLE drivers (
    id int NOT NULL AUTO_INCREMENT,
    creation_date datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    phone varchar(20) NOT NULL,
    avatar_url varchar(200) NOT NULL,
    status enum ('ACTIVE', 'DISABLED') NOT NULL DEFAULT 'ACTIVE',
    company_id int NULL,
    UNIQUE INDEX IDX_d4cfc1aafe3a14622aee390edb (email),
    PRIMARY KEY (id)
);

CREATE TABLE companies (
    id int NOT NULL AUTO_INCREMENT,
    creation_date datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    name varchar(100) NOT NULL,
    city int NOT NULL,
    status enum ('ACTIVE', 'DISABLED') NOT NULL DEFAULT 'ACTIVE',
    plan_type enum ('BASIC', 'INTERMEDIATE', 'ADVANCED') NOT NULL,
    UNIQUE INDEX IDX_3dacbb3eb4f095e29372ff8e13 (name),
    PRIMARY KEY (id)
);

ALTER TABLE vehicles ADD CONSTRAINT FK_9c2e0a8772c9e43b32f57bfcfcc FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE drivers ADD CONSTRAINT FK_2ffd7a9646568f60a28f25c5912 FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
