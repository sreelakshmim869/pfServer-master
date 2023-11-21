 const projects = require('../Controllers/Models/projectSchema')


//  Add Project

exports.addProjects = async (req,res)=>{
    console.log("Inside add project function");
    const userId = req.payload
    const projectImage = req.file.filename
    const {title,language,overview,github,website} = req.body
    // console.log(`${title},${language},${overview},${github},${website},${projectImage},${userId}`);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exits!!! Upload Another")
        }else{
            const newProject = new projects({
                title,language,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json(`Requiest Failed, Error :${err}`)
    }
    //res.status(200).json("addProject request reciver!!!")
}

// getuserproject - token required

exports.allUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}


// getallprojects - tokens required

exports.getallProjects = async (req,res)=>{
    try{
        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// gethomeProjectsprojects - tokens required

exports.getHomeProjects = async (req,res)=>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}