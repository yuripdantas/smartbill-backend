const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Bill = require('../models/bill');
const Lancamentos = require('../models/lancamentos');
const Participantes = require('../models/participantes');

const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.use(authMiddleware);

// ----------------------------------------------- ROTAS DO PROJETO DE EXEMPLO -------------------------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        // const projects = await Project.find().populate('user');
        const projects = await Project.find().populate(['user', 'tasks']);
        return res.send({ projects });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading new projects' });
    }

});

router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);
        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading new project' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, tasks } = req.body;

        const project = await Project.create({ title, description, user: req.userId }); // userId ta na requisição através do token. Quem preenche o userId é o middleware auth.js
        
        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save()

            project.tasks.push(projectTask);
        }));

        await project.save();
        
        return res.send({ project });                                           
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new project' });
    }
});

router.put('/:projectId', async (req, res) => {
    try {
        const { title, description, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
            description,
        }, { new: true });

        project.tasks = [];
        await Task.remove({ project: project._id });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save()

            project.tasks.push(projectTask);
        }));

        await project.save();
        
        return res.send({ project });                                           
    } catch (err) {
        return res.status(400).send({ error: 'Error updating new project' });
    }
});

router.delete('/:projectId', async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.projectId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting project' });
    }
});
// ---------------------------------------------------------------------------------------------------

// router.get('/listBills',  async (req, res) => {
//     try {
//         const bills = await Bill.find().populate('user_creator');;
//         return res.send({ bills });
//     } catch (err) {
//         return res.status(400).send({ error: 'Erro ao listar todas as bills '});
//     }
// });

// router.post('/createBill', async (req, res) => {
//     try {
//         const bill = await Bill.create({...req.body, user_creator: req.userId });
//         return res.send({ bill });
//     } catch (err) {
//         console.log(err);
//         return res.status(400).send({ error: 'Erro ao criar uma nova bill '});
//     }
// });

// router.delete('/deleteBill/:billId', async (req, res) => {
//     try {
//         await Bill.findByIdAndRemove(req.params.billId);
//         return res.send();
//     } catch (err) {
//         return res.status(400).send({ error: ' Erro ao deletar uma Bill '});
//     }
// });

// router.post('/AddParticipant', async (req, res) => {
//     try {
//         const participante = await Bill.create(req.body);
//         return res.send({ participante });
//     } catch (err) {
//         console.log(err);
//         return res.status(400).send({ error: ' '});
//     }
// });







module.exports = app => app.use('/projects', router);