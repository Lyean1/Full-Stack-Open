import React from 'react';

interface CourseData {
  id: number;
  name: string;
  parts: {
    name: string;
    exercises: number;
    id: number;
  }[];
}

const Course: React.FC<{ course: CourseData }> = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <h3>Total exercises: {totalExercises}</h3>
    </div>
  );
};

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content: React.FC<{ parts: CourseData['parts'] }> = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part: React.FC<{ name: string; exercises: number }> = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} - {exercises} exercises
      </p>
    </div>
  );
};

export default Course;
