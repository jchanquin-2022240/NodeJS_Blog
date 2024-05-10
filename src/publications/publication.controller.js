import Publication from './publication.model.js';

export const publicationGet = async (req, res) => {
    const query = { publicationStatus: true };

    const [totalPublication, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
    ]);

    res.status(200).json({ msg: "Publications found", totalPublication, publications });
}

export const publicationPost = async (req, res) => {
    const { author, title, description, tools, descriptionFuntion, image, link, date } = req.body;

    const publication = new Publication({
        author,
        title,
        description,
        tools,
        descriptionFuntion,
        image,
        link,
        date
    });

    await publication.save();

    res.status(200).json({ msg: "Publication created", publication });
}

export const AddCommentPut = async (req, res) => {
    const { id} = req.params;

    const { _id, author, title, description, tools, descriptionFuntion, image, link, date, ...rest} = req.body;
    const currentDate = new Date();
    const addComment = { ...rest};
    addComment.dateComment = currentDate;

    await Publication.findByIdAndUpdate(id, { $push: { comments: addComment } });
    res.status(200).json({ msg: "Comment added" });
}
