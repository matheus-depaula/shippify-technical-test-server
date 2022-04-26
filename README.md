# Shippify Technical Test Server

## How to run

Setup `.env` file according to `.env.sample`.
Create a database and run the scripts at `scripts` directory.

### Running on docker
To run on Docker `DATABASE_HOST` must be `host.docker.internal`.

`docker-compose up -d` to run the composite.

### Commands
`yarn typeorm:up`: Run migrations on database.

`yarn start:dev`: Starts development environment.

`yarn build`: Generate the transpiled build.

`yarn start:prod`: Run builded project.
