
import { useRouter } from "next/router";
import styles from "../../styles/Quiz.module.css";
import QuizCard from "../../components/QuizCard";
import ScoreCard from "../../components/ScoreCard";

import { useState } from "react";
export default function Quiz({ quiz }) {
  const router = useRouter();
  const { category, difficulty, number, name } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const answerOptionClickHandler = (isCorrect) => {
    if (isCorrect) {
      setScore((score) => score + 1);
    }
  };
  const nextQuestion = () => {
    if (currentQuestion == quiz.questions.length - 1) {
      setShowScore(true);
    } else {
      setCurrentQuestion((cur) => cur + 1);
    }
  };

  const retakeQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    router.push({
      pathname: "/quiz",
      query: {
        category: category,
        difficulty: difficulty,
        number: number,
      },
    });
  };

  return (
    <div className={styles.quiz_container}>
      <h1 className={styles.header_text}>{name}</h1>
      {showScore ? (
        <ScoreCard
          retakeQuiz={retakeQuiz}
          resetQuiz={resetQuiz}
          score={score}
          totalQuestions={quiz.questions.length}
        />
      ) : (
        <QuizCard
          nextQuestion={nextQuestion}
          optionClickHandler={answerOptionClickHandler}
          number={currentQuestion + 1}
          question={quiz.questions[currentQuestion]}
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category, number, difficulty } = context.query;
  const res = await fetch("https://opentdb.com/api_token.php?command=request");
  const data = await res.json();

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const response = await fetch(
    `https://opentdb.com/api.php?amount=${
      number || "10"
    }&type=multiple&encode=base64${
      category > 0 ? `&category=${category}` : ""
    }${difficulty != "all" ? `&difficulty=${difficulty}` : ""}&token=${
      data.token
    }`
  );
  const quizData = await response.json();
  let questions = [];
  quizData.results.forEach((res) => {
    let ques = { ...res };
    let options = [{ text: res.correct_answer, isCorrect: true }];
    res.incorrect_answers.forEach((incOpt) => {
      options.push({ text: incOpt, isCorrect: false });
    });

    options = shuffleArray(options);
    ques = { ...ques, options: options };
    questions.push(ques);
  });

  let quiz = { questions: questions };

  return {
    props: { quiz: quiz },
  };
}
