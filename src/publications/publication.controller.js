import { response } from 'express';
import Publication from './publication.model.js';

export const postGestorEmpresas = async (res = response) => {
    const postDefault = new Publication({
        author: "Rodrigo Chanquín",
        title: "Gestor de Empresas",
        description: "Aplicación web que permite a los usuarios llevar un control de sus empresas, empleados, productos y ventas.",
        tools: "NodeJs, npm, thunder, JavaScript",
        descriptionFuntion: "permite ver filtros de empresas y esos hace que sea dinamico y fácil",
        image: "https://www.muypymes.com/wp-content/uploads/2015/06/gestor.jpg",
        link: "https://github.com/jchanquin-2022240/T_gestor_empresas.git"
    })
    await postDefault.save();
}

export const postGestorOpiniones = async (res) => {
    const postDefault = new Publication({
        author: "Rodrigo Chanquín",
        title: "Gestor de Opiniones",
        description: "Ponemos hacer publicaciones y haces publicaciones se le puede comentar",
        tools: "NodeJs, npm, thunder, JavaScript",
        descriptionFuntion: "Permite a los usuarios llevar un control de sus empresas, empleados, productos y ventas.",
        image: "https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/3YRDHQYEW5DAXDJPUI6SUOQH6Y.jpg",
        link: "https://github.com/jchanquin-2022240/PS_opinion_manager.git",
        date: "2024-05-12"
    })
    await postDefault.save();
}

export const postSocialTrap = async (res) => {
    const postDefault = new Publication({
        author: "Rodrigo Chanquín",
        title: "Social Trap",
        description: "Es una pagina web dinamica que nos permite ver diferentes estados de la misma",
        tools: "Html, Css, JavaScript",
        descriptionFuntion: "Podemos ver una pagina social que esta enfocada al genero trap y sus artistas",
        image: "https://www.ecured.cu/images/e/e7/TRAP-MUSIC.jpg",
        link: "https://github.com/jchanquin-2022240/social-trap.git",
        date: "2024-05-12"
    })
    await postDefault.save();
}

export const postControlAcademico = async (res) => {
    const postDefault = new Publication({
        author: "Rodrigo Chanquín",
        title: "Control Academico",
        description: "Se basa en perfil de maestro y alumno, donde el maestro crea cursos y el alumno se asigna",
        tools: "JavaScript, NodeJS, npm, thunder",
        descriptionFuntion: "Tiene validaciones por medio de token y tiene bastantes funcionalidades mendiante el role",
        image: "https://www.uniminuto.edu/sites/default/files/2022-06/MicrosoftTeams-image%20%28344%29.png",
        link: "https://github.com/jchanquin-2022240/PS_control_academico.git",
        date: "2024-05-12"
    })
    await postDefault.save();
}

export const postAdoptionAnimals = async (res) => {
    const postDefault = new Publication({
        author: "Rodrigo Chanquín",
        title: "Adoption Animals",
        description: "En ese proyecto se puede adoptar mascotas y se puede ver las mascotas que estan en adopcion",
        tools: "JavaScript, NodeJS, npm, thunder",
        descriptionFuntion: "Esta enfocado a la adopcion de mascotas y se puede ver las mascotas que estan en adopcion",
        image: "https://media.perezlara.com/2021/02/Adopcio%CC%81n-de-mascotas-1.png",
        link: "https://github.com/jchanquin-2022240/api-2022240.git",
        date: "2024-05-12"
    })
    await postDefault.save();
}

export const postFinalProject = async (res) => {
    const postDefault = new Publication({
        author: "Rodrigo Chanquín",
        title: "Proyecto Final Bim I",
        description: "Se basa en un supermercado donde pueden agregar productos y consumirlos por medio de un carrito de compras ",
        tools: "JavaScript, NodeJS, npm, thunder",
        descriptionFuntion: "El api esta formada por roles y con validaciones de los mismo, lleva una sección de login y de carrito de compras",
        image: "https://i.ytimg.com/vi/Lc2FKHXvKXw/maxresdefault.jpg",
        link: "https://github.com/jchanquin-2022240/T_final_project.git",
        date: "2024-05-12"
    })
    await postDefault.save();
}

export const projects = async (res) => {
    const publications = await Publication.find();

    if (publications.length === 0) {
        postGestorEmpresas(res);
        postGestorOpiniones(res);
        postSocialTrap(res);
        postControlAcademico(res);
        postAdoptionAnimals(res);
        postFinalProject(res);
        console.log('Created default posts!!!');
    } else {
        console.log('Default posts already exist');
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

export const publicationById = async (req, res) => {
    const { id } = req.params;
    const publication = await Publication.findById(id);

    if (!publication) {
        return res.status(404).json({ message: "Publication not found" });
    } else {
        res.status(200).json(publication);
    }


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
    const addComment = { ...rest};

    await Publication.findByIdAndUpdate(id, { $push: { comments: addComment } });
    res.status(200).json({ msg: "Comment added" });
}
