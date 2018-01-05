const mongoose = require('./mongoose_connect');
const faker = require('faker');

const CourseModel = require('./models/CourseModel');
const PaymentModel = require('./models/PaymentModel');
const PoolModel = require('./models/PoolModel');
const UserModel = require('./models/UserModel');
const VerificationModel = require('./models/VerificationModel');


/*
 * populate our db: 
 */

popDatabase();

/* 
 * populates database with one user / course 
 * TODO: make this more robust / complete 
 */

function popDatabase() {

    // create user, save them       
    user = createFakeUser();
    user.save( function (err, user) {

        if (err) {
            console.log(`error adding user: ${err}.`);
        } 
        else {

            // on save, connect a course to the saved user
            console.log(`User added: ${user.firstName} ${user.lastName}.`);
            course = createFakeCourse( user );
            course.save(function (err, course) {

                if (err) {
                    console.log(`error adding course: ${err}.`);
                } else {
                    console.log(`Course added: ${course.name}.`);

                    console.log(user);
                    console.log(course);
                }

            });
        }
    });
}


/* 
 * create a fake user for our db
 */

function createFakeUser() {

    // create user, save them to the db
    const user = new UserModel({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
    });

    return user;
}

/*
 * create a fake course, tied to a fake user
 */

function createFakeCourse( user ) {

    // create course, attach to user
    const courseName = faker.company.catchPhraseNoun() + " " + Math.ceil(Math.random() * 400);
    const course = new CourseModel({
        name: courseName,
        user: user,
        startDate: new Date(),
        // hard-code end date for now (jan 1, 2020) --> month is 0-indexed
        endDate: new Date( 20, 0 ),
    });

    return course;
}
