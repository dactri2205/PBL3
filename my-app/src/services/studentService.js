import {
  studentProfile,
} from "../mock/student/mockStudentProfile";
import {
  myTutors,
  availableTutors,
} from "../mock/student/mockStudentTutors";
import {
  studentCourses,
} from "../mock/student/mockStudentCourses";
import {
  studentLessons,
  studentScheduleRequests,
} from "../mock/student/mockStudentSchedule";
import { studentPayments } from "../mock/student/mockStudentPayments";
import { studentReviews } from "../mock/student/mockStudentReviews";

let profile = { ...studentProfile };
let tutors = [...myTutors];
let tutorList = [...availableTutors];
let courses = [...studentCourses];
let lessons = [...studentLessons];
let scheduleRequests = [...studentScheduleRequests];
let payments = [...studentPayments];
let reviews = [...studentReviews];

const delay = (data, time = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(data), time));

export const getStudentProfile = () => delay(profile);

export const updateStudentProfile = (data) => {
  profile = { ...profile, ...data };
  return delay(profile);
};

export const getMyTutors = () => delay([...tutors]);

export const requestRemoveTutor = (tutorId, reason) => {
  tutors = tutors.map((tutor) =>
    tutor.id === tutorId
      ? { ...tutor, status: "removal_pending", leaveReason: reason }
      : tutor
  );

  return delay(tutors.find((tutor) => tutor.id === tutorId));
};

export const getAvailableTutors = () => delay([...tutorList]);

export const sendTutorRequest = (tutorId) => {
  tutorList = tutorList.map((tutor) =>
    tutor.id === tutorId ? { ...tutor, status: "requested" } : tutor
  );

  return delay(tutorList.find((tutor) => tutor.id === tutorId));
};

export const getStudentCourses = () => delay([...courses]);

export const registerCourse = (courseId) => {
  courses = courses.map((course) =>
    course.id === courseId ? { ...course, status: "pending" } : course
  );

  return delay(courses.find((course) => course.id === courseId));
};

export const getStudentLessons = () => delay([...lessons]);

export const getStudentScheduleRequests = () => delay([...scheduleRequests]);

export const createScheduleRequest = (data) => {
  const newRequest = {
    id: Date.now(),
    ...data,
    status: "pending",
  };

  scheduleRequests = [newRequest, ...scheduleRequests];
  return delay(newRequest);
};

export const requestLessonAbsence = (lessonId, reason) => {
  lessons = lessons.map((lesson) =>
    lesson.id === lessonId
      ? { ...lesson, status: "absence_pending", absenceReason: reason }
      : lesson
  );

  return delay(lessons.find((lesson) => lesson.id === lessonId));
};

export const getStudentPayments = () => delay([...payments]);

export const payInvoice = (invoiceId, method) => {
  payments = payments.map((payment) =>
    payment.id === invoiceId
      ? { ...payment, status: "paid", method }
      : payment
  );

  return delay(payments.find((payment) => payment.id === invoiceId));
};

export const getStudentReviews = () => delay([...reviews]);

export const createStudentReview = (data) => {
  const newReview = {
    id: Date.now(),
    ...data,
    date: new Date().toISOString().slice(0, 10),
  };

  reviews = [newReview, ...reviews];

  courses = courses.map((course) =>
    course.id === data.courseId ? { ...course, reviewed: true } : course
  );

  return delay(newReview);
};
