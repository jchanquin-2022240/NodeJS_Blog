
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import { projects } from '../src/publications/publication.controller.js';
import publicationRoutes from '../src/publications/publication.routes.js';
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.publicationPath = '/blog/v1';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
        await projects();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.publicationPath, publicationRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running and listening to port:', this.port)
        });
    }
}

export default Server;
