import express from 'express';
import es6Renderer from 'express-es6-template-engine';


const app = express();
const port = 3000;

// template engine
app.engine('html', es6Renderer);
app.set('views', 'frontend');
app.set('view engine', 'html');

// css, public
app.use(express.static('public'));

const toDos = [
];

app.use(express.json());

export default app;

app.get('/toDos', (req, res) =>{
    res.send(toDos);
})

app.get('/toDos', (req, res)=>{
    const id = Number(req.params.id)
    const found = toDos.filter(task=> id === task.id);
    if(found.length === 1){
        res.status(404).send("Not found");
    } else {
        res.status(200).send(found[0]);
    }
})

app.get('/toDos/:id', (req, res)=>{
    const id = +req.params.id;
    const i = toDos.findIndex((i) => i.id === id);
    if(i >= 0){
    res.status(200).send(toDos[i]);
    } else {
        res.status(400).send("Task not found");
    }
})

app.post('/toDos', (req, res)=>{
    if(req.body.task){
        const{task} = req.body;
        let maxId = Math.max(0,...toDos.map(object => object.id));
        let id = maxId + 1;
        toDos.push({id, task});
        res.status(201).send({resource: "/toDos/"+ id});
    } else {
        res.status(400).send("Bad request");
    }
})

app.put('/toDos/:id', (req, res)=>{
    const id = +req.params.id;
    const task = req.body;
    const i = toDos.findIndex((i)=> i.id === id);
    if(i >= 0){
    const updated = {id: id, ... task};
    toDos[i] = updated;
    res.status(201).send({resources: '/toDos/:id'});
} else {
    res.status(400).send("Task not found");
}
})

app.delete('/toDos/:id', (req, res)=>{
    let id = +req.params.id;
    let i = toDos.findIndex((i)=> i.id === id);
    if(i >= 0){
    toDos.splice(i, 1);
    res.status(202).send({resource: '/toDos/:id'});
} else {
    res.status(400).send("Bad request");
}
})
 
app.get('/index.html', function(req, res) {
  res.render('index', {locals: {toDos}});
});

app.listen(port, ()=>{
  console.log(`Started server at port ${port}`);
});
