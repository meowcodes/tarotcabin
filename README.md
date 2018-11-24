# tarotcabin: MEAN stack blog/tarot web app<br>

*** steps ***<br>
initialize npm & install packages<br>
install and run mongoDB<br>
<pre>
  $ sudo apt-get install -y mongodb-org
  $ mkdir data
  $ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
  $ chmod a+x mongod
  $ ./mongod
</pre>
declare packages as variables<br>
app.listen to listen for requests<br>
set up RESTful routes<br>
<pre>
  INDEX   /spreads            GET     Display all spreads           Spread.find()
  NEW     /spreads/new        GET     Displays create form          N/A
  CREATE  /spreads            POST    Add new spread to DB          Spread.create()
  SHOW    /spreads/:id        GET     Displays one spread           Spread.findById()
  EDIT    /spreads/:id/edit   GET     Display edit form             Spread.findById()
  UPDATE  /spreads/:id        PUT     Update a spread and redirect  Spread.findByIdAndUpdate()
  DESTROY /spreads/:id        DELETE  Delete a spread and redirect  Spread.findByIdAndDelete()
</pre>
create corresponding ejs pages under /views<br>
create partial header and footer under /views/partials<br>
link bootstrap<br>
include partials on ejs files<br>
create and link data module files<br>
set up data schema/model<br>
set up and style INDEX page<br>
set up and style NEW page with a form<br>
set up CREATE functionality<br>
set up and style SHOW page<br>
set up and style EDIT page<br>
set up UPDATE functionality<br>
set up DESTROY functionality<br>

