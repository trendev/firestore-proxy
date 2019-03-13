import express from 'express';

const app: express.Application = express();

app.get('/',(req,res) => res.send('Hello MotherFuckers\n'));

const port = process.env.PORT;
app.listen(port, ()=>console.log(`Listening on port ${port}`));