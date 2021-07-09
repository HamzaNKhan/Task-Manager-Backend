const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const List = require('./database/models/list');
const Task = require('./database/models/task');
const cors = require('cors');
app.use(express.json());


/*
CORS- Cross origin Request Security.
localhost:3000 - backend
localhost:4200 - frontend
so to avoid rejection from different port request we use following code.
*/
app.use(cors());

// Lists
app.get('/lists', (req, res) => {
    List.find({})
        .then((hey) => res.send(hey))
        .catch((err)=>console.log(err));
});

app.post('/lists',(req,res)=>{(
    new List({'title': req.body.title}))
            .save()
            .then((lists) => res.send(lists))
            .catch((err)=>console.log(err));
})

app.get('/lists/:listID', (req,res)=>{
    List.find({_id: req.params.listID})
        .then((lists) => res.send(lists))
        .catch((err)=>console.log(err));
})

app.patch('/lists/:listID', (req,res)=>{
    List.findOneAndUpdate({'_id' : req.params.listID},{$set: req.body})
        .then((lists) => res.send(lists))
        .catch((err)=>console.log(err));    
});

app.delete('/lists/:listID', (req,res)=>{
    const deleteTasks = (lists)=>{
        Task.deleteMany({_listID: lists._id})
        .then(()=>lists)
        .catch((err)=>console.log(err));
    };

    const list = List.findByIdAndDelete({'_id': req.params.listID})
        .then((lists) => deleteTasks(lists))
        .catch((err)=>console.log(err)); 
    res.send(list);
});


// Tasks
app.get('/lists/:listID/tasks', (req,res)=>{
    Task.find({_listID: req.params.listID})
        .then((tasks) => res.send(tasks))
        .catch((err)=>console.log(err));
});

app.post('/lists/:listID/tasks', (req,res)=>{
        new Task({ 'title': req.body.title, '_listID': req.params.listID})
            .save()
            .then((task) => res.send(task))
            .catch((err)=>console.log(err));
});

app.get('/lists/:listID/tasks/:taskID', (req,res)=>{
    Task.findOne({_listID: req.params.listID, _id:req.params.taskID})
        .then((task) => res.send(task))
        .catch((err)=>console.log(err));
});

app.patch('/lists/:listID/tasks/:taskID', (req,res)=>{
    Task.findOneAndUpdate({_listID: req.params.listID, _id: req.params.taskID}, { $set: req.body })
        .then((task) => res.send(task))
        .catch((err)=>console.log(err));
});

app.delete('/lists/:listID/tasks/:taskID', (req,res)=>{
    Task.findOneAndDelete({_listID: req.params.listID, _id: req.params.taskID})
        .then((task) => res.send(task))
        .catch((err)=>console.log(err));
});


app.listen(3000, ()=> console.log("Server connected on Port 3000"));
