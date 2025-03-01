import { useEffect, useState } from "react";
import styles from "../styles/Quiz.module.css";
export default function QuizCard({
  question,
  optionClickHandler,
  nextQuestion,
}) {
  const decode = (text) => {
    return atob(text);
  };

  const [showCorrect, setShowCorrect] = useState(false);
  const [optionSelected, setOptionSelected] = useState(-1);

  useEffect(() => {
    setShowCorrect(false);
    setOptionSelected(-1);
  }, [question]);

  return (
    <div className={styles.quiz_card + " " + styles.quiz_question}>
      <div className={styles.text_div}>
        <p>{decode(question.question)}</p>
      </div>
      <div className={styles.options_div}>
        {question.options.map((option, i) => (
          <button
            key={"button_" + i}
            className={
              (option.isCorrect && showCorrect ? styles.correct : "") +
              " " +
              (optionSelected === i && showCorrect && !option.isCorrect
                ? styles.incorrect
                : "") +
              " " +
              styles.option_button
            }
            onClick={() => {
              if (!showCorrect) {
                setOptionSelected(i);
                setShowCorrect(true);
                optionClickHandler(option.isCorrect);
              }
            }}
          >
            {decode(option.text)}
          </button>
        ))}
      </div>
      <button
        className={styles.next_button}
        onClick={() => {
          nextQuestion();
        }}
      >
        Next
      </button>
    </div>
  );
}
