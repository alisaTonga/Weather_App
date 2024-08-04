import styles from './myButton.module.css';

interface IMyButtonProps {
  name?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (() => void) | ((id: number) => void);
  id?: number;
  disabled?: boolean;
}

export default function MyButton({ type = 'button', onClick, name = 'default', id, disabled=false }: IMyButtonProps) {
  const handleClick = () => {
    if (id !== undefined && typeof onClick === 'function') {
      (onClick as (id: number) => void)(id);
    } else if (typeof onClick === 'function') {
      (onClick as () => void)();
    }
  };

  return (
    <button disabled={disabled} type={type} onClick={handleClick} className={styles.myButton}>
      {name}
    </button>
  );
}
