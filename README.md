# Job Test
For job application technical task

# Used Techniques
- MySQL
- Nodejs
- Expressjs

# Project Setup
1. Download / Pull the project source code form github
2. Install [Nodejs] (https://nodejs.org/en/) if you dont have it
3. Install [NPM] (https://www.npmjs.com/get-npm) if you dont have it
4. Install [MySQL] (https://dev.mysql.com/downloads/workbench/) if you dont have a MySQL server installed
5. Go to the project folder root (e.g. you save this project at C:/job_test, then switch to this folder) and run the below command through command line to install all nodejs packages 
```
npm install
```
6. Connect to your MySQL server and run the "db_setup.sql" located at project root, reference to execute [.SQL] (https://dev.mysql.com/doc/refman/8.0/en/mysql-batch-commands.html). Or, you can run it throught other softwares
7. edit the '/config/config.js' database settings to fit with your local environment
That's it ! Your can try to run "node" in command line and try the application
Default url will be **localhost:3000**

# Porject Structure
- controller // folder for files on handling incoming http request
  - customer_controller.js // handle all http request about customer data
- config // folder for files on configuration values
  - config.js // main config file
- log // folder for log files
- infrastructure // folder for files work on db, logger, or other cross aspect functions
  - database.js // mysql connection class
  - logger.js // logger provider class
- repository // folder for data access methods
  - customer_repository.js // handle data manipulation on customer data
- route // folder for routing config
  - customer_route.js // handle customer related request route config
- view // folder for view
  - customer
    - index.ejs
    - new.es
  - partial
    - footer.ejs
    - header.ejs
  
# Troubleshooting
If you have an error "Client does not support authentication protocol requested by server", please execute the following query in MySQL
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password'
