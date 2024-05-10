import { Router } from 'express';
import { check } from 'express-validator';

import {
    publicationGet,
    publicationPost,
} from './publication.controller.js';

import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.get('/', publicationGet);

router.post(
    "/add",
    [
        check("author", "Author is required").not().isEmpty(),
        check("title", "Title is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("tools", "Tools is required").not().isEmpty(),
        check("descriptionFuntion", "DescriptionFuntion is required").not().isEmpty(),
        check("image", "Image is required").not().isEmpty(),
        check("link", "Link is required").not().isEmpty(),
        check("date", "Date is required").not().isEmpty(),
        validateFields
    ], publicationPost);

export default router;