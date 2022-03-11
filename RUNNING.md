Once the repo is downloaded, cd into the `solution` directory and perform the following:
1. Setup environment vars
`cd backend`
`touch .env`
Copy/edit the contents of  `backend/.env.example` into `.env` to setup your local environment

`cd ../frontend`
`touch .env`
Copy/edit the contents of `.env.example` into `.env` to setup your local environment 

2. Database setup
open psql from your terminal and run the following commands:
```
CREATE USER exeraiuser WITH PASSWORD '123456789'`;
CREATE DATABASE exerai;
GRANT ALL PRIVILEGES ON DATABASE exerai TO exeraiuser;
```

exit psql.


3. Create fixtures
Activate your python terminal and runn the following:
```
cd backend
python manage.py migrate
python create_fixture.py ./tryout_data.json    
python manage.py loaddata api/fixtures/movements
python manage.py loaddata api/fixtures/movements
```

4. Testing permissions
In psql run `alter user exeraiuser createdb;`

5. Run the backend `python manage.py runserver`

6. Start the frontend
Open a separate terminal and cd to the frontend:
```
cd ../frontend
npm install
npm start
```