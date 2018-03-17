const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session({ secret: 'some-secret-key' }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.locals.dataFromAPI = req.session.dataFromAPI || [];
  console.log(res.locals.dataFromAPI);
  res.render('index');
});

app.post('/update', (req, res) => {
  res.locals.dataFromAPI = req.session.dataFromAPI;
  // pretend data has 40 unique keys
  let dataFromAPI = {
    'UUID1': 'data1',
    'UUID2': 'data2',
    'UUID3': 'data3',
    'UUID4': 'data4',
    'UUID5': 'data5',
    'UUID6': 'data6',
    'UUID7': 'data7',
    'UUID8': 'data8',
    'UUID9': 'data9',
    'UUID10': 'data10',
  };

  if (!res.locals.dataFromAPI) {
    console.log('empty session, setting now');
    req.session.dataFromAPI = [dataFromAPI];
  } else {
    console.log('something in session, update now');
    req.session.dataFromAPI.push(dataFromAPI);
  }
  res.redirect('/');
})

app.post('/filter', (req, res) => {
  console.log('filtering', req.body);
  res.redirect('/');
  // let filterCol =
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
