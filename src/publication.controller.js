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
    const { author, title, description, tools, descriptionFuntion, image, link } = req.body;

    const publication = new Publication({
        author,
        title,
        description,
        tools,
        descriptionFuntion,
        image,
        link
    });

    await publication.save();

    res.status(200).json({ msg: "Publication created", publication });
}
