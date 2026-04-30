// src/mock/mockTutorClasses.js

export const tutorClasses = [
  {
    id: 1,
    title: "IELTS Intensive",
    subject: "Tiếng Anh",
    status: "active",
    time: "T3, T5 - 18:00",
    maxStudents: 10,
    price: 350000,
    description: "Lớp luyện IELTS chuyên sâu cho học viên mục tiêu 6.5+.",
    students: [
      { id: 1, name: "Lê Thị Bình", status: "approved" },
      { id: 2, name: "Đặng Minh Quân", status: "pending" },
    ],
  },
  {
    id: 2,
    title: "Toán 12 Cấp tốc",
    subject: "Toán",
    status: "pending",
    time: "T2, T4 - 19:30",
    maxStudents: 8,
    price: 250000,
    description: "Ôn tập kiến thức trọng tâm Toán 12 và luyện đề.",
    students: [
      { id: 3, name: "Nguyễn Văn An", status: "pending" },
      { id: 4, name: "Trần Minh Khoa", status: "approved" },
    ],
  },
  {
    id: 3,
    title: "Vật lý 11 nền tảng",
    subject: "Vật lý",
    status: "active",
    time: "T7 - 15:00",
    maxStudents: 6,
    price: 200000,
    description: "Củng cố kiến thức Vật lý 11 cho học viên mất gốc.",
    students: [
      { id: 5, name: "Phạm Gia Hân", status: "approved" },
    ],
  },
];