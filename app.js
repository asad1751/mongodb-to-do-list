const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/usermodel');

mongoose.connect('mongodb://127.0.0.1:27017/cat_app', {useNewUrlParser: true,useUnifiedTopology:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("views"));

app.get('/',(req,res)=>{
  res.render('login');
});

app.post('/create',(req,res)=>{
  let id = req.body.id;
  User.create({id:id,task:[]},(err,task)=>{
    if(err) console.log("Error has occured");
    else res.redirect(`/${id}`);
  });
});

app.get('/:id',(req,res)=>{
  let id = req.params.id;
  User.find({id:id},(err,user)=>{
    console.log(user);
    res.render('home',{user:user});
  });
});

app.post('/add',(req,res)=>{
  let task = req.body.task;
  let id = req.body.id;

  User.findOneAndUpdate({id:id},
    {$push: {tasks:{task:task,completed:false}}},
    (err,taks)=>{
      if(err) console.log(err);
      else res.redirect(`/${id}`);
    });
});

app.post('/remove',(req,res)=>{
  let userId = req.body.userId;
  let taskId = req.body.taskId;

  User.updateOne({id:userId},
    {$pull : {tasks:{_id:taskId}}},
    (err,task)=>{
      if(err) console.log(err);
      else res.redirect(`/${userId}`);
    });
});

app.get('/all',(req,res)=>{
  Task.find({},(err,task)=>{
    res.send(task);
  });
});

app.listen(3000,'127.0.0.1',()=>{
  console.log('Server is running');
});
