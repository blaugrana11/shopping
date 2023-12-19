import express from 'express';
import Task from './Models/Task.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));


app.post("/add", async function (req, res) {
  const nv_ajout = new Task();
  nv_ajout.name = req.body.name
  nv_ajout.quantity = req.body.quantity
  nv_ajout.purchased = 0
  await nv_ajout.save();
  res.redirect('/');
});

app.get("/achete/:id_item", async function (req, res) {
  const article = await Task.load({ id_item: req.params.id_item});
  article.purchased = 1;
  await article.save();
  res.redirect('/');
});

app.get("/delete/:id_item", async function (req, res) {
  await Task.delete({ id_item : req.params.id_item });
  res.redirect('/');
});

app.get("/", async function (req, res) {
  const not_bought = await Task.loadMany({purchased : 0});
  const bought = await Task.loadMany({purchased : 1});
  res.render('listTasks.ejs', { not_bought, bought});
});

app.listen(4000);
