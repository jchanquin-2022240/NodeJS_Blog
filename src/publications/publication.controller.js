import Publication from './publication.model.js';

export const postGestorEmpresas = async (res) => {
    const postDefault = new Publication({
        author: "Rodrigo Chanquín",
        title: "Gestor de Empresas",
        description: "Aplicación web que permite a los usuarios llevar un control de sus empresas, empleados, productos y ventas.",
        tools: "NodeJs, npm, thunder",
        descriptionFuntion: "Permite a los usuarios llevar un control de sus empresas, empleados, productos y ventas.",
        image: "https://www.muypymes.com/wp-content/uploads/2015/06/gestor.jpg",
        link: "https://github.com/jchanquin-2022240/T_gestor_empresas.git"
    })
    await postDefault.save();
}

export const projects = async (res) => {
    const publications = await Publication.find();

    if (publications.length === 0) {
        postGestorEmpresas(res);
    } else {
        console.log('Created default post!!!');
    }
}

export const publicationGet = async (req, res) => {
    const query = { publicationStatus: true };

    const [totalPublication, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
    ]);

    res.status(200).json({ msg: "Publications found", totalPublication, publications });
}

export const publicationGetComment = async ( res) => {
    try {
        const publications = await Publication.find();
        res.status(200).json(publications);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const publicationPost = async (req, res) => {
//     const { author, title, description, tools, descriptionFuntion, image, link, date } = req.body;

//     const publication = new Publication({
//         author,
//         title,
//         description,
//         tools,
//         descriptionFuntion,
//         image,
//         link,
//         date
//     });

//     await publication.save();

//     res.status(200).json({ msg: "Publication created", publication });
// }

export const AddCommentPut = async (req, res) => {
    const { id} = req.params;

    const { _id, author, title, description, tools, descriptionFuntion, image, link, date, ...rest} = req.body;
    const addComment = { ...rest};

    await Publication.findByIdAndUpdate(id, { $push: { comments: addComment } });
    res.status(200).json({ msg: "Comment added" });
}
