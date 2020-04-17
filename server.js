const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const neutrium = require('@neutrium/thermo.eos.iapws97')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (error, req, res, next) {
  if(error instanceof SyntaxError){
    return res.status(500).send({
      'success': false,
      'message':'Invalid Data',
      'data': null,
    });
  } else {
    next()
  }
})

let EoS = new neutrium.IAPWS97_EoS()

app.post('/iapws97_PT', (req, res) => {
  return callSolve(res, {p: req.body.p, t: req.body.t })
})

app.post('/iapws97_PH', (req, res) => {
  return callSolve(res, {p: req.body.p, h: req.body.h })
})

app.post('/iapws97_PS', (req, res) => {
  return callSolve(res, {p: req.body.p, s: req.body.s })
})

app.post('/iapws97_HS', (req, res) => {
  return callSolve(res, {h: req.body.h, s: req.body.s })
})

app.use(function(req, res, next) {
  res.status(501)
  res.json({
    'success': false,
    'message':'Invalid Request',
    'data': null,
  })
  next()
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})

function callSolve(res, inputs) {
  /*
  var p = 3000000;
  var t = 300;
  var h = 1500;
  var s = 3.4;
  */

  try {
    let solved = EoS.solve(inputs)
    return res.status(200).send({
      success: true,
      message: '',
      data: solved
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      message: 'Wrong params or Input valves are outside the range of the IAPWS97 correlations',
      data: null
    })    
  }
}
