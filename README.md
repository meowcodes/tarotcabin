# tarotcabin: MEAN stack blog/tarot web app<br>

*** steps ***<br>
initialize npm & install packages<br>
install and run mongoDB
<pre>
  $ sudo apt-get install -y mongodb-org
  $ mkdir data
  $ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
  $ chmod a+x mongod
  $ ./mongod
</pre>
declare packages as variables
app.listen to listen for requests
set up RESTful routes
<pre>
  INDEX   /spreads            GET     Display all spreads           Spread.find()
  NEW     /spreads/new        GET     Displays create form          N/A
  CREATE  /spreads            POST    Add new spread to DB          Spread.create()
  SHOW    /spreads/:id        GET     Displays one spread           Spread.findById()
  EDIT    /spreads/:id/edit   GET     Display edit form             Spread.findById()
  UPDATE  /spreads/:id        PUT     Update a spread and redirect  Spread.findByIdAndUpdate()
  DESTROY /spreads/:id        DELETE  Delete a spread and redirect  Spread.findByIdAndDelete()
</pre>
create corresponding ejs pages under /views
create partial header and footer under /views/partials
link bootstrap
include partials on ejs files
create and link data module files
set up data schema/model
set up and style INDEX page
set up and style NEW page with a form
set up CREATE functionality
set up and style SHOW page
set up and style EDIT page
set up UPDATE functionality
set up DESTROY functionality

