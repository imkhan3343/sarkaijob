interface DisclaimerProps {
  text: string
  textHindi?: string | null
}

export default function Disclaimer({ text, textHindi }: DisclaimerProps) {
  return (
    <div
      role="alert"
      className="bg-amber-50 border border-amber-200 rounded px-4 py-3 text-body-sm text-amber-800"
    >
      <span className="font-bold">Disclaimer: </span>
      {textHindi || text}
    </div>
  )
}
