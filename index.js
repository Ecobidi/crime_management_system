let express = require('express')
let expressSession = require('express-session')
let fileupload = require('express-fileupload')
let connectFlash = require('connect-flash')
let mongoose = require('mongoose')
// let MongoStore = require('connect-mongo')(expressSession)
// let passport = require('passport')
let { APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, domain, owner_mat_no, owner_name} = require('./config') 

// routes
const { LoginRouter, UserRouter, CrimeRouter, OfficerRouter, StationRouter, SuspectRouter } = require('./routes')

// models
const CrimeModel = require('./models/crime')
const OfficerModel = require('./models/officer')
const SuspectModel = require('./models/suspect')
const StationModel = require('./models/station')
const UserModel = require('./models/user')

// connect to mongodb database
mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())

app.use(fileupload())

// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connection,
  //   ttl: 14 * 24 * 60 * 60
  // })
}))
// passport middleware
// app.use(passport.initialize())
// app.use(passport.session())
// connect-flash
app.use(connectFlash())

app.use((req, res, next) => {
  // res.locals.errors = req.flash('errors')
  // res.locals.error_msg = req.flash('error_msg')
  // res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user || { username: 'test' }
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME
  app.locals.port = PORT
  app.locals.domain = domain + ':' + PORT
  next()
})

// routes

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.username = ''
  res.redirect('/login')
})

let getDashboard = async (req, res) => {
  try {
    let officers_count = await OfficerModel.count()
    let stations_count = await StationModel.count()
    let crimes_count = await CrimeModel.count()
    let suspects_count = await SuspectModel.count()
    let users_count = await UserModel.count()
    res.render('dashboard', {officers_count, stations_count, crimes_count, suspects_count, users_count})
  } catch (err) {
    console.log(err)
    res.render('dashboard', {
      stations_count: 0,
      officers_count: 0, crimes_count: 0,
      suspects_count: 0, users_count: 0,
    })
  }
}

app.get('/', getDashboard)

app.get('/dashboard', getDashboard)

app.use('/crimes', CrimeRouter)

app.use('/officers', OfficerRouter)

app.use('/suspects', SuspectRouter)

app.use('/stations', StationRouter)

app.use('/users', UserRouter)

// app.get('/api/patients/:patient_reg_no', PatientController.getOneByRegNoAPI)

// app.get('/api/doctors/:doctor_username', DoctorController.getDoctorByUsernameAPI)

app.listen(PORT, () => { console.log(`${APPNAME} running on port ${PORT}`) })