import "./Btn.css";

type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Btn = (props: ButtonProps) => {
  return (
    <div>
      <h1>Componente</h1>
      <button onClick={props.handleClick} className="boton">presionar</button>
    </div>
  );
};

export default Btn;
