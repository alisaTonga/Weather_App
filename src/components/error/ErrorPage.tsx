import styles from './error.module.css';

interface IErrorProps {
  text: string;
  type: 'api' | 'validation';
}

function ErrorPage({ type, text }: IErrorProps) {
  // code
  return (
    <div className={styles.card}>
      <h2>{type === 'api' ? 'API Error' : 'Validation Error'}</h2>
      <h3>{text}</h3>
    </div>
  );
}

export default ErrorPage;
