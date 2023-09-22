interface props {
  text: string
  textModifications: string
  color: string
  functions: [() => void]
}
export const LikeButton = ({text, textModifications, color, functions}:props) => {
  
  const buttonAction = () => {
    functions[0]
  }
  
  return (
    <button 
      className={`bg-${color}`}
      onClick={buttonAction}
      >
      <p className={textModifications}>{text}</p>
    </button>
  )
}
