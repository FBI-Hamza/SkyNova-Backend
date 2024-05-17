const Task = require('../models/tasks.model'); 

exports.view= function(req,res,next){
    Task.find().then((task)=>{
     res.json(task);   
    }).catch((error)=>{
        return err;
    })
};

exports.viewById= async function(req,res,next){
    Task.find({taskId:req.params.id}).then((task)=>{
        res.json(task);   
       }).catch((error)=>{
           return error;
       })   
};

exports.create=function(req,res,next){
    Task.create(req.body).then((result)=>{
        res.json(result);
    }).catch((err)=>{
        res.json(err);
    })};

exports.delete= function(req,res,next){
    Task.deleteOne({taskId:req.params.id}).then((result)=>{
        res.json(result);
    }).catch((err)=>{
        res.json(err);
    })
};

// exports.update= async function(req, res, next){
//     try {
//       const taskId = req.params.id;
//       const updateData = req.body;
//       const task = await Task.findByIdAndUpdate({taskId:req.params.id}, updateData, { new: true });
//       if (!task) {
//         return res.status(404).json({ message: "Task not found" });
//       }
//       res.json(task);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error updating task" });
//     }
//   };

// exports.update= async function(req, res, next){
//     await Task.findByIdAndUpdate({taskId:req.params.id}, req.body,{ completed: true });
//     res.json({status:"success"})
//       };

exports.update= async(req, res) => {
    const _Id = req.params.id;
    const updated = req.body;
  console.log(updated);
    try {
      const task = await Task.findByIdAndUpdate(_Id, {$set:updated},{new:true});
      console.log(task);

      if (!task) {
        return res.status(404).send('task not found');
      }
  
      res.json(task);
    } catch (err) {
      console.error('Error patching task:', err);
      res.status(500).send('Internal server error');
    }
  };

// exports.update= async function(req, res, next){
//       const taskId = req.params.id*1;
//       const updateData = req.body;
//       const parsedId =parseInt(taskId);
//       if(isNaN(parsedId)) return res.status(400);

//       Task[parsedId] = {...Task[parsedId],...updateData};
//       return res.status(200);
//   };
