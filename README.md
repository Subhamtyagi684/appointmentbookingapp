This is a django-react hospital appointment booking app.

Steps to run this app.

1. git clone https://github.com/Subhamtyagi684/appointmentbookingapp.git
2. cd appointmentbookingapp/
3. Make sure you have python,pip,git and node.js installed install in your system.
4. install venv file using
-> python -m venv venv
5. Then activate it using :
-> for linux,   source venv/bin/activate
-> for windows or gitbash terminal,   source venv/Scripts/activate
6. After activating venv file.
7. cd hospitalproject/
8. Then install all the requirements using
-> pip install -r requirements
9. After successfully installing all the requirements, make sure you have no errors while installing the requirements. 
10. Once you install the requirements, make a .env file in the current folder i.e hospitalprojet/.env . 
11. Provide the following things in your .env file
-> SECRET_KEY
-> DEBUG
-> ALLOWED_HOSTS
for e.x.:

SECRET_KEY = xyz
DEBUG = True
ALLOWED_HOSTS = localhost, 127.0.0.1

and finally save this file.

12. Now finally check your django server by running command
-> python manage.py runserver
If there are no errors, then it is good else check or repeat the above steps again carefully.

13. Once you fixed the errors, if any, Stop the server and create your database to make some migrations using commands:
-> python manage.py makemigrations
-> python manage.py migrate

14. If all the migrations are applied successfully, it's time to create superuser. To create a superuser, run command
->for windows cmd,linux terminal:   python manage.py createsuperuser
-> for gitbash terminal:   winpty python manage.py createsuperuser

15. Provide all the required details and hit enter.
16. Once superuser is created successfully, check server again for errors using:
-> python manage.py runserver.
17. If no error occurs, you backend is functioning perfectly.
18. Now, let this server continue running, we will now create our frontend.

----------------------------------------------------------------------------------------------------------------------------

19. Go back to the main folder i.e appointmentbookingapp
20. cd hospitalbackend/
21. cd react-hospital/
22. Check if there is any package.json file present or not. If it is present, run the following command in your terminal: 
-> npm i
23. Let it be installed. It will take some couple of minutes to install all the required dependencied for this app. Do not skip the installation or the app may fail functioning perfectly. Relax and let it be completed.
24. Once it is completed, run command:
-> npm start
25. It will start your app to run on port :3000.
26. Ensure it must run on 3000 port only, if you change the port, you have to change the same in your backend also.
27. If it is successfully started, you will see a login ui running on localhost:3000 on your browser.
28. In the next step, we will see how to use this app and how it functions.

-------------------------------------------------------------------------------------------------------------------------------

About this app:

29. Once your react app is running fine, you will see a login ui on the browser. 
30. Create your account by clicking on Register Here button.
31. You will see a registration form. Provide your valid details to register. You can provide random email for now, because there is no SMTP used for now and you can also provide any random mobile number for now. Just make sure,this field must have only 10 digits, else you will face an error.
32. You can register youself as a staff or patient, but to register as a staff you need a valid identity. For now, you can use 111 i.e (triple one) as your private identity code.
33. If you have provided all the correct details, you will receive an alert message as user registered successfully and you will automatically redirected to the login page after clicking ok on the alert message.
34. Provide your credentials to login, such as your email and password provided while registering.
35. If you provide correct credentials, you will be logged in as a staff or patient respectively.
36. If you are logged in as a patient, You will see a welcome page with Hello {user} and there will be a book appointment button. Click on Book appointment button and you will be redirected on a book appointment page.
37. On this page, you can check availability for your appointment date and time slots. 
38. You have to choose an appointment date and time slot, only which is available to be booked. You cannot book your appointment which is already booked. Ensure you must not provide appointment date beyond today else you might face error.
39. Once the choosen appointment date and time is available, there will be a button visible to Book Appointment.
40. Click on Book appointment.
41. Once you click on book appointment. It will take you to the confirmation page, where you will check you all details, such as email, name , mobile, appointment date, appointment time, etc. If you click on confirm, your appointment will be fixed and you can receive an email or sms , if required. Else if you deny, you can cofirm it later.
42. Now, to check all the details of your appointments, click on My Appointments from the navbar. From here, you can confirm your appointment, if you have denied it previously.
43. Now, when appointment is fixed , click on logout.
44. Done.

45. Now, if you are a staff and logged in as a staff user.
46. You have to register as a staff and log in as a staff.
47. Once you log in, you will see a dashboard where there is a option to select a date to see the appointments on that particular date.
48. If there are some appointments available, you will see a list of patients who has appointment on that day.
49. By default all the status of the patient user are not visited. To change it, only staff member can change it to visited from the same dashbord.
50. Now, you can finally logout.


---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Tools and packages used for this app:

frontend -> HTML, CSS, JavaScript, Bootstrap, React
backend -> Python, Django, Django REST Framework
api-testing -> Postman
databse -> Sqlite

----------------------------------------------------------------------------------------------------------------------------------------------------------------------


Backend specifications Used:

1. Custom user model for registration
2. Token authentication
3. REST Api's ( postman tested api's)
4. Additional python packages used like calendar, datetime, python-decouple 










