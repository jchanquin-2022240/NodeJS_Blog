import { Router } from 'express';
import { check } from 'express-validator';

import {
    publicationGet,
    publicationPost,
    publicationById,
    AddCommentPut
} from './publication.controller.js';

import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.get('/posts', publicationGet);

router.get('/post/:id', publicationById);

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

router.put(
    "/addComment/:id",
    [
        check("id", "Id is required").not().isEmpty(),
        check("commentUser", "The name of the user is required").not().isEmpty(),
        check("commentMain", "The commentMain is required").not().isEmpty(),
        validateFields
    ], AddCommentPut);

export default router;