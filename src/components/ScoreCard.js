import styles from "../styles/Quiz.module.css";
import {Button} from "@mui/material";
import { useRouter } from "next/router";
export default function ScoreCard({
  totalQuestions,
  score,
  resetQuiz,
  retakeQuiz,
}) {
  const router = useRouter();

  return (
    <div className={styles.quiz_card}>
      <h1>
        {score}/{totalQuestions}
      </h1>
      <p>Well Done</p>
      <div className={styles.buttons_div}>
        <Button
          onClick={() => {
            retakeQuiz();
          }}
          color="primary"
          variant="outlined"
        >
          Retake
        </Button>
        <Button
          onClick={() => {
            resetQuiz();
          }}
          color="primary"
          variant="outlined"
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            router.push("/");
          }}
          color="primary"
          variant="outlined"
        >
          Home
        </Button>
      </div>
    </div>
  );
}
